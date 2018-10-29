<template>
  <div class="new_user box">
    <div class="new_usertitle zxkf">在线客服</div>
    <div class="new_userzxkf">
      <ul>
        <li style="margin-top:0"><div>
            客服微信：<span>{{siteInfo.dreamKfwx}}</span>
          </div></li>
        <a :href="'http://wpa.qq.com/msgrd?v=3uin='+siteInfo.dreamKfqq+'&site=qq&menu=yes&uid='+query.uid+'&brand='+query.brand" id="qqlink"><li><div>
              客服QQ：<span>{{siteInfo.dreamKfqq}}</span>
            </div></li></a>
        <li><div>
            客服热线：<a :href="'tel:'+siteInfo.dreamKfphone"><span style="color:#07bb07">{{siteInfo.dreamKfphone}}</span></a>
          </div></li>
      </ul>
    </div>
    <div class="new_userzxkf_ps">
      <img :src="'/'+siteInfo.dreamKfewm+'?w=auto&h=auto'" id="wxQr"><br>识别微信公众号二维码，关注我们！
    </div>
  </div>
</template>
<script>
import {getSiteConfig} from '~/apis/siteConfig'
  export default {
   async asyncData({query}){
      let result  = await getSiteConfig()
      return {
        siteInfo:result,
        query:query
      }
    }
  }
</script>
<style scoped>
  @import '~static/css/wusercenter/inlineservice.css';
</style>