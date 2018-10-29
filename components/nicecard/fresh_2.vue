<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/fresh_bg_2.jpg")
    .company-name
      span  {{userInfo.dreamCompanyname}}
    .nickname
      span {{userInfo.dreamFullname}}
    .user-img
      img(:src="userImg", style="min-height: 100%; vertical-align: -webkit-baseline-middle;")
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
  computed: {
    // setUserImg () {
    //   if(!this.userInfo.dreamImg) return ''
    //   let userImg = this.userInfo.dreamImg.indexOf('http') != -1 ?  this.userInfo.dreamImg + '?w=180&h=180&p=1' : 'http://'+appConf.site_url + this.userInfo.dreamImg + '?w=180&h=180&p=1'
    //   return '/api/hostImg?url='+encodeURIComponent(userImg)
    // },
    // setQrcode () {
    //   let params = {
    //     method: 'Qrcode.createQrcode',
    //     opcity: 1,
    //     content: 'http://'+appConf.site_url +'newcard?'+stringify(this.query),
    //     size: 10,
    //     color: '000',
    //     resource: 1
    //   }
    //   let data = getTyApi(params)
    //   return '/api/hostImg?url='+encodeURIComponent(data)
    // }
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
    top 48.6%
    left 0
    right 0
    text-align center
    font-size 18px
    color rgba(255,255,255, 1)
    letter-spacing 0.5em
  .user-img
    position absolute
    left 50%
    top 11.1%
    overflow hidden
    border-radius 100%
    width 33vw
    height 33vw
    transform translateX(-50%)
  .user-phone, .user-qq,.user-address, .company-name
    position absolute
    left 16%
    right 10%
    bottom 14.7%
    background rgba(2511 251, 251, .4)
    font-size 16px
    color rgba(255,255,255, 1)
    padding 2px 5px
    word-wrap break-word
    height 24px
    line-height 24px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-qq
    bottom 9.4%
  .user-address
    bottom 4.4%
  .company-name
    bottom 20%
  .qrcode
    width 22.6%
    padding 2px
    position absolute
    bottom 25.4%
    left 50%
    margin-left -11.3%
    background #fff
  .nickname
    position absolute
    top 43%
    width 100%
    text-align center
    font-size 24px
    font-weight 600
    color #FFF
    letter-spacing 0.25em
</style>
