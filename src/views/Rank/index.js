
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rankForm: {
        type: 1,
        mode: 'week',
        page: 1,
        size: 10
      },
      count: 0,
      activeTab: '1',
      bookData: [],
      sortOptions: [],
      rankRule: false
    }
  },
  computed: {
    ...mapGetters(['imageDomain'])
  },
  created () {
    this.getRankingList()
  },
  methods: {
    // 菜单更改
    handleChangeMenu (e) {
      // this.rankForm.type = e
      // this.$router.push({
      //   path: 'ranks',
      //   query: this.rankForm
      // })
      this.rankForm.page = 1
      console.log('选中')
      this.getRankingList()
    },
    handleChangeType (type) {
      // this.$router.push({
      //   path: 'ranks',
      //   query: this.rankForm
      // })
      this.rankForm.page = 1
      this.getRankingList()
    },
    async getRankingList () {
      this.rankForm.type = this.getType(this.rankForm.mode)
      console.log(this.rankForm)
      const result = await this.$api.list.getRankingList(this.rankForm)
      this.bookData = result.list
      this.count = result.count
    },
    // 跳转至作品详情
    linkToBook (bookId) {
      this.$router.push({
        name: 'book',
        params: {
          bookId: bookId
        }
      })
    },
    // 跳转至作者
    linkToAuthor (authorId) {
      this.$router.push({
        path: '/author',
        query: { author_id: authorId }
      })
    },
    getType (mode) {
      if (mode === 'week') {
        return 2 * this.activeTab - 1
      }
      if (mode === 'month') {
        return 2 * this.activeTab
      }
      console.log(this.activeTab)
    },
    // 切换页数
    handleCurrentChange (val) {
      this.rankForm.page = val
      this.getRankingList()
    }
  }
}
