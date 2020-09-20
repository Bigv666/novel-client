<template>
  <div class="personal-password">
    <el-form
      label-width="80px"
      align="left"
      size="small"
      :rules="rules"
      ref="editForm"
      :model="editForm"
    >
      <el-form-item label="原始密码" prop="oldPassword">
        <el-input
          style="width: 180px;"
          maxlength="16"
          placeholder="请输入原始密码"
          type="password"
          v-model="editForm.oldPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          style="width: 180px;"
          maxlength="16"
          placeholder="请输入新密码"
          v-model="editForm.newPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          style="width: 180px;"
          maxlength="16"
          placeholder="请再次输入新密码"
          v-model="editForm.confirmPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="confirm('editForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    // 验证密码
    const validatePassword = (rule, value, callback) => {
      const pattern = /^[\w._-]{6,16}$/
      if (!pattern.test(value)) {
        callback(new Error('请输入6到16位字母或数字组成的密码'))
      } else {
        callback()
      }
    }
    // 验证再次密码
    const validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      editForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交修改
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.user.editUserPassword(this.editForm).then(async (res) => {
            if (res) {
              this.$message.success('修改密码成功, 请重新登录')
              await this.$store.dispatch('user/logout')
              this.$nextTick(() => {
                this.$router.push('/')
              })
            }
          })
        } else {
          this.$message.error('请认真填写内容')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-password {
  padding: 20px;
}
</style>
