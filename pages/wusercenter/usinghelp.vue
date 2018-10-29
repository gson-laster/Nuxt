<template>
<div class="box usinghelp">
	<div class="helptop">
		<div class="helpUserImg">
			<img :src="userInfo.dreamImg && userInfo.dreamImg.indexOf('http') != -1 ? userInfo.dreamImg : '/' + userInfo.dreamImg" />
		</div>
		<p>您好! <span>{{userInfo.dreamFullname}}</span></p>
		<div class="loginOuts">
			<nuxt-link v-show="!isShare" :to="{path:'./changepassword', query: query}"><span>修改密码</span></nuxt-link>
			<span v-show="!isShare" @click="loginOut">退出</span>
			<nuxt-link v-show="isShare" :to="{path:'../login', query: query}"><span>登录</span></nuxt-link>
			<nuxt-link v-show="isShare" :to="{path:'../register', query: query}"><span>注册</span></nuxt-link>
		</div>
	</div>
	<ul>
		<li @click="path(i.id)"
		    v-for="i in list">
			<div class="li">
				<div class="title">{{i.dreamTitle}}</div>
				<!-- <p class="dreamKeyword">{{i.dreamKeyword}}</p> -->
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import {helpList,userLoginOut} from '~/apis/user.js'
import {mapGetters} from 'vuex'
import wechat from "~/static/mixins/wechat.js";
import keepUserOnline from '~static/js/keepUserOnline'
import { localStore } from '~static/js/util.js'
export default {
	async asyncData({query}) {
		let data = []
		await helpList().then(res => {
				if (res.data.code == 2000) {
					data = res.data.data
				}
			})
		let isShare = false
		if (query.hasOwnProperty('is_share')) {
			isShare = true
		}
		return {
			list: data,
			isShare: isShare
		}
	},
	head() {
		return {
			title: '名片使用帮助'
		}
	},
  data () {
    return {
      userInfo: {}
    }
  },
	async created() {
		this.$store.dispatch('setFooterShow', true)
    let userData = await keepUserOnline(this.$route, 'user')
    this.userInfo = userData.user
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
			title: `名片使用帮助`, // 分享标题
			desc: `名片使用帮助`, // 分享描述
			link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
  methods: {
		path(id) {
			this.query.id = id
			this.$router.push({
				path: 'helpview',
				query: this.query
			})
		},
		loginOut() {
			userLoginOut()
				.then(res => {
					if (res.data.code == 2000) {
						document.cookie =
							'dreamUsername="";expires=' + new Date(0)
							.toUTCString();
						//          delCookie('loginUser',document.cookie)
						this.$store.dispatch("LoginOut");
						localStore.delete("userInfo");
						localStore.delete("brandInfo");
						localStore.delete("userMenu");
						this.$router.push({
							path: "/login",
							query: {}
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
	computed: {
		...mapGetters({
			query: 'get_router_query',
//			userInfo: 'getUserInfo'
		})
	}
}
</script>

<style>
@import '~static/css/wusercenter/usinghelp.css';
</style>
