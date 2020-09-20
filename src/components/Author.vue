<template>
  <div class="author-wrapper">
    <div class="author-left">
      <span class="author-grade">书仙</span>
      <el-avatar class="author-avatar" :src="$domain + data.avatar"></el-avatar>
      <p class="author-point">5500+</p>
    </div>
    <div class="author-right">
      <div class="author-honor">
        <h3 class="author-name">{{data.nickname}}</h3>
        <div class="author-info">
          <div class="info-item">
            <span>加入时间</span>
            <span>{{data.work.create_time.substring(0,11)}}</span>
          </div>
          <div class="info-item">
            <span>代表作</span>
            <span>《{{data.work.book_name}}》</span>
          </div>
          <div class="honor-list">
            <div class="honor-item">
              <el-image></el-image>
              <span>{{data.first}}</span>
            </div>
            <div class="honor-item">
              <el-image></el-image>
              <span>{{data.second}}</span>
            </div>
            <div class="honor-item">
              <el-image></el-image>
              <span>{{data.third}}</span>
            </div>
            <div class="honor-item">
              <el-image></el-image>
              <span>{{data.top_ten}}</span>
            </div>
            <div class="honor-item">
              <el-image></el-image>
              <span>{{data.top_thirty}}</span>
            </div>
          </div>
        </div>
      </div>
      <h3 class="author-name">{{data.nickname}}</h3>
      <p class="author-desc">这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的废话</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
@import "@/style/common.scss";
.author-wrapper {
  border: 1px solid $color-border;
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px 0 #e6e6e6;
    .author-honor {
      width: 100%;

    }
  }
}
.author-left {
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  background-color: #12c2e9;
  flex-basis: 30%;
  align-items: center;
  position: relative;
}
.author-grade {
  display: block;
  width: 80px;
  text-align: center;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: #f2f2f2;
  border-radius: 20px;
  font-size: 12px;
}
.author-avatar {
  margin: 20px 0;
}
.author-point {
  color: #fff;
  margin: 0;
  font-size: 14px;
}
.author-right {
  flex: 1;
  position: relative;
}
.author-honor {
  position: absolute;
  overflow: hidden;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #12c2e9;
  padding: 0 0px;
  transition: all 0.3s ease;
  .author-name {
    color: #fff;
  }
}
.author-info {
  width: 240px;
  padding: 0 20px;
}
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 14px;
}
.honor-list {
  display: flex;
}
.honor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.honor-item span {
  font-size: 12px;
  color:#333;
}
.author-name {
  text-align: center;
  width: 240px;
}
.author-desc {
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
</style>
