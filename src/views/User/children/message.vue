<template>
  <div class="personal-message" v-if="messageData.length !== 0">
    <el-scrollbar >
      <div class="message-wrapper">
        <el-card class="message-item" shadow="hover" v-for="item in messageData" :key="item._id" @click.native="handleShowMessage(item)">
          <div class="flex-message">
            <el-tag size="mini" type="primary" v-if="item.type === 0">系统</el-tag>
            <el-tag size="mini" type="warning" v-else-if="item.type === 1">私信</el-tag>
            <el-tag size="mini" type="success" class="message-status" v-if="item.status === 1">已读</el-tag>
            <el-tag size="mini" type="danger" class="message-status" v-else-if="item.status === 0">未读</el-tag>
            <h5 class="message-title">{{item.title}}</h5>
            <time class="message-time">{{item.create_time}}</time>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
    <el-pagination :hide-on-single-page="true"
      :page-size="form.size"
      :current-page="form.page"
      :total="count"
      layout="total, prev, pager, next,jumper"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"></el-pagination>
    <el-dialog :title="editMessage.title" :visible.sync="showMessage" width="500px">
      <div class="message-content">
        {{editMessage.content}}
      </div>
    </el-dialog>
  </div>
  <div class="no-stack" v-else>
    暂无消息~~~
  </div>
</template>
<script>
export default {
  data () {
    return {
      showMessage: false,
      form: {
        page: 1,
        size: 10
      },
      editMessage: {},
      count: 0,
      messageData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取评论
    getData () {
      this.$api.user.getUserMessage(this.form).then((res) => {
        this.messageData = res.list
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
    // 消息详情
    handleShowMessage (data) {
      this.editMessage = data
      if (data.status === 0) {
        data.status = 1
        this.$api.user.editUserMessage({ id: data._id, status: 1 })
      }
      this.showMessage = true
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-message {
  padding: 10px;
}
.message-wrapper {
  flex-shrink: 0;
  flex-grow: 0;
  // height: 100%;
  // height: 200px;
  overflow: auto;
}
.flex-message {
  display: flex;
  align-items: center;
}
.message-item {
  cursor: pointer;
  margin-bottom: 5px;
}
.message-title {
  margin: 0;
  padding: 0;
}
.message-status {
  margin: 0 5px;
}
.message-time {
  font-size: 13px;
  color: #666;
  padding-left: 15px;
}
.message-content {
text-align: left;
}
::v-deep .el-scrollbar {
  height: 100%;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
  // height: 100%;
}
.no-stack {
  padding-top: 10%;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
