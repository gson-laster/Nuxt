<template lang="pug">
.nicecard-classical(ref="container")
  .content(ref="warrp")
    .content-bg
      img(src="~static/img/nicecard/fresh_bg_1.jpg")
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
    .date-text
      span {{dateText}}
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
  computed: {
    dateText(){
      let date = new Date()
      return date.getFullYear() + '-' + (date.getFullYear() + 1)
    },


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
        color: '7b5129',
        resource: 1
      }
      let data = getTyApi(params)
      let src = await img2base64('/api/hostImg?url='+encodeURIComponent(data))
      this.qrcode = src
    },
    async setUserImg () {
      if(!this.userInfo.dreamImg) return ''
      let userImg = this.userInfo.dreamImg.indexOf('http') != -1 ?  this.userInfo.dreamImg  + '?w=180&h=180&p=1': appConf.site_url +'/'+ this.userInfo.dreamImg + '?w=180&h=180&p=1'
      console.log(userImg);
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
    top 42%
    left 56%
    font-size 18px
    color rgba(123, 81, 41, 1)
    // letter-spacing 0.5em
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-img
    position absolute
    left 55.6%
    top 11.6%
    overflow hidden
    .boxF, .boxS, .boxT, .overlay
      width 120px
      height 144px
      overflow hidden
    .boxF, .boxS
        visibility hidden
    .boxF
      transform rotate(120deg)
      -webkit-transform rotate(120deg)
      float left
      margin-left 16px
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
    left 28%
    top 53.7%
    right 5%
    font-size 18px
    text-align left
    color rgba(123, 81, 41, 1)
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .user-qq
    top 59.4%
  .user-address
    top 64.4%
  .company-name
    color rgba(123, 81, 41, 1)
    top 47%
    font-size 18px
    text-align center
    left 0
    right 0
    letter-spacing 0.12em
  .qrcode
    width 24.5%
    padding 6px
    position absolute
    bottom 4.4%
    left 50%
    transform translateX(-50%)
  .date-text
    position absolute
    top 25%
    left 4%
    font-size 14px
  .nickname
    position absolute
    top 41.4%
    // width 100%
    // text-align center
    left 25%
    font-size 24px
    font-weight 600
    color #7b5129
</style>
