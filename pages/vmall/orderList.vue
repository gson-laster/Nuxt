<template>
     <div class="new_shoporderlist" id="new_shoporderlist">
          <div v-for="(item,index) in vmallList" v-bind:key="index">
          <div class="new_shoporderlist_t"><span>订单号 {{item.dreamOrdernumber}}</span></div>
          <div class="new_shoporderlist_view"><ul><li>总价：{{item.dreamTotal}}V币</li><li>邮编：{{item.dreamCode}}</li><li>收件人：{{item.dreamNames}}</li><li>联系方式：{{item.dreamPhone}}</li><li>收货地址:{{item.dreamAddress
}}</li><li>下单时间：{{item.dreamUpdatetime}}</li></ul></div>
          <div class="new_shoporderlist_con"><ul></ul></div>
          </div>
        </div>
</template>

<script>
export default {
    props:['vmallList']
}
</script>
