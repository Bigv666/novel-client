<template>
  <div class="personal-comment">
    <div class="user_stack">
      <div class="book_box" v-if="commentData">
        <el-table size="small" :data="commentData">
          <el-table-column label="评论书籍" prop="book_name" min-width="150"></el-table-column>
          <el-table-column label="评论内容" prop="content" min-width="150">
            <template slot-scope="scope">
              <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.content">
                <span slot="reference" class="text-ess">{{scope.row.content}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="获赞数" prop="likes"></el-table-column>
          <el-table-column label="评论时间" prop="create_time"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleDelComment(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination"  @current-change="handlePageChange" @size-change="handleSizeChange"  :total="count" :current-page="form.page" :page-size="form.size" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
      <div class="no-stack" v-else>
        <p class="color-info">暂无评论~~~</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      commentData: null,
      form: {
        page: 1,
        size: 10
      },
      count: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取评论
    getData () {
      this.$api.user.getUserComment(this.form).then(res => {
        this.commentData = res.list
        this.count = res.count
      })
    },
    // 页数更改
    handlePageChange (e) {
      this.form.page = e
      this.getData()
    },
    // 条数更改
    handleSizeChange (e) {
      this.form.size = e
      this.form.page = 1
      this.getData()
    },
    // 删除评论
    handleDelComment (commentId) {
      this.$confirm('确定要删除这条评论吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$api.user.delUserComment({ comment_id: commentId })
        if (result) {
          this.$message.success('删除成功')
          this.getData()
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.no-stack {
  padding-top: 150px;
}
.personal-comment {
  padding: 10px;
}
.pagination {
  padding: 20px 0;
}
.text-ess {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
