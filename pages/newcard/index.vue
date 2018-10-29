<template lang="pug">
  div.box.cardIndex
    banner(:bannerList="bannerList")
    // 修改按钮
    .modify-detail-container
      .modify-detail(v-show='isShowModify', @touchstart="changePanelStatus(false)")
        span.arrow.iconfont.icon-iconfontjiantou
        p.text
          | 修
          br
          | 改
      .select-detail(:class="{'hide-pancel':hidePanel}")
        .left.iconfont.icon-rights(@touchstart="changePanelStatus(true)")
        .right
          ul
            nuxt-link(:to='{path:item.path,query:setQuery(query)}', v-for='(item, index) in pathList', v-bind:key='index')
              li(:class="['item iconfont','icon-'+item.className]")
                | {{item.name}}
    // menu && user profile
    card-template(:userInfos="currentUserInfo", :templateId="currentCardTempate", @cardTemplateInit="cardTemplateInit", @changeDialogStatus="changeDialogStatus", :isApplyShow="isApplyShow" :isPreview="isPreview")
    .innav(v-if='!isWVBrand')
      .articleContainer(style='padding:10px;', v-html='currentBrandInfo.dreamCardcontent')
    wv-brand(v-if='isWVBrand')
    user-register(:brand='currentBrandInfo.dreamBrandtitle', @submit='submit', :recommender='currentUserInfo.dreamUsername', :is-submit='isSubmit', :submit-text='submitText', v-show='isShowModify')
    newcard-userinfo(:user-info='currentUserInfo', :query='setQuery(query)')
    dialog-avatar(v-show='!isPreview&&isDialogShow', @closeAvatar='closeAvatar', :userinfo='currentUserInfo', :query='query')
    preview-bottom(v-show='isPreview')
    preview-pic(:isArticle="false", container=".articleContainer")
    div(class="music-btn iconfont", :class="musicIcon", @click='musicPlay')
      audio(:src='currentUserInfo.dreamMusic', autoplay='autoplay', style='display:none', ref='musicEle')
</template>
<script>
import banner from '~components/banner'
import {declassify, setBanner, addClass, removeClass, getCookie} from '~static/js/util'
import { getBannerList } from "~/apis/banner"
import { fecthUserInfo } from "~/apis/user"
import setQuery from '~static/mixins/setQuery'
import expired from '~static/mixins/expired'
import wechat from "~/static/mixins/wechat.js"
import cardTemplate from '~components/newcard/cardTemplate'
import { getBrandList } from "~/apis/brand"
import wvBrand from "~pages/newcard/_wvBrand"
import { orderlytc } from "~/apis/travel"
import userRegister from "~components/card/userRegister"
import newcardUserinfo from "~components/avatarAndQrcode/user_card"
import dialogAvatar from "~pages/newcard/dialog/dialog_avatar"
import previewBottom from "~components/preview"
import previewPic from '~components/previewPic'
import { getSiteConfig } from "~/apis/siteConfig.js"
export default {
  scrollToTop: true,
  async asyncData ({query, route, store}) {
    let bannerList = [], currentUserId, currentUserInfo, currentBrandId, currentBrandInfo, isPreview = false;

    if (query.hasOwnProperty('is_preview')) {
      // 预览
      isPreview = true
      currentBrandId = query.preview_brand
      let myUid = declassify(query.uid, 2)
      let myPidInfo = await fecthUserInfo({dreamUsername: myUid})
      currentUserId = myPidInfo.userInfo[0].dreamTjrid
    } else {
      // 正常用户
      currentUserId = declassify(query.uid, 2)
      currentBrandId = query.brand
    }
    // user info
    currentUserInfo = await fecthUserInfo({dreamUsername: currentUserId})
    currentUserInfo = currentUserInfo.userInfo[0]
    if (currentUserInfo.dreamBanner && currentUserInfo.dreamBanner != "") {
      let userBannerArr = setBanner(currentUserInfo.dreamBanner);
      userBannerArr.map((v, i) => {
        bannerList.push({
          dreamTitle: i,
          dreamDefaultpicurl: v
        });
      });
    } else {
      bannerList = await getBannerList({ dreamBrandid: currentBrandId, dreamIsok: true})
    }

    // brand profile
    let brandInfo = await getBrandList( { brandId: currentBrandId } )
    currentBrandInfo = brandInfo[ 0 ]
    store.dispatch("setFooterShow", true)
    return {
      query: query,
      isPreview: isPreview,
      bannerList: bannerList,
      currentUserId: currentUserId,
      currentUserInfo: currentUserInfo,
      currentBrandInfo: currentBrandInfo,
    }
  },
  head() {
    let title = ''
    let userFullName = ''
    if(this.currentUserInfo && this.currentUserInfo.dreamFullname && this.currentUserInfo.dreamFullname != '') {
      userFullName = this.currentUserInfo.dreamFullname
    }
    if(this.title && this.title != '') {
      title = this.title
      if(userFullName != '') title += '-' + userFullName
    }else {
      let brandTitle = (this.currentBrandInfo && this.currentBrandInfo.dreamBrandtitle) ? this.currentBrandInfo.dreamBrandtitle : ""
      if(userFullName != '') title = brandTitle + '-' + userFullName
    }
		return {
      title: this.isPreview ? '当前预览品牌-' + this.currentBrandInfo.dreamBrandtitle: this.currentBrandInfo.dreamBrandtitle
		}
	},
  data () {
    return {
      hidePanel: true,
      isPreview: false,
      isShowModify: false,
      pathList: [
        {path: "/newcard/modifydata",className: "brush",name: "资料"},
        {path: "/newcard/selectTheme",className: "refresh",name: "风格"},
        {path: "/wusercenter/changebgmusic",className: "systemprompt",name: "音乐"},
        {path: "/wusercenter/brand",className: "select",name: "品牌"}
      ],
      timeoutTimer: [],
      isSubmit: false,
      submitText: "提交",
      isDialogShow: false,
      musicIcon: "icon-muisc_close1",
      isMusicClick: false,
      isApplyShow: false
    }
  },
  computed: {
    currentCardTempate () {
      return this.currentUserInfo.dreamCardtemplate
    },
    isWVBrand() {
      let query = this.query
      let isWV = false
      if (query.hasOwnProperty('is_preview')) {
        if (query.preview_brand == 0) isWV = true
      } else {
        if (query.brand == 0) isWV = true
      }
      return isWV
    }
  },
  beforeRouteLeave(to,from,next){
    if(!this.query.hasOwnProperty('is_preview')){
      return next(true)
    }else{
      if(to.path=='/wusercenter'||to.path=='/') return next(true)
    }
    return next(false);
	},
  async beforeMount () {
    this.expired(this.currentUserInfo.dreamEndTime)
    if(this.isLogin()) {
      this.isShowModify = true
    }else{
      this.isApplyShow = true
    }
    var url = "";
    // 判断是否是ios微信浏览器
    if ( typeof window.entryUrl === 'undefined' || window.entryUrl === '' ) {
      window.entryUrl = location.href.split( '#' )[ 0 ]
    }
    if (window.__wxjs_is_wkwebview === true) {
      url = window.entryUrl
    } else {
      url = window.location.href.split('#')[0]
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
		let userImg = ''
		if (this.currentUserInfo.dreamImg) {
			userImg = this.currentUserInfo.dreamImg.indexOf('http') != -1 ? this.currentUserInfo.dreamImg : 'http://' + window.location.host +'/'+ this.currentUserInfo.dreamImg
		} else {
			userImg = this.avatar
		}
		let shareTitle,shareDesc
		if(this.query.brand == 0){
      // 保存微信配置;
      await getSiteConfig().then( res => {
        this.$store.dispatch( 'setSiteConfig', res )
      } ).catch( e => {
        console.log('获取网站配置信息错误', e);
      } )
			shareTitle = this.$store.getters.getSiteConfig.dreamSitename
			shareDesc = this.$store.getters.getSiteConfig.dreamSitedescription
		} else {
			shareTitle = this.currentBrandInfo.hasOwnProperty('dreamBrandtitle')? this.currentBrandInfo.dreamBrandtitle : ''
			shareDesc = this.currentBrandInfo.dreamBranddescription
   }

		const shareOpts = {
			title:shareTitle, // 分享标题
			desc: shareDesc, // 分享描述
			link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: userImg, // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: () => {
				this.$msg('分享成功')
			}, // 用户确认分享后执行的回调函数
			cancel: () => {
				this.$msg('分享取消')
			} // 用户取消分享后执行的回调函数
		}
		await this.wechatInit(url, shareOpts)
  },
  mounted () {
    this.musicAutoPlay()
  },
  methods: {
    /**
     * 更新编辑面板状态
     * @param  {[type]} status [description]
     * @return {[type]}        [description]
     */
    changePanelStatus (status) {
      this.hidePanel = status
      this.clearTimeout()
      if(status) {
        let timer = setTimeout(() => {
          this.isShowModify = status
        }, 500)
        this.timeoutTimer.push(timer)
      }else{
        this.isShowModify = status
      }
    },
    /**
     * 清除组件的定时器
     * @return {[type]} [description]
     */
    clearTimeout () {
      for (var i = 0; i < this.timeoutTimer.length; i++) {
        clearTimeout(this.timeoutTimer[i])
        this.timeoutTimer.splice(i, 1)
      }
    },
    /**
     * 显示用户二维码
     * @return {[type]} [description]
     */
    changeDialogStatus() {
      if (this.isPreview) {
        this.isDialogShow = false;
      } else {
        this.isDialogShow = true;
      }
    },
    /**
     * 关闭用户二维码
     * @return {[type]} [description]
     */
    closeAvatar() {
      this.isDialogShow = false;
    },
    /**
     * 提交用户信息
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
		submit(res) {
      orderlytc(res).then(res => {
        if (res.data.code == 2000) {
          this.$msg("报名成功,我们的工作人员会及时联系您,请耐心等待");
          this.isSubmit = true;
          this.submitText = "您已提交";
        }
      })
      .catch(e => {
        console.log(e);
      });
		},
    /**
     * 更新面板路径
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    cardTemplateInit (path) {
      this.pathList[0].path = path
    },
    /**
     * 设置音乐播放
     * @return {[type]} [description]
     */
    musicPlay() {
      let musicEle = this.$refs.musicEle;
      this.isMusicClick = !this.isMusicClick;
      if (this.isMusicClick) {
        this.musicIcon = "icon-muisc_close";
        musicEle.pause();
      } else {
        this.musicIcon = "icon-muisc_close1";
        musicEle.play();
      }
    },
    /**
     * 设置音乐自动播放
     * @return {[type]} [description]
     */
    musicAutoPlay() {
      let musicEle = this.$refs.musicEle;
      let _this = this
      let play = function(){
        musicEle.play();
        document.removeEventListener("touchstart",play, false);
      };
      musicEle.play();
      document.addEventListener("WeixinJSBridgeReady", function () {//微信
         play();
      }, false);
      document.addEventListener("touchstart",play, false);
    },
    /**
     * 检测登录
     * @return {Boolean} [description]
     */
    isLogin () {
      if(this.$store.getters.getLoginState) { // store
        return this.$store.getters.getLoginState
      }else{ // 手动检测
        let loginUser = getCookie('loginUser', document.cookie)
        if(!loginUser) return false
        if(loginUser == this.currentUserId) return true
        return false
      }
    }
  },
  mixins: [setQuery, expired, wechat],
  components: {
    banner,
    wvBrand,
    previewPic,
    userRegister,
    cardTemplate,
    dialogAvatar,
    previewBottom,
    newcardUserinfo,
  }
}
</script>

<style lang="css" scoped>
@import "~static/css/newcard/index.css";
.hide-pancel {
  transform: translateX(100px)
}
.newmb_mk1 {
  min-height: 140px;
}
.rotate {
  transform-origin:44% 43%;
  animation: rotate 0.8s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
