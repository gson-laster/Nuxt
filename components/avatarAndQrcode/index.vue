<template>
<div class="new_wvcon_info">
  <div class="userinfo">
    <div class="userinfo_ewm"><img :src="setImgUrl({src:userInfo.dreamImg})">
      <span>专业顾问：{{userInfo.dreamFullname}}</span>
      <a :href="compuetHref(userInfo.dreamMobile, 'tel:')"
         v-show="userInfo.dreamMobile"
         >{{userInfo.dreamMobile}}</a>
      <a :href="compuetHref(userInfo.dreamMobile2, 'tel:')"
         v-show="userInfo.dreamMobile2">{{userInfo.dreamMobile2}}</a></div>
    <div class="userinfo_ewm2"><img :src="setImgUrl({src:userInfo.dreamEwm,w:170,h:170,q:0})"
           border="0"></div>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import setImgUrl from '~static/mixins/setImgUrl'
export default {
  props:{
    userInfo:{
      type:Object,
      default:{}
    }
  },
  mixins:[setImgUrl],
  methods: {
    compuetHref(href, str) {
      return str + href
    }
  }
}
</script>
<style>
@import '~static/css/avatarAndQrcode/index.css'
</style>
