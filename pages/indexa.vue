<template>
<div class="">
  <button type="button"
          @click="topay()"
          name="button">支付</button>
</div>
</template>

<script>
import wechat from '~static/mixins/wechat'
import {
  createVipOrder
} from '~/apis/wechat'
import {
  selectorFunction
} from '~static/js/util'
export default {
  middleware: 'wechat-auth',
  mixins: [wechat],
  async beforeMount() {
    const url = 'http://' + window.location.host + this.$route.fullPath
    await this.wechatInit(url, {
      title: document.title,
      desc: selectorFunction("meta[name=description]")
        .innerHTML
    })
  },
  methods: {
    async topay() {
      // 获取订单
      console.log('store getAuthUser  ', this.$store);
      let res = await createVipOrder({
        username: 13970704506,
        openId: this.$store.getters.getAuthUser.openid,
        type: 'CloudCardRenew'
      })
      let {
        data
      } = res
      window.wx.chooseWXPay({
        timestamp: data.args.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.args.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.args.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.args.paySign, // 支付签名
        success: (res) => {
          try {
            window.WeixinJSBridge.log(res.err_msg)
          } catch (e) {
            console.error(e)
          }
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 支付成功
            toggleModal(_.modal, '支付成功')
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
