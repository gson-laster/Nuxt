<template>
  <div class="box vMall">
   <top-bar :title="title"></top-bar> 
  <div class="new_vbshop">
  <div class="new_ordersm">请核对 收货地址 和 订单详情</div>
  <div class="new_orderaddress" id="new_orderaddress">
  <div class="new_orderaddress_an">
    <nuxt-link :to="{path:path,query:query}">修改</nuxt-link>
  </div>
  <div class="new_orderaddress_list">
  <li v-html="'收货地址:'+shippingAddress"></li>
  <li>邮编:{{getUserInfo.dreamShcode?getUserInfo.dreamShcode:'还未填写！'}}</li>
  <li>收件人：{{getUserInfo.dreamShname?getUserInfo.dreamShname:'还没有填写！'}}（{{getUserInfo.dreamShphone?getUserInfo.dreamShphone:'还未填写！'}}）</li>
  </div>
  </div>
  <div class="new_navjg"></div><div class="new_shoporderlist2">
  <div class="new_shoporderlist_con" id="new_shoporderlist_con">
    <ul>
    <li v-for="(item,index) in orderList" v-bind:key="index">
    <div class="sol_img">
    <a href="goods_view.html?id=31&amp;uid=%25D%25%25K%25%25H%25%25C%25%25C%25%25H%25%25H%25%25D%25%25D%25%25C%25%25G%25&amp;brand=0" target="_blank">
    <img :src="imgContent[index].dreamDefaultpicurl">
    </a>
    </div>
    <div class="sol_con"><a href="goods_view.html?id=31&amp;uid=%25D%25%25K%25%25H%25%25C%25%25C%25%25H%25%25H%25%25D%25%25D%25%25C%25%25G%25&amp;brand=0" target="_blank">
    <h3>{{item.dreamGoodstitle}}</h3></a><span>{{item.dreamGoodsspecname}}</span><span>{{item.dreamGoodsprice2}}V币 × {{item.dreamGoodsnum}}</span></div>
    </li>
    </ul></div></div>
    <div class="orderform2">
      <form action="buy_ok.html" method="post">
        <input type="hidden" name="Dream_GoodsID" id="GoodsID" value="31"> 
        <input type="hidden" name="Dream_GoodsSpec" id="GoodsSpec" value="默认规格"> 
        <input type="hidden" name="Dream_GoodsNum" id="GoodsNum" value="1"> 
        <input type="hidden" name="total" id="total" value="99">
        <div class="ordertotal" id="ordertotal"><span>合计：<b>{{totalVB}}币</b></span><i>(您的V币：{{getUserInfo.dreamVcurrency}})</i></div>
        <div class="orderan"><input type="button" id="button" value="确认购买" @click="buNow"></div></form></div>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>
<script>
import topBar from "~components/vmall/topBar";
import {vmallorder,seachshopcar,getVmallGoodsInfo} from '~/apis/vmall';
import msg from '~components/msg/msg'
import {mapGetters} from 'vuex'
export default {
  async asyncData({query,store}){
    let params = query.str,orderList = '',ids = [],funcArr = []
    let result = await Promise.all([
        seachshopcar({str:params})
    ])   
    orderList = result[0]
    for(let item of orderList){
        funcArr.push(getVmallGoodsInfo(item.dreamGoodsid))
    }
    let content = await Promise.all(funcArr)
    console.log(content)
    return{
      query:query,
      orderList:result[0],
      imgContent:content
    }
  },
  components: {
    topBar,
    msg
  },
  data(){
      return{
         path:'/vmall/address',
         title:'购买结算'
      }
  },
  computed:{
    ...mapGetters(['getUserInfo']),
    totalVB(){
        let total =0
        for(let item of this.orderList){
            total+=Number(item.dreamGoodsprice2)*Number(item.dreamGoodsnum)
        }
        return total
    },
    userVB(){
      return this.$store.getters.getUserInfo.dreamVcurrency
    },
    shippingAddress(){
      let address = this.$store.getters.getUserInfo.dreamShadd1+'&nbsp;'+this.$store.getters.getUserInfo.dreamShadd2+'&nbsp;'+this.$store.getters.getUserInfo.dreamShadd3
      let result =  address.replace(/&nbsp;/ig,'')
      return result?result:'还没有填写！'
    },
    userName(){
      return this.$store.getters.getUserInfo.dreamUsername
    }
  },
  methods:{
     buNow(){
       let data = {}
       if(Number(this.totalVB)>Number(this.userVB)){    //余额不足;
          this.$router.push({
            path:'/vmall/short',
            query:{type:2,uid:this.query.uid,brand:this.query.brand}
          })
       }else{
        data.dreamOrderzt = '待发货'
        data.dreamOrdernumber = new Date().getTime()
        data.dreamUserid =this.userName
        data.dreamTotal = this.totalVB
        vmallorder(data).then(res=>{
           if(!res.hasOwnProperty('code')){
           this.$store.dispatch('setUserInfo',{dreamVcurrency: this.getUserInfo.dreamVcurrency - this.totalVB, update: true} )
           this.$router.push({
           path:'/vmall/short',
           query:{type:1,uid:this.query.uid,brand:this.query.brand}
         })
        }else{
          this.$refs.msg.state('添加订单失败')
        } 
        }).catch(e=>{
           this.$refs.msg.state('添加订单失败') 
        }) 
       }   
     }     
  },
};
</script>
<style>
@import '~static/css/vmall/buy.css'
</style>