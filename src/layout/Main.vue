<template>
    <div class="main-wrapper">
      <Header></Header>
      <Loading v-if="loading"></Loading>
      <router-view></router-view>
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

<style>

</style>
