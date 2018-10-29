<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/business_bg_1.jpg")
    .company-name
      span  {{userInfo.dreamCompanyname}}
    .nickname
      span {{userInfo.dreamFullname}}
    .user-img
      img(:src="userImg", style="min-height: 100%")
    .service-name {{userInfo.dreamServicename}}
    .user-phone
      span.user-sub {{userInfo.dreamMobile}}
    .user-qq
      span.user-sub {{userInfo.dreamQq}}
    .user-address
      span.user-sub {{userInfo.dreamAddress}}
    .qrcode
      img(:src="qrcode")
</template>

<script>
import {getTyApi} from '~static/js/tyApi.js'
import {img2base64} from '~static/js/canvas'
import {stringify} from 'querystring'
import appConf from '~/app.config'
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
    top 18.4%
    left 54%
    font-size 18px
    color rgba(0,0,0, 1)
    letter-spacing 0.5em
  .user-img
    position absolute
    left 8%
    top 9%
    overflow hidden
    width 30vw
    height 30vw
    border 2px solid #fff
  .user-phone, .user-qq,.user-address, .company-name
    position absolute
    left 54%
    top 23.4%
    font-size 16px
    color rgba(0, 0, 0, 1)
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-qq
    top 27.4%
  .user-address
    top 42.8%
    left 35%
    right 4%
    overflow hidden
  .company-name
    top 36.4%
    left 35%
  .qrcode
    width 34.6%
    padding 6px
    position absolute
    bottom 16.4%
    left 50%
    transform translateX(-50%)
    background #fff
    padding 5px
  .nickname
    position absolute
    top 13%
    left 46%
    font-size 24px
    font-weight 600
    color #181818
</style>
