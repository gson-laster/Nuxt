<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/specific_bg_1.jpg")
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
    top 31%
    left 0
    right 0
    font-size 18px
    color rgba(0,0,0,1)
    text-align center
  .company-name
    position absolute
    right 0
    left  0
    top 5%
    font-weight 600
    font-size 14px
    color rgba(0,0,0,.8)
    text-align center
  .user-img
    width 28vw
    height 28vw
    position absolute
    left 36.333%
    top 8.2%
    border-radius 50%
    overflow hidden
    border 2px solid #48AC91
  .user-phone, .user-qq,.user-address
    word-wrap break-word
    position absolute
    left 34%
    top 35%
    font-size 16px
    // text-align center
    color rgba(0,0,0, 1)
    right 10%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-qq
    top 39%
  .user-address
    top 43%
  .qrcode
    width 20.533%
    position absolute
    bottom 27%
    left 50%
    transform translateX(-50%)
  .nickname
    position absolute
    top 25.4%
    width 100%
    text-align center
    // left 25%
    font-size 24px
    font-weight 600
    color #323232
</style>
