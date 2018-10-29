<template>
  <div class="container">
    <!-- 第一页 -->
    <div class="top">
      <div class="top-title"></div>
      <div class="top-phone"></div>

      <div class="top-content">
        <h1>
          每天不到
          <span>1元钱</span>
        </h1>
        <p>让自己的事业广告出现在别人的朋友圈里!</p>
      </div>

      <div class="top-down">
        <div class="white-line"></div>
        <p class="header">轻轻松松把您的事业</p>
        <p class="bottom">传播到移动互联网的每一个角落</p>
      </div>
    </div>

    <!-- 第二页 -->
    <div class="advantage">
      <div class="title">
        <h1>七大优势</h1>
        <p>助力直销商快速拓展事业</p>
      </div>
    </div>

    <!-- 序号1 -->
    <div class="first">
      <h1>个人专属云名片</h1>
      <p>您专属的云名片，助力您的直销事业，让每一个看到您名片的人都有机会成为您的客户。</p>
    </div>

    <!-- 序号2 -->
    <div class="second">
      <h1>专业、免维护的文章库</h1>
      <p>专业的团队每天收集高质量文章，包含品牌文章和优质朋友圈文章供会员分享。</p>
    </div>

    <!-- 序号3 -->
    <div class="third">
      <div class="number_3_pad"></div>
      <h1>
        美文编辑 &nbsp;展示自己 <br>自我记录
      </h1>
      <p>手机编辑文章功能，简单又方便的操作界面，随时用手机写作记录分享朋友圈。</p>
      <div class="bottom-line"></div>
    </div>

    <!-- 序号4-->
    <div class="fourth">
      <h1>一键分享做广告</h1>
      <p>您专属的名片网站，分享出去只有您个人信息，让客户主动找您。</p>
    </div>

    <!-- 序号5 -->
    <div class="fifth">
      <h1>意向客户主动联系</h1>
      <p>通过您链接留下的信息，在意向客户处查看，主动出击。</p>
    </div>

    <!-- 序号6 -->
    <div class="sixth">
      <h1>更多功能满足您的需求</h1>
      <p>在线互动、直销论坛、事业相册、海报编辑等功能，朋友圈最具号召力的展业法宝。我们将不断开发最新潮宣传工具给您使用，让您的广告更具吸引力。</p>
      <p></p>
    </div>

    <!-- 会员费 -->
    <div class="vip-fee">
      <div class="white-line"></div>
      <p>VIP会员费：￥299/年</p>
      <p>如有疑问&nbsp;请联系客服</p>
    </div>
    <!-- 底部导航 -->
    <div class="footer vip">
      <ul flex="box:mean">
        <li v-for="(item,index) in list" v-bind:key="index" @click="router(item.link)">
          <a href="javascript:;">
            <span :class="['iconfont',item.className]"></span>
            <em>{{item.name}}</em>
          </a>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
import {userLoginOut} from '~/apis/user'
import {localStore,declassify} from '~/static/js/util'
import {mapGetters} from 'vuex' 
import querystring from "querystring";
export default {
  data() {
    return {
      path: "",
      list: [
        {name:'退出',className:'icon-cross',link:'/loginout'},
        {name:'联系客服',className:'icon-interactive',link:'/wusercenter/inlineservice'},
        {name:'预览品牌',className:'icon-browse',link:'/preview'},
        {name:'立即开通',className:'icon-arrow',link:'/wusercenter/vip/openNow'},
      ]
    };
  },
  computed: {
    ...mapGetters({
      'routerQuery':'get_router_query',
      'userInfo':'getUserInfo'
    })
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
  methods: {
    loginOut(){
      userLoginOut().then(res=>{
      if (res.data.code == 2000) {
            document.cookie = 'dreamUsername="";expires=' + new Date(0).toUTCString()
            this.$store.dispatch('LoginOut')
            localStore.delete('userInfo')
            localStore.delete('brandInfo')
            localStore.delete('userMenu')
            this.$router.push({
              path: '/login',
              query: {}
            })
          }
      }).catch(e=>{
          console.log(e)
      })
    },
    router(url){
      if(url=="/loginout"){
         this.loginOut() 
      }else if(url=="/wusercenter/vip/openNow"){
        //判断用户是开通还是续费;是否存在dreamEndtime,dreamEndtime跟当前时间戳相比;
        if(this.userInfo.dreamEndtime&&this.userInfo.dreamEndtime!=='null'){
          // 进入续费页
          this.$router.push({
            path:url,
            query:this.routerQuery
          })
        }else{
        // 立即支付  
        let query = this.routerQuery
        query.uid = declassify(query.uid)   
        return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&type=CloudCardOpen'
        }
      }else{
        this.$router.push({
          path:url,
          query:this.routerQuery
        })
      }
    }
  }
};
</script>
<style>
@import "~static/css/vip/vip.css";
</style>
