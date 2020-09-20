<template>
  <div class="reader-container container">
    <!-- 左侧 -->
    <section class="left-wrapper">
      <div class="chapter-wrapper icon-wrapper">
        <i class="iconfont iconchapter" @click="chapterDrawer=true"></i>
      </div>
      <!-- <div class="setting-wrapper icon-wrapper">
        <i class="iconfont iconsetting" @click="settingDrawer=true"></i>
      </div> -->
      <div class="stack-wrapper icon-wrapper">
        <i class="iconfont iconstack" @click="addUserStack"></i>
      </div>
    </section>
    <!-- 右侧 -->
    <section class="right-wrapper">
      <!-- <div class="chapter-wrapper icon-wrapper">
        <i class="iconfont iconticket" @click="ticketDrawer=true"></i>
      </div>
      <div class="setting-wrapper icon-wrapper">
        <i class="iconfont iconpresent" @click="presentDrawer=true"></i>
      </div> -->
      <div class="stack-wrapper icon-wrapper" v-if="chapterData.prev_chapter">
        <i class="iconfont iconprev" @click="changeChapter(chapterData.prev_chapter)"></i>
      </div>
      <div class="stack-wrapper icon-wrapper" v-if="chapterData.next_chapter">
        <i class="iconfont iconnext" @click="changeChapter(chapterData.next_chapter)"></i>
      </div>
    </section>
    <!-- 内容区 -->
    <section class="chapter-wrapper">
      <div class="chapter-box">
        <section>
          <h3 class="chapter-title">{{chapterData.title}}</h3>
          <div class="chapter-content" v-if="chapterData.content">
            <p v-for="(item, index) in chapterData.content.split('\r\n')" :key="index">
              {{item}}
            </p>
          </div>
        </section>
        <!-- 付费购买 -->
        <section v-if="!chapterData.is_subscribe">
          <div class="no-pay">
            <p>该章节为付费购买章节，需购买后才能继续阅读(10三无币)</p>
            <el-button type="primary" size="small" @click="addUserFollow">立即购买</el-button>
          </div>
        </section>
        <div class="chapter-footer">
          <el-button size="small" v-if="chapterData.prev_chapter" @click="changeChapter(chapterData.prev_chapter)">上一章</el-button>
          <el-button size="small" v-if="chapterData.next_chapter" @click="changeChapter(chapterData.next_chapter)">下一章</el-button>
          <el-button size="small" @click="linkToBook">返回作品</el-button>
        </div>
      </div>
    </section>
    <!-- 章节抽屉 -->
    <el-drawer title="章节列表" :visible.sync="chapterDrawer" direction="ltr">
      <el-scrollbar style="height: 100%">
        <ul class="chapter-list" v-infinite-scroll="load" :infinite-scroll-disabled="noMore">
          <li v-for="item in chapterList" :key="item.title" class="chapter-item">
            <div v-if="item.status === 1">
              <el-link :class="item._id==chapter_id?'is-active': ''" @click="changeChapter(item)">{{item.title}}</el-link><sup class="vip">VIP</sup>
            </div>
            <el-link :class="item._id==chapter_id?'is-active': ''" v-else @click="changeChapter(item)">{{item.title}}</el-link>
          </li>
          <p v-if="loading" class="drawer-tips">加载中...</p>
          <p v-if="noMore" class="drawer-tips">没有更多了</p>
        </ul>
      </el-scrollbar>
    </el-drawer>
    <!-- 设置抽屉 -->
    <el-drawer title="阅读设置" :visible.sync="settingDrawer" direction="ltr">
      阅读设置
    </el-drawer>
    <!-- 票抽屉 -->
    <el-drawer title="赠送票据" :visible.sync="ticketDrawer" direction="rtl">
      <section class="align-center">
        <div>
          <!-- <img src="../../assets/month.png" style="width: 60px; height: 60px;"> -->
        </div>
        <el-input-number v-model="monthNum" :step="1" size="mini" controls-position="right" :min="1" :max="ticket.month" step-strictly></el-input-number>
        <p>{{monthNum*100}}点粉丝值</p>
        <div slot="footer" class="dialog-footer">
          <span class="color-info" style="padding-right: 20px">可用月票数：{{ticket.month}}</span>
          <el-button type="primary" size="small" :disabled="ticket.month<monthNum">立即投票</el-button>
        </div>
      </section>
      <!-- 推荐票 -->
      <section style="padding-top: 20px;">
        <div class="align-center">
          <div>
            <!-- <img src="../../assets/recommend.png" style="width: 60px; height: 60px;"> -->
          </div>
          <el-input-number v-model="recommendNum" :step="1" size="mini" controls-position="right" :min="1" :max="ticket.recommend" step-strictly></el-input-number>
          <p>{{recommendNum*10}}点粉丝值</p>
          <div slot="footer" class="dialog-footer">
            <span class="color-info" style="padding-right: 20px">可用推荐票数：{{ticket.recommend}}</span>
            <el-button type="primary" size="small" :disabled="ticket.recommend<recommendNum">立即投票</el-button>
          </div>
        </div>
      </section>
    </el-drawer>
    <!-- 礼物抽屉 -->
    <!-- 设置抽屉 -->
    <el-drawer title="打赏礼物" :visible.sync="presentDrawer" direction="rtl">
      打赏礼物
    </el-drawer>
  </div>
</template>
<script src="./index.js">
</script>
<style lang="scss" scoped>
@import "./index.scss";
.chapter-content {
  text-align: left;
}
.align-center {
  text-align: center;
}
.left-wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-590px);
  .iconfont {
    font-size: 28px;
    color: #666;
    cursor: pointer;
  }
}
.right-wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(560px);
  .iconfont {
    font-size: 26px;
    color: #666;
    cursor: pointer;
  }
}
.icon-wrapper {
  margin: 5px 0;
}
.chapter-box {
  background-color: #f5f5dc;
  color: #494c49;
  padding: 20px;
}
.chapter-title {
  margin: 0;
  padding: 20px 0;
}
.chapter-content {
  text-indent: 2em;
}
// .chapter-list {
//   height: 100%;
//   overflow-y: auto;
//   margin: 0;
// }
::v-deep .el-drawer__body {
  padding: 20px;
  box-sizing: border-box;
  // overflow: auto;
  // flex: none;
  // overflow: auto;
  height: 0;
}
.chapter-item {
  text-align: left;
  padding: 5px 15px;
}
.drawer-tips {
  font-size: 13px;
  text-align: center;
  color: #666;
}
.no-pay {
  padding: 20px 0;
}
.vip {
  color: #ff933a;
  font-size: 12px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.is-active {
  color: #ff933a;
}
</style>
