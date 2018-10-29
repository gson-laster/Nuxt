<template>
<div style="width:100%;overflow:hidden;background-color:#fff;"
     class="article">
	<div class="intitle">
		<span>{{article.dreamTitle}}</span>
	</div>
  <div class="view_reprint" v-if="!isOldWvBrand" @click="reprint()" id="reprint">转载</div>
	<div class="intime">
		<span>{{article.dreamUpdatetime}} </span>&nbsp;&nbsp;
		<nuxt-link :to="{path: 'newcard', query: setQuery(query)}"
		           style="font-size:18px;color:#4a6c92; font-family:">{{ userInfo ? userInfo.dreamFullname : ''}}</nuxt-link>
	</div>
	<div class="innav">
		<div class="articleContainer"
		     style="padding:10px;"
		     v-html="article.dreamContent">
		</div>
	</div>
	<user-card :userInfo="userInfo" :query="setQuery(query)" v-if="isCheck"></user-card>
  <div class="isNoCheck" v-else>
    <img src="~static/img/article/wrz.jpg" alt="">
  </div>
	<article-bottom :query="query"
	                :articleList="articleList"></article-bottom>
  <v-dialog :show="dialogStatus" :cancelStatus="false" @confirm="dialogConfirm" content="转载成功!"></v-dialog>
  <preview-pic container=".articleContainer"></preview-pic>
  <div class="go-to-new-wv" v-if="isOldWvBrand" @touchstart="goNewWvBrand()">
    <span>切换到新版本WorldVentures</span>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import {fecthUserInfo, change} from '~/apis/user'
import wechat from '~static/mixins/wechat'
import expired from '~static/mixins/expired'
import setQuery from '~static/mixins/setQuery'
import dialog from '~components/msg/dialog.vue'
import previewPic from '~components/previewPic'
import keepUserOnline from '~static/js/keepUserOnline'
import {numToCharacter, declassify, dateFormat, getCookie, localStore} from "~static/js/util"
import userCard from '~components/avatarAndQrcode/user_card'
import articleBottom from '~components/article/articleBottom'
import {getArticleById, getArticleList, editorCollview} from '~/apis/article'
function CheckCookieSign(cookieStr, username) {
  console.log(cookieStr !== '' , cookieStr.indexOf('loginUser') != -1 );
  if (cookieStr !== '' && cookieStr.indexOf('loginUser') != -1 ) {
    return true
  } else {
    return false
  }
}
export default {
	async asyncData({query, store, route}) {
    let isOldWvBrand = true
		let article = await getArticleById(query.aid, query.brand)
		article.dreamUpdatetime = dateFormat('y-M-d', article.dreamUpdatetime)
		let relativeList = await getArticleList({
			dreamBrandid: query.brand,
			dreamClassid: article.dreamClassid,
			index: 1,
			pageSize: 6
		})

    let userInfo = await keepUserOnline(route, 'user')
    isOldWvBrand = query.brand == 0 ? true : false
		return {
			article: article,
			query: query,
			articleList: relativeList,
      isLogin: store.getters.getLoginState,
      userInfo: userInfo.user,
      isOldWvBrand: isOldWvBrand
		}
	},
	head() {
		return {
			title: this.article.dreamTitle,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.article.dreamDescription
        },
				{
					hid: 'keywords',
					name: 'keywords',
					content: this.article.dreamKeyword
        }
      ]
		}
	},
  data(){
    return {
      dialogStatus: false,
      loginUser: false,
      currentBrand: -1,
      userInfo: null,
      isCheck: true
    }
  },
  mixins: [setQuery, wechat, expired],
	async beforeMount() {
    var url = ''
    // 判断是否是ios微信浏览器
    if ( typeof window.entryUrl === 'undefined' || window.entryUrl === '' ) {
      window.entryUrl = location.href.split( '#' )[ 0 ]
    }
    if (window.__wxjs_is_wkwebview === true) {
      url = window.entryUrl
    } else {
      url = window.location.href.split('#')[0]
    }
    // let shareUrl = /(Android)/i.test( navigator.userAgent ) ? location.href.split( '#' )[ 0 ] : window.entryUrl;
    const shareUrl = 'http://'+window.location.host + '/article?uid=' + encodeURIComponent(this.query.uid) + '&brand=' + this.query.brand + '&aid=' + this.query.aid
    // const shareUrl = 'http://'+window.location.host + this.$route.fullPath
		const shareOpts = {
			title: `${this.article.dreamTitle}`, // 分享标题
			desc: `${this.article.dreamDescription != '' ? this.article.dreamDescription : this.article.dreamTitle}`, // 分享描述
			link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: this.article.dreamDefaultpicurl.indexOf('http') != -1 ? this.article.dreamDefaultpicurl : `http://${window.location.host}/${this.article.dreamDefaultpicurl}`, // 分享图标
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
    this.setUserStatus()
    this.expired(this.userInfo ? this.userInfo.dreamEndtime : 0)
	},
  beforeRouteUpdate(to, from, next){
    this.setUserStatus()
    this.expired(this.userInfo.dreamEndtime)
    next()
  },
  mounted(){
    this.setUserStatus()
    this.$nextTick( () => {
      this.setUserStatus()
    })
  },
  methods: {
    /**
     * 切换到新版本的wv
     * @return {[type]} [description]
     */
    goNewWvBrand () {
      if(CheckCookieSign()) {
        // 已经登录（判断当前默认品牌是否是旧的wv,是切换到新的wv）
        const loginUser = getCookie('loginUser', document.cookie)
        fetchUserInfo({dreamUsername: loginUser}).then(res => {
          if(res.code == 2000) {
            let userData = res.userInfo[0]
            if(userData.dreamBranddefault == 0) {
              // 切换成新的wv
              change({dreamUsername: loginUser, dreamBranddefault: 74}).then(res => {
                if (res.code == 2000) {
                  this.$msg('切换成功')
                }
              }).catch(e => {
                console.log('切换到新版本的wv失败', e);
              })
            }
          }
        }).catch(e => {
          console.log('获取用户信息失败', e);
        })
      }
      this.$router.push({
        path: '/',
        query: {
          uid: this.query.uid,
          brand: 74
        }
      })
    },
    async setUserStatus(){
      // let userData = await fecthUserInfo({dreamUsername: declassify(this.query.uid, 2)})
      // this.userInfo = userData.userInfo[ 0 ]
      let dreamEndTime = this.userInfo.dreamEndtime
      let nowTimeStamp = new Date().getTime();

      if ( dreamEndTime && dreamEndTime !== '' && Number( dreamEndTime ) > Number( nowTimeStamp ) ) {
        this.$store.dispatch( 'setUserDude', false )
        this.isCheck = true
      } else {
        this.$store.dispatch( 'setUserDude', true )
        this.isCheck = false
      }
    },
    /**
     * 转载
     * @return {Promise} [description]
     */
    async reprint() {
      if(!CheckCookieSign(document.cookie, declassify(this.query.uid, 2))) {
        this.$msg('请先登录，再操作!')
        let query = this.query
        query.redirect = '/article?aid='+this.article.id + '&brand='+this.query.brand
        // setTimeout(() => {
        //   this.$router.push({
        //     path: '/login',
        //     query: query
        //   })
        // }, 2000)
      }else{
        // 用户
        let userName = getCookie('loginUser', document.cookie)
        this.loginUser = userName
        let dreamTable = this.query.brand == 0 ? 'wv' : 'brand'
        //if(userName == this.userInfo.dreamUsername) return
        let result = await editorCollview({
          dreamUserid: userName,
          dreamAid: this.article.id,
          dreamTable: dreamTable,
          dreamUrl: '/article',
          dreamHits: this.article.dreamHits,
          dreamImgurl: this.article.dreamDefaultpicurl,
          dreamTitle: this.article.dreamTitle
        })
        if(result.code == 2000) {
          this.dialogStatus = true
        }
      }
    },
    async dialogConfirm(){
      // 重置登录信息（store）
      let userInfo = await fecthUserInfo({dreamUsername: this.loginUser})
      let userResult = userInfo.userInfo[0]
      let userBrand =  userResult.dreamBranddefault;
      this.dialogStatus = false
      // 判断用户的默认品牌是不是等于当前选择的品牌
      if((this.query.brand == 0 && userBrand == 0) || (this.query.brand != 0 && userBrand != 0)) {
        let path = 'http://'+window.location.host+this.$route.path + '?uid='+encodeURIComponent(numToCharacter(this.loginUser, 2))+'&brand='+userBrand + '&aid='+this.article.id
        window.location.href = path
      } else {
        this.$dialog({
          title: '温馨提示',
          content: '当前转载的文章不能在当前使用的品牌中查看,请到会员中心切换品牌后查看！',
          cancelStatus: false
        })
      }
    }
  },
  components: {
		articleBottom,
		userCard,
    'v-dialog': dialog,
    'preview-pic': previewPic
	}
}
</script>
<style>
.article .intitle {
	width: 100%;
	margin: 0 auto;
	clear: both;
	line-height: 35px;
	font-size: 20px;
	font-weight: 700;
	background-color: #fff;
}
.article .intitle span {
	padding-left: 10px;
}
.article .intime {
	line-height: 25px;
	width: 100%;
	margin: 0 auto;
	clear: both;
	background-color: #fff
}
.article .intime span {
	padding-left: 10px;
	font-size: 16px;
}
.article .intime a {
	font-size: 18px;
	color: #4a6c92;
	font-family: '微软雅黑';
	display: inline-block;
}
.article .innav {
	width: 100%;
	clear: both;
	line-height: 23px;
	font-size: 16px;
	background-color: #fff;
}
.article .innav .articleContainer {
	padding: 10px;
}
.article .innav .articleContainer img {
	max-width: 100%;
	max-height: 100%;
	margin: 0 auto;
}
.article .innav .articleContainer p {
	margin: 5px 0;
	font-size: 16px;
}
.view_reprint {
    position: absolute;
    right: 10px;
    /*top: 42px;*/
    background: url(http://www.xzg168.com/images/myspace/reprint.png) 10px 50% no-repeat;
    background-size: 16px;
    color: #448ACA;
    font-size: 14px;
    border: 1px #448ACA solid;
    border-radius: 30px;
    padding: 4px 10px 4px 30px;
    cursor: pointer;
}
.go-to-new-wv {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  line-height: 34px;
  background: rgba(0,0,0,0.6);
  z-index: 19930114;
  padding: 0 20px;
  color: #FFF;
}
.go-to-new-wv span {
  background: #ee8300;
  display: inline-block;
  height: 34px;
  line-height: 34px;
  text-align: center;
  width: 90%;
  margin-top: 7px;
  border-radius: 4px;
}
.go-to-new-wv .arrow {
  font-style: normal;
  display: inline-block;
  width: 34px;
  height: 34px;
  font-weight: 600;
  font-size: 20px;
  float: right;
  margin-right: 12px;
}
</style>
