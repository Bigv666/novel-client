<template>
  <div class="book-container container">
    <el-row :gutter="20">
      <!-- 封面 -->
      <el-col :span="5">
        <el-image class="book-img" :src="$domain + bookData.image" fit="fill"></el-image>
      </el-col>
      <!-- 详情 -->
      <el-col :span="15" class="book-detail">
        <div class="book-author flex-start">
          <span class="book-name">{{bookData.name}}</span>
          <el-link v-if="bookData.author" @click="linkToAuthor(bookData.author.user_id)">{{bookData.author.nickname}}</el-link>
        </div>
        <div style="padding-top:8px">
          <el-tag size="small">{{bookData.type}}</el-tag>
          <el-tag type="success" size="small" style="margin-left: 10px;" v-if="bookData.status === 0">连载中</el-tag>
          <el-tag type="danger" size="small" style="margin-left: 10px;" v-else>完结</el-tag>
          <span class="color-info" style="margin-left: 10px;">{{bookData.words | filterWords}}</span>
          <span class="color-info fz-13" style="margin-left: 10px;">发布时间：<time>{{bookData.create_time}}</time></span>
        </div>
        <el-row class="book-data" v-if="bookData.book_data">
          <el-col :span="2">
            <el-tooltip content="榜单第一">
              <div class="honor-content">
                <i class="el-icon-trophy first"></i>
                <span class="color-warning">{{bookData.honor?bookData.honor.first:0}}</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="2">
            <el-tooltip content="榜单第二">
              <div class="honor-content">
                <i class="el-icon-trophy second"></i>
                <span class="color-warning">{{bookData.honor?bookData.honor.second:0}}</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="2">
            <el-tooltip content="榜单第三">
              <div class="honor-content">
                <i class="el-icon-trophy third"></i>
                <span class="color-warning">{{bookData.honor?bookData.honor.third:0}}</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="2">
            <el-tooltip content="榜单前十">
              <div class="honor-content">
                <i class="el-icon-trophy then"></i>
                <span class="color-warning">{{bookData.honor?bookData.honor.top_ten:0}}</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="2">
            <el-tooltip content="榜单前三十">
              <div class="honor-content">
                <i class="el-icon-trophy final"></i>
                <span class="color-warning">{{bookData.honor?bookData.honor.top_thirty:0}}</span>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="3" class="data-item">
            <p>阅读数</p>
            <p>{{bookData.book_data.read}}</p>
          </el-col>
          <el-col :span="3" class="data-item">
            <p>收藏数</p>
            <p>{{bookData.book_data.collect}}</p>
          </el-col>
          <el-col :span="3" class="data-item">
            <p>搜索数</p>
            <p>{{bookData.book_data.search}}</p>
          </el-col>
          <el-col :span="3" class="data-item">
            <p>推荐数</p>
            <p>{{bookData.book_data.recommend}}</p>
          </el-col>
        </el-row>
        <div class="btn">
          <el-button type="primary" style="width: 150px;" @click="startReader(bookData.userHistory.chapterId)" v-if="bookData.userHistory">继续阅读</el-button>
          <el-button type="primary" style="width: 150px;" @click="startReader(bookData.firstChapter.chapterId)" v-else>开始阅读</el-button>
          <el-button style="width: 150px;" @click="addUserStack">加入书架</el-button>
        </div>
      </el-col>
      <!-- 评分 -->
      <el-col :span="4" class="book-score">
        <p class="color-primary score-content">7.5</p>
        <span class="color-info">1500人评价</span>
        <el-rate v-model="userScore" :allow-half="true" :disabled="userScore !== ''"></el-rate>
      </el-col>
    </el-row>
    <!-- 详情 -->
    <el-row>
      <el-col :span="24">
        <p class="color-info book-description">
          {{bookData.description}}
        </p>
      </el-col>
    </el-row>
    <!-- 最新章节 -->
    <el-row>
      <el-col>
        <div class="label-title">
          <label for="">最新章节</label>
          <time class="color-primary">{{newChapter.create_time}}</time>
        </div>
        <div class="new-chapter">
          <el-link @click="startReader(newChapter.chapter_id)">{{newChapter.chapter_title}}</el-link>
          <p class="color-info">{{newChapter.chapter_content}}</p>
        </div>
      </el-col>
    </el-row>
    <!-- 目录，评论 -->
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="目录" name="first">
        <chapter></chapter>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">
        <wm-comment></wm-comment>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src='./index.js'>
</script>

<style lang="scss" scoped>
.book-container {
  text-align: left;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #dcdfe6;
}
.book-img {
  width: 200px;
  height: 240px;
}
.book-name {
  padding-right: 15px;
  font-size: 24px;
}
.book-score {
  text-align: right;
}
.score-content {
  font-size: 42px;
  margin: 0;
}
.book-data {
  margin-top: 45px;
  padding: 15px 0;
  display: flex;
  align-items: center;
}
.honor-container {
  display: flex;
}
.honor-content {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.fz-13 {
  font-size: 13px;
}
.data-item {
  font-size: 13px;
  color: #666;
  text-align: center;
}
.book-description {
  font-size: 14px;
}
.label-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  label {
    border-left: 3px solid #ff933a;
    padding-left: 5px;
  }
}
</style>
