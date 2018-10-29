<template>
  <section class="box vMall">
    <vmall-topbar :title="title"></vmall-topbar>
    <div class="new_vbshop">
      <div class="new_shopuser">
        <div class="new_shopordermk1">
          <ul>
            <li>
             <nuxt-link :to="{path:'/vmall/orders',query:{uid:query.uid,brand:query.brand,ordertype:1}}">待发货</nuxt-link>
            </li>
            <li>
             <nuxt-link :to="{path:'/vmall/orders',query:{uid:query.uid,brand:query.brand,ordertype:2}}">已发货</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{path:'/vmall/orders',query:{uid:query.uid,brand:query.brand,ordertype:3}}">已完成</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="new_navjg"></div>
        <div class="new_shoporderqq">
          <div>
            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=918890126&amp;site=qq&amp;menu=yes&amp;uid=%25D%25%25F%25%25L%25%25J%25%25C%25%25J%25%25C%25%25G%25%25H%25%25C%25%25I%25&amp;brand=0" target="_blank">联系客服</a>
          </div>
        </div>
        <div class="new_navjg"></div>
        <order-list :vmallList="vmallList"></order-list>
        <div class="fline"></div>
      </div>
    </div>
    <vmall-footer></vmall-footer>
  </section>
</template>

<script>
import {getvmalllist} from '~/apis/vmall'
import orderList from '~pages/vmall/orderList'
import vmallTopbar from '~components/vmall/topBar'
import vmallFooter from '~components/vmall/vmallFooter'
export default {
async asyncData({query,store}){
    let dreamUsername = store.getters.getUserInfo.dreamUsername
    let type = query.ordertype?Number(query.ordertype):1
    let orderType = ''  
    switch(type){
      case 1:
      orderType = '待发货'
      break
      case 2:
      orderType = '已发货'
      break
      case 3:
      orderType ='已完成'
      break
    }  
    let result = await Promise.all([  
        getvmalllist({dreamUserid:dreamUsername,dreamOrderzt:orderType})
    ])
    return {
      vmallList:result[0],
      query:query
    }
  },
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  components: {
    vmallTopbar,
    orderList,
    vmallFooter
  },
  data() {
    return {
      title: '全部订单'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
@import '~static/css/vmall/allOrders.css';
.nuxt-link-exact-active{
  border-bottom: 4px #FFA901 solid;
}
</style>
