<template>
  <div class="search-container container">
    <p class="keywords">
      搜索词：<span class="color-primary">{{ form.keywords }}</span>
    </p>
    <div class="center_result" v-if="resultData.length !== 0">
      <el-row :gutter="20">
          <el-col :span="6" style="margin:5px 0" v-for="item in resultData" :key="item._id" @click="linkToBook(item._id)">
            <Book :data="item" mode="card"></Book>
          </el-col>
        </el-row>
    </div>
    <div v-else class="color-info no-result">
      搜索结果为空，换个关键词试试~~~
    </div>
    <div class="pagination-container">
      <el-pagination :total="count" :current-page="form.page" :page-size="form.size" hide-on-single-page layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index.scss";
.text-ellipsis {
  ::v-deep .el-link--inner {
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.my-card {
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.my-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.pagination-container {
  padding: 20px 0;
}
</style>
