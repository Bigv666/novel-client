<template>
  <div class="comment-container">
    <!-- 评论列表 -->
    <comment-list :book_id="form.book_id"></comment-list>
  </div>
</template>
<script>
import CommentList from '@/components/CommentList'
import store from '@/store'
import user from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommentList
  },
  data () {
    return {
      form: {
        book_id: '',
        parent_id: null,
        page: 1,
        size: 20,
        total: 0
      },
      commentForm: { // 评论表单
        content: '',
        book_id: '',
        parent_id: null
      },
      addComment: false, // 添加回复可见
      showReply: false, // 显示回复列表
      // 评论数据
      commentData: [],
      // 回复楼评论
      currentIndex: -1,
      // 回复层评论
      replyIndex: -1
    }
  },
  created () {
    const bookId = this.$route.params.id
    this.commentForm.book_id = bookId
    this.form.book_id = bookId
    // this.getUserInfo();
    // this.getBookComment()
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  },
  methods: {
    handleChangePage (e) {
      this.form.page = e
      this.getBookComment()
    },
    // 提交评论
    async onConfirmComment (parentId) {
      this.commentForm.parent_id = parentId
      const result = await this.$api.user.insertUserComment(this.commentForm)
      if (result) {
        this.$message.success('评论成功')
        this.commentForm.content = ''
        this.getBookComment()
      }
    },
    // 更改标签
    handleChangeTab () {
      if (this.activeName === 'first') {
        this.$router.push({ name: 'book', params: { bookId: this.bookId } })
      }
    },
    // 取消添加评论
    onCancelComment () {
      this.addComment = false
      this.commentForm.content = ''
    },
    // 新增点赞
    addCommentPraise (_id, e) {
      const Num = e.currentTarget.querySelector('span')
      Num.innerText = Number.parseInt(Num.innerText) + 1
      e.currentTarget.className = e.currentTarget.className + ' is-active'
      user.AddUserCommentPraise({ bookId: this.bookId, _id })
    },

    // 获取用户信息
    async getUserInfo () {
      if (!store.getters.userInfo) {
        await this.$store.dispatch('user/getUserInfo')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.input-box {
  background-color: #eee;
  color: #666;
  font-size: 14px;
  padding: 20px 5px;
  cursor: pointer;
  border-radius: 4px;
}
.comment-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px 0;
}
.comment-detail {
  flex: 1;
  padding-left: 15px;
}
.comment-content {
  font-size: 13px;
  color: #666;
  margin: 3px 0;
}
.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-time {
  font-size: 13px;
  color: #666;
}
.comment-btn {
  font-size: 13px;
}
.praise-btn {
  color: #666;
  cursor: pointer;
  user-select: none;
}
.praise-btn.is-active {
  color: #ff933a;
}
.reply-btn {
  padding-left: 5px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
.comment-reply {
  border-left: 5px solid #eee;
  padding-left: 20px;
}
.reply-footer {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  text-align: right;
}
.reply-content {
  color: #666;
  font-size: 13px;
  margin: 5px 0 0 0;
  line-height: 19px;
}
.reply-time {
  font-size: 13px;
  color: #666;
}
.reply-label {
  height: 19px;
  display: inline-block;
  font-size: 13px;
  padding: 0 3px;
}
.no-comment {
  color: #666;
  font-size: 14px;
}
</style>
