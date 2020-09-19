<template>
    <div class="main-wrapper">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
