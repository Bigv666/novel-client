<template>
  <div class="personal-stack">
    <div class="user_stack">
      <div class="book_box" v-if="stackData.length !== 0">
        <el-row :gutter="0" class="stack-box">
          <el-scrollbar>
            <el-col :span="8" v-for="item in stackData" :key="item._id">
              <el-card class="stack-item" shadow="hover">
                <el-image style="width: 150px;height: 180px" :src="$domain + item.image"></el-image>
                <div>
                  <el-link @click="linkToBook(item._id)">{{item.name}}</el-link>
                  <div class="author">
                    <el-link @click="linkToAuthor(item.author.user_id)">{{item.author.nickname}}</el-link>
                  </div>
                  <time class="reader-time">收藏于 {{item.create_time}}</time>
                  <el-button type="primary" size="small" @click="linkToBook(item._id)">查看此书</el-button>
                </div>
              </el-card>
            </el-col>
          </el-scrollbar>
        </el-row>
      </div>
      <div class="no-stack color-info" v-else>
        暂无书籍~~~<el-link class="color-primary" href="/">去收藏</el-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      stackData: []
    }
  },
  created () {
    this.$api.user.getUserBookShelf({}).then(res => {
      this.stackData = res.list
    })
  },
  methods: {
    // 跳转至作品详情
    linkToBook (bookId) {
      this.$router.push({
        name: 'book',
        params: {
          bookId: bookId
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
  }
}
</script>
<style lang="scss" scoped>
.reader-time {
  font-size: 13px;
  color: #666;
}
.no-stack {
  padding-top: 10%;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stack-box {
  height: calc(100vh - 160px);
}
.stack-item {
  margin: 5px;
}
.el-scrollbar {
  height: 100%;
  overflow: hidden;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.author {
  padding: 8px 0;
}
</style>
