<template>
  <div class="index-container">
    <div class="user_center">
      <!-- 个人信息 -->
      <div class="flex-start nickname" v-if="!editVisible">
        <span>欢迎您，{{nickname}}</span>
        <el-icon name="edit" class="edit-btn" @click.native="handleEditNickname"></el-icon>
      </div>
      <div class="flex-start nickname" v-if="editVisible">
        <el-input placeholder="请输入昵称" maxlength="16" size="mini"
  show-word-limit style="width: 150px" v-model="editForm.nickname"></el-input>
        <el-button type="success" icon="el-icon-check" @click="confirmEditNickname" size="mini" circle></el-button>
        <el-button type="" icon="el-icon-close" size="mini" @click="editVisible=false" circle></el-button>
      </div>
      <!-- 余额 -->
      <div class="money flex-start">
        当前余额：
        <span>
          <el-icon name="coin" class="color-primary"></el-icon>{{money}}
        </span>
        <router-link :to="{name: 'recharge'}" class="link-btn color-primary">充值</router-link>
        <router-link :to="{name: 'consume'}" class="link-btn color-primary">消费明细</router-link>
      </div>
      <!-- 等级 -->
      <!--等级分配 0书童  100书生 1000书虫 10000 书痴 100000书圣 1000000书神 -->
      <div class="grade flex-start" v-if="grade">
          <span style="padding-right: 3px">您当前等级为:</span>
          <el-tag type="primary" size="small" class="m-5">{{grade.grade_name}}</el-tag>
          <template v-if="grade.offset_exp>0">
            <span class="tips">距离您升到下一等级还差:</span>
            <el-tag type="danger" size="small" class="m-5">{{grade.offset_exp}}</el-tag>
            <span class="tips">经验</span>
          </template>
          <template v-else>
            <span class="tips">已升至最高等级</span>
          </template>
          <span class="m-5" @click="gradeDetail">了解等级规则</span>
      </div>
      <el-progress v-if="grade" :percentage="getCurrentProgress" show-text></el-progress>

      <div class="user-wallet">
        <p class="section-title">我的背包</p>
        <div class="wallet-wrapper">
          <div v-if="inventory.length != 0" class="present-wrapper">
            <el-card class="present-item" v-for="item in inventory" :key="item.present_id">
              <div class="flex-col">
                <el-image style="width: 100px; height: 100px" :src="$domain + item.image"></el-image>
                <span class="text-ellipsis present-name">{{item.name}}</span>
                <span class="color-primary fz-14" v-if="item.type === 0">{{item.price}}三无币</span>
                <div v-else>
                  <span class="del-wrapper fz-14"><span class="del">{{item.price}}</span></span>
                  <span class="color-primary fz-14">{{item.active_price}}三无币</span></div>
                <span class="color-info fz-14">{{item.heart_beat}}点粉丝值</span>
                <span class="color-info fz-14">剩余数量:{{item.amount}}</span>
              </div>
            </el-card>
          </div>
          <div class="no-data" v-else>空空如也~~~</div>
        </div>
      </div>
      <el-dialog :visible.sync="gradeVisible">
        <el-table :data="gradeList" size="mini">
          <el-table-column label="等级名称" prop="name"></el-table-column>
          <el-table-column label="开始经验" prop="start_experience"></el-table-column>
          <el-table-column label="结束经验" prop="end_experience"></el-table-column>
        </el-table>
        <span>经验获取途径</span>
        <ul>
          <li>通过签到获得经验值</li>
          <li>通过打赏增加经验值</li>
          <li>通过订阅获取经验值</li>
          <li>通过阅读获取经验值</li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import user from '@/api/user';
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      editVisible: false,
      grade: null,
      editForm: {
        avatar: '',
        nickname: ''
      },
      gradeList: [],
      gradeVisible: false,
      inventory: []
    }
  },
  async created () {
    // if (!this.userInfo) {
    //   await this.$store.dispatch('user/getUserInfo')
    // }
    await Promise.all([
      this.getUserGrade(),
      this.getUserInventory()
    ])
  },
  computed: {
    ...mapGetters(['nickname', 'avatar', 'money', 'imageDomain']),
    getCurrentProgress () {
      if (this.grade.offset_exp < 0) {
        return 100
      } else {
        return ((this.grade.current_exp / this.grade.end_experience) * 100).toFixed(0)
      }
    }
  },
  methods: {
    handleCancel (status) {
      if (status === 0) {
        this.editVisible = false
      }
    },
    async getUserGrade () {
      const result = await this.$api.user.getUserGrade({})
      this.grade = result
    },
    handleEditNickname () {
      this.editForm.nickname = this.nickname
      this.editVisible = true
    },
    async confirmEditNickname () {
      if (!this.editForm.nickname) {
        this.$message.error('昵称不能为空')
        return
      }
      await this.$api.user.editUserInfo({
        nickname: this.editForm.nickname,
        avatar: this.avatar
      })
      await this.$store.dispatch('user/getUserInfo')
      this.editVisible = false
    },
    // 获取等级详情
    async gradeDetail () {
      if (this.gradeList.length !== 0) {
        this.gradeVisible = true
        return false
      }
      const grade = await this.$api.list.getGradeList({})
      this.gradeList = grade.list
      this.gradeVisible = true
    },
    // 获取背包
    async getUserInventory () {
      const result = await this.$api.user.getUserInventory({})
      this.inventory = result.list
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  box-sizing: border-box;
  padding: 20px;
}
.flex {
  display: flex;
}
.nickname {
  font-size: 15px;
  color: #333;
  line-height: 28px;
  height: 28px;
}
.edit-btn {
  margin-left: 5px;
  color: red;
  cursor: pointer;
}
.money {
  font-size: 15px;
  color: #333;
}
.link-btn {
  margin: 0 5px;
}
.grade {
  font-size: 15px;
  color: #333;
  padding: 8px 0;
}
.user-wallet {
  text-align: left;
}
.section-title {
  color: #555;
  font-size: 14px;
}
.wallet-wrapper {
  width: 100%;
  // height: 600px;
}
.no-data {
  font-size: 14px;
  color: #666;
  width: 100%;
  padding-top: 10%;
  text-align: center;
}
.tips {
  padding:0 3px;
}
.present-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.present-item {
  margin: 5px;
  width: 150px;
}
.present-name {
  color: #333;
  font-size: 15px;
}
.fz-14 {
  font-size: 14px;
}
</style>
