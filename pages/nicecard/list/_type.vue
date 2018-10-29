<template lang="pug">
  .nicecard_list_warrp.white-bg
    .nicecard_banner(ref="bannerWarrp")
      .banner_item(v-for="(item, index) in setImgList", :key="index", ref="swiperItem")
        nuxt-link(:to="{path: '/nicecard/picture/'+item.flag, query: setQuery() }")
          img(:src="item.img")
    .nicecard_bottom
      .nicecard_arrow
        .prev(@click="prev")
        .next(@click="next")
        .text {{activeIndex + 1}}/{{imgList.length}}
      .nicecard_btn
        span.btn_text(@click="toMakeCanvas") 生&nbsp;&nbsp;成
</template>

<script>
import {addClass, removeClass} from '~static/js/util'
import setQuery from '~static/mixins/setQuery.js'
import nicecard from '~/config/nicecard.js'
import wechat from '~/static/mixins/wechat.js'

export default {
  asyncData ({params}) {
    let imgs = nicecard[params.type]
    return {
      imgList: imgs
    }
  },
  head(){
    return {
      title: '精美名片'
    }
  },
  data () {
    return {
      activeIndex: 0,
      isTransitioning: false,
      touchData: {},
      translateX: 0,
      moveX: 0,
      movedX: 0
    }
  },
  mixins: [setQuery, wechat],
  async beforeMount() {
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url = this.$store.state.url.split('#')[0]
    } else {
      url = window.location.href.split('#')[0]
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
    const shareOpts = {
      title: `精美名片`, // 分享标题
      desc: `漂亮的精美名片，快来制作一张属于自己的精美名片吧!`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `http://${window.location.host}/UploadFiles/1489999753693.jpg`, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: () => {
        alert('分享成功')
      }, // 用户确认分享后执行的回调函数
      cancel: () => {
        alert('分享取消')
      } // 用户取消分享后执行的回调函数
    }
    await this.wechatInit(url, shareOpts)
  },
  computed:{
    setImgList() {
      var firstImg = this.imgList[0];
      var lastImg = this.imgList[this.imgList.length - 1]
      return [lastImg].concat(this.imgList, [firstImg])
    },
    len () {
      return this.setImgList.length
    }
  },
  created(){
    this.$store.dispatch('setFooterShow', false)
  },
  mounted(){
    this.$refs.bannerWarrp.style.width = window.innerWidth * 0.6 * 6 + 16 * 6 + 24 * 6+'px'
    this.$refs.bannerWarrp.style.transform = "translateX(-"+window.innerWidth * 0.53+"px)"
    this.translateX = window.innerWidth * 0.53
    require('~static/js/animation.js')
    //console.log(Math.animation());
    let _this = this
    this.$refs.bannerWarrp.addEventListener('touchstart', function (evt) {
      _this.touchData.startX = evt.touches[0].pageX
    }, false)

    this.$refs.bannerWarrp.addEventListener('touchmove', function (evt) {
      let mX = evt.touches[0].pageX
      let moveX = 0
      let movedX = mX - _this.touchData.startX
      moveX = _this.translateX - movedX
      // _this.$refs.bannerWarrp.style.transform = "translateX(-"+moveX+"px)"

      // console.log('moveX', moveX);
      // console.log('movedX', movedX);

      _this.moveX = moveX
      _this.movedX = movedX
      evt.preventDefault()
    }, false)

    this.$refs.bannerWarrp.addEventListener('touchend', function (evt) {

      if(Math.abs(_this.movedX) < 50) {
        _this.$refs.bannerWarrp.style.transform = "translateX(-"+_this.translateX+"px)"
      }else{
        _this.translateX = _this.moveX
        if(_this.movedX > 0) {
          console.log('左');
          _this.prev()
        }else{
          console.log('右');
          _this.next()
        }
      }
      //_this.touchData.startX = evt.touches[0].pageX
      //_this.touchData.startY = evt.touches[0].pageY
    }, false)
  },
  methods: {
    next () {
      if(this.isTransitioning) return
      this.activeIndex ++
      if(this.activeIndex  > this.len - 3) {
        this.activeIndex = 0
      }
      this.isTransitioning = true
      let express = -(window.innerWidth - window.innerWidth * 0.6 / 2)
      let _this = this
      let to = this.activeIndex * express- window.innerWidth * 0.53
      Math.animation( (this.activeIndex - 1) * express- window.innerWidth * 0.53,  to, function (value) {
        _this.$refs.bannerWarrp.style.transform = "translateX("+value+"px)"
        _this.showActive()
        if(value == to) {
          _this.isTransitioning = false
          _this.translateX = value
        }
      })

    },
    prev () {
      if(this.isTransitioning) return
      this.activeIndex --
      if(this.activeIndex  < 0) {
        this.activeIndex = this.len - 3
      }
      this.isTransitioning = true
      let express = -(window.innerWidth - window.innerWidth * 0.6 / 2)
      let _this = this
      let to = (this.activeIndex) * express- window.innerWidth * 0.53
      Math.animation( (this.activeIndex + 1) * express- window.innerWidth * 0.53 , to, function (value) {
        _this.$refs.bannerWarrp.style.transform = "translateX("+value+"px)"
        _this.showActive()
        if(value == to) {
          _this.isTransitioning = false
          _this.translateX = value
        }
      })
    },
    showActive () {
      let prevElement = this.$refs.swiperItem[this.activeIndex]

      let nextElement = this.$refs.swiperItem[this.activeIndex + 2]

      let element = this.$refs.swiperItem[this.activeIndex + 1]

      addClass(nextElement, 'opacity')
      removeClass(element, 'opacity')
      addClass(prevElement, 'opacity')
    },
    toMakeCanvas () {
      this.$router.push({
        path: '/nicecard/picture/'+this.setImgList[this.activeIndex + 1].flag,
        query: this.setQuery()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.nicecard_list_warrp
  height 100vh
  overflow hidden
  .nicecard_banner
    height 70%
    width calc(60vw * 3 + (16px * 3))
    overflow hidden
    transform: translateX(-52vw);
    background #f3f3f3
    .banner_item
      width 60vw
      float left
      margin 24px 16px;
      box-shadow 0px 0px 10px 5px #dedede
      box-sizing border-box
      transition all .5s ease-in
  .nicecard_bottom
    height 54px
    line-height 54px
    clear botn
    float none
    .nicecard_arrow
      position relative
      border-bottom 1px solid #ddd
      height 70px
    .nicecard_arrow .prev, .nicecard_arrow .next
      width 46px
      height 46px
      border 1px solid #7f7f7f
      border-radius 50%
      top 12px
    .prev
      background url('~static/img/nicecard/l_arrow.png') no-repeat center center
      background-size 24px 24px
      position absolute
      left 20%
    .next
      background url('~static/img/nicecard/r_arrow.png') no-repeat center center
      background-size 24px 24px
      position absolute
      right 20%
    .text
      position absolute
      left 50%
      transform translateX(-50%)
      font-size 18px
      height 70px
      line-height 70px
  .nicecard_btn
    width 80%
    margin 0 auto
    text-align center
    margin-top 10%
    .btn_text
      background #ffaa00
      padding 12px 64px
      color #fff
      font-size 18px
      font-weight 600
      border-radius 8px
  .opacity
    opacity: .2
</style>
