<template>
  <header class="header-wrapper">
    <div class="header-content">
      <div class="nav-wrapper">
        <router-link to="/index">
          <img src="@/assets/logo.png" class="header-logo" />
        </router-link>
        <el-menu :default-active="$route.path" mode="horizontal" class="nav-content" router>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/male">男频</el-menu-item>
          <el-menu-item index="/female">女频</el-menu-item>
          <el-menu-item index="/stock">书库</el-menu-item>
          <el-menu-item index="/rank">排行榜</el-menu-item>
          <el-menu-item>
            <el-input placeholder="请输入作品名/作者/类型" class="search-input"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="login-wrapper">
        <el-button>登录</el-button>
        <el-button type="primary">注册</el-button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
.header-wrapper {
  height: $header-height;
  border-bottom: 1px solid $color-border;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
}
.header-content {
  height: 100%;
  @include web-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.nav-wrapper {
  display: flex;
  align-items: center;
  .nav-content {
    padding-left: 20px;
  }
  ::v-deep {
    .el-menu.el-menu--horizontal {
      border: none;
    }
    .el-menu--horizontal > .el-menu-item {
      height: 30px;
      line-height: 30px;
    }
    .el-menu--horizontal > .el-menu-item:hover {
      color: $color-primary;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      color: $color-primary;
      border-color: transparent;
    }
  }
}
.header-logo {
  width: 120px;
}
.login-wrapper {
  display: flex;
  align-items: center;
  .search-input {
    margin-right: 10px;
  }
}
</style>
