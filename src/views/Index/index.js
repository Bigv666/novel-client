import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      screenWidth: 1920,
      bannerHeight: 700,
      slideList: [], // 轮播图
      recommendData: [],
      newData: [],
      updateData: [], // 最近更新
      authorData: [], // 作者
      rankingData: [], // 七日排行
      monthOptions: {
        1: '一月',
        2: '二月',
        3: '三月',
        4: '四月',
        5: '五月',
        6: '六月',
        7: '七月',
        8: '八月',
        9: '九月',
        10: '十月',
        11: '十一月',
        12: '十二月'
      }
    }
  },
  created () {
    this.setSize()
    this.getSlideList()
    this.getRecommendData()
    this.getRankingData()
    this.getNewData()
    this.getAuthorList()
    this.getUpdateCatalogs()
  },
  mounted () {
    window.addEventListener('resize', this.setSize, false)
  },
  computed: {
    // ...mapGetters(['$'])
  },
  methods: {
    setSize () {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWidth = width > 1100 ? width : 1100
      this.bannerHeight = 700 / 1920 * this.screenWidth
    },
    // 获取轮播图
    getSlideList () {
      this.$api.list
        .getSwiperList({ type: 0, page: 1, size: 5 })
        .then((res) => {
          if (res) {
            this.slideList = res.list
          }
        })
    },
    // 主编推荐
    getRecommendData () {
      // 1首页 2男频3女频 4男频新书 5女频新书
      this.$api.list
        .getRecommendList({ type: 1, page: 1, size: 12 })
        .then((res) => {
          this.recommendData = res.list
        })
    },
    // 主编推荐
    getNewData () {
      // 1首页 2男频3女频 4男频新书 5女频新书
      this.$api.list
        .getRecommendList({ type: 4, page: 1, size: 12 })
        .then((res) => {
          this.newData = res.list
        })
    },
    // 最近七日书籍
    getRankingData () {
      this.$api.list.getHonorList({ type: 33, page: 1, size: 7 }).then((res) => {
        this.rankingData = res.list
      })
    },
    // 最近更新
    getUpdateCatalogs () {
      this.$api.list.getChapterList({ page: 1, size: 12 }).then((res) => {
        this.updateData = res.list
        console.log(this.updateData)
      })
    },
    // 获取作者列表
    getAuthorList () {
      this.$api.list.getAuthorList({ page: 1, size: 6 }).then((res) => {
        this.authorData = res.list
      })
    },
    // 跳转至作品详情
    linkToBook (bookId) {
      this.$router.push({
        name: 'book',
        params: {
          id: bookId
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
    format (time, mode) {
      if (mode === 'day') {
        return moment(time).format('DD')
      } else if (mode === 'month') {
        return this.monthOptions[moment(time).format('M')]
      }
    }
  }
}
