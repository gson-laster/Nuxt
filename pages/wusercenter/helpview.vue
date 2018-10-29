<template>
<div class="usingview box white-bg">
	<div class="title">
		<p>{{content.dreamTitle}}</p>
		<p>{{time(content.dreamUpdatetime)}} <span @click="path">{{userInfo.dreamFullname}}</span></p>
	</div>
	<div class="content"
	     v-html="content.dreamContent">

	</div>
</div>
</template>

<script>
import wechat from "~/static/mixins/wechat.js";

import { helpList } from '~/apis/user.js'
import { returnTime } from '~static/js/util.js'
import keepUserOnline from '~static/js/keepUserOnline'
import { mapGetters } from 'vuex'
export default {
	async asyncData({ query }) {

		let res = await helpList({ id: query.id })
		return {
			content: res.data.data,
			userInfo: {}
		}
	},
	head() {
		return {
			title: this.content.dreamTitle,
			meta: [{
				hid: 'description',
				name: 'description',
				content: this.content.dreamKeyword
      }]
		}
	},
	mixins: [wechat],
	async beforeMount() {
		const url = window.location.href
		const shareOpts = {
			title: `${this.content.dreamTitle}`, // 分享标题
			desc: `${this.content.dreamKeyword}-使用帮助`, // 分享描述
			link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: this.content.dreamDefaultpicurl.indexOf('http') != -1 ? this.content.dreamDefaultpicurl : `http://${window.location.host}/${this.content.dreamDefaultpicurl}`, // 分享图标
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
		time(time) {
			let t = returnTime(time, '-', false)
			return t
		},
		path() {
			delete this.query.id
			this.$router.push({
				path: '../../newcard',
				query: this.query
			})
		}
	},
	created() {
		//    this.$store.dispatch('setFooterShow', false)
//		userInfo     
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
	},
	computed: {
		...mapGetters({
			query: 'get_router_query',
//			userInfo: 'getUserInfo'
		})
	}
}
</script>

<style scoped>
.title {
	padding: 9px;
}

.title p:first-child {
	font-size: 20px;
	font-weight: 600;
}

.content {
	padding: 0 10px;
}

.title p:last-child {
	padding-top: 4px;
	font-size: 18px;
}

.title span {
	padding-left: 6px;
}
</style>
