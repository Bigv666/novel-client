<template>
  <div class="author-container container">
    <div class="info-wrapper" >
          <el-avatar :size="70" :src="$domain + authorInfo.avatar">头像</el-avatar>
          <div>
            <el-link>{{authorInfo.nickname}}</el-link>
          </div>
          <p class="color-info">加入于 {{authorInfo.create_time}}</p>
          <!-- <span class="color-info">累计码字 {{authorInfo.words}}</span> -->
          <div class="honor-container">
            <el-tooltip content="榜单第一">
              <div class="honor-content">
                <i class="el-icon-trophy first"></i>
                <span>{{authorInfo.honor.first?authorInfo.honor.first: 0}}</span>
              </div>
            </el-tooltip>
            <el-tooltip content="榜单第二">
              <div class="honor-content">
                <i class="el-icon-trophy second"></i>
                <span>{{authorInfo.honor.second?authorInfo.honor.second: 0}}</span>
              </div>
            </el-tooltip>
            <el-tooltip content="榜单第三">
              <div class="honor-content">
                <i class="el-icon-trophy third"></i>
                <span>{{authorInfo.honor.third?authorInfo.honor.third: 0}}</span>
              </div>
            </el-tooltip>
            <el-tooltip content="榜单前十">
              <div class="honor-content">
                <i class="el-icon-trophy then"></i>
                <span>{{authorInfo.honor.top_ten?authorInfo.honor.top_ten: 0}}</span>
              </div>
            </el-tooltip>
            <el-tooltip content="榜单前三十">
              <div class="honor-content">
                <i class="el-icon-trophy final"></i>
                <span>{{authorInfo.honor.top_thirty?authorInfo.honor.top_thirty: 0}}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
    <el-divider>
      Ta的作品
    </el-divider>
    <div class="list-container">
      <el-row :gutter="20">
        <el-col :span="12" v-for="item in authorInfo.works" :key="item._id">
          <el-card shadow="hover" class="list-item">
            <div class="flex">
              <el-image :src="$domain + item.image" style="width: 150px; height: 180px" fit="fill"></el-image>
              <div class="item-info flex-col">
                <el-link @click="linkToBook(item._id)">{{item.name}}</el-link>
                <div class="flex-start">
                  <el-tag size="small" class="item-type">{{item.type}}</el-tag>
                  <el-tag type="success" v-if="item.status === 0" size="small">连载中</el-tag>
                  <el-tag type="danger" v-if="item.status === 1" size="small">完结</el-tag>
                </div>
                <p class="item-description color-info">{{item.description}}</p>
                <div style="text-align: right">
                  <el-button type="primary" size="small" @click="linkToBook(item._id)">立即阅读</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script src="./index.js">
export default {}
</script>
<style lang="scss" scoped>
.author-container {
  text-align: center;
}
.author-info {
  text-align: center;
}
.list-item {
  margin-top: 10px;
}
.item-info {
  flex: 1;
  padding-left: 20px;
  height: 180px;
  text-align: left;
}
.item-type {
  margin-right: 5px;
}
.info-wrapper {
  padding: 20px 0;
}
.item-description {
  font-size: 14px;
  margin: 0;
  height: 7em;
  margin: 5px 0;
  overflow: hidden;
  text-align: left;
}
.mb-5 {
  margin-bottom: 5px;
}
.honor-container {
  display: flex;
  justify-content: center;
}
.honor-content {
  display: flex;
  flex-direction: column;
  i {
    font-size: 35px;
  }
}
.first {
  color: rgb(240, 187, 72);
}
.second {
  color: rgb(223, 223, 205);
}
.third {
  color: rgb(167, 101, 61);
}
.then {
  color: rgb(105, 106, 107);
}
.final {
  color: rgb(82, 46, 75);
}
</style>
