<template>
  <section class="buycode-container box">
    <div class="shadow" v-if="isLayerShow" @click="shadowClick">
		<div class="recruit-layer">
			<header class="header">
				<span>{{title}}</span>
				<div class="close-btn">x</div>
			</header>
			<p class="bottom">{{content}}</p>
		</div>
	</div>
    <header class="header buy-code-bg"></header>
    <div class="content">
      <div class="text-hint">请选择购买数量</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in list" v-bind:key="index" class="li" :class="{active:activeTabIndex==index}"  @click="activeTabIndex=index">
            {{item.num}}个名额
            <span :class="['iconfont',{'icon-select1':activeTabIndex==index}]"></span>
          </li>
        </ul>
        <a href="javascript:;" class="confirmBtn" @click="submit">确认购买</a>
      </div>
    </div>
  </section>
</template>
<script>
import { editorPurpose } from "~/apis/agents";
import keepUserOnline from '~static/js/keepUserOnline'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [
        { num: 10, money: 2000 },
        { num: 20, money: 5000 },
        { num: 50, money: 10000 }
      ],
      activeTabIndex: 0,
      isClick: false,
      isLayerShow:false,
      title:'申请成功',
      content:'稍后客服人员会与您联系!',
      userInfos: {}
    };
  },
//computed: {
//  ...mapGetters({
//    userInfos: "getUserInfo"
//  })
//},
  created(){
     keepUserOnline(this.$route, 'user').then(res => {
      this.userInfos = res.user
    })
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
  methods: {
    submit() {
      if (!this.isClick) {
        let data = {};
        data.dreamPurposename = this.userInfos.dreamUsername;
        data.dreamPurposenickname = this.userInfos.dreamFullname;
        data.dreamOpenprimit = this.list[this.activeTabIndex]["num"];
        data.dreamPrice = this.list[this.activeTabIndex]["money"];
        data.type = "buy";
        editorPurpose(data)
          .then(res => {
            this.isLayerShow = true 
           if(res.code==2000){
              this.isClick =true
              if(res.data.hasOwnProperty('code')){
                 this.title = '申请失败'
                 this.content = res.data.data 
              }
           }else{
              this.title = '申请失败'
              this.content = res.data  
           }
          })
          .catch(e => {
            console.log(e)
          });
      }else{
          this.isLayerShow = true
          this.title = '申请失败'
          this.content = '请勿频繁操作'
      }
    },
    shadowClick(){
      this.isLayerShow = false
    }
  }
};
</script>
<style>
@import "~static/css/wusercenter/buycode.css";
</style>