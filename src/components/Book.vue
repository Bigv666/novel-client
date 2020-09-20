<template>
  <router-link :to="{path: `book/${data._id}`}">
    <div class="book-wrappe normal" v-if="mode == 'normal'">
      <div class="book-image-wrapper">
        <el-image :src="$domain + data.image" class="book-image"></el-image>
      </div>
      <div class="book-name-wrapper">
        <router-link :to="{path: `/book/${data._id}`}" class="book-name">{{data.name}}</router-link>
        <router-link
          :to="{path: `/author/${data.author.user_id}`}"
          class="book-author"
        >{{data.author.nickname}}</router-link>
      </div>
    </div>
    <div class="book-wrappe border" v-else-if="mode == 'border'">
      <div class="book-image-wrapper">
        <el-image :src="$domain + data.image" class="book-image"></el-image>
      </div>
      <div class="book-name-wrapper">
        <router-link :to="{path: `/book/${data._id}`}" class="book-name">{{data.name}}</router-link>
        <router-link
          :to="{path: `/author/${data.author.user_id}`}"
          class="book-author"
        >{{data.author.nickname}}</router-link>
      </div>
    </div>
    <div class="book-wrappe pop" v-else-if="mode == 'pop'">
      <div class="book-image-wrapper">
        <el-popover placement="top" class="book-info-pop" width="400" trigger="hover">
          <div class="book-pop-wrapper">
            <el-image class="pop-image" :src="$domain +data.image"></el-image>
            <div class="pop-content">
              <router-link class="book-name a-l" :to="{path: `/book/${data._id}`}">
                {{data.name}}
              </router-link>
              <router-link class="book-author a-l" :to="{path: `/author/${data.author.user_id}`}">
                  {{data.author.nickname}}
                </router-link>
                <p class="book-description">{{ data.description }}</p>
                <div class="book-number-wrapper">
                  <div class="book-number-item">
                    <p>阅读数</p>
                    <p>{{ data.book_data.read ? data.book_data.read : 0 }}</p>
                  </div>
                  <div class="book-number-item">
                    <p>推荐数</p>
                  <p>{{ data.book_data.recommend ? data.book_data.recommend : 0 }}</p>
                  </div>
                  <div class="book-number-item">
                    <p>收藏数</p>
                  <p>{{ data.book_data.collect ? data.book_data.collect : 0 }}</p>
                  </div>
                  <div class="book-number-item">
                    <p>搜索数</p>
                    <p>{{ data.book_data.search ? data.book_data.search : 0 }}</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="boy-item" slot="reference">
            <el-image :src="$domain + data.image" class="book-image"></el-image>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="book-wrappe card" v-else-if="mode == 'card'">
      <div class="flex">
        <div class="book-image-wrapper min">
        <el-image :src="$domain + data.image" class="book-image" fit="fill">
          <div slot="error" class="image-slot">
            <el-image :src="$domain + 'public/assets/404.jpg'"></el-image>
          </div>
        </el-image>
      </div>
        <div class="book-info">
          <router-link class="book-name a-l" :to="{path: `/book/${data._id}`}">
                {{data.name}}
              </router-link>
              <router-link class="book-author a-l" :to="{path: `/author/${data.author.user_id}`}">
                  {{data.author.nickname}}
                </router-link>
          <el-tag size="small" class="mb-5">{{ data.type }}</el-tag>
          <div>
            <el-tag type="success" size="small" v-if="data.status === 0">连载中</el-tag>
            <el-tag type="danger" size="small" v-if="data.status === 1">完结</el-tag>
          </div>

        </div>
      </div>
      <p class="book-description">{{ data.description }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'normal'
    },
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/common.scss";
$image-width: 160px;
$image-height: 200px;
$image-width-min: 120px;
$image-height-min: 150px;
.book-wrappe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  &.normal {
    &:hover {
      .book-image {
        transform: scale(1.1);
      }
    }
    .book-name-wrapper {
      width: $image-width;
      padding: 5px 0 8px;
    }
  }

  // border模式
  &.border {
    border: 1px solid $color-border;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0 5px 0 #e6e6e6;
      .book-name-wrapper {
        bottom: 0;
      }
    }
    .book-name-wrapper {
      width: $image-width;
      padding: 5px 10px;
      position: absolute;
      width: 100%;
      background-color: #fff;
      bottom: -30px;
      height: 60px;
      transition: all 0.3s ease;
    }
  }
  // pop
  &.pop {
    border: 1px solid $color-border;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0 5px 0 #e6e6e6;
      .book-name-wrapper {
        bottom: 0;
      }
    }
  }
  // pop
  &.card {
    border: 1px solid $color-border;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0 5px 0 #e6e6e6;
      .book-name-wrapper {
        bottom: 0;
      }
    }
    .book-info {
      padding: 0 10px;
      width: 120px;
    }
    .mb-5 {
      margin-bottom: 5px;
    }
    .book-description {

    }
  }
  ::v-deep {
    .book-image-wrapper {
      width: $image-width;
      height: $image-height;
      overflow: hidden;
    }
    .book-image-wrapper.min {
      width: $image-width-min;
      height: $image-height-min;
      overflow: hidden;
    }
    .book-image {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
    .book-name {
      font-size: 14px;
      color: #333;
    }
    .book-author {
      font-size: 14px;
      color: #666;
    }
    .book-name,
    .book-author {
      line-height: 24px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      text-decoration: none;
      &:hover {
        color: $color-primary;
      }
    }
    .a-l {
      text-align: left;
    }
    .book-description {
      font-size: 13px;
      color: #666;
      height: 5.2em;
      overflow: hidden;
      overflow:hidden;/*超出隐藏*/
      text-overflow:ellipsis;/*文本溢出时显示省略标记*/
      display:-webkit-box;/*设置弹性盒模型*/
      -webkit-line-clamp:4;/*文本占的行数,如果要设置2行加...则设置为2*/
      -webkit-box-orient:vertical;/*子代元素垂直显示*/
    }
  }
}
.flex {
  display: flex;
  align-items: flex-start;
}
.flex-col {
  // flex:1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
}
.pl-10 {
  padding-left: 10px;
}
</style>
<style lang="scss">
@import "@/style/common.scss";
.book-pop-wrapper {
  display: flex;
  .pop-image {
    width: 120px;
    height: 150px;
    flex-shrink: 0;
  }
  .pop-content {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .book-name {
      font-size: 14px;
      color: #666;
    }
    .book-author {
      font-size: 14px;
      color: #666;
    }
    .book-name,
    .book-author {
      line-height: 20px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      text-decoration: none;
      &:hover {
        color: $color-primary;
      }
    }
    .a-l {
      text-align: left;
    }
    .book-description {
      font-size: 13px;
      color: #666;
      max-height: 5.2em;
      overflow: hidden;
      overflow:hidden;/*超出隐藏*/
      text-overflow:ellipsis;/*文本溢出时显示省略标记*/
      display:-webkit-box;/*设置弹性盒模型*/
      -webkit-line-clamp:4;/*文本占的行数,如果要设置2行加...则设置为2*/
      -webkit-box-orient:vertical;/*子代元素垂直显示*/
    }
    .book-number-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .book-number-item {
      text-align: center;
    }
  }
}
</style>
