
import moment from 'moment'
import { mapGetters } from 'vuex'
import WmComment from './children/comment'
import Chapter from './children/index'
moment.locale('zh-cn')
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    WmComment,
    Chapter
  },
  data () {
    return {
      bookData: {}, // 书籍信息
      newChapter: {}, // 最新章节
      startBtnMessage: '开始阅读',
      userScore: 7.8 / 2, // 用户评分
      activeName: 'first'
    }
  },
  created () {
    this.getData()
    console.log(this.id, this.$route.params)
  },
  mounted () {

  },
  filters: {
    filterWords (value) {
      if (value > 10000) {
        return `${(value / 10000).toFixed(2)}万字`
      } else {
        return value
      }
    }
  },
  computed: {
    // ...mapGetters(['$domain'])
  },
  methods: {
    // 获取书籍内容
    getData () {
      this.$api.book.getBook({
        id: this.id
      }).then(res => {
        this.bookData = res
        this.newChapter = res.last_chapter
      })
    },
    // 新增书架
    async addUserStack () {
      const result = await this.$api.user.insertUserBookShelf({
        book_id: this.id
      })
      if (result) {
        this.$message.success('收藏成功')
      }
    },
    // 跳转至作者
    linkToAuthor (authorId) {
      this.$router.push({
        path: '/author',
        query: {
          author_id: authorId
        }
      })
    },
    // 开始阅读
    startReader (chapterId) {
      this.$router.push({
        path: '/read',
        query: {
          id: this.id,
          chapterId
        }
      })
    }
  }
}
