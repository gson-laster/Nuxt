<template>
<div class="new_login box bg">
  <div class="new_login_logo">
    账号登录
  </div>
  <div class="new_login_con">
    <div class="new_login_input1">
      <div class="img loginname">

      </div>
      <input v-model="data.username"
             type="text"
             class="input"
             placeholder="请用手机号登录网站">
    </div>
    <div class="new_login_input2">
      <div class="img loginpassword">

      </div>
      <input v-model="data.password"
             type="password"
             class="input"
             placeholder="请输入密码">
    </div>
  </div>
  <div class="btnbox">
    <input @click="login"
           type="button"
           class="login-btn"
           value="登录名片">
  </div>
  <div class="new_login_nav">
    <span @click="findPassword">找回密码</span> | 返回首页
  </div>
  <div class="new_login_navwx" @click="bindwx()">
    <div class="img wx">

    </div>
    <!--<a href="http://www.wvmp360.com/wxlogin/wxuserinfo/">-->
    <span >微信登录</span>
    <!--</a>-->
  </div>
</div>
</template>

<script>
import { userLogin } from "~/apis/user";
import { mapGetters } from "vuex";
import querystring from 'querystring'
import {declassify } from "~static/js/util";
import {doLogin} from '~static/js/login'
import wechat from '~/static/mixins/wechat.js'

export default {
  head(){
    return {
      title: "登录"
    };
  },
  data() {
    return {
      data: {
        username: "",
        password: ""
      },
      isOkLogin: true,
      timer: ''
    };
  },
  beforeCreate() {
    this.$store.dispatch("setFooterShow", false);
    this.$store.dispatch("setRouterQuery", {});
  },
  async beforeMount() {
    let url = ''
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
    const shareOpts = {
      title: '登录', // 分享标题
      desc: '值享云名片-登录', // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `http://${window.location.host}/UploadFiles/1489999753693.jpg`, // 分享图标
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
  mixins: [wechat],
  methods: {
    async login() {
      if (this.isOkLogin) {
      	this.isOkLogin = false
        this.timer = setTimeout(()=> {
      	  this.isOkLogin = true
        }, 2500)
      if(!this.data.username||!this.data.password){
        this.$msg('请输入用户名或密码!!')
        return
      }
      let userLoginData = await userLogin(this.data);
      if(userLoginData.data.code == 2000){
         if(!userLoginData.data.data.hasOwnProperty('code')){
            doLogin(userLoginData.data.data, this)
         }else{
           if(userLoginData.data.data.code==40001){
              this.$msg(userLoginData.data.data.data)
      	      this.isOkLogin = true
              return false
           }
         }
      } else {
      	  this.isOkLogin = true
      }
      }

    },
    findPassword () {
      this.$router.push({
        path: 'wusercenter/inlineservice',
//      query:{uid: '', brand: ''}
      })
    },
    bindwx(){
      let {
        query
      } = this.$route
      //fullPath = encodeURIComponent(fullPath.substr(1))
      query.uid = declassify(query.uid)
      //console.log('http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&bindewx=login_bindwx');
      return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&bindewx=login_bindwx'
    }
  },
  destroyed(){
    clearTimeout(this.timer);
  }
};
</script>
<style>
@import "~static/css/wusercenter/img.css";
@import "~static/css/login/index.css";
</style>
