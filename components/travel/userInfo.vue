<template>
  <div class="userinfo" id="userinfo">
    <div class="fgx"></div>
    <div class="userinfo">
      <div class="userinfo_ewm"><img :src="userInfo.dreamImg">
        <span class="position">专业顾问：{{userInfo.dreamFullname}}</span>
        <a :href="['tel:'+userInfo.dreamMobile]">
          <span class="iconfont icon-dianhua">{{userInfo.dreamMobile}}</span>
         
        </a>
        <a :href="['tel:'+userInfo.dreamMobile2]">
          <span class="iconfont icon-dianhua">{{userInfo.dreamMobile2}}</span>
         
        </a>
      </div>
      <div class="userinfo_ewm2"><img :src="userInfo.dreamEwm" border="0"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    userInfo:{
      default:''
    }
  },
}
</script>

<style>
@import '~static/css/travel/userinfo.css'
</style>
