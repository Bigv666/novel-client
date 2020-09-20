<template>
    <div class="main-wrapper">
      <Header></Header>
      <Loading v-if="loading"></Loading>
      <div class="main-content">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import Loading from '@/components/Loading.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header,
    Footer,
    Loading
  },
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
.main-content {
  min-height: calc(100vh - #{$header-height});
}
</style>
