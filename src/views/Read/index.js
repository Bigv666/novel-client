import user from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      book_id: '', // 书籍编号
      chapter_id: '', // 章节编号
      loading: false, // 加载标志
      noMore: false, // 是否还有章节
      chapterDrawer: false, // 章节抽屉
      settingDrawer: false, // 设置抽屉
      ticketDrawer: false, // 票据抽屉
      presentDrawer: false, // 礼物抽屉
      chapterData: '',
      chapterList: [], // 章节列表
      chapterForm: { // 章节表单
        book_id: -1,
        sort: 1,
        page: 1,
        size: 50
      },
      ticket: {
        month: 0,
        recommend: 0
      },
      monthNum: 1,
      recommendNum: 1
    }
  },
  async created () {
    this.book_id = this.$route.query.book_id
    this.chapter_id = this.$route.query.chapter_id
    this.chapterForm.book_id = this.$route.query.book_id
    await this.getCatalogContent()
    this.getChapterList()
  },
  computed: {
    ...mapGetters(['nickname'])
  },
  methods: {
    // 跳转至书籍
    linkToBook () {
      this.$router.push({
        name: 'book',
        params: {
          id: this.book_id
        }
      })
    },
    // 触底加载
    async load () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.chapterForm.page += 1
      await this.getChapterList()
    },
    // 获取章节列表
    async getChapterList () {
      const result = await this.$api.list.getChapterList(this.chapterForm)
      console.log(result)
      if (result.list.length > 0) {
        this.chapterList = this.chapterList.concat(result.list)
        console.log(this.chapterList)
        this.loading = false
      } else {
        this.loading = false
        this.noMore = true
      }
    },
    // 获取章节内容
    async getCatalogContent () {
      const result = await this.$api.book.getChapter({ book_id: this.book_id, chapter_id: this.chapter_id })
      this.chapterData = result
      console.log(this.chapterData.content.split('↵↵'))
      this.addUserHistory()
      this.$api.book.AddBookData({ book_id: this.book_id, search: 1 })
    },
    // 加入书架
    async addUserStack () {
      if (!this.nickname) {
        this.$message.error('请登录后重试')
        return
      }
      const result = await this.$api.user.insertUserBookShelf({ book_id: this.book_id })
      if (result) {
        this.$message.success('添加书架成功')
      }
    },
    // 新增历史阅读
    addUserHistory () {
      this.$api.user.insertUserReadRecord({ book_id: this.book_id, chapter_id: this.chapter_id })
    },
    // 购买章节
    addUserFollow () {
      if (!this.nickname) {
        this.$message.error('用户信息失效，请登录后重试')
        return
      }
      this.$api.user.insertUserSubscribe({ book_id: this.book_id, chapter_id: this.chapter_id }).then((res) => {
        if (res) {
          this.$message.success('购买成功')
          this.getCatalogContent()
        }
      })
    },
    // 更改章节
    changeChapter (chapter) {
      this.$router.push({ path: '/read', query: { book_id: this.book_id, chapter_id: chapter._id } })
      this.chapterDrawer = false
    },
    // 路由变化
    handleChangeRoute (newVal) {
      this.book_id = newVal.book_id
      this.chapter_id = newVal.chapter_id
      this.getCatalogContent()
    }
  },
  watch: {
    '$route.query': 'handleChangeRoute'
  }
}
