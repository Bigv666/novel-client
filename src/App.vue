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
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.flex-start {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.flex-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.flex-col-start {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
a {
  text-decoration: none;
}
ul {
  padding: 0;
  list-style-type: none;
}
.color-primary {
  color: #FF933A;
}
.color-success {
  color: #67C23A;
}
.color-danger {
  color: #F56C6C;
}
.color-warning {
  color: #E89820;
}
.color-info {
  color: #909399;
}
.scrollbar-no-x {

    overflow-x: hidden !important;
}
</style>
