<template>
  <div>
    <div class="shadow prestore" v-if="isLayerShow" @click="hideShadow">
		<div class="recruit-layer">
			<header class="header">
				<span>{{title}}</span>
				<div class="close-btn">x</div>
			</header>
			<p class="bottom">{{content}}</p>
		</div>
	</div>
  <section class="container prestore">
		<header class="header"></header>
		<div class="content">
			<div class="text-hint">请选择预存额度</div>
			<div class="list" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
				<ul>
					<!-- <li class="li active" data-money="2000" data-number="10">2000 (10个名额)</li>
					<li class="li" data-money="5000" data-number="40">5000 (40个名额)</li>
					<li class="li" data-money="10000" data-number="100">10000 (100个名额)</li> -->
          <li v-for="(item,index) in list" v-bind:key="index" class="li" :class="{active:activeIndex==index}" @click="activeIndex=index">{{item.money}}({{item.num}}个名额)</li>
				</ul>
				<a href="javascript:;" class="confirmBtn" @click="submitConfirm()">确认申请</a>
			</div>
		</div>
	</section>
   </div>
</template>

<script>
import { editorPurpose } from "~/apis/agents";
import keepUserOnline from '~static/js/keepUserOnline'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: 0,
      list: [
        { num: 10, money: 2000 },
        { num: 40, money: 5000 },
        { num: 100, money: 10000 }
      ],
      title: "报名成功",
      content: "稍后客服人员会跟您联系！",
      isLayerShow: false,
      userInfos: {}
    };
  },
//computed: {
//  ...mapGetters({
//    userInfos: "getUserInfo"
//  })
//},
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
    middleware: ["auth"],
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfos = res.user
      })
    },
  methods: {
    submitConfirm() {
      let data = {};
      data.dreamPurposename = this.userInfos.dreamUsername;
      data.dreamPurposenickname = this.userInfos.dreamFullname;
      data.dreamOpenprimit = this.list[this.activeIndex].num;
      data.dreamPrice = this.list[this.activeIndex].money;
      editorPurpose(data)
        .then(res => {
          if (res.code == 2000) {
            if (!res.data.hasOwnProperty("code")) {
              this.isLayerShow = true;
            } else {
              if (res.data.code == 40002) {
                this.title = "报名失败";
                this.content = res.data.data;
                this.isLayerShow = true;
              } else if (res.data.code == 40003) {
                this.title = "报名失败";
                this.content = res.data.data;
              } else {
                this.title = "报名失败";
                this.content = "请联系客服";
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    hideShadow() {
      this.isLayerShow = false;
    }
  }
};
</script>
<style scoped>
.prestore.shadow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.recruit-layer {
  font-size: 14px;
  position: fixed;
  width: 278px;
  height: 140px;
  background-color: #fff;
  z-index: 400;
  bottom: 100px;
  left: 50%;
  transform: translate3d(-50%, -90%, 0);
}
.recruit-layer .header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  line-height: 50px;
  position: relative;
}
.recruit-layer .header .close-btn {
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  right: 20px;
  color: #ff0000;
  line-height: 24px;
}
.recruit-layer .bottom {
  height: 89px;
  line-height: 89px;
  color: #ffaa00;
  text-align: center;
}

.prestore.container .header {
  width: 100%;
  height: 150px;
  background: url("~static/img/wusercenter/prestore_bg.png");
  background-size: 100% 150px;
  background-repeat: no-repeat;
}
.prestore .content {
  width: 90%;
  text-align: center;
  font-size: 15px;
  margin: 0 auto;
}
.prestore .content .text-hint {
  font-size: 15px;
  color: #000;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-top: 40px;
}
.prestore .list .confirmBtn {
  display: block;
  width: 90%;
  margin: 40px auto 40px auto;
  height: 50px;
  line-height: 50px;
  background-color: #ffaa00;
  border-radius: 6px;
  color: #fff;
}
.prestore .content .list .li {
  width: 100%;
  background-color: #f3f3f3;
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
  border: 1px solid #ccc;
  position: relative;
}
.prestore .list .li.active {
  background: #ffe7b6;
  border: 1px solid #ffaa00;
  color: #ffaa00;
}
.prestore .list .li.active:after {
  content: "";
  display: block;
  width: 52px;
  height: 100%;
  background: url("~static/img/wusercenter/check_mark.png");
  background-repeat: no-repeat;
  background-size: 30px auto;
  position: absolute;
  right: 0;
  top: 0;
  background-position: center;
}
</style>
