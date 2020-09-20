<template>
  <div class="ranks-container container">
    <div class="box">
        <el-tabs tab-position="left"  class="rank-menu" v-model="activeTab" @tab-click="handleChangeMenu">
          <el-tab-pane label="男频点击榜" name="1"></el-tab-pane>
          <el-tab-pane label="女频点击榜" name="2"></el-tab-pane>
          <el-tab-pane label="男频收藏榜" name="3"></el-tab-pane>
          <el-tab-pane label="女频收藏榜" name="4"></el-tab-pane>
          <el-tab-pane label="男频订阅榜" name="5"></el-tab-pane>
          <el-tab-pane label="女频订阅榜" name="6"></el-tab-pane>
          <el-tab-pane label="男频推荐榜" name="7"></el-tab-pane>
          <el-tab-pane label="女频推荐榜" name="8"></el-tab-pane>
          <el-tab-pane label="男频打赏榜" name="9"></el-tab-pane>
          <el-tab-pane label="女频打赏榜" name="10"></el-tab-pane>
          <!-- <el-tab-pane label="男频热搜榜" name="11"></el-tab-pane> -->
          <!-- <el-tab-pane label="女频热搜榜" name="12"></el-tab-pane> -->
          <el-tab-pane label="男频新书榜" name="13"></el-tab-pane>
          <el-tab-pane label="女频新书榜" name="14"></el-tab-pane>
          <el-tab-pane label="男频完结榜" name="15"></el-tab-pane>
          <el-tab-pane label="女频完结榜" name="16"></el-tab-pane>
        </el-tabs>
        <div class="rank-list">
          <div class="rank-mode">
            <el-radio-group size="small" v-model="rankForm.mode" @change="handleChangeType">
              <el-radio-button label="week">周</el-radio-button>
              <el-radio-button label="month">月</el-radio-button>
            </el-radio-group>
            <p class="rank-tips" @click="rankRule=true"><el-icon name="question"></el-icon>榜单规则</p>
          </div>
          <div class="list-container" v-if="bookData.length >0">
              <el-card v-for="item in bookData" :key="item._id" shadow="hover" class="list-item">
                <div class="flex">
                  <div class="item-image ">
                    <el-image :src="$domain + item.book.image" style="width: 150px; height: 180px" fit="fill"></el-image>
                    <i class="iconfont iconranking color-primary"></i>
                    <span class="item-rank">{{item.rank}}</span>
                  </div>
                  <div class="item-info flex-col">
                    <div class="flex">
                      <el-link @click="linkToBook(item.book._id)">{{item.book.name}}</el-link>
                      <strong class="color-primary item-score">{{item.score}}</strong>
                    </div>
                    <el-link class="mb-5" @click.stop="linkToAuthor(item.book.author.user_id)">{{item.book.author.nickname}}</el-link>
                    <div class="flex-start">
                      <el-tag size="small" class="item-type">{{item.book.type}}</el-tag>
                      <el-tag type="success" v-if="item.book.status === 0" size="small">连载中</el-tag>
                      <el-tag type="danger" v-if="item.book.status === 1" size="small">完结</el-tag>
                    </div>
                    <p class="item-description color-info">{{item.book.description}}</p>
                    <el-button type="primary" size="small" @click="linkToBook(item.book._id)">立即阅读</el-button>
                  </div>
                </div>
              </el-card>
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="10"
                :current-page="rankForm.page"
                :hide-on-single-page="true"
                layout="prev, pager, next"
                class="pagenation-wrapper"
                :total="count">
              </el-pagination>
          </div>
          <div class="list-container" v-else>
            <div class="no-data">暂时没有数据~~~</div>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="rankRule" width="650px">
        <div class="rule-flex"><span class="rule-label">更新时间:</span><span>榜单每三分钟更新一次</span></div>
        <div class="rule-flex"><span class="rule-label">积分总和:</span><span>阅读数*10%+搜索数*10%+打赏数*10%+收藏数*20%+订阅数*20%+推荐数*30%</span></div>
        <div class="rule-flex"><span class="rule-label">点击周榜:</span><span>本周内作品的阅读数排行</span></div>
        <div class="rule-flex"><span class="rule-label">点击月榜:</span><span>本月内作品的阅读数排行</span></div>
        <div class="rule-flex"><span class="rule-label">收藏周榜:</span><span>本周内作品的收藏数排行</span></div>
        <div class="rule-flex"><span class="rule-label">收藏月榜:</span><span>本月内作品的收藏数排行</span></div>
        <div class="rule-flex"><span class="rule-label">订阅周榜:</span><span>本周内作品的订阅数排行</span></div>
        <div class="rule-flex"><span class="rule-label">订阅月榜:</span><span>本月内作品的订阅数排行</span></div>
        <div class="rule-flex"><span class="rule-label">推荐周榜:</span><span>本周内作品的推荐数排行</span></div>
        <div class="rule-flex"><span class="rule-label">推荐月榜:</span><span>本月内作品的推荐数排行</span></div>
        <div class="rule-flex"><span class="rule-label">打赏周榜:</span><span>本周内作品的打赏数排行</span></div>
        <div class="rule-flex"><span class="rule-label">打赏月榜:</span><span>本月内作品的打赏数排行</span></div>
        <div class="rule-flex"><span class="rule-label">新书周榜:</span><span>发布时间小于三个月，本周积分排行</span></div>
        <div class="rule-flex"><span class="rule-label">新书月榜:</span><span>发布时间小于三个月，本月积分排行</span></div>
        <div class="rule-flex"><span class="rule-label">完结周榜:</span><span>完结时间小于三个月，本周积分排行</span></div>
        <div class="rule-flex"><span class="rule-label">完结月榜:</span><span>完结时间小于三个月，本月积分排行</span></div>
      </el-dialog>
  </div>
</template>

<script src="./index.js">
export default {}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
