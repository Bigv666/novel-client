
import { mapGetters, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      form: {
        kind: '',
        type: '',
        words: '',
        status: '',
        time: '',
        page: 1,
        size: 16
      },
      wordsOptions: [{
        label: '',
        value: '不限'
      }, {
        label: 1,
        value: '10万以下'
      }, {
        label: 2,
        value: '10万~30万'
      },
      {
        label: 3,
        value: '30万~50万'
      },
      {
        label: 4,
        value: '50万~100万'
      },
      {
        label: 5,
        value: '100万~200万'
      },
      {
        label: 6,
        value: '200万以上'
      }
      ],
      statusOptions: [{
        label: '',
        value: '不限'
      }, {
        label: 0,
        value: '连载'
      }, {
        label: 1,
        value: '完结'
      }],
      timeOptions: [{
        label: '',
        value: '不限'
      }, {
        label: 0,
        value: '最近三天'
      }, {
        label: 1,
        value: '最近一周'
      },
      {
        label: 2,
        value: '最近半个月'
      },
      {
        label: 3,
        value: '最近一个月'
      }
      ],
      resultData: [],
      page: 1,
      count: 0,
      size: 16
    }
  },
  computed: {
    ...mapGetters(['imageDomain', 'kindOptions']),
    generateType () {
      let result = [{ label: '全部', value: '' }]
      if (this.kindOptions) {
        this.kindOptions.map(item => {
          if (this.form.kind === '') {
            result = result.concat(item.children)
          } else if (item.value === this.form.kind) {
            result = result.concat(item.children)
          }
        })
      }
      return result
    }
  },
  async created () {
    const params = this.$route.query
    this.form.kind = params.kind || ''
    this.form.type = params.type || ''
    this.form.words = params.words || ''
    this.form.status = params.status || ''
    this.form.time = params.time || ''
    this.getData()
    if (!this.kindOptions) {
      this.getDirectionList({ type: 1 })
    }
  },
  methods: {
    ...mapActions({ getDirectionList: 'list/getDirectionList' }),
    // 更换页数
    handleCurrentChange (e) {
      this.form.page = e
      this.getData()
    },
    // 请求数据
    getData () {
      this.$api.list.getBookList(this.form).then((res) => {
        this.resultData = res.list
        this.count = res.count
      })
    },
    // 跳转至作品详情
    linkToBook (bookId) {
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
    },
    handleQueryChange () {
      this.form.page = 1
      this.$router.push({
        path: 'stock',
        query: this.form
      })
      this.getData()
    },
    changeKind () {
      this.form.type = ''
      this.handleQueryChange()
    }
  }
}
