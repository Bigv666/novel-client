
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      recommendData: [],
      updateData: null, // 最近更新
      currentIndex: 0, // 当前轮播
      newBookData: [],
      newAuthorData: null, // 新晋作者
      rankingData: []
    }
  },
  created () {
    this.getRankingData()
    this.getRecommendData()
    this.getNewList()
    this.getNewAuthor()
    this.getUpdateCatalogs()
  },
  computed: {
    // ...mapGetters(['$domain'])
  },
  methods: {
    // 最近七日书籍
    getRankingData () {
      this.$api.list.getHonorList({ page: 1, size: 3, category: 0 }).then((res) => {
        this.rankingData = res.list
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
    // 阅读
    linkToReader (bookId, chapterId) {
      this.$router.push({
        path: '/read',
        query: {
          bookId,
          chapterId
        }
      })
    },
    // 走马灯变换
    handleChangeCarousel (index) {
      this.currentIndex = index
    },
    // 新晋作者
    getNewAuthor () {
      this.$api.list.getAuthorList({ size: 12, category: 0 }).then((res) => {
        this.newAuthorData = res.list
      })
    },
    // 新书速推
    getNewList () {
      this.$api.list.getRecommendList({ type: 5, size: 12, category: 0 }).then((res) => {
        this.newBookData = res.list
      })
    },
    // 获取女频推荐
    getRecommendData () {
      this.$api.list.getRecommendList({ type: 3, size: 12, category: 0 }).then((res) => {
        this.recommendData = res.list
      })
    },
    // 获取最近更新
    getUpdateCatalogs () {
      this.$api.list.getChapterList({ size: 14, category: 0 }).then((res) => {
        this.updateData = res.list
      })
    }
  }
}
