
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      form: {
        keywords: '',
        page: 1,
        size: 16
      },
      resultData: [],
      count: 0
    }
  },
  created () {
    this.form.keywords = this.$route.query.keywords
    this.getData()
  },
  computed: {
    ...mapGetters(['imageDomain'])
  },
  methods: {
    getData () {
      this.$api.list.getBookList({
        size: this.form.size,
        page: this.form.page,
        keywords: this.form.keywords
      }).then((res) => {
        this.resultData = res.list
        this.count = res.count
      })
    },
    handleCurrentChange (e) {
      this.form.page = e
      this.getData()
    },
    // 跳转至作品详情
    async linkToBook (bookId) {
      await this.$api.book.AddBookData({ book_id: bookId, search: 1 })
      this.$router.push({
        name: 'book',
        params: {
          bookId
        }
      })
    },
    // 跳转至作者
    linkToAuthor (authorId) {
      this.$router.push({
        path: '/author',
        query: { author_id: authorId }
      })
    }
  },
  watch: {
    '$route.query.keywords': function (newVal, oldVal) {
      this.form.keywords = newVal
      this.getData()
    }
  }
}
