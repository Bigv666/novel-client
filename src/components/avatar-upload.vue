<template>
  <div class="container">
    <div class="flex-upload" v-if="option.img">
      <div style="width:240px;height:240px; margin-right:15px">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :fixedBox="option.fixedBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :centerBox="option.centerBox"
          :high="option.high"
          :infoTrue="option.infoTrue"
          :enlarge="option.enlarge"
          @realTime="realTime"
          @imgLoad="imgLoad"
          @cropMoving="cropMoving"
        ></vueCropper>
      </div>
      <div class="preview-square" :style="previewSquare">
        <img :src="previews.url" class="" :style="previews.img" />
        预览
      </div>
      <div class="preview-circle" :style="previewCircle">
        <img :src="previews.url" class="" :style="previews.img" />
        预览
      </div>
      <div class="footer-flex">
        <div class="operation-wrapper">
          <el-icon name="zoom-in" class="operation-icon" @click.native="changeScale(1)"></el-icon>
          <el-icon name="zoom-out" class="operation-icon" @click.native="changeScale(-1)"></el-icon>
          <el-icon name="refresh-left" class="operation-icon" @click.native="rotateLeft"></el-icon>
          <el-icon name="refresh-right" class="operation-icon" @click.native="rotateRight"></el-icon>
          <el-icon name="refresh" class="operation-icon" @click.native="refreshCrop"></el-icon>
        </div>
        <div class="btn-wrapper">
          <el-button @click="clearImg">重新选择</el-button>
          <el-button type="primary" @click="confirmUpload">提交</el-button>
        </div>
      </div>
    </div>
    <el-upload
      v-else
      class="upload-demo"
      :auto-upload="true"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      :show-file-list="false"
      :on-change="changeUpload"
      :multiple="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { service } from '@/utils/request'
import { UserApi } from '@/config/api'
export default {
  name: 'avatarUpload',
  components: { VueCropper },
  props: ['imageUrl'],
  data () {
    return {
      // https://github.com/xyxiao001/vue-cropper/
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        full: false, // 输出原图比例截图 props名full
        autoCrop: true, //    是否默认生成截图框
        outputType: 'jpeg || png || webp', // 裁剪生成图片的格式
        canMove: true, // 上传图片是否可以移动
        canMoveBox: false, // 截图框能否拖动
        fixedBox: true, // 固定截图框大小 不允许改变
        original: false, // 上传图片按照原始比例渲染
        autoCropWidth: '120', // 默认生成截图框宽度
        autoCropHeight: '120', // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        enlarge: 1, // 图片根据截图框输出比例倍数
        maxImgSize: 2000 // 限制图片最大宽度和高度
      },
      previewSquare: {},
      previewCircle: {},
      previews: {},
      fileList: []
    }
  },
  created () {
    this.option.img = this.imageUrl
  },
  methods: {
    refreshCrop () {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 实时预览函数
    realTime (data) {
      var previews = data
      this.previewSquare = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        zoom: 100 / previews.h
      }
      this.previewCircle = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        zoom: 100 / previews.h
      }
      console.log(data)
      this.previews = data
    },
    confirmUpload (type) {
      // 输出
      this.$refs.cropper.getCropBlob(data => {
        const fileName = Date.now() + '.jpg'
        const file = new File([data], fileName)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', 'avatar')
        service.post(UserApi.UPLOAD_AVATAR, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
          this.$emit('success', res.data.url)
        })
      })
    },
    imgLoad (msg) {
      console.log(msg)
    },
    changeUpload (file, fileList) {
      console.log(file, fileList)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.fileinfo = file

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw)
      })
    },
    cropMoving (data) {
      this.option.cropData = data
    },
    clearImg () {
      this.option.img = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-upload {
  display: flex;
  flex-wrap: wrap;
  .el-upload-dragger {
    width: 100%;
  }
}
.preview-square,
.preview-circle {
  width: 100px;
  height: 100px;
  /* padding: 3px; */
  border: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
  box-sizing: content-box;
  margin-right: 15px;
  /* outline: none; */
  /* border: 0; */
  /* overflow: hidden; */
  /* user-select: none */
}
.preview-circle {
  border-radius: 50%;
}
.footer-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.operation-icon {
  font-size: 24px;
  color: #999;
  padding: 5px;
  cursor: pointer;
}
</style>
