<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/classical_bg_1.jpg")
    .company-name
      span  {{userInfo.dreamCompanyname}}
    .nickname
      span {{userInfo.dreamFullname}}
    .user-img
      img(:src="userImg", style="min-height: 100%")
    .service-name {{userInfo.dreamServicename}}
    .user-phone
      span.user-sub 电话{{userInfo.dreamMobile}}
    .user-qq
      span.user-sub Q Q {{userInfo.dreamQq.split('').join(' ')}}
    .user-address
      span.user-sub 地址{{userInfo.dreamAddress}}
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
    width: 100%
    overflow hidden
    position: relative
  .service-name
    width 20px
    position absolute
    top 40%
    left 46%
    font-size 16px
    color rgba(0,0,0,0.7)
    font-weight 600
  .company-name
    width 20px
    position absolute
    right 16px
    top 24px
    font-weight 600
    font-size 18px
    color rgba(0,0,0,0.4)
  .user-img
    width 24vw
    height 24vw
    position absolute
    left 37.9333%
    top 22.4%
    border-radius 50%
    overflow hidden
  .user-phone, .user-qq,.user-address
    width 16px
    word-wrap break-word
    position absolute
    left 54%
    top 40%
    font-size 16px
    text-align center
    color rgba(165, 175, 184, 0.8)
  .user-qq
    left 60%
  .user-address
    left 66%
  .qrcode
    width 18.533%
    position absolute
    bottom 11%
    right 10%
  .nickname
    position absolute
    top 39.4%
    left 37%
    width 20px
    font-size 20px
    font-weight 600
    color #373737
</style>
