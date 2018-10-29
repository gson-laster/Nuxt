<template>
<div class="box cardIndex">
	<div :class="['music-btn iconfont '+musicIcon]"
	     @click="musicPlay"
			 >
		<audio :src="userInfos.dreamMusic"
		       autoplay="autoplay"
		       style="display:none"
		       ref="musicEle"></audio>
	</div>
	<!-- 轮播图 -->
	<div class="banner">
		<banner :bannerList="bannerList"></banner>
	</div>
	<!-- 旧名片模板 -->
	<card-template
  :userInfos="userInfos"
  :query="setQuery()"
  @showDialog="showDialog"
  :dreamTemplate ="dreamTemplate"
  :templateClassName = "templateClassName"
  v-if="dreamTemplate<=13&&isoldTemplateShow"
  ></card-template>

	<!-- 新名片模板-start-->
	<div v-if="dreamTemplate>13&&!isoldTemplateShow">
	<div class="newcard-userInfo clearfix">
		<!-- 申请名片 -->
		<nuxt-link :to="{path:'/register',query:setQuery()}" v-show="isApplyShow">
			<div class="apply-card">
				<i class="iconfont icon-emoji"></i>
				<span class="text">申请名片</span>
			</div>
		</nuxt-link>
		<div class="user-avatar-container">
			<div class="user-avatar"
			     @click="showDialog">
				<img :src="(isPreview || userInfos.dreamImg == null || userInfos.dreamImg =='')?avatar:setImgUrl({src:userInfos.dreamImg,w:120,h:120,q:0})"
				     alt="">
			</div>
			<div class="qrcode iconfont icon-icon-QR-code"></div>
		</div>

		<div class="user-desc">
			<h3 class="title">{{nickName}}</h3>
			<div class="text">{{comments}}</div>
			<!-- <div class="collect icon iconfont icon-like">收藏</div> -->
		</div>
		<div class="userLink"
		     ref="userLinkLen"
		     v-show="linkWarrpStatus">
			<ul class="linkContainer"
			    @touchstart="navStart"
			    @touchmove="navMove"
			    @touchend="navEnd"
			    ref="moveUl">
				<li v-for="(item,index) in userMenu"
				    v-bind:key="index"
				    :style="{width: itemLiWidth + 'px'}"
				    ref="linkItem">
					<nuxt-link :to="{path:item.dreamUrl,query:setQuery()}" v-if="index!==userMenu.length-1">
						<div class="icon iconfont"
						     :class="['icon-'+item.dreamCss,colorTheme]"></div>
						<p>{{item.dreamMenuname}}</p>
					</nuxt-link>
					<a v-else
					   :href="item.dreamUrl">
						<div class="icon iconfont"
						     :class="['icon-'+item.dreamCss,colorTheme]"></div>
						<p>{{item.dreamMenuname}}</p>
					</a>
				</li>
			</ul>
		</div>
		<div class="left icon iconfont icon-rights"
		     :style="{transform:rotate}"
		     @click.stop="toLeft"></div>
		<div class="right icon iconfont icon-rights"
		     @click.stop="toRight"></div>
	</div>

	<div class="user-detail">
		<ul>
			<li class="item"
			    :class="[colorTheme+'-barrage']"
					style="flex-direction:column"
					>
					<p v-for="(item,index) in componeyAndServiceName" :key="index">{{item.dreamCompanyname}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.dreamServicename}}</p>
			</li>
			<li class="item">
				<p :class="[colorTheme+'-mobile']"
				   style="margin-left:0px;padding-left:30px;background-position:left center;"><a  :href="'tel:'+userInfos.dreamMobile">
					{{userInfos.dreamMobile == '' || userInfos.dreamMobile == null ? '您的电话号码' : userInfos.dreamMobile}}
					</a>
				</p>
				<p :class="[colorTheme+'-mobile']"
				   style="margin-left:8px;padding-left:30px;background-position:left top;"
				   v-show="userInfos.dreamMobile2">{{userInfos.dreamMobile2}}</p>
			</li>
			<li :class="['item', colorTheme+'-mail']"
			    v-show="userInfos.dreamEmail">
				<p>{{userInfos.dreamEmail}}</p>
			</li>
			<li :class="['item', colorTheme+'-QQ']"
			    v-show="userInfos.dreamQq">
				<p>{{userInfos.dreamQq}}</p>
			</li>
			<li :class="['item',colorTheme+'-coordinates']"
			    v-show="userInfos.dreamAddress">
				<p>{{userInfos.dreamAddress}}</p>
			</li>
		</ul>
	</div>
	</div>
<!-- 新名片模板-end-->

	<div class="modify-detail-container">
  	<div class="modify-detail"
  	     @click="showSelectPanel"
  	     v-show="isShowModify">
  		<span class="arrow iconfont icon-iconfontjiantou"></span>
  		<p class="text">修<br>改</p>
  	</div>

	<div class="select-detail"
	     :style="{transform:translateX}">
		<div class="left iconfont icon-rights"
		     @click="hideSelectPanel"
				 ></div>
		<div class="right">
			<ul>
				<nuxt-link :to="{path:item.path,query:setQuery()}"
				           v-for="(item,index) in pathList"
				           v-bind:key="index">
					<li :class="['item iconfont','icon-'+item.className]">
						{{item.name}}
					</li>
				</nuxt-link>
			</ul>
		</div>
	</div>
	</div>

	<div class="innav"
	     v-if="!isWVBrand">
		<div id="articleContainer"
		     style="padding:10px;"
		     v-html="brandInfo.dreamCardcontent">
		</div>
	</div>
	<!-- 非预览并且brand为0才显示 -->
	<wv-brand v-if="isWVBrand"></wv-brand>
	<user-register :brand="brandInfo.dreamBrandtitle"
	               @submit="submit"
	               :recommender="userInfos.dreamUsername"
	               :isSubmit="isSubmit"
	               :submitText="submitText"
	               v-show="isShowModify"></user-register>

	<newcard-userinfo :userInfo="userInfos" :query="setQuery()"></newcard-userinfo>

	<dialog-avatar v-show="!isPreview&&isDialogShow"
	               @closeAvatar="closeAvatar"
	               :userinfo="userInfos"
	               :query="query"></dialog-avatar>
	<preview-bottom v-show="isPreview"></preview-bottom>
</div>
</template>
<script>
import setQuery from "~/static/mixins/setQuery.js";
import setImgUrl from "~static/mixins/setImgUrl.js";
import wechat from "~/static/mixins/wechat.js";
import expired from "~/static/mixins/expired.js";
import { getBannerList } from "~/apis/banner";
import appconf from "~/app.config";
import { orderlytc } from "~/apis/travel";
import { getBrandList } from "~/apis/brand";
import { editorusermenu, getusermenu } from "~/apis/usermenu";
import { fecthUserInfo } from "~/apis/user";
import { mapGetters } from "vuex";
import { setBanner } from "~static/js/util";
import { cradTemplateListz } from "~/apis/brand.js";
import newcardUserinfo from "~components/avatarAndQrcode/user_card"
import banner from "~components/banner";
import wvBrand from "~pages/newcard/_wvBrand";
import userRegister from "~components/card/userRegister";
import dialogAvatar from "~pages/newcard/dialog/dialog_avatar";
import previewBottom from "~components/preview";
import cardTemplate from "~pages/newcard/template/index";
import keepUserOnline from '~static/js/keepUserOnline'

export default {
  async asyncData({ store, query, route }) {
    let isPreview = false;
    let brand = null;
    let userInfos = {}, brandInfo = {}
    //是否为预览状态;
    if (query.hasOwnProperty("is_preview")) {
      let recder = userInfos.dreamTjrid;
      isPreview = true;
      brand = query.preview_brand;
      //获取推荐人信息;
      await fecthUserInfo({dreamUsername: recder })
        .then(res => {
          userInfos = res.userInfo[0];
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      isPreview = false;
      brand = query.brand;
      let userData = await keepUserOnline(route, 'brand.user')
      userInfos = userData.user
      brandInfo = userData.brand
    }
    let bannerData = [];
    if (userInfos.dreamBanner && userInfos.dreamBanner != "") {
      let userBannerArr = setBanner(userInfos.dreamBanner);
      userBannerArr.map((v, i) => {
        bannerData.push({
          dreamTitle: i,
          dreamDefaultpicurl: v
        });
      });
    } else {
      let bannerList = await getBannerList({ dreamBrandid: brand, dreamIsok: true})
      bannerData = bannerList;
		}
    store.dispatch("setFooterShow", true);
    return {
	  //  query: query,
      bannerList: bannerData,
      isPreview: isPreview,
      userInfos: userInfos,
			brandInfo: brandInfo,
			dreamTemplate: userInfos.dreamCardtemplate,
			title: store.state.previewTitle
    };
  },
	head() {
    let title = ''
    let userFullName = ''
    if(this.userInfos && this.userInfos.dreamFullname && this.userInfos.dreamFullname != '') {
      userFullName = this.userInfos.dreamFullname
    }
    if(this.title && this.title != '') {
      title = this.title
      if(userFullName != '') title += '-' + userFullName
    }else {
      let brandTitle = (this.brandInfo && this.brandInfo.dreamBrandtitle) ? this.brandInfo.dreamBrandtitle : ""
      if(userFullName != '') title = brandTitle + '-' + userFullName
    }
		return {
      title: this.isPreview? this.title: this.brandInfo.dreamBrandtitle
		};
	},
  data() {
    return {
      userInfos: {},
      bannerList: [],
      brandInfo: {},
      dreamTemplate: 0,
      translateX: "translateX(100px)",
      rotate: "rotate(180deg)",
      userList: [],
      isDialogShow: false,
      pathList: [
        {path: "/newcard/modifydata",className: "brush",name: "资料"},
        {path: "/newcard/selectTheme",className: "refresh",name: "风格"},
        {path: "/wusercenter/changebgmusic",className: "systemprompt",name: "音乐"},
        {path: "/wusercenter/brand",className: "select",name: "品牌"}
      ],
      touchStep: [],
      transX: 0,
      distanceX: 0,
      isTransition: false,
      href: "", //记录css路径,
      avatar: appconf.preview.search_avatar,
      isShowModify: false,
      itemLiWidth: 0,
      navKickBackTimer: null,
      musicIcon: "icon-muisc_close1",
      isMusicClick: false,
      isSubmit: false,
      submitText: "提交",
      linkWarrpStatus: false, // 图标状态,
      isApplyShow: false,
      colorTheme: "", //颜色主题
     // dreamTemplate: 0, //用户当前选择的模板
			templateClassName:'', //需要加载的类名,
			userMenu:[],
			elemHeight:'120px',
			isoldTemplateShow:false
			// template:1

    };
  },
	beforeRouteLeave(to,from,next){
		if(!this.query.hasOwnProperty('is_preview')){
			 	next(true)
		}else{
			 if(to.path=='/wusercenter'||to.path=='/'){
				  next(true)
			 }
		}
	},
	computed: {
		...mapGetters({
			query: 'get_router_query',
			isLogin: 'getLoginState',
			brandInfos: 'getBrandInfo',
			previewTitle: 'getPreviewTitle'
		}),
		isWVBrand() {
			let query = this.$store.getters.get_router_query
			let isWV = false
			if (query.hasOwnProperty('is_preview')) {
				if (query.preview_brand == 0) {
					isWV = true
				} else {
					isWV = false
				}
			} else {
				if (query.brand == 0) {
					isWV = true
				} else {
					isWV = false
				}
			}
			return isWV
		},
		// 预览装填不显示右边修改按钮;
		//预览状态显示昵称;
		nickName() {
			return this.isPreview ||this.userInfos.dreamFullname == "" ||this.userInfos.dreamFullname == null ?" " :this.userInfos.dreamFullname;
		},
		//预览状态下的备注;
		comments() {
			return this.isPreview ||this.userInfos.dreamContent == "" ||this.userInfos.dreamContent == null ?" " :this.userInfos.dreamContent;
		},
		componeyAndServiceName() {
			let companyText = "",companyArr=[]
			if (this.isPreview ||!this.userInfos.dreamCompanyname){
				companyText = "您的公司名称"
				companyArr[0] = companyText
			} else {
				companyText = this.userInfos.dreamCompanyname;
				if(companyText.indexOf('|$|')){
					companyArr = companyText.split('|$|')
				}
			}
			let serviceName = "",serviceNameArr=[]
			if (this.userInfos.dreamServicename == null ||this.userInfos.dreamServicename == "") {
				serviceName = "您的职位名称"
				serviceNameArr[0] = serviceName
			} else {
				serviceName = this.userInfos.dreamServicename;
				if(serviceName.indexOf('|$|')){
					serviceNameArr = serviceName.split('|$|')
				}
			}
			// 公司名称与职位名称谁更长;
			let iteraData = []
			if(companyArr.length>serviceNameArr.length){
				 iteraData = serviceNameArr
			}else{
				iteraData = companyArr
			}

			//拼接公司名称和职称;
			let data = {}
			let dataArr = []
			for(let i in iteraData){
					dataArr.push({dreamCompanyname:companyArr[i],dreamServicename:serviceNameArr[i]})
			}
			return dataArr
		}
	},
	async beforeMount() {
		let winWidth = 0
		winWidth = window.innerWidth;
		if (winWidth > 640) {
			winWidth = 640;
		}
		this.itemLiWidth = (winWidth - 36) / 4;
		this.linkWarrpStatus = true

    var url = "";
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split("#")[0];
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
		let userImg = ''
		if (this.userInfos.dreamImg) {
			userImg = this.userInfos.dreamImg.indexOf('http') != -1 ? this.userInfos.dreamImg : 'http://' + window.location.host +'/'+ this.userInfos.dreamImg
		} else {
			userImg = this.avatar
		}
		let shareTitle,shareDesc
		if(this.query.brand==0){
			shareTitle=this.$store.getters.getSiteConfig.dreamSitename
			shareDesc = this.$store.getters.getSiteConfig.dreamSitedescription
		}else{
			shareTitle = this.brandInfo.hasOwnProperty('dreamBrandtitle')? this.brandInfo.dreamBrandtitle : ''
			shareDesc = this.brandInfo.dreamBranddescription
		}
		console.log('userImg',userImg);

		const shareOpts = {
			title:shareTitle, // 分享标题
			desc: shareDesc, // 分享描述
			link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: userImg, // 分享图标
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
    this.expired(this.userInfos.dreamEndtime)
	},
	mounted() {
		let winWidth = 0;
		winWidth = window.innerWidth;
		if (winWidth > 640) {
			winWidth = 640;
		}
		this.itemLiWidth = (winWidth - 36) / 4;
		this.linkWarrpStatus = true;
    this.musicAutoPlay();
    if (this.query.hasOwnProperty('ouid') && this.query.hasOwnProperty('obrand')){
      let json = {uid: this.query.ouid, brand: this.query.obrand}
      this.$store.dispatch('setRouterQuery', json)
		}
		// console.log(this.brandInfo);
	},
 	async	created() {
	  // 获取所有模板信息;
    let result = await cradTemplateListz({ pageSize:30});
    let templateValue = null;
    let templateCss = null;
    // 根据模板css地址来区分引入不同的模板样式
		//this.dreamTemplate = this.userInfos.dreamCardtemplate;
    if (!result.hasOwnProperty("code")) {
      for (let value of result.result) {
        if (value.id == this.dreamTemplate) {
          templateValue = value;
          break;
        }
      }
    } else {
      console.log("获取模板列表失败");
    }
    // 是否存在
    if (this.dreamTemplate && this.dreamTemplate != "null") {
      //  新模板
      if (Number(this.dreamTemplate) > 13) {
        templateCss = templateValue.dreamCardtemplatecss;
        this.colorTheme = templateCss.split("/")[1];
        console.log(this.colorTheme);
        templateCss = templateCss.split("/")[2];
				require(`~static/css/newcard/template/${templateCss}`);
				this.isoldTemplateShow = false
      } else {
				//旧模板,并且不显示修改资料的选项;
				this.pathList[0].path = '/wusercenter/editdata'
        if (this.dreamTemplate == 1 ||this.dreamTemplate == 3 ||this.dreamTemplate == 6) {
          templateCss = templateValue.dreamCardtemplatecss;
          templateCss = templateCss.split("/")[1]; //获取css地址
          require(`~static/css/newcard/template/${templateCss}`);
        } else {
          templateCss = templateValue.dreamCardtemplatecss;
          templateCss = templateCss.split("/")[1];
          this.templateClassName = templateCss.split('.')[0]
          console.log(templateCss);
          let a = require(`~static/css/newcard/template/cardmb_5.css`);
          require(`~static/css/newcard/template_icon/${templateCss}`);
				}
				this.isoldTemplateShow = true
      }
    } else {
			// 未选择名片模板默认蓝色模板id=17;
			require(`~static/css/newcard/template/cardmb_15.css`);
			this.isoldTemplateShow = false
      console.log("没有选择名片模板");
    }
		//根据用户是否登录显示修改按钮;
		if (this.isLogin) {
			this.isApplyShow = false
			if (!this.isPreview) {
				this.isShowModify = true
			} else {
				this.isShowModify = false
			}
		} else {
			this.isShowModify = false
			this.isApplyShow = true
		}
	   // ====根据模板的id判断是否发送新模板的请求(模板id>13为新模板)-start====//
		// 新模板图标;
		if(this.dreamTemplate>13){
			let userMenuRes = await getusermenu({dreamUsername:this.userInfos.dreamUsername})
		// console.log(userMenuRes)
	 	if(!userMenuRes.hasOwnProperty('code')){
			 if(userMenuRes.length>0){
					// 已经存了新模板图标;显示新模板图标;
				  this.userMenu = userMenuRes
			 }else{
				//  没有新模板图标;显示配置默认的;并且发送批量图标至数据库;
				this.userMenu = appconf.card_nav
				let data = {}
				let userMenuArr = []
				appconf.card_nav.map((value,index)=>{
						userMenuArr.push({
								dreamCss: value.dreamCss,
								dreamMenuname: value.dreamMenuname,
		 						dreamUrl: value.dreamUrl,
		 						dreamUsername: this.userInfos.dreamUsername,
		 						dreamZid: 666   //修改页面排序图标
						})
				})
				let sendUserMenu = await editorusermenu({str:JSON.stringify(userMenuArr)})  //返回修改的条数;
			  if(sendUserMenu){
					 console.log('存储新图标成功')
				}else{
					this.userMenu =appconf.card_nav
					console.log('存储新图标失败')
				}
			 }
		 }
		}
	   // ====根据模板的id判断是否发送新模板的请求-end====//
   },
	methods: {
		navMove(event) {
			this.$refs.moveUl.style.transition = "";
			this.isTransition = false;
			this.touchStep.push(event.changedTouches[0].pageX);
			this.distanceX =
				this.touchStep[this.touchStep.length - 1] -
				this.touchStep[this.touchStep.length - 2];
			this.transX += this.distanceX;
			this.$refs.moveUl.style.transform = "translateX(" + this.transX + "px)";
		},
		navStart(event) {
			this.touchStep.push(event.changedTouches[0].pageX);
		},
		navEnd() {
			// 清除定时器
			if (this.navKickBackTimer) {
				clearTimeout(this.navKickBackTimer);
			}
			//获取moveUl的长度;
			let moveLen = this.getMoveUlLen();
			this.touchStep = [];
			this.isTransition = true;
			if (this.distanceX < 0) {
				this.transX = -moveLen;
			} else {
				this.transX = 0;
			}
			//根据图标个数来计算是否可以再向左拉动;
			if (this.userMenu.length <= 4) {
				this.transX = 0;
			}
			this.$refs.moveUl.style.transform = "translateX(" + this.transX + "px)";
			this.$refs.moveUl.style.transition = "all ease-in-out 0.3s";
			this.navKickBack();
		},
		showSelectPanel() {
			this.translateX = "translateX(0px)";
			this.isShowModify = false;
		},
		hideSelectPanel() {
			this.translateX = "translateX(100px)";
			this.isShowModify = true;
		},
		// 显示用户二维码;
		showDialog() {
			if (this.isPreview) {
				this.isDialogShow = false;
			} else {
				this.isDialogShow = true;
			}
		},
		closeAvatar() {
			this.isDialogShow = false;
		},
		// 往左移;
		toRight() {
			if (this.userMenu.length <= 4) {
				return;
			}
			if (this.transX > -this.getMoveUlLen()) {
				this.transX = -this.getMoveUlLen();
				this.$refs.moveUl.style.transform = "translateX(" + this.transX + "px)";
				this.$refs.moveUl.style.transition = "all ease-in-out 0.5s";
			}
			this.navKickBack();
		},
		// 往右移动;
		toLeft() {
			if (this.transX == 0) {
				return;
			} else {
				this.transX = 0;
				this.$refs.moveUl.style.transform = "translateX(" + this.transX + "px)";
				this.$refs.moveUl.style.transition = "all ease-in-out 0.5s";
				setTimeout(() => {
					this.$refs.moveUl.style.transition = "";
				}, 500);
			}
		},
		// 提交用户信息;
		submit(res) {
			orderlytc(res)
				.then(res => {
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
		// 获取移动的ul的长度;
		getMoveUlLen() {
			let moveUl = this.$refs.moveUl.getBoundingClientRect();
			let right = moveUl.right,
				left = moveUl.left;
			return right - left;
		},
		// 设置导航回弹;
		navKickBack() {
			if (this.transX < 0) {
				this.navKickBackTimer = setTimeout(() => {
					this.$refs.moveUl.style.transform = "translateX(0px)";
				}, 5000);
			}
		},
		// 设置音乐播放;
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
		// 设置音乐自动播放;
		musicAutoPlay() {
			let musicEle = this.$refs.musicEle;
      let play = function(){
        musicEle.play();
        document.removeEventListener("touchstart",play, false);
      };
      musicEle.play();
      document.addEventListener("WeixinJSBridgeReady", function () {//微信
         play();
      }, false);
      document.addEventListener("touchstart",play, false);
		}
	},
  mixins: [wechat, setQuery, setImgUrl, expired],
  components: {
    previewBottom,
    newcardUserinfo,
    banner,
    wvBrand,
    userRegister,
    dialogAvatar,
    cardTemplate
  },
};
</script>
<style>
/* @import "~static/css/newcard/index.css"; */
.innav {
  width: 100%;
  margin: 0 auto 20px;
  clear: both;
  line-height: 23px;
  font-size: 16px;
  background-color: #fff;
}
.innav .articleContainer {
  padding: 10px;
}
.innav img {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}
.innav p {
  margin: 5px 0;
  font-size: 16px;
}
</style>
