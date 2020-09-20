<template>
  <div class="book-wrappe normal" v-if="mode == 'normal'">
    <div class="book-image-wrapper">
      <el-image
        :src="$domain + data.image"
        class="book-image"
      ></el-image>
    </div>
    <div class="book-name-wrapper">
      <router-link :to="{path: '/book'}" class="book-name">{{data.name}}</router-link>
      <router-link :to="{path: '/author'}" class="book-author">{{data.author.nickname}}</router-link>
    </div>
  </div>
  <div class="book-wrappe border" v-else-if="mode == 'border'">
    <div class="book-image-wrapper">
      <el-image
        :src="$domain + data.image"
        class="book-image"
      ></el-image>
    </div>
    <div class="book-name-wrapper">
      <router-link :to="{path: '/book'}" class="book-name">{{data.name}}</router-link>
      <router-link :to="{path: '/author'}" class="book-author">{{data.author.nickname}}</router-link>
    </div>
  </div>
  <div class="book-wrappe pop" v-else-if="mode == 'pop'">
    <div class="book-image-wrapper">
       <el-popover placement="top" width="400" trigger="hover">
              <section>
                <el-row>
                  <el-col :span="7">
                    <el-image style="width: 100px; height: 120px;" :src="$domain +data.image"></el-image>
                  </el-col>
                  <el-col :span="17">
                    <el-col>
                      <el-link @click.native="linkToBook(data._id)">{{
                        data.name
                      }}</el-link>
                    </el-col>
                    <el-col>
                      <el-link @click="linkToAuthor(data.author.user_id)">{{
                        data.author.nickname
                      }}</el-link>
                    </el-col>
                    <el-col>
                      <p class="description">{{ data.description }}</p>
                    </el-col>
                    <el-col class="align-center">
                      <el-col :span="6">
                        <p>阅读数</p>
                        <p>{{ data.book_data.read ? data.book_data.read : 0 }}</p>
                      </el-col>
                      <el-col :span="6">
                        <p>推荐数</p>
                        <p>{{ data.book_data.recommend ? data.book_data.recommend : 0 }}</p>
                      </el-col>
                      <el-col :span="6">
                        <p>收藏数</p>
                        <p>{{ data.book_data.collect ? data.book_data.collect : 0 }}</p>
                      </el-col>
                      <el-col :span="6">
                        <p>搜索数</p>
                        <p>{{ data.book_data.search ? data.book_data.search : 0 }}</p>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-row>
              </section>
              <div class="boy-item" slot="reference">
                      <el-image
                      :src="$domain + data.image"
                      class="book-image"
                    ></el-image>
              </div>
            </el-popover>
    </div>
  </div>
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

<style lang="scss">
@import "@/style/common.scss";
$image-width: 160px;
$image-height: 200px;
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
    .book-image-wrapper {
      width: $image-width;
      height: $image-height;
      overflow: hidden;
    }
    .book-image {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
    .book-name-wrapper {
      width: $image-width;
      padding: 5px 0 8px;
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
    .book-image-wrapper {
      width: $image-width;
      height: $image-height;
      overflow: hidden;
    }
    .book-image {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
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
    .book-image-wrapper {
      width: $image-width;
      height: $image-height;
      overflow: hidden;
    }
    .book-image {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
  }
}
.description {
      font-size: 13px;
      color: #666;
      max-height: 5.5em;
      overflow: hidden;
    }
</style>
