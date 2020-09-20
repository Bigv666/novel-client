<template>
  <div class="book-chapter">
    <!-- 章节目录 -->
    <el-row :gutter="20" type="flex">
      <el-col :span="6" v-for="item in chapterData" :key="item._id" class="chapter-item">
        <el-link v-if="item.type === 1" @click.stop="linkToChapter(item.book_id,item._id)">{{item.title}}<sup class="vip">VIP</sup></el-link>
        <el-link v-else @click.stop="linkToChapter(item.book_id, item._id)">{{item.title}}</el-link>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination :total="count" :current-page="form.page" :page-size="form.size" hide-on-single-page layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"></el-pagination>
    </div>

    <!-- 最新动态 -->
    <el-row>
      <el-col :span="18" class="activity-container" v-if="activityData && activityData.length !== 0">
        <div class="label-title">
          <label for="">最新动态</label>
          <el-link @click.native="handleShowMore('first')">更多</el-link>
        </div>
        <div class="activity-content">
          <div class="avtivity-item" v-for="item in activityData" :key="item._id">
            <div class="activity-info">
              <el-avatar :src="$domain + item.user.avatar">头像</el-avatar>
              <el-link :underline="false" class="fans-name">{{item.user.nickname}}</el-link>
              <el-tag size="mini">{{item.user.grade}}</el-tag>
              <span class="activity-present">{{item.present_name}}</span>
              <span class="activity-num">X{{item.amount}}</span>
            </div>
            <time class="activity-time">{{item.create_time}}</time>
          </div>
        </div>

      </el-col>
      <el-col :span="6" v-if="fanData && fanData.length !== 0">
        <div class="fanRanking">
          <div class="ranking-header">
            <span style="font-size:15px;color:#666;">粉丝榜</span>
            <el-link :underline="false" @click="handleShowMore('second')">更多</el-link>
          </div>
          <div class="avtivity-item" v-for="item in fanData" :key="item._id">
            <div class="activity-info">
              <el-avatar :src="$domain + item.user.avatar">头像</el-avatar>
              <el-link :underline="false" class="fans-name">{{item.user.nickname}}</el-link>
              <el-tag size="mini">{{item.user.grade}}</el-tag>
            </div>
            <time class="activity-time">{{item.heart_beat}}</time>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 礼物 -->
    <el-tabs type="border-card" class="present-wrapper" v-model="activePresentTab">
      <el-tab-pane label="礼物商店" name="first">
        <el-scrollbar>
          <div class="present-list">
            <el-card @click.native="handleChangeActivePresent(item)" class="present-item" v-for="item in presentList" :key="item._id" :class="awardForm.present_id == item._id?'active_item': ''">
              <div class="flex-col">
                <el-image style="width: 100px; height: 100px" :src="$domain + item.image"></el-image>
                <span class="text-ellipsis present-name">{{item.name}}</span>
                <span class="color-primary" v-if="item.type === 0">{{item.price}}三无币</span>
                <div v-else>
                  <span class="del-wrapper"><span class="del">{{item.price}}</span></span>
                  <span class="color-primary">{{item.active_price}}三无币</span></div>
                <span class="color-info">{{item.heart_beat}}点粉丝值</span>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
        <div class="settle-wrapper">
          <div class="user-money">账户余额：<span>{{money}}</span></div>
          <div class="settle-btn" v-if="awardForm.present_id != ''">
            <div class="tips" v-if="getPresentPrice()">账户余额不足, <el-button @click="linToRecharge" style="font-size:14px;" type="text">去充值</el-button>
            </div>
            <el-input-number style="margin: 0 5px" v-model="awardForm.amount" controls-position="right" @change="handleChange" :min="1"  label="描述文字"></el-input-number>
            <el-button type="primary" :disabled="getPresentPrice()" @click="handleConfirmReward">立即赠送</el-button>
            <el-button type="" :disabled="getPresentPrice()" @click="addInventory">购买</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的背包" name="second">
        <el-scrollbar v-if="inventoryData && inventoryData.length != 0">
          <div class="present-list">
            <el-card @click.native="handleChangeInventoryPresent(item)" class="present-item" v-for="item in inventoryData" :key="item.present_id" :class="inventoryForm.present_id == item.present_id?'active_item': ''">
              <div class="flex-col">
                <el-image style="width: 100px; height: 100px" :src="$domain + item.image"></el-image>
                <span class="text-ellipsis present-name">{{item.name}}</span>
                <span class="color-primary" v-if="item.type === 0">{{item.price}}三无币</span>
                <div v-else>
                  <span class="del-wrapper"><span class="del">{{item.price}}</span></span>
                  <span class="color-primary">{{item.active_price}}三无币</span></div>
                <span class="color-info">{{item.heart_beat}}点粉丝值</span>
              </div>
            </el-card>
          </div>
          <div class="settle-wrapper">
            <div class="user-money" v-if="inventoryForm.present_id != '' && getInventoryAmount!=0">剩余数量：<span>{{getInventoryAmount}}</span></div>
            <div class="settle-btn" v-if="inventoryForm.present_id != ''&& getInventoryAmount!=0">
              <div class="tips" v-if="getInventoryAmount < inventoryForm.number">剩余数量不足, <el-button style="font-size:14px;" type="text">去购买</el-button>
              </div>
              <el-input-number style="margin: 0 5px" v-model="inventoryForm.number" controls-position="right" @change="handleChange" :min="1"  label="描述文字"></el-input-number>
              <el-button type="primary" :disabled="getInventoryAmount <inventoryForm.number" @click="editInventory">赠送</el-button>
            </div>
          </div>
        </el-scrollbar>
        <div class="no-present" v-else>
          暂无物品~~~<el-button type="text" @click="activePresentTab='first'">去购买</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 打赏记录弹窗 -->
    <el-dialog :visible.sync="dialogVisible" width="600px" title="打赏记录" class="reward-history" @closed="afterClose">
      <el-tabs v-model="formActiveName" @tab-click="handleChangeFormTab">
        <el-tab-pane name="first" label="打赏记录">
          <div class="avtivity-item" v-for="item in rewardRecord" :key="item._id">
            <div class="activity-info">
              <el-avatar :src="$domain + item.user.avatar">头像</el-avatar>
              <el-link :underline="false" class="fans-name">{{item.user.nickname}}</el-link>
              <el-tag size="mini">{{item.user.grade || '书童'}}</el-tag>
              <span class="activity-present">{{item.present_name}}</span>
              <span class="activity-num">X{{item.amount}}</span>
            </div>
            <time class="activity-time">{{item.create_time}}</time>
          </div>
          <el-pagination size="mini" layout="total, prev, pager, next" style="text-align: center;" :total="rewardRecordForm.total" :current-page="rewardRecordForm.page" :page-size="rewardRecordForm.size" @current-change="handleAwardFormPageChange"></el-pagination>
        </el-tab-pane>
        <el-tab-pane name="second" label="粉丝排行">
          <div class="avtivity-item" v-for="item in fanList" :key="item._id">
            <div class="activity-info">
              <el-avatar :src="$domain + item.user.avatar">头像</el-avatar>
              <el-link :underline="false" class="fans-name">{{item.user.nickname}}</el-link>
              <el-tag size="mini">{{item.user.grade || '书童'}}</el-tag>
            </div>
            <time class="activity-time">{{item.heart_beat}}</time>
          </div>
          <el-pagination size="mini" layout="total, prev, pager, next" style="text-align:center;" :total="fanForm.total" :current-page="fanForm.page" :page-size="fanForm.size" @current-change="handleFanFormPageChange"></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        book_id: '',
        sort: 1,
        page: 1,
        size: 28
      },
      count: 0,
      chapterData: [], // 章节数据
      presentList: [], // 礼物列表
      fanList: [], // 粉丝数据
      rewardRecord: [], // 打赏记录
      fanForm: {
        page: 1,
        size: 10,
        total: 0
      },
      rewardRecordForm: { // 弹窗分页
        page: 1,
        size: 10,
        total: 0
      },
      activityData: [],
      fanData: [],
      formActiveName: 'first', // 更多弹窗
      rewardData: [],
      dialogVisible: false,
      activePresent: '',
      activeInventory: '',
      awardForm: {
        present_id: '',
        number: 1
      },
      inventoryData: [],
      inventoryForm: {
        present_id: '',
        amount: 0,
        number: 1
      },
      activePresentTab: 'first'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'money']),
    getInventoryAmount () {
      let count = 0
      this.inventoryData.map(item => {
        console.log(item, this.inventoryForm.present_id)
        if (item.present_id === this.inventoryForm.present_id) {
          count = item.amount
        }
      })
      return count
    }
  },
  created () {
    this.form.book_id = this.$route.params.id
    this.getData()
    this.getPresentData()
    this.getInventoryData()
    this.getActiveList()
  },
  methods: {
    afterClose () {

    },
    // 更换分页
    handleChangeFormTab () {
      switch (this.formActiveName) {
        case 'first':
          this.getAwardList()
          break
        case 'second':
          this.getFanList()
          break
      }
    },
    // 粉丝排行分页
    handleFanFormPageChange (page) {
      this.fanForm.page = page
      this.getFanList()
    },
    // 更改页数
    handleAwardFormPageChange (page) {
      this.rewardRecordForm.page = page
      this.getAwardList()
    },
    // 展示详情
    handleShowMore (type) {
      this.formActiveName = type
      this.handleChangeFormTab()
      this.dialogVisible = true
    },
    // 获取价格
    getPresentPrice () {
      let result = 0
      this.presentList.map(item => {
        if (item._id === this.awardForm.present_id) {
          if (item.type === 0) {
            // 正常商品
            result = this.awardForm.amount * item.price
          } else if (item.type === 1) {
            result = this.awardForm.amount * item.active_price
          }
        }
      })
      return result > this.money
    },
    // 获取库存
    getInventoryData () {
      this.$api.user.getUserInventory({}).then(res => {
        this.inventoryData = res.list
      })
    },
    // 充值
    linToRecharge () {
      this.$router.push({ path: '/recharge' })
    },
    // 跳转至阅读
    linkToChapter (bookId, chapterId) {
      this.$router.push({ path: '/read', query: { book_id: bookId, chapter_id: chapterId } })
    },
    // 获取章节列表
    getData () {
      this.$api.list.getChapterList(this.form).then(res => {
        this.chapterData = res.list
        this.count = res.count
      })
    },
    // 更换页数
    handleCurrentChange (e) {
      this.form.page = e
      this.getData()
    },
    // 更改标签
    handleChangeTab () {
      if (this.activeName === 'second') {
        this.$router.push({ name: 'bookComment', params: { bookId: this.form.book_id } })
      }
    },
    // 获取礼物列表
    getPresentData () {
      this.$api.list.getPresentList({}).then(res => {
        this.presentList = res.list
      })
    },
    // 选择礼物
    handleChangeActivePresent (item) {
      this.awardForm = {
        present_id: item._id,
        amount: 1
      }
    },
    // 选择背包礼物
    handleChangeInventoryPresent (item) {
      this.inventoryForm = {
        present_id: item.present_id,
        amount: item.amount,
        number: 1
      }
    },
    // 赠送礼物
    async handleConfirmReward () {
      const result = await this.$api.user.insertUserPresent({
        book_id: this.form.book_id,
        present_id: this.awardForm.present_id,
        amount: this.awardForm.amount
      })
      console.log(result)
      if (result) {
        this.$message.success('赠送成功')
        await this.$store.dispatch('user/getUserInfo')
        this.getActiveList()
      }
    },
    // 增加库存
    async addInventory () {
      const result = await this.$api.user.insertUserInventory({
        book_id: this.form.book_id,
        present_id: this.awardForm.present_id,
        amount: this.awardForm.amount
      })
      console.log(result)
      if (result) {
        this.$message.success('购买成功')
        await Promise.all([
          this.$store.dispatch('user/getUserInfo'),
          this.getInventoryData()
        ])
      }
    },
    // 修改库存
    async editInventory () {
      const result = await this.$api.user.editUserInventory({
        book_id: this.form.book_id,
        present_id: this.inventoryForm.present_id,
        amount: this.inventoryForm.number
      })
      console.log(result)
      if (result) {
        this.$message.success('赠送成功')
        await this.getInventoryData()
      }
    },
    // 最新动态
    async getActiveList () {
      const [awardResult, fanResult] = await Promise.all([
        this.$api.list.getAwardList({
          book_id: this.form.book_id,
          page: 1,
          size: 10
        }),
        this.$api.list.getFanList({
          book_id: this.form.book_id,
          page: 1,
          size: 10
        })
      ])
      this.activityData = awardResult.list
      this.fanData = fanResult.list
    },
    // 获取打赏记录
    getAwardList () {
      this.$api.list.getAwardList({
        book_id: this.form.book_id,
        page: this.rewardRecordForm.page,
        size: this.rewardRecordForm.size
      }).then(res => {
        this.rewardRecord = res.list
        this.rewardRecordForm.total = res.count
      })
    },
    // 获取粉丝列表
    getFanList () {
      this.$api.list.getFanList({
        book_id: this.form.book_id,
        page: this.fanForm.page,
        size: this.fanForm.size
      }).then(res => {
        this.fanList = res.list
        this.fanForm.total = res.count
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-space {
  display: flex;
  justify-content: space-between;
  & > div {
    flex: 1;
  }
}
.reward-history {
  ::v-deep .el-dialog__body {
    padding: 10px 20px;
  }
}
.align-center {
  p {
    font-size: 14px;
  }
  text-align: center;
}
.pagination {
  padding: 20px 0;
  text-align: center;
}
.fans-rank {
  flex: 1;
}
.fans-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}
.fans-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}
.fans-info {
  display: flex;
  align-items: center;
}
.fans-name {
  padding: 0 5px;
  max-width: 100px;
  overflow: hidden;
  ::v-deep .el-link--inner {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.present-item.is-active {
  border-color: #ff933a;
}
.present-item {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  padding: 10px 0;
  margin: 5px;
  cursor: pointer;
}
::v-deep .el-carousel__indicator.is-active button {
  width: 25px;
  border-radius: 4px;
  background-color: #ff933a;
}
::v-deep .el-carousel__button {
  background-color: #303133;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.text-ellipsis {
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
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
.activity-container {
  padding-right: 20px;
}
.chapter-item {
  padding: 10px 0;
}
.avtivity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}
.activity-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.activity-present {
  font-size: 14px;
  color: #ff933a;
  // width: 80px;
  padding: 0 30px;
}
.activity-num {
  font-size: 13px;
  color: #f56c6c;
}
.activity-name {
  padding: 0 5px;
}
.activity-time {
  font-size: 13px;
  color: #666;
}
.el-row--flex {
  flex-wrap: wrap;
}
.vip {
  color: #f56c6c;
}
.fz-13 {
  font-size: 13px;
}
.del-wrapper {
  text-decoration: line-through;
  color: rgb(236, 74, 61);
  padding-right: 4px;
}
.del {
  color: #777;
}
.present-list {
  height: 220px;
  padding: 15px 0;
  display: flex;
}
.no-present {
  padding: 15px 0;
  display: flex;
  height: 255px;
  font-size: 14px;
  color: #666;
  justify-content: center;
  align-items: center;
}
.present-item {
  flex-shrink: 0;
}
.present-wrapper {
  margin: 20px 0;
}
.fanRanking {
  border-radius: 4px;
  padding: 5px 15px;
  border: 1px solid #eee;
}
.ranking-header {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.active_item {
  border: 1px solid #ff933a;
}
.tips {
  font-size: 14px;
  color: red;
}
.settle-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
}
.user-money {
  font-size: 14px;
  color: #666;
  span {
    color: #ff933a;
  }
}
.settle-btn {
  display: flex;
  align-items: center;
}
.login-tips {
  width: 100%;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.present-name {
  font-size: 14px;
  color: #333;
}
</style>
