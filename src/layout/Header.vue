<template>
  <header class="header-wrapper">
    <div class="header-content">
      <div class="nav-wrapper">
        <router-link to="/index">
          <img src="@/assets/logo.png" class="header-logo" />
        </router-link>
        <el-menu :default-active="$route.path" mode="horizontal" class="nav-content" router>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/male">男频</el-menu-item>
          <el-menu-item index="/female">女频</el-menu-item>
          <el-menu-item index="/stock">书库</el-menu-item>
          <el-menu-item index="/rank">排行榜</el-menu-item>
          <el-menu-item>
            <el-input placeholder="请输入作品名/作者/类型" clearable v-model="search" @keydown.enter.native="handleSearch" class="search-input"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
          </el-menu-item>
        </el-menu>
      </div>
      <div v-if="!isLogin" class="login-register">
        <el-button plain size="small" @click="handleLogin">登录</el-button>
        <el-button type="primary" size="small" @click="handleRegister">注册</el-button>
      </div>
      <div v-else class="flex">
        <div style="margin-right:20px">
          <el-badge value="99">
          <el-icon name="bell" style="font-size:24px;"></el-icon>
        </el-badge>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
            <el-avatar :src="$domain+avatar" alt="" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid" command="user">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-order" command="consume">消费记录</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout" divided>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
    <!-- 登录注册弹窗 -->
    <el-dialog width="350px" :visible.sync="dialogVisible" :title="type === 'login' ? '登录' : '注册'" @closed="afterClose" top="20vh" class="form_wrapper" :close-on-click-modal="false" :close-on-press-escape="false">
      <Login v-if="type === 'login'"></Login>
      <Register v-else></Register>
      <div slot="footer">
        <div v-if="type === 'register'">
          <el-link @click="type = 'login'">已有账号登录</el-link>
        </div>
        <div v-if="type === 'login'">
          <el-link @click="type = 'register'">去注册</el-link>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import Login from './Login'
import Register from './Register'
import { mapGetters } from 'vuex'
export default {
  components: {
    Login,
    Register
  },
  data () {
    return {
      dialogVisible: false,
      timer: null,
      codeTime: 59,
      type: 'register',
      registerMessage: '注册',
      codeBtnMessage: '获取验证码',
      search: '',
      loginForm: {
        account: '',
        password: ''
      },
      registerForm: {
        account: '',
        password: '',
        phone: ''
      },
      loginRule: {
        account: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        aggrement: [{ required: true, message: '请勾选协议', trigger: 'blur' }]
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
  async created () {
    await this.getUserInfo()
    console.log(this.isLogin)
  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal !== '/search') {
        this.search = ''
      }
    }
  },
  computed: {
    ...mapGetters(['nickname', 'isLogin', 'avatar']),
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
  methods: {
    async handleCommand (cmd) {
      console.log(cmd)
      if (cmd === 'user') {
        this.$router.push({ name: 'user' })
      }
      if (cmd === 'consume') {
        this.$router.push({ name: 'consume' })
      }
      if (cmd === 'logout') {
        await this.$store.dispatch('user/logout')
        this.$router.go(0)
      }
    },
    // 获取验证码
    getPhoneCode () {
      this.timer = setInterval(() => {
        if (this.codeTime <= 0) {
          this.codeBtnMessage = '获取验证码'
          this.timer = null
        } else {
          this.codeBtnMessage = `${this.codeTime}s后重新获取`
          this.codeTime -= 1
        }
      }, 1000)
    },
    handleLogin () {
      this.type = 'login'
      this.dialogVisible = true
    },
    handleRegister () {
      this.type = 'register'
      this.dialogVisible = true
    },
    resetData () {
      this.loginForm = {
        account: '',
        password: ''
      }
      this.registerForm = {
        account: '',
        password: '',
        phone: ''
      }
    },
    linkToUser () {
      this.$router.push({ name: 'personal' })
    },
    async getUserInfo () {
      await this.$store.dispatch('user/getUserInfo')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.go(0)
    },
    handleConfirmLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(res => {
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
              this.$message.error('用户名已存在')
            }
          })
        } else {
          this.$message.error('请认真填写内容!')
        }
      })
    },
    afterClose () {
      console.log(this.loginForm)
      this.resetData()
    },
    handleSearch () {
      this.$router.push({ path: 'search', query: { keywords: this.search } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
.header-wrapper {
  height: $header-height;
  border-bottom: 1px solid $color-border;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
}
.header-content {
  height: 100%;
  @include web-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.nav-wrapper {
  display: flex;
  align-items: center;
  .nav-content {
    padding-left: 20px;
  }
  ::v-deep {
    .el-menu.el-menu--horizontal {
      border: none;
    }
    .el-menu--horizontal > .el-menu-item {
      height: 30px;
      line-height: 30px;
    }
    .el-menu--horizontal > .el-menu-item:hover {
      color: $color-primary;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      color: $color-primary;
      border-color: transparent;
    }
  }
}
.header-logo {
  width: 120px;
}
.login-wrapper {
  display: flex;
  align-items: center;
  .search-input {
    margin-right: 10px;
  }
}
</style>
