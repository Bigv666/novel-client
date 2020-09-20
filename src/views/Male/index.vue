<template>
  <div class="male-container">
    <div class="container">
      <el-row class="ranking-wrapper">
        <el-col :span="10">
          <el-carousel :interval="10000" type="card" height="250px" trigger="click" @change="handleChangeCarousel" :initial-index="0">
            <el-carousel-item v-for="item in rankingData" :key="item.book._id">
              <el-image style="width: 200px; height: 240px" :src="$domain + item.book.image"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <!-- 内容 -->

        <el-col :span="14">
          <template v-for="(item, index) in rankingData">
            <section class="ranking-content" v-if="currentIndex === index" :key="item.book._id">
              <el-col>
                <el-link @click="linkToBook(item.book._id)">{{
                  item.book.name
                }}</el-link>
              </el-col>
              <el-col>
                <el-link @click="linkToAuthor(item.book.user_id)">{{
                  item.book.user.nickname
                }}</el-link>
              </el-col>
              <el-col>
                <p class="ranking-description">
                  {{ item.book.description }}
                </p>
              </el-col>
              <el-col style="text-align:right">
                <el-button size="small" type="primary" @click="linkToBook(item.book._id)">立即阅读</el-button>
              </el-col>
            </section>
          </template>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <Divider>男频推荐</Divider>
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in recommendData" :key="item">
          <Book :data="item.book" mode="pop" style="margin:10px 0"></Book>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10">
        <el-col :span="4" v-for="item in 6" :key="item">
          <Book></Book>
        </el-col>
      </el-row> -->
      <img src="@/assets/ad.jpg" alt="" class="ad-image">
    </div>
    <!-- 新书力荐 -->
    <div class="container">
      <Divider>新书力荐</Divider>
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in newBookData" :key="item">
          <Book mode="border" :data="item.book" style="margin:10px 0" ></Book>
        </el-col>
      </el-row>
    </div>
    <!-- 新人推荐 -->
    <div class="container">
      <Divider>新晋作者</Divider>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in newAuthorData" :key="item">
          <Author :data="item" style="margin:10px 0"></Author>
        </el-col>
      </el-row>
    </div>
    <!-- 最近更新 -->
    <div class="container">
      <Divider>最近更新</Divider>
      <update-table :tableData="updateData"></update-table>
      <img src="@/assets/ad.jpg" alt="" class="ad-image">
    </div>
  </div>
</template>

<script src="./index.js">
export default {

}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
