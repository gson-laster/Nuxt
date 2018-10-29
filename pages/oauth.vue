<template>
<p></p>
</template>

<script>
function getUrlParam(param) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  const result =  window.location.search.substr(1) ? window.location.search.substr(1).match(reg) : ''
  return result ? decodeURIComponent(result[2]) : null
}
import {getWechatOAuth,createVipOrder} from '~/apis/wechat'
import {numToCharacter, declassify} from '~static/js/util'
import wechat from '~/static/mixins/wechat.js'
import { fecthUserInfo } from '~/apis/user'
// import keepUserOnline from '~/static/js/keepUserOnline'
export default {
  head() {
    return {
      title: 'loading'
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created() {
    this.$store.dispatch('setFooterShow', false)
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

    let wechatUserData = await getWechatOAuth(url)
    wechatUserData = wechatUserData.data
    if (wechatUserData.success) {
      await this.$store.dispatch('setAuthUser', wechatUserData.user)
      const paramsArr = getUrlParam('state')
        .split('__')
      let queryObj = {}
      for (let i = 0; i < paramsArr.length; i++) {
        let tmpArr = paramsArr[i].split('_')
        queryObj[tmpArr[0]] = tmpArr[1]
      }

      //console.log(visit);
      let username = queryObj.uid ? queryObj.uid : this.$store.getters.getUserInfo.dreamUsername
      let res = await createVipOrder({
        username: username,
        openId: wechatUserData.user.openid,
        type: queryObj.type,
        wecahtFree: queryObj.free ? queryObj.free : 0
      })
      let { data } = res
      let _this = this
      await this.wechatInit(url, {}, false)

      console.log('pay begin');
      window.wx.chooseWXPay({
        timestamp: data.args.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.args.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.args.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.args.paySign, // 支付签名
        success: async (res) => {
          try {
            window.WeixinJSBridge.log(res.err_msg)
          } catch (e) {
            console.error(e)
          }
         if(queryObj.type == 'CloudCardRenew' || queryObj.type == 'CloudCardOpen') {
           this.$store.dispatch('setUserDude', false)  //用户是否过期标识
           let userData = await fecthUserInfo( {
     				dreamUsername: username
     			} )
          let userInfo = userData.userInfo[ 0 ]
          userInfo.dreamCardtemplate = 17
          this.$store.dispatch( 'setUserInfo',  userInfo)
         }
         queryObj.uid = numToCharacter(queryObj.uid)
          this.$msg('支付成功')
          setTimeout(() => {
            this.$router.push({
              path: '/wusercenter',
              query: queryObj
            })
          }, 500)
        }
      })
    }else{
      this.$msg(wechatUserData.msg)
    }
  }
}
</script>
