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
            <div class="result-item my-card" @click="linkToBook(item._id)">
              <div class="flex">
                <el-image :src="$domain + item.image" style="width: 100px; height: 120px" fit="fill">
                  <div slot="error" class="image-slot">
                    <el-image :src="$domain + 'public/assets/404.jpg'"></el-image>
                  </div>
                </el-image>
                <div class="flex-col pl-10">
                  <el-link class="mb-5 text-ellipsis">{{ item.name }}</el-link>
                  <el-link class="mb-5 text-ellipsis" @click.stop="linkToAuthor(item.author.user_id)">{{ item.author.nickname }}</el-link>
                  <el-tag size="small" class="mb-5">{{ item.type }}</el-tag>
                  <el-tag type="success" size="small" v-if="item.status === 0">连载中</el-tag>
                  <el-tag type="danger" size="small" v-if="item.status === 1">完结</el-tag>
                </div>
              </div>
              <p class="item-description">{{ item.description }}</p>
            </div>
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
</style>
