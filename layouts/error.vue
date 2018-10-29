<template>
  <section class="container">
    <div class="error-404" v-if="error.statusCode == 404">
      <div class="box-404">
        <img src="../static/img/404.jpg">
       <nuxt-link class="button" to="/"> <p class='go-index'>返回首页</p></nuxt-link>
    </div>
    </div>
    <div class="error-500" v-if="error.statusCode == 500">
      <div class="box-404">
        <img src="../static/img/500.jpg">
        <p class='notice'>服务器太忙了，请刷新再试试!</p>
       <nuxt-link class="button" to="/"> <p class='go-index'>返回首页</p></nuxt-link>
    </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['error'],
  mounted () {
    if(this.error.statusCode == 500) {
      window.location.reload()
    }
  },
}
</script>

<style scoped>
.container{
  max-width: 640px; width: 100%; margin: 0px auto; background: #98dae6;height:100vh
}
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
.box-404 { width: 241px;margin: 0px auto}
.box-404 img{ width: 100%; margin-top: 30px}
.go-index{width: 100px;height: 40px;background: #fff;border-radius:3px; line-height: 40px;text-align: center; font-size: 14px; color: #98dae6;margin: 0px auto;margin-top: 5px}
.notice{text-align: center;line-height: 40px;font-size: 13px;color: #666}
</style>
