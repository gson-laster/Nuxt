<template lang="pug">
.nicecard-classical
  .content
    .content-bg
      img(src="~static/img/nicecard/concise_bg_2.jpg")
    .company-name
      span  {{userInfo.dreamCompanyname}}
    .nickname
      span {{userInfo.dreamFullname}}
    .user-img
      .boxF
        .boxS
          .boxT
            img(:src="userImg", style="min-height: 100%")
            .overlay
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
        color: 'dd2a3b',
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
    top 37%
    left 0
    right 0
    font-size 16px
    color rgba(221, 42, 59, 1)
    text-align center
    letter-spacing 0.5em
  .user-img
    position absolute
    left 33.6%
    top 14.2%
    overflow hidden
    .boxF, .boxS, .boxT, .overlay
      width 84px
      height 104px
      overflow hidden
    .boxF, .boxS
        visibility hidden
    .boxF
      transform rotate(120deg)
      -webkit-transform rotate(120deg)
      float left
      margin-left 19px
    .boxS
      transform rotate(-60deg)
    .boxT
      transform rotate(-60deg)
      background no-repeat 50% center
      background-size 125% auto
      visibility visible
    .overlay
      transition all 250ms ease-in-out 0s
      display none
      position relative
    .overlay:hover
      background-color rgba(0,0,0,0.6)
    .boxT:hover .overlay
      display block
  .user-phone, .user-qq,.user-address, .company-name
    position absolute
    left 36%
    top 45%
    font-size 18px
    // text-align center
    color rgba(221, 42, 59, 1)
    right 10%
    overflow hidden
    // text-overflow ellipsis
    // white-space nowrap
  .user-qq
    top 50.8%
  .user-address
    top 56.4%
  .company-name
    top 6%
    font-size 20px
    text-align center
    left 0
    right 0
    letter-spacing 0.12em
  .qrcode
    width 30%
    padding 6px
    position absolute
    bottom 10.6%
    left 50%
    transform translateX(-50%)
  .nickname
    position absolute
    top 32%
    width 100%
    text-align center
    font-size 24px
    // font-weight 600
    color #dd2a3b
    letter-spacing 0.5em

</style>
