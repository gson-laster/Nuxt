<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/business_bg_2.jpg")
    .company-name
      span  {{userInfo.dreamCompanyname}}
    .nickname
      span {{userInfo.dreamFullname}}
    .user-img
      img(:src="userImg", style="min-height: 100%")
    .service-name {{userInfo.dreamServicename}}
    .user-phone
      span.user-sub {{userInfo.dreamQq}}
    .user-qq
      span.user-sub {{userInfo.dreamMobile}}
    .user-address
      span.user-sub {{userInfo.dreamAddress}}
    .qrcode
      img(:src="qrcode")
</template>

<script>
import {getTyApi} from '~static/js/tyApi.js'
import {stringify} from 'querystring'
import appConf from '~/app.config'
import {img2base64} from '~static/js/canvas'

export default {
  data () {
    return {
      userImg: '',
      qrcode: ''
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: {
        dreamImg: '',
        dreamUsername: '',
        dreamAddress: '',
        dreamCompanyname: '',
        dreamQq:'',
        dreamServicename: ''
      }
    },
    query: {
      default: {},
      type: Object
    }
  },
  created(){
    this.setQrcode()
    this.setUserImg()
  },
  methods:{
    async setQrcode () {
      this.query.is_share=1
      let params = {
        method: 'Qrcode.createQrcode',
        opcity: 1,
        content: appConf.site_url +'/newcard?'+stringify(this.query),
        size: 10,
        background_color: 'fff',
        color: '000',
        resource: 1
      }
      let data = getTyApi(params)
      let src = await img2base64('/api/hostImg?url='+encodeURIComponent(data))
      this.qrcode = src
    },
    async setUserImg () {
      if(!this.userInfo.dreamImg) return ''
      let userImg = this.userInfo.dreamImg.indexOf('http') != -1 ?  this.userInfo.dreamImg  + '?w=180&h=180&p=1': appConf.site_url +'/'+ this.userInfo.dreamImg + '?w=180&h=180&p=1'
      let src = await img2base64('/api/hostImg?url='+encodeURIComponent(userImg))

      this.userImg = src
    },
  }
}
</script>

<style lang="stylus" scoped>
.nicecard-classical
  .content
    width 100%
    overflow hidden
    position relative
  .service-name
    position absolute
    top 45.4%
    left 40%
    font-size 18px
    color rgba(0,0,0, 1)
    letter-spacing 0.5em
  .user-img
    position absolute
    left 8.1%
    top 39.3%
    overflow hidden
    width 26.4vw
    height 26.4vw
    border 2px solid #fff
    border-radius 360px
  .user-phone, .user-qq,.user-address, .company-name
    position absolute
    left 20%
    top 63.4%
    right 10%
    font-size 16px
    color rgba(111, 111, 111, 0.8)
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-qq
    top 58.4%
  .user-address
    top 68.6%
  .company-name
    top 50.4%
    left 40%
    color rgba(0, 0, 0, 0.8)
  .qrcode
    width 24.6%
    padding 6px
    position absolute
    bottom 7.4%
    left 50%
    transform translateX(-50%)
    background #fff
    padding 5px
  .nickname
    position absolute
    top 40%
    left 40%
    font-size 20px
    font-weight 600
    color #000000
</style>
