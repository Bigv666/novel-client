<template>
  <div class="personal-stack">
    <div class="user_stack">
      <div class="book_box" v-if="historyData.length !== 0">
        <el-row :gutter="0" class="stack-box">
          <el-scrollbar>
            <el-col :span="8" v-for="item in historyData" :key="item._id">
              <el-card class="stack-item" shadow="hover">
                <el-image style="width: 150px;height: 180px" :src="$domain + item.book_image"></el-image>
                <div>
                  <el-link class="reader-name" @click="linkToBook(item.book_id)">{{item.book_name}}</el-link>
                  <div class="section-space">
                    <el-link @click="linkToAuthor(item.author.user_id)">{{item.author.nickname}}</el-link>
                  </div>
                  <div class="reader-chapter section-space">阅读至 {{item.chapter_name}}</div>
                  <time class="reader-time">阅读时间 {{item.create_time}}</time>
                  <el-button type="primary" size="small" @click="linkToReader(item.book_id, item.chapter_id)">继续阅读</el-button>
                </div>
              </el-card>
            </el-col>
          </el-scrollbar>
        </el-row>
      </div>
      <div class="no-stack" v-else>
        暂无记录~~~<el-link class="color-primary">去阅读</el-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      historyData: []
    }
  },
  created () {
    this.$api.user.getUserReadRecord().then(res => {
      this.historyData = res.list
    })
  },
  methods: {
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
    // 跳转至阅读
    linkToReader (bookId, chapterId) {
      this.$router.push({
        path: '/reader',
        query: { book_id: bookId, chapter_id: chapterId }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reader-name {
  ::v-deep .el-link--inner {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
}
.reader-chapter {
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
.user_stack {
  box-sizing: border-box;
}
.stack-box {
  height: calc(100vh - 160px);
  box-sizing: border-box;
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
.section-space {
  padding: 4px 0;
}
</style>
