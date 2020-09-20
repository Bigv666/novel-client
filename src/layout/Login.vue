<template>
  <div class="">
    <el-tabs class="login_wrapper" v-model="activeName" @tab-click="handleChange">
      <!-- 登录 -->
      <el-tab-pane name="first" label="账号密码登录">
        <el-form align="left" size="small" :rules="accountRule" :model="accountForm" ref="accountForm">
          <el-form-item prop="account">
            <el-input placeholder="请输入用户名" v-model="accountForm.account" :maxlength="16" size="default"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="accountForm.password" :maxlength="16" type="password" show-password size="default"></el-input>
          </el-form-item>
          <el-form-item class="agreement-container" prop="aggrement">
            <el-checkbox v-model="accountForm.aggrement"></el-checkbox><span class="agreement">登录账号即代表您已阅读过、了解并接受<el-link :underline="false">《三无文学用户服务协议》</el-link>、<el-link :underline="false">《隐私保护政策》</el-link></span>
          </el-form-item>
          <el-form-item>
            <el-button class="block" type="primary" @click="handleConfirmLogin('accountForm')" size="default">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="短信验证登录" name="second">
        <el-form align="left" size="small" :rules="phoneRule" :model="phoneForm" ref="phoneForm">
          <el-form-item prop="phone">
            <el-input placeholder="请输入手机号码" v-model="phoneForm.phone" maxlength="11" size="default"></el-input>
          </el-form-item>
          <el-form-item prop="code" style="display: flex">
            <el-input placeholder="请输入6位验证码" v-model="phoneForm.code" maxlength="6" size="default" style="width:49%; padding-right: 1%; "></el-input>
            <el-button size="default" :disabled="getCodeStatus" @click="getPhoneCode" style="width:50%;">{{ codeBtnMessage }}</el-button>
          </el-form-item>
          <el-form-item class="agreement-container" prop="aggrement">
            <el-checkbox v-model="phoneForm.aggrement"></el-checkbox><span class="agreement">登录账号即代表您已阅读过、了解并接受<el-link :underline="false">《三无文学用户服务协议》</el-link>、<el-link :underline="false">《隐私保护政策》</el-link></span>
          </el-form-item>
          <el-form-item>
            <el-button class="block" type="primary" @click="loginByPhone('phoneForm')" size="default">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import user from '@/api/user'
export default {
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号码格式有误'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      timer: null,
      codeTime: 59,
      codeBtnMessage: '获取验证码',
      accountForm: {
        account: '',
        password: '',
        aggrement: ''
      },
      phoneForm: {
        phone: '',
        code: '',
        aggrement: ''
      },
      accountRule: {
        account: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        aggrement: [{ required: true, message: '请勾选协议', trigger: 'blur' }]
      },
      phoneRule: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        aggrement: [{ required: true, message: '请勾选协议', trigger: 'blur' }]
      }
    }
  },
  computed: {
    getCodeStatus () {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!reg.test(this.phoneForm.phone)) {
        return true
      }
      if (this.timer) {
        return true
      }
      return false
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    handleChange () {
      this.resetData()
    },
    // 获取验证码
    async getPhoneCode () {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!reg.test(this.phoneForm.phone)) {
        return false
      }
      const result = await user.GetLoginCode(this.phoneForm.phone)
      if (result) {
        this.timer = setInterval(() => {
          if (this.codeTime <= 0) {
            clearInterval(this.timer)
            this.codeBtnMessage = '获取验证码'
            this.timer = null
            this.codeTime = 59
          } else {
            this.codeBtnMessage = `${this.codeTime}s后重新获取`
            this.codeTime -= 1
          }
        }, 1000)
      } else {
        return false
      }
    },
    resetData () {
      clearInterval(this.timer)
      this.timer = null
      this.codeBtnMessage = '获取验证码'
      this.codeTime = 59
      this.$refs.accountForm.resetFields()
      this.$refs.phoneForm.resetFields()
    },
    handleConfirmLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.accountForm).then(res => {
            console.log(res)
            if (res) {
              this.$message.success('登录成功')
              setTimeout(() => {
                this.$router.go(0)
              }, 500)
            } else {
              this.$message.error('用户名或密码错误')
            }
          })
        } else {
          this.$message.error('请认真填写内容!')
        }
      })
    },
    loginByPhone (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('user/loginByPhone', this.phoneForm)
            .then(res => {
              if (res) {
                this.$message.success('登录成功')
                setTimeout(() => {
                  this.$router.go(0)
                }, 500)
              } else {
                this.$message.error('用户名或密码错误')
              }
            })
        } else {
          this.$message.error('请认真填写内容!')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  width: 100%;
}
.flex-space {
  display: flex;
  justify-content: space-between;
}
.agreement-container {
  margin-bottom: 12px;
  ::v-deep .el-form-item__content {
    line-height: 14px;
  }
}
.agreement {
  line-height: 14px;
  font-size: 13px;
  color: #666;
  padding-left: 5px;
}
.login_wrapper {
  ::v-deep .el-tabs__nav {
    width: 100% !important;
    .el-tabs__item {
      width: 50% !important;
    }
  }
}
</style>
