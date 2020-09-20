<template>
  <div class="">
    <!-- 注册 -->
    <el-form size="small" align="left" :rules="registerRule" :model="registerForm" ref="registerForm" key="register" style="padding-top: 10px">
      <el-form-item prop="account">
        <el-input placeholder="请输入用户名" v-model="registerForm.account" maxlength="16" size="default"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="registerForm.password" maxlength="16" type="password" show-password size="default"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input placeholder="请输入手机号码" v-model="registerForm.phone" maxlength="11" size="default"></el-input>
      </el-form-item>
      <el-form-item prop="code" style="display: flex">
        <el-input placeholder="请输入6位验证码" v-model="registerForm.code" maxlength="6" size="default" style="width:49%; padding-right: 1%; "></el-input>
        <el-button size="default" :disabled="getCodeStatus" @click="getPhoneCode" style="width:50%;">{{ codeBtnMessage }}</el-button>
      </el-form-item>
      <el-form-item class="agreement-container" prop="aggrement">
        <el-checkbox v-model="registerForm.aggrement"></el-checkbox><span class="agreement">注册账号即代表您已阅读过、了解并接受<el-link :underline="false">《三无文学用户服务协议》</el-link>、<el-link :underline="false">《隐私保护政策》</el-link></span>
      </el-form-item>
      <el-form-item>
        <el-button class="block" type="primary" @click="handleConfirmRegister('registerForm')" size="default">{{ registerMessage }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from '@/api/user'
export default {
  data () {
    return {
      timer: null,
      codeTime: 59,
      type: 'register',
      registerMessage: '注册',
      codeBtnMessage: '获取验证码',
      registerForm: {
        account: '',
        password: '',
        phone: '',
        code: ''
      },
      registerRule: {
        account: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        aggrement: [{ required: true, message: '请勾选协议', trigger: 'blur' }]
      }
    }
  },
  computed: {
    getCodeStatus () {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!this.registerForm.account) {
        return true
      }
      if (!this.registerForm.password) {
        return true
      }
      if (!reg.test(this.registerForm.phone)) {
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
    // 获取验证码
    async getPhoneCode () {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!reg.test(this.registerForm.phone)) {
        return false
      }
      const result = await user.GetRegisterCode(
        this.registerForm.account,
        this.registerForm.phone
      )
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
      this.$refs.registerForm.resetFields()
    },
    handleConfirmRegister (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.registerForm).then(res => {
            if (res) {
              // this.$message.success('注册成功');
              // this.$router.go(0);
              this.registerMessage = '正在登录...'
              setTimeout(() => {
                this.$store
                  .dispatch('user/login', this.registerForm)
                  .then(res => {
                    this.registerMessage = '登录成功'
                    setTimeout(() => {
                      // this.registerMessage = '注册'
                      this.$router.go(0)
                    }, 500)
                  })
              }, 500)
            } else {
              console.log('错误')
              // this.$message.error("用户名已存在");
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
