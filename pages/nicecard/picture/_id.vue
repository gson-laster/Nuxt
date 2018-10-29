<template lang="pug">
.nicecard(ref="container")
  component(v-bind:is="currentView", ref="warrp", :userInfo="userInfo" :query="query")
  .cut_pic(@click="drawImg()", v-show="btnStatus")
    span 生成图片
  .tips(@click="showTips()", :style="{transform: translateX}")
    .left-box
      span 提示
    .rigth-box
      p 在微信中点击右侧的生成图片后，可长按图片保存到手机相册哦^_^
</template>

<script>
import html2canvas from 'html2canvas'
import {drawPolygon, img2base64} from '~static/js/canvas'
import classicalOne from '~components/nicecard/classical_1'
import classicalTwo from '~components/nicecard/classical_2'
import specificOne from '~components/nicecard/specific_1'
import specificTwo from '~components/nicecard/specific_2'
import conciseOne from '~components/nicecard/concise_1'
import conciseTwo from '~components/nicecard/concise_2'
import freshOne from '~components/nicecard/fresh_1'
import freshTwo from '~components/nicecard/fresh_2'
import businessOne from '~components/nicecard/business_1'
import businessTwo from '~components/nicecard/business_2'
import wechat from '~/static/mixins/wechat.js'
import nicecard from '~/config/nicecard.js'
import appConf from '~/app.config'
import keepUserOnline from '~static/js/keepUserOnline'

export default {
  async asyncData({params, store, query, route}){
    let componentName = params.id
    let userInfo = store.state.userInfo

    if(!userInfo) {
      let userData = await keepUserOnline(route, 'user')
      userInfo = userData.user
    }

    userInfo.dreamCompanyname = userInfo.dreamCompanyname ? userInfo.dreamCompanyname.split('|$|')[0] : ''
    userInfo.dreamServicename = userInfo.dreamServicename ? userInfo.dreamServicename.split('|$|')[0] : ''
    return {
      currentView: componentName,
      userInfo: userInfo,
      query: query
    }
  },
  head(){
    return {
      title: '精美名片'
    }
  },
  data () {
    return {
      warrp: '',
      width: 0,
      height: 0,
      canvasHeight: 0,
      canvasWidth: 0,
      btnStatus: true,
      translateX: 'translateX(92%)',
      tipsStatus: false
    }
  },
  computed:{
    setUserImg () {
      if(!this.userInfo.dreamImg) return ''
      let userImg = this.userInfo.dreamImg.indexOf('http') != -1 ?  this.userInfo.dreamImg + '?w=180&h=180&p=1': appConf.site_url +'/'+ this.userInfo.dreamImg+ '?w=180&h=180&p=1'
      return '/api/hostImg?url='+encodeURIComponent(userImg)
    },
  },
  created(){
    this.$store.dispatch('setFooterShow', false)
  },
  mixins: [wechat],
  async beforeMount() {
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
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
  mounted(){

  },
  methods: {
    freshDraw(canvas, context, scaleBy, element, canvas2Image){
      if(!this.setUserImg || this.setUserImg == '') {
        element.parentNode.appendChild(canvas2Image.convertToImage(canvas, this.width* scaleBy, this.height* scaleBy,'jpg'))
        return
      }
      context = canvas.getContext('2d');
      context.scale(scaleBy, scaleBy);

      var image = new Image()
      let _this = this
      image.onload = function() {
        context.save()
        drawPolygon(context, {
          x: _this.canvasWidth  * 0.02112,
          y: _this.canvasHeight * 0.00763,
          num: 6,
          r: 12,
          strokeStyle: "#7b5129",
          image: image
        })

        element.parentNode.appendChild(canvas2Image.convertToImage(canvas, _this.width* scaleBy, _this.height* scaleBy,'jpg'))
      };
      image.src =this.setUserImg;
    },
    conciseDraw(canvas, context, scaleBy, element, canvas2Image){
      if(!this.setUserImg || this.setUserImg == '') {
        element.parentNode.appendChild(canvas2Image.convertToImage(canvas, this.width* scaleBy, this.height* scaleBy,'jpg'))
        return
      }

      context = canvas.getContext('2d');
      context.scale(scaleBy, scaleBy);

      var image = new Image()
      let _this = this
      image.onload = function() {
        context.save()
        drawPolygon(context, {
          x: _this.canvasWidth  * 0.0138,
          y: _this.canvasHeight * 0.00712,
          num: 6,
          r: 8,
          strokeStyle: "#7b5129",
          image: image
        })

        element.parentNode.appendChild(canvas2Image.convertToImage(canvas, _this.width* scaleBy, _this.height* scaleBy,'jpg'))
        // element.parentNode.appendChild(canvas)
      };
      image.src =this.setUserImg;
    }
    ,drawImg(){
      var _this = this
      var element = this.$refs.warrp.$el
      var container = this.$refs.container
      var width = container.offsetWidth;
      var height = container.offsetHeight;
      var type = "png";
      var scaleBy = 6;  //缩放比例
      var canvas = document.createElement('canvas');

      document.documentElement.scrollTop = document.body.scrollTop = 0

      this.width = width
      this.height = height

      console.log('height', height);

      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;

      canvas.style.width = width * scaleBy + 'px';
      canvas.style.height = height * scaleBy + 'px';

      this.canvasHeight = canvas.height
      this.canvasWidth = canvas.width

      img2base64(this.setUserImg)

      var context = canvas.getContext('2d');
      var canvas2Image = require('~static/js/canvas2image.js')()
      context.scale(scaleBy, scaleBy);
      html2canvas(element, {
          letterRendering: true,
          canvas,
          onrendered: function(canvas) {
              element.style.display = 'none'

              if(_this.currentView == 'freshOne') {
                _this.freshDraw(canvas, context, scaleBy, element, canvas2Image)
              }else if(_this.currentView == 'conciseTwo') {
                _this.conciseDraw(canvas, context, scaleBy, element, canvas2Image)
              }else{
                element.parentNode.appendChild(canvas2Image.convertToImage(canvas, width* scaleBy, height* scaleBy,'jpg'))
              }
              _this.btnStatus = false
              // canvas is the final rendered <canvas> element
              //element.parentNode.appendChild(canvas2Image.convertToImage(canvas, width* scaleBy, height* scaleBy,'jpg'))
          }
      });
    },
    showTips(){
      if(this.tipsStatus) {
        this.translateX = 'translateX(91%)'
        this.tipsStatus = false
      }else{
        this.translateX = 'translateX(0)'
        this.tipsStatus = true
      }
    }
  },
  components: {
     // 'classicalOne': () => import('~components/nicecard/classical_1'),
     // 'classicalTwo': () => import('~components/nicecard/classical_2'),
     // 'specificOne': () => import('~components/nicecard/specific_1'),
     // 'specificTwo': () => import('~components/nicecard/specific_2'),
     // 'conciseOne': () => import('~components/nicecard/concise_1'),
     // 'conciseTwo': () => import('~components/nicecard/concise_2'),
     // 'freshOne': () => import('~components/nicecard/fresh_1'),
     // 'freshTwo': () => import('~components/nicecard/fresh_2'),
     // 'businessOne': () => import('~components/nicecard/business_1'),
     // 'businessTwo': () => import('~components/nicecard/business_2'),
     classicalOne,
     classicalTwo,
     specificOne,
     specificTwo,
     conciseOne,
     conciseTwo,
     freshOne,
     freshTwo,
     businessOne,
     businessTwo
  }
}
</script>

<style lang="stylus" scoped>
.nicecard
  width 100%
  overflow-x hidden
  position absolute
  .cut_pic
    position fixed
    right 12px
    bottom 20%
    background url("~static/img/nicecard/jitu.png") no-repeat center 4px
    background-size 40px
    width 46px
    height 90px
    background-color rgba(140, 140, 140, 0.6)
    overflow hidden
    color #fff
    text-align center
    border-radius 8px
    span
      margin-top 42px
      display block
  .tips
    position absolute
    right 0
    bottom 40%
    width 90%
    background rgba(0,0,0,0.4)
    color #fff
    padding 8px
    border-radius 10px 0 0 10px
    transition transform 0.5s ease-in
    .left-box
      float left
      height 100%
      border-right 1px solid #fff
      padding 4px
      width 16px
    .right-box
      float right
      width 90%
</style>
