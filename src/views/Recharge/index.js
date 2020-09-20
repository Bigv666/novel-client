import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rechargeForm: {
        type: 1,
        money: 1,
        custom: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 更改金额
    handleChangeMoney () {
      if (this.rechargeForm.custom !== -1) {
        this.rechargeForm.custom = ''
      }
    },
    // 获取用户信息
    async getUserInfo () {
      if (!this.userInfo) {
        await store.dispatch('user/getUserInfo')
      }
    },
    // 新增充值
    addUserRecharge () {
      if (!this.nickname) {
        this.$message.error('用户信息失效，请登录后重试')
        this.$router.push({ name: 'index' })
        return
      }
      const reg = /^\d*$/
      if (this.rechargeForm.money === -1) {
        if (!reg.test(this.rechargeForm.custom)) {
          this.$message.error('自定义金额必须为整数')
          return
        } else {
          this.rechargeForm.money = Number.parseInt(this.rechargeForm.custom)
        }
      }
      this.$api.user.insertUserRecharge(this.rechargeForm).then(() => {
        this.$message.success('充值成功')
        this.$store.dispatch('user/getUserInfo')
        this.$router.push({ name: 'user' })
      })
    }
  },
  computed: {
    ...mapGetters(['money', 'nickname'])
  }
}
