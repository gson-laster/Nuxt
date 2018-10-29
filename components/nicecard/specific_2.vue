<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/specific_bg_2.jpg")
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
    top 40%
    left 0
    right 0
    font-size 18px
    color rgba(255, 255, 255, 1)
    text-align center
    letter-spacing 0.5em
  .user-img
    width 31.2vw
    height 31.2vw
    position absolute
    left 34%
    top 13%
    border-radius 360px
    overflow hidden
  .user-phone, .user-qq,.user-address, .company-name
    position absolute
    left 34%
    top 55.4%
    font-size 16px
    // text-align center
    color rgba(255,255,255, 1)
    right 10%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-qq
    top 60.4%
  .user-address
    top 65.4%
  .company-name
    top 50.4%
  .qrcode
    background-color #fff
    width 22%
    padding 6px
    position absolute
    bottom 4%
    left 50%
    transform translateX(-50%)
  .nickname
    position absolute
    top 32.4%
    width 100%
    text-align center
    // left 25%
    font-size 26px
    font-weight 600
    color #FFF

</style>
