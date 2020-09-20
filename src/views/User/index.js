
import avatarUpload from '@/components/avatar-upload.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    avatarUpload
  },
  computed: {
    ...mapGetters(['avatar', 'nickname', 'imageDomain'])
  },
  data () {
    return {
      editForm: {
        avatar: '',
        nickname: ''
      },
      editAvatar: false
    }
  },
  mounted () {
  },
  methods: {
    // 上传成功
    async handleUploadSuccess (url) {
      console.log(url)
      this.editForm.avatar = url
      await this.$api.user.editUserInfo({
        avatar: this.editForm.avatar,
        nickname: this.nickname
      })
      await this.$store.dispatch('user/getUserInfo')
      this.editAvatar = false
    }
  }
}
