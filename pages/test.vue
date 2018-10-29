<template>
<section class="container">
  <img src="../static/img/logo.png"
       alt="Nuxt.js Logo"
       class="logo" />
  <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
  <nuxt-link class="button"
             to="/h_index/index2">
    About index2
  </nuxt-link>
</section>
</template>
<script>
export default {
  asyncData({
    req
  }) {
    console.log(req);
  }
}
</script>
