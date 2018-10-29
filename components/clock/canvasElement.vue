<template lang="pug">
.canvas-warrp
  .banner
    img(:src="bannerStr")
  .morning-text
    .label-text 早安心语
    .text-block
      p {{morningText}}
  .user-info
    ul
      li.user-info-item
        .user-img
          img(:src='userImgStr')
      li.user-info-item
        .user-name
          strong {{userInfo.dreamFullname}}
          span {{userInfo.dreamMobile ? userInfo.dreamMobile : (userInfo.dreamMobile2 ? userInfo.dreamMobile2 : userInfo.dreamUsername)}}
      li.user-info-item
        .user-qrcode
          img(:src="qrcodeSrc")
  .punch-info
    ul
      li.punch-info-item
        span.punch-text {{dateString[0]}}早起
        span.punch-data {{dateString[1]}}
      li.punch-info-item
        span.punch-text 连续早起
        span.punch-data {{punchInfo.dreamContinuity}}天
      li.punch-info-item
        span.punch-text 早起打卡总数
        span.punch-data {{punchInfo.dreamDkcount}}天
  .punch-footer
    p
      img(src="~static/img/clock/sharelogo.png")
      | 长按识别二维码，参与早起打卡！
</template>

<script>
import setImgUrl from '~static/mixins/setImgUrl'
import {img2base64} from '~static/js/canvas'
import {dateFormat, random} from '~static/js/util'
import {morningText} from '~/config/clock'
import appConf from '~/app.config.js'
import {wxQrcode} from '~/apis/user.js'
export default {
  props: {
    userInfo: {
      require: true,
      type: Object
    },
    punchInfo: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      // userImgStr: '',
      qrcodeSrc: ''
    }
  },
  mixins: [setImgUrl],
  created () {
    // this.userImg()
    this.getEwm();
  },
  computed: {
    bannerStr () {
      let num = random(1, 23);
      return require(`~static/img/clock/${num}.jpg`)
    },
    morningText () {
      return morningText[random(0, morningText.length)]
    },
    dateString () {
      let date = dateFormat('M月d日 H:m', new Date(this.punchInfo.dreamUpdatetime))
      return date.split(' ')
    },
    userImgStr () {
      if(!this.userInfo.dreamImg) return ''
      let userImg = this.userInfo.dreamImg.indexOf('http') != -1 ?  this.userInfo.dreamImg  + '?w=180&h=180&p=1': appConf.site_url +'/'+ this.userInfo.dreamImg + '?w=180&h=180&p=1'
      return '/api/hostImg?url='+encodeURIComponent(userImg)
    }
  },
  methods: {
    async getEwm () {
      let res = await wxQrcode({content: this.userInfo.dreamUsername})
      let src = await img2base64('/api/hostImg?url='+encodeURIComponent(res.picurl))
      this.qrcodeSrc = src
    },
    async userImg () {
      if(!this.userInfo.dreamImg) return ''
      let userImg = this.userInfo.dreamImg.indexOf('http') != -1 ?  this.userInfo.dreamImg  + '?w=180&h=180&p=1': appConf.site_url +'/'+ this.userInfo.dreamImg + '?w=180&h=180&p=1'
      let src = await img2base64('/api/hostImg?url='+encodeURIComponent(userImg))
      this.userImgStr = src
    }
  }
}
</script>

<style lang="stylus" scoped>
$scaleBy = 2
.canvas-warrp {
  clear: both;
  float: none;
  width: (100*$scaleBy)%;
  /* height: 100vh; */
  overflow: hidden;
  background: #fff;
  top: 0;
  z-index: -1;
  position: fixed;
  font-size: (14*$scaleBy)px;
}
.canvas-warrp .banner {}
.canvas-warrp .banner img {
  width: 100%;
}
.canvas-warrp .morning-text {
  position: relative;
  padding: (20*$scaleBy)px (10*$scaleBy)px (5*$scaleBy)px (10*$scaleBy)px;
  background: #fff;
  top: -(28*$scaleBy)px;
}
.canvas-warrp .morning-text .label-text {
  height: (28*$scaleBy)px;
  width: (77*$scaleBy)px;
  color: #fff;
  line-height: (28*$scaleBy)px;
  border-radius: (14*$scaleBy)px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: -(14*$scaleBy)px;
  transform: translateX(-50%);
  background-color: #ec6941;
}
.canvas-warrp .morning-text .text-block {
  line-height: (24*$scaleBy)px;
  padding-bottom: (12*$scaleBy)px;
  border-bottom: (1*$scaleBy)px solid #DDD;
  font-size: (14*$scaleBy)px;
}
.canvas-warrp .user-info {
  margin-top: -(20*$scaleBy)px;
}
.canvas-warrp .user-info ul,
.canvas-warrp .punch-info ul {
  display: flex;
  padding: (4*$scaleBy)px;
}
.canvas-warrp .user-info-item,
.canvas-warrp .punch-info-item {
  flex: 1;
  text-align: center;
  align-self: center;
}
.canvas-warrp .user-info .user-img,
.canvas-warrp .user-info .user-qrcode {
  width: (80*$scaleBy)px;
  height: (80*$scaleBy)px;
  overflow: hidden;
  border-radius: (15*$scaleBy)px;
  display: inline-block;
}
.canvas-warrp .user-info .user-qrcode {
  border-radius: 0
}
.canvas-warrp .user-info .user-name {
  text-align: left;
}
.canvas-warrp .user-name strong {
  font-size: (17*$scaleBy)px;
  height: (34*$scaleBy)px;
  line-height: (34*$scaleBy)px;
  display: block;
}
.canvas-warrp .user-name span {
  color: #888888;
  font-size: (15*$scaleBy)px;
  height: (30*$scaleBy)px;
  line-height: (30*$scaleBy)px;
  font-weight: 600;
  display: block;
}
.canvas-warrp .user-img img {
  width: 100%;
  height: 100%;
}
.punch-info .punch-info-item {
  border-right: (1*$scaleBy)px solid #ddd;
  box-sizing: border-box;
}
.punch-info .punch-info-item:last-child {
  border: none
}
.punch-info .punch-info-item span {
  display: block;
}
.punch-info .punch-info-item .punch-text {
  color: #999;
  height: (24*$scaleBy)px;
  line-height: (24*$scaleBy)px
}
.punch-info .punch-info-item .punch-data {
  color: #ec6941;
  font-size: (20*$scaleBy)px;
  font-weight: 600;
}
.canvas-warrp .punch-footer {
  height: (37*$scaleBy)px;
  line-height: (37*$scaleBy)px;
  background: #dddddd;
  text-align: center;
  color: #888888
}
.canvas-warrp .punch-footer img {
  height: (25*$scaleBy)px;
  width: (25*$scaleBy)px;
  margin-right: (5*$scaleBy)px;
  display: inline-block;
}
</style>
