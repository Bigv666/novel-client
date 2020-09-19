<template>
  <div id="app">
    <el-scrollbar class="app-scroll">
      <router-view/>
    </el-scrollbar>
     <el-backtop target=".app-scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<style lang="scss">
@import '@/style/common.scss';
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-width: $web-width;
}
.app-scroll {
  height: 100%;
  overflow-x: hidden;
  .el-scrollbar__wrap{overflow-x: hidden;}
}
</style>
