<template>
  <div class="index-wrapper">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" :height="bannerHeight + 'px'" trigger="click">
      <el-carousel-item v-for="item in slideList" :key="item._id">
          <el-image :src="$domain+item.image" class="swiper-item" fit="fill"></el-image>
        </el-carousel-item>
    </el-carousel>
    <!-- 主编推荐 -->
    <div class="container">
      <Divider>主编推荐</Divider>
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in recommendData" :key="item">
          <Book :data="item.book"></Book>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10">
        <el-col :span="4" v-for="item in 6" :key="item">
          <Book></Book>
        </el-col>
      </el-row> -->
      <img src="@/assets/ad.jpg" alt="" class="ad-image">
    </div>
    <!-- 七日推荐 -->
    <div class="container">
      <Divider>七日强推</Divider>
    </div>
    <div class="seven-wrapper">
      <div class="container">
        <div class="seven-swiper">
          <el-carousel ref="mySwiper" indicator-position="outside" :interval="5000" trigger="click" type="card" height="450px">
          <!-- slides -->
          <el-carousel-item v-for="item in rankingData" :key="item.book._id">
            <el-card class="ranking-item">
              <div @click="linkToBook(item.book._id)">
                <h3 class="ranking-date">{{format(item.create_time, 'day')}}</h3>
                <h4>{{format(item.create_time, 'month')}}</h4>
                <div>
                  <el-link @click="linkToBook(item.book._id)">{{item.book.name}}</el-link>
                </div>
                <div>
                  <el-link @click.stop="linkToAuthor(item.book.user.user_id)">{{item.book.user.nickname}}</el-link>
                </div>
                <p class="ranking-description">{{item.book.description}}</p>
                <el-image :src="$domain + item.book.image" style="width: 150px;height: 180px" fit="fill"></el-image>
              </div>
            </el-card>
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
    </div>
    <!-- 新书力荐 -->
    <div class="container">
      <Divider>新书力荐</Divider>
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in newData" :key="item">
          <Book mode="border" :data="item.book" style="margin:10px 0" ></Book>
        </el-col>
      </el-row>
    </div>
    <!-- 大神推荐 -->
    <div class="container">
      <Divider>大神推荐</Divider>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in authorData" :key="item">
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

<style lang="scss">
@import './index.scss'
</style>
