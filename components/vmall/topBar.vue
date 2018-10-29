<template>
  <div class="newedit_title vmall" id="ret">
    <a href="#" class="home-btn ret-btn" bk="tuan_m_detail_back">
      <span @click="back"></span>
    </a>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  props:['title'],
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>
<style>
@import '~static/css/vmall/topBar.css'
</style>
