<template lang="pug">
div
  component(:is="moduleName" :imageList="localImages" :titleText="titleText")
  musicPlay(@changeMusicStatus="changeMusicStatus")
  audio(ref="audio", autoplay, preload, loop)
  user-bottom(:preview="preview", @con="con")
  toast(:show="toastStatus", :msg="toastMsg")
</template>

<script>
import autumnscenery from "../modules/autumnscenery" ;
import romanticbeach from "../modules/romanticbeach" ;
import beautyfield from "../modules/beautyfield" ;
import bluesky from "../modules/bluesky" ;
import starrynight from "../modules/starrynight" ;
import travel from "../modules/travel" ;
import musicPlay from '~components/musicalbum/musicplay'
import userBottom from '~components/musicalbum/bottom'
import toast from '~components/common/toast'
import {selectorFunction} from '~static/js/util'
import {getUserablumedit} from '~/apis/user.js'
import {mapGetters} from 'vuex'
import wechat from '~static/mixins/wechat.js'
import {getUserablumLists} from '~/apis/user.js'

export default {
  async asyncData({params, store, query, redirect}){
    let moduleName = params.id

    let id = query.id
    let musicAblum = ''
    if(id) {
      let result = await getUserablumLists({id: id})
      console.log(result);
      if(result.code == 2000 && !result.data.hasOwnProperty('code')) {
        let images = result.data.picture.split('|$|')
        let trueImages = []
        images.map((v, i) => {
          console.log(v);
          let res = v.indexOf('http') != -1? v : '/'+v
          trueImages.push(res)
        })
        console.log(trueImages);
        musicAblum = {
          localImages: trueImages,
          titleText: result.data.title,
          musicData: JSON.parse(result.data.music),
          isPreview: false,
          mubantype: result.data.mubantype
        }
      }else{
        redirect({
          path: '/musicalbum',
          query: query
        })
      }
    }else{
      musicAblum= store.getters.getMusicAblum
    }

    //let musicAblum = store.getters.getMusicAblum
    console.log(musicAblum.localImages);
    return {
      moduleName,
      localImages: musicAblum.localImages,
      titleText: musicAblum.titleText,
      musicData: musicAblum.musicData,
      preview: musicAblum.isPreview,
      userInfo: store.getters.getUserInfo,
      mubantype: musicAblum.type,
    }
  },
  data(){
    return {
      pictureServerUrlStr: '',
      pictureServerImage: [],
      toastStatus: false,
      toastMsg: ''
    }
  },
  head(){
    return {
      title: this.titleText+'-音乐相册',
      script: [
        {src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'}
      ]
    }
  },
  created(){
    this.$store.dispatch('setFooterShow', false)
  },
  mixins: [wechat],
  async beforeMount() {
    try {

    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
    let fullName = this.userInfo.dreamFullname ? this.userInfo.dreamFullname: ''
    console.log('url',url);
    const shareOpts = {
      title: '【'+this.titleText+'】'+fullName+'-音乐相册', // 分享标题
      desc: fullName+'的精美音乐相册-'+this.titleText+'，快来制作体验吧！', // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.localImages[0].indexOf('http') != -1 ? this.localImages[0] : `http://${window.location.host}/${this.localImages[0]}`, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: () => {
        alert('分享成功')
      }, // 用户确认分享后执行的回调函数
      cancel: () => {
       alert('分享取消')
      } // 用户取消分享后执行的回调函数
    }
    console.log('shareData', shareOpts);
    await this.wechatInit(url, shareOpts)
    console.log('wx',wx);

    selectorFunction('meta[name="viewport"]')[0].setAttribute('content', this.init_viewport())

  } catch (e) {
    console.log(e);
  }
  },
  mounted(){
    console.log(this.$random(0,5));
    this.playMusic()
    selectorFunction('meta[name="viewport"]')[0].setAttribute('content', this.init_viewport())
  },
  methods:{
    init_viewport() {
        var t, i, viewportStr = '';
        if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
            var e = parseFloat(RegExp.$1);

            if (e > 2.3) {
                if (0 === window.outerWidth) {
                    t = window.screen.width;
                } else {
                    t = window.outerWidth;
                }
                i = parseInt(t) / 500;
                viewportStr = 'width=500, minimum-scale = ' + i + ", maximum-scale = " + i + ', target-densitydpi=device-dpi,user-scalable=no">';
            } else {
                viewportStr = 'width=500, target-densitydpi=device-dpi,user-scalable=no">'
            }
        } else if (navigator.userAgent.indexOf("iPhone") != -1) {
            i = parseInt(window.screen.width) / 500;
            viewportStr = 'width=500, min-height=750,initial-scale=' + i + ', user-scalable=no; '
        } else {
            viewportStr = 'width=500, height=750, initial-scale=0.64, user-scalable=no '
        }

        return viewportStr
    },
    playMusic(){
      if(!this.musicData) return
      let audio = this.$refs.audio
      if(!audio.src){
        console.log(1111);
        audio.src = this.musicData.url
        let play = function(){
          audio.play();
          document.removeEventListener("touchstart",play, false);
        };
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {//微信
          console.log('ready');
           play();
        }, false);
        document.addEventListener("touchstart",play, false);

      }else{
        audio.play()
      }

    },
    pauseMusic(){
      console.log(this.$refs.audio.paused);
      this.$refs.audio.pause()
    },
    changeMusicStatus(status){
      console.log('status',status);
      if(status){
        this.playMusic()
      }else{
        this.pauseMusic()
      }
    },
    async con(statue){
      if(statue) {
        // 保存
        await this.save()
      }else{
        //取消
        this.$router.go(-1)
      }
    },
    async save(){
      this.toastStatus = true
      this.toastMsg = "保存信息中..."
      // 微信图片处理
      await this.uploadImageHandle()
      console.log('pictureServerImage',this.pictureServerImage);
      let musicString = this.musicData ? JSON.stringify(this.musicData): ''
      let randomNum = this.$random(0, this.pictureServerImage.length-1)
      let params = {
        title: this.titleText,
        music: musicString,
        username: this.userInfo.dreamUsername,
        mubantype: this.mubantype,
        mainpic: this.pictureServerImage[randomNum],
        picture: this.pictureServerImage.join('|$|')
      }
      console.log('save data', params);
      let saveRes = await getUserablumedit(params)
      console.log('saveRes', saveRes);
      this.toastStatus = false

      if(saveRes.code == 2000) {
        this.$msg('保存成功')
        this.$router.push({
          path: '/musicalbum/my',
          query: this.$route.query
        })
      }else{
        this.$msg('保存失败')
      }
      this.$store.dispatch('setMusicAlbumLocalImages', [])
      this.$store.dispatch('setMusicAlbumTitleText', '')
      this.$store.dispatch('setMusicAlbumMusic', null)
      this.$store.dispatch('setLocalImagesSource', [])
    },
    async uploadImageHandle(){
      console.log(11111);
      let resource = this.$store.getters.getMusicAblum.localImagesSource
      console.log('localIDs', resource);
      let result = await this.uploadss({localIds:resource,isShowProgressTips: 0})
      console.log('result',result);
      let uploadToPictureServer = await this.wxuploads(result.localIdAndserverId)
      console.log('picServer', uploadToPictureServer);
      this.pictureServerImage = Object.values(uploadToPictureServer)
    },
  },
  components: {
    autumnscenery,
    romanticbeach,
    starrynight,
    beautyfield,
    bluesky,
    travel,
    musicPlay,
    userBottom,
    toast
  }
}
</script>

<style lang="css" scoped>
</style>
