<template>
  <div class="stack-container">
    <div class="container">
      <div class="center_top">
        <el-form size="mini" label-width="80px">
          <el-form-item label="作品分类" style="margin-bottom:5px">
            <el-radio-group style="padding-bottom:10px" v-model="form.kind" @change="changeKind">
              <el-radio-button key="" label="">全部</el-radio-button>
              <el-radio-button v-for="item in kindOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="作品类型" style="margin-bottom:5px">
            <el-radio-group v-model="form.type" @change="handleQueryChange">
              <el-radio-button style="padding-bottom:10px" v-for="item in generateType" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="作品字数" style="margin-bottom:5px">
            <el-radio-group style="padding-bottom:10px" v-model="form.words" @change="handleQueryChange">
              <el-radio-button v-for="item in wordsOptions" :key="item.label" :label="item.label">{{ item.value }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="作品状态" style="margin-bottom:5px">
            <el-radio-group style="padding-bottom:10px" v-model="form.status" @change="handleQueryChange">
              <el-radio-button v-for="item in statusOptions" :key="item.label" :label="item.label">{{ item.value }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="更新时间" style="margin-bottom:5px">
            <el-radio-group style="padding-bottom:10px" v-model="form.time" @change="handleQueryChange">
              <el-radio-button v-for="item in timeOptions" :key="item.label" :label="item.label">{{ item.value }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="center_result" v-if="resultData.length !== 0">
        <el-row :gutter="20">
          <el-col :span="6" style="margin:5px 0" v-for="item in resultData" :key="item._id" @click="linkToBook(item._id)">
            <Book :data="item" mode="card"></Book>
          </el-col>
        </el-row>
      </div>
      <div v-else class="color-info no-result">暂无书籍~~~</div>
      <div class="pagination-container">
        <el-pagination :total="count" :current-page="form.page" :page-size="form.size" hide-on-single-page layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index.scss";
.center_top {
  padding: 20px 0;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.result-item {
  cursor: pointer;
}
.item-description {
  color: #666;
  font-size: 14px;
  height: 76px;
  overflow: hidden;
}
.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.mb-5 {
  margin-bottom: 5px;
}
.pl-10 {
  padding-left: 10px;
}
.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
::v-deep .el-radio-button__inner {
  border: 1px solid #dcdfe6;
  border-radius: 4px !important;
}
::v-deep .el-radio-button {
  margin-right: 10px;
}
.no-result {
  padding: 50px 0 50px 0;
  text-align: center;
}
.text-ellipsis {
  ::v-deep .el-link--inner {
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
