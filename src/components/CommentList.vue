<template>
  <div>
    <div v-if="!parent_id">
      <comment-input v-if="replyIndex == '-1'" @cancel="replyIndex = ''" @confirm="handleConfirm"></comment-input>
      <!--  -->
      <section v-else>
        <div class="input-box" v-if="isLogin" @click="handleAddComment">发表评论</div>
        <div class="input-box" v-else>登录后即可评价~</div>
      </section>
    </div>
    <section class="no-comment" v-if="commentData.length === 0 && !form.parent_id">
      <p>暂无评论~~~</p>
    </section>
    <div class='' v-else>
      <ul >
        <li v-for="(item) in commentData" :key="item._id" class="comment-item">
          <el-avatar shape="circle" :size="40" :src="$domain + item.user.avatar">头像</el-avatar>
          <div class="comment-detail">
            <el-link class="comment-name">{{item.user.nickname}}</el-link>
            <el-tag size="small" style="margin-left:5px" v-if="item.type === 1">作者</el-tag>
            <el-tag size="small" style="margin-left:5px">{{item.user.grade}}</el-tag>
            <el-tag size="small" style="margin-left:5px" type="danger" v-if="item.status === 1">置顶</el-tag>
            <p class="comment-content" v-if="item.commented">
              <span class="reply-to">
                <span class="reply-label">回复</span>
                <el-link :underline="false">{{item.commented.nickname}}</el-link>：
              </span>
              {{item.content}}
            </p>
            <p class="comment-content" v-else>{{item.content}}</p>
            <div class="comment-footer">
              <time class="comment-time">{{item.create_time}}</time>
              <div class="footer-btn" v-if="!form.parent_id">
                <span class="praise-btn" @click.once="addCommentLike(item._id, $event)"><i class="iconfont iconzan"></i><span>{{item.likes}}</span></span>
                <span class="reply-btn" @click="showCommentReply(item)"><i class="iconfont iconcomment"></i>{{item.children}}</span>
              </div>
              <div class="footer-btn" v-else>
                <span class="reply-btn" @click="addCommentReply(item)"><i class="iconfont iconcomment"></i></span>
              </div>
            </div>
            <!-- 回复列表 -->
            <div class="comment-reply" v-if="showReply && currentIndex.includes(item._id)">
              <comment-input v-if="replyIndex === item._id" @cancel="handleCancel" @confirm="handleConfirm"></comment-input>
              <!-- 列表内容 -->
              <comment-list ref="reply" :book_id="book_id" v-show="item.children>0" :parent_id="item._id"></comment-list>
            </div>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination v-if="!form.parent_id" class="pagination" layout="total, prev, pager, next, jumper" :current-page="form.page" :page-size="form.size" :total="form.total" @current-change="handleChangePage"></el-pagination>
      <div class="more-page" @click="moreComment" v-if="form.parent_id && commentData.length < form.total">
        查看更多
      </div>
    </div>
  </div>
</template>

<script>
import CommentInput from './CommentInput'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommentInput
  },
  name: 'commentList',
  props: ['book_id', 'parent_id'],
  data () {
    return {
      form: {
        book_id: '',
        parent_id: null,
        page: 1,
        size: 10,
        total: 0
      },
      showReply: false,
      currentIndex: [],
      replyIndex: '',
      commentData: [],
      commentForm: {
        book_id: '',
        parent_id: '',
        commented_id: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created () {
    this.form.book_id = this.book_id || this.$parent.book_id
    this.form.parent_id = this.parent_id || null
    this.commentForm.book_id = this.form.book_id
    this.getCommentData()
  },
  methods: {
    async getCommentData () {
      const result = await this.$api.list.getCommentList(this.form)
      if (this.form.parent_id) {
        this.commentData = this.commentData.concat(result.list)
      } else {
        this.commentData = result.list
      }
      console.log(this.commentData)
      this.form.total = result.count
    },
    handleAddComment () {
      if (this.$refs.reply) {
        this.$refs.reply[0].replyIndex = ''
      }
      this.replyIndex = '-1'
      this.commentForm.parent_id = null
      this.commentForm.commented_id = null
    },
    showCommentReply (item) {
      if (this.$refs.reply) {
        this.$refs.reply[0].replyIndex = ''
      }
      this.replyIndex = item._id
      this.currentIndex.push(item._id)
      this.showReply = true
      this.commentForm.parent_id = item._id
      this.commentForm.commented_id = null
    },
    addCommentReply (item) {
      this.$parent.replyIndex = ''
      this.replyIndex = item._id
      this.currentIndex.push(item._id)
      this.showReply = true
      this.commentForm.parent_id = this.parent_id
      this.commentForm.commented_id = item.user_id
    },
    handleChangePage (page) {
      this.form.page = page
      this.getCommentData()
    },
    moreComment () {
      this.form.page += 1
      this.getCommentData()
    },
    // 取消
    handleCancel () {
      this.replyIndex = ''
    },
    async handleConfirm (content) {
      this.commentForm.content = content
      const result = await this.$api.user.insertUserComment(this.commentForm)
      if (result) {
        this.$message.success('评论成功')
        this.commentForm.content = ''
        if (!this.commentForm.parent_id) {
          this.commentData.unshift(result)
        }
        // this.replyIndex = ''
        // this.getCommentData()
      }
    },
    addCommentLike (id, e) {
      const Num = e.currentTarget.querySelector('span')
      Num.innerText = Number.parseInt(Num.innerText) + 1
      e.currentTarget.className = e.currentTarget.className + ' is-active'
      this.$api.user.likeUserComment({ comment_id: id })
    }
  }
}
</script>

<style scoped>
.pagination {
  text-align: center;
  padding: 10px 0;
}
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
.more-page {
  font-size: 14px;
  color: #999;
  cursor: pointer;
}
.reply-to {
  display: inline-flex;
  align-items: center;
}
</style>
