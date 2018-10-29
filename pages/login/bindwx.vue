<template lang="pug">
div
  .new_login.box.bg(v-if="isShow")
    .new_login_logo
      | 微信绑定
    .new_login_con
      .new_login_input1
        .img.loginname
        input.input(type='text', placeholder='请用手机号绑定微信' v-model="formData.dreamUsername")
      .new_login_input2
        .img.loginpassword
        input.input(type='password', placeholder='请输入密码', v-model="formData.dreamPassword")
    .btnbox
      input.login-btn(@click='login', type='button', value='绑定账号')
  toast(msg="正在登录", :show="showToast")
</template>

<script>
import wechat from '~/static/mixins/wechat.js'
import { getWechatOAuth} from '~/apis/wechat'
import {newgetwxuser, newbd} from '~/apis/user'
import {doLogin} from '~static/js/login'
import toast from "~components/common/toast"
export default {
  data(){
    return {
      isShow: false,
      formData: {
        dreamUsername: '',
        dreamPassword: '',
        type: 1,
        wx: {}
      },
      showToast: false
    }
  },
  methods: {
    async login(){
      let bindResult = await newbd(this.formData)
      if(typeof(bindResult.data) == 'object') {
        doLogin(bindResult.data, this, true)
      }else{
        this.$msg(bindResult.data)
      }
    }
  },
  created(){
    this.$store.dispatch('setFooterShow', false)
  },
  mixins: [wechat],
  async mounted() {

    const url = 'http://' + window.location.host + this.$route.fullPath
    this.showToast = true
    let wechatUserData = await getWechatOAuth(url)
    wechatUserData = wechatUserData.data

    if (wechatUserData.success) {
      //wechatUserData.user
      let wechat_user =wechatUserData.user
      if(wechat_user.hasOwnProperty('code')) {
        this.showToast = false
        this.$msg('授权失败，请返回重新授权')
        return
      }
      try{
        await this.$store.dispatch('setAuthUser', wechat_user)
        // openId
        let openid = wechat_user.openid
        let userInfo = await newgetwxuser(openid)
        if(typeof(userInfo.data) == 'object' && !userInfo.data.hasOwnProperty('code')) {
          // 已经绑定
          this.showToast = false
          doLogin(userInfo.data, this, false)
        }else{
          // 未绑定
          this.isShow = true
          this.showToast = false
          this.formData.wx = JSON.stringify(wechat_user)
        }
      }catch(e) {
        console.log("微信绑定错误", e);
      }
    } else {
      this.$msg("用户信息获取失败")
      throw new Error('用户信息获取失败')
    }
  },
  components: {
    toast
  }
}
</script>

<style lang="css" scoped>
@import "~static/css/wusercenter/img.css";
@import "~static/css/login/index.css";
</style>
