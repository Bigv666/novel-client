<template>
  <div class="recharge-container container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name: 'user'}">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>充值</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form size="small" label-width="150" label-position="top" align="left">
      <el-form-item label="账户余额" label-position="left" class="color-info">
        <el-icon name="coin" class="color-primary"></el-icon><span class="color-primary">{{money}}</span>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-radio-group v-model="rechargeForm.type">
          <el-radio-button :label="1">支付宝</el-radio-button>
          <el-radio-button :label="2">微信支付</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="充值金额">
        <el-radio-group v-model="rechargeForm.money" class="flex" @change="handleChangeMoney">
          <el-radio-button :label="100">1元(100三无币)</el-radio-button>
          <el-radio-button :label="1000">10元(1000三无币)</el-radio-button>
          <el-radio-button :label="3000">30元(3000三无币)</el-radio-button>
          <el-radio-button :label="5000">50元(5000三无币)</el-radio-button>
          <el-radio-button label="">自定义</el-radio-button>
          <el-input maxlength="6" v-if="rechargeForm.money === ''" v-model="rechargeForm.custom" placeholder="请输入金额" style="width: 180px">
            <template slot="append">元</template>
          </el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="addUserRecharge" style="padding: 8px 30px ;">立即充值</el-button>
      </el-form-item>
      <el-form-item label="">
        <p class="color-info">充值需知</p>
        <ul class="color-info">
          <li>目前支持微信、支付宝两种扫码支付方式的固定金额充值</li>
          <li>付款后，请在“消费记录”查看充值记录，因网络数据传输故障或网络信号延迟可能造成充值延时到账，若长时间未到账，请联系客服</li>
          <li>充值1元人民币可购买100个三无币（1元=100三无币），书豆是用户支付购买VIP章节阅读权限的虚拟货币</li>
          <li>三无币仅限于三无文学网使用，完成充值后也不能再兑换回人民币</li>
          <li>用户确认订阅/购买章节后，将会扣除相应的三无币，扣款成功即表示交易完成且不可撤销</li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./index.js">
export default {

}
</script>
<style lang="scss" scoped>
@import "./index.scss";
.recharge-container {
  padding: 20px;
}
.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
::v-deep .el-radio-button__inner {
  border: 1px solid #dcdfe6;
  border-radius: 4px !important;
}
::v-deep .el-radio-button {
  margin-right: 10px;
}
::v-deep.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: transparent;
  color: #ff933a;
}
ul {
  list-style-type: decimal;
  list-style-position: inside;
}
</style>
