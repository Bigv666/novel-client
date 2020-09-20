import store from '@/store'
export default {
  data: function () {
    return {
      orderData: [], // 订阅数据
      rewardData: [], // 打赏数据
      rechargeData: [], // 充值数据
      ticketData: [], // 赠送票据记录
      orderForm: { // 订阅表单
        page: 1,
        size: 10,
        total: 0
      },
      rewardForm: { // 打赏表单
        page: 1,
        size: 10,
        total: 0
      },
      rechargeForm: { // 充值表单
        page: 1,
        size: 10,
        total: 0
      },
      activeName: 'first'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      switch (this.activeName) {
        case 'first':
          this.getOrderData()
          break
        case 'second':
          this.getRewardData()
          break
        case 'third':
          this.getRechargeData()
          break
        default:
          break
      }
    },
    // 便签切换
    handleClick () {
      this.getData()
    },
    // 获取个人信息
    getUserInfo () {
      if (!store.getters.userInfo) {
        this.$store.dispatch('user/getUserInfo').then((res) => {
          if (res) {
            this.userInfo = store.getters.userInfo
          } else {
            alert('请登录')
            this.$router.push({ name: 'index' })
          }
        })
      } else {
        this.userInfo = store.getters.userInfo
      }
    },
    // 获取订阅数据
    getOrderData () {
      this.$api.user.getUserSubscribe(this.orderForm).then((res) => {
        this.orderData = res.list
        this.orderForm.total = res.count
      })
    },
    // 获取打赏数据
    getRewardData () {
      this.$api.user.getUserPresentRecord(this.rewardForm).then((res) => {
        this.rewardData = res.list
        this.rewardForm.total = res.count
      })
    },
    // 获取充值数据
    getRechargeData () {
      this.$api.user.getUserRecharge(this.rechargeForm).then((res) => {
        this.rechargeData = res.list
        this.rechargeForm.total = res.count
      })
    },
    // 充值换页
    handleChangeRecharge (e) {
      this.rechargeForm.page = e
      this.getData()
    },
    // 打赏换页
    handleChangeReward (e) {
      this.rewardForm.page = e
      this.getData()
    },
    // 订阅换页
    handleChangeFollow (e) {
      this.orderForm.page = e
      this.getData()
    }
  }
}
