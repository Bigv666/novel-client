<template>
  <div class="personal-container container">
    <div class="personal-menu">
        <el-menu style="height: 100%" router :default-active="this.$route.path">
          <el-image class="personal-avatar" :src="$domain+avatar" @click="editAvatar=true"></el-image>
          <el-menu-item index="/user/index">个人中心</el-menu-item>
          <el-menu-item index="/user/stack">我的书架</el-menu-item>
          <el-menu-item index="/user/history">历史阅读</el-menu-item>
          <el-menu-item index="/user/comment">我的评论</el-menu-item>
          <el-menu-item index="/user/message">我的消息</el-menu-item>
          <el-menu-item index="/user/password">修改密码</el-menu-item>
        </el-menu>
      </div>
      <div class="personal-content">
        <router-view></router-view>
      </div>
      <el-dialog :visible.sync="editAvatar" width="550px">
        <avatar-upload v-if="editAvatar" :imageUrl="$domain+avatar" @success="handleUploadSuccess"></avatar-upload>
      </el-dialog>
  </div>
</template>
<script src="./index.js">

</script>
<style lang="scss" scoped>
@import "./index.scss";
.personal-container {
  // height: calc(100% - 150px);
  padding-top: 20px;
}
</style>
