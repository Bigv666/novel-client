<template>
  <footer class="footer-wrapper">
    <div class="footer-content">
      <div class="footer-item-wrapper">
        <div class="footer-item link">
        <h3 class="footer-item-label">友情链接</h3>
        <div class="link-list-wrapper">
            <ul class="link-list">
              <li><a href="">百度</a></li>
              <li><a href="">京东</a></li>
              <li><a href="">淘宝</a></li>
              <li><a href="">掘金</a></li>
            </ul>
            <ul class="link-list">
              <li><a href="">百度</a></li>
              <li><a href="">京东</a></li>
              <li><a href="">淘宝</a></li>
              <li><a href="">掘金</a></li>
            </ul>
            <ul class="link-list">
              <li><a href="">百度</a></li>
              <li><a href="">京东</a></li>
              <li><a href="">淘宝</a></li>
              <li><a href="">掘金</a></li>
            </ul>
            <ul class="link-list">
              <li><a href="">百度</a></li>
              <li><a href="">京东</a></li>
              <li><a href="">淘宝</a></li>
              <li><a href="">掘金</a></li>
            </ul>
             <ul class="link-list">
              <li><a href="">百度</a></li>
              <li><a href="">京东</a></li>
              <li><a href="">淘宝</a></li>
              <li><a href="">掘金</a></li>
            </ul>
        </div>
      </div>
      <div class="footer-item">
        <h3 class="footer-item-label">商务合作</h3>
        <div class="qr-wrapper">
            <img src="@/assets/qr.png" class="qr-img" />
            <p class="qr-content">二维码</p>
        </div>
        <div class="qr-wrapper">
          <img src="@/assets/qr.png" class="qr-img"  />
          <p class="qr-content">二维码</p>
        </div>
      </div>
      </div>
      <p class="footer-tips">Copyright © 2020 不知道是啥 All Rights Reserved</p>
      <p class="footer-tips">请所有作者发布作品时务必遵守国家互联网信息管理办法规定，我们拒绝任何色情小说，一经发现，即作删除！</p>
      <p class="footer-tips">本站所收录小说作品、社区话题、书库评论及本站所做之广告均属于个人行为，与本站立场无关。</p>
    </div>

  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
.footer-wrapper {
  background-color: #f1f1f1;
}
.footer-content {
  @include web-container;
  background-color: #f1f1f1;
}
.footer-item-wrapper {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid $color-border;
}
.footer-item.link {
  width: 700px;
}
.footer-item-label {
  color: $color-primary;
}
.link-list-wrapper {
  display: flex;
  justify-content: space-between;
}
.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.link-list li {
  line-height: 30px;
}
.link-list li a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
}
.link-list li a:hover {
  text-decoration: underline;
}
.qr-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
.qr-wrapper ~ .qr-wrapper {
  margin-left: 10px;
}
.qr-img {
  width: 120px;
}
.qr-content {
  font-size: 14px;
  color: #333333;
  text-align: center;
  line-height: normal;
  margin: 0;
  line-height: 24px;
}
.footer-tips {
  margin: 0;
  font-size: 14px;
  color: #666666;
  text-align: center;
  line-height: 30px;
}
</style>
