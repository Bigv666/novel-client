<template>
  <div class="consume-container container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name: 'user'}">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>消费记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订阅记录" name="first">
        <el-table :data="orderData">
          <el-table-column label="订阅书籍" prop="book_name"></el-table-column>
          <el-table-column label="订阅章节" prop="chapter_name"></el-table-column>
          <el-table-column label="支付方式" prop="type">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 0">余额</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额" prop="money"></el-table-column>
          <el-table-column label="订阅时间" prop="create_time"></el-table-column>
        </el-table>
        <el-pagination hide-on-single-page :page-size="orderForm.size" :total="orderForm.total" background layout="prev, pager, next" @current-change="handleChangeFollow"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="打赏记录" name="second">
        <el-table :data="rewardData">
          <el-table-column label="打赏书籍" prop="book_name"></el-table-column>
          <el-table-column label="打赏礼物" prop="present_name"></el-table-column>
          <el-table-column label="打赏数量" prop="amount"></el-table-column>
          <el-table-column label="消费金额" prop="money"></el-table-column>
          <el-table-column label="打赏时间" prop="create_time"></el-table-column>
        </el-table>
        <el-pagination hide-on-single-page :current-page="rewardForm.page" :page-size="rewardForm.size" :total="rewardForm.total" background layout="total, prev, pager, next, jumper" @current-change="handleChangeReward"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="third">
        <el-table :data="rechargeData">
          <el-table-column label="充值金额" prop="money">
          </el-table-column>
          <el-table-column label="充值方式" prop="type">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 1">支付宝</div>
              <div v-if="scope.row.type === 2">微信</div>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" prop="status">
            <template slot-scope="scope">
              <el-tag type="info" size="small" v-if="scope.row.status === 0">等待中</el-tag>
              <el-tag type="success" size="small" v-if="scope.row.status === 1">成功</el-tag>
              <el-tag type="danger" size="small" v-if="scope.row.status === 2">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="充值时间" prop="create_time"></el-table-column>
        </el-table>
        <el-pagination hide-on-single-page :current-page="rechargeForm.page" :page-size="rechargeForm.size" :total="rechargeForm.total" background layout="prev, pager, next" @current-change="handleChangeRecharge"></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js">
export default {}
</script>
<style lang="scss" scoped>
@import "./index.scss";
.el-pagination {
  padding-top: 20px;
}
.consume-container {
  padding: 20px;
}
</style>
