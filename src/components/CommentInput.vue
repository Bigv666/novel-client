<template>
  <div class="input-wrapper">
    <el-input
      type="textarea"
      :placeholder="placeholder"
      autofocus="autofocus"
      v-model="form.content"
      maxlength="150"
      resize="none"
      :rows="5"
      show-word-limit
    ></el-input>
    <div class="reply-footer">
      <el-button type="" plain size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data () {
    return {
      form: {
        content: ''
      }
    }
  },
  methods: {
    // 取消
    handleCancel () {
      this.$emit('cancel')
    },
    // 提交
    handleConfirm () {
      if (!this.form.content) {
        this.$message.error('评论内容不能为空')
        return
      }
      if (this.form.content.length < 3) {
        this.$message.warning('好歹也得写3个字吧。。。')
        return
      }
      this.$emit('confirm', this.form.content)
      this.form.content = ''
    }
  }
}
</script>

<style scoped>

.reply-btn {
  padding-left: 5px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
.comment-reply {
  border-left: 5px solid #eee;
  padding-left: 20px;
}
.reply-footer {
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  text-align: right;
}
</style>
