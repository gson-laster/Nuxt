<template>
<div class="box recruit">

	<div class="container">

		<!-- 很多錢 -->
		<div class="recruit_hand_money">

		</div>
		<!-- 欢迎加入我们 -->
		<img src="~static/img/wusercenter/recruit_circle_hands.png"
		     class="welcome-to">

		<div class="first">
			<div class="first-recruit-title"></div>
			<p class="first-recruit-content">是时候给自己增加一条收入管道了</p>
		</div>

		<div class="second">
			<div class="left-quotation"></div>
			<div class="right-quotation"></div>
			<p class="top">
				<span>超过三千万</span>的直销人用户量的直销人网站
			</p>
			<p>
				日访问量 <span>超过百万</span>级别的平台
			</p>
			<p class="bottom">
				<span>前景无限</span>的巨大市场，现启动代理招募!
			</p>
		</div>

		<div class="third">
			<div class="title">我们代理的优势</div>
			<div class="list">
				<ul>
					<li>零代理费！零风险！</li>
					<li>让你加入就能轻松拥有一份顺带赚钱 <br>的事业!让你团队倍增！
					</li>
					<li>免维护&nbsp;易推广！</li>
					<li>口碑相传，一看就懂的营销神器 <br>无时间投入！
					</li>
					<li>在做自己事业的同时，<br> 顺带推广顺带赚钱！
					</li>
				</ul>
			</div>
		</div>


		<div class="fourth"></div>


		<div class="fifth">
			<p class="title">为什么加入我们</p>
			<div class="list">
				<ul>
					<li>沉淀发展三年的可靠品牌</li>
					<li>专业的技术团队护航,<br>平台持续升级更新
					</li>
					<li>大量营销推广积累,<br> 我们专注用户体验及品质
					</li>
					<li>未来移动营销市场无限大,代理名额有限,<br>招满即止！
					</li>
				</ul>
			</div>
			<div class="description">代理人只面向网站会员，如需了解请登 录名片在会员中心提交意向。</div>
		</div>
	</div>
	<div class="bottom-nav">
		<ul>
			<!-- <li @click="path('./')"><a class="backToUser">返回会员中心</a></li>
      <li><a href="javascript:;" class="attenTo">意向报名</a></li> -->
			<li v-for="(item,index) in list"
			    v-bind:key="index"
			    @click="path(item.path)">
				<a href="javascript:;"
				   :class="item.className">{{item.text}}</a>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	asyncData({ query }) {
		return {
			query: query
		};
	},
	beforeCreate() {
		this.$store.dispatch('setFooterShow', false)
	},
	data() {
		return {
			list: [
				{ className: 'backToUser', text: '返回会员中心', path: '/wusercenter' },
				{ className: 'attenTo', text: '意向报名', path: '/wusercenter/prestore' },
        ]
		}
	},
	methods: {
		//    parameter () {
		//      return this.query
		//    },
		path(i) {
			this.$router.push({
				path: i,
				query: this.query
			});
		}
	}
};
</script>

<style>
@import "~static/css/wusercenter/recruit.css";
</style>
