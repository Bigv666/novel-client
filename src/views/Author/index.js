// import Author from '@/api/author'

import { mapGetters } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      authorInfo: {
        nickname: '笔名',
        avatar: '',
        createTime: '2019-11-11 13:14',
        words: 0,
        works: [],
        honor: {
          first: 0,
          second: 0,
          third: 0,
          topTen: 0,
          topThirty: 0
        }
      }
    }
  },
  created () {
    // this.id = this.$route.query.author_id
  },
  computed: {
    ...mapGetters(['imageDomain'])
  },
  mounted () {
    this.getAuthorInfo()
  },
  methods: {
    getAuthorInfo () {
      this.$api.user.getAuthor({ user_id: this.id }).then(res => {
        this.authorInfo = res
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
    }
  }
}
