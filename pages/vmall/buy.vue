<template>
  <div class="box vMall">
   <top-bar :title="query.title"></top-bar> 
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
    <nuxt-link :to="{path:detailPath,query:{id:query.id,uid:query.uid,brand:query.brand}}" tag="li"> 
    <div class="sol_img"><img :src="'/'+query.defpic+'?w=80&h=80'"></div>
    <div class="sol_con"><h3>{{query.title}}</h3><span>{{query.type}}</span><span>{{query.price}}V币 × {{query.num}}</span></div>
    </nuxt-link>
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
    <vmall-footer></vmall-footer>
  </div>
</template>
<script>
import topBar from "~components/vmall/topBar";
import msg from "~components/msg/msg";
import vmallFooter from "~components/vmall/vmallFooter";
import { vmallorder } from "~/apis/vmall";
import { mapGetters } from "vuex";
export default {
  async asyncData({ query, store }) {
    return {
      query: query
    };
  },
  components: {
    topBar,
    msg,
    vmallFooter
  },
  data() {
    return {
      path: "/vmall/address",
      detailPath:'/vmall/goodsDetail'
    };
  },
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  computed: {
    ...mapGetters(["getUserInfo"]),
    totalVB() {
      return Number(this.query.num) * this.query.price;
    },
    userVB() {
      return this.$store.getters.getUserInfo.dreamVcurrency;
    },
    shippingAddress() {
      let address =
        this.$store.getters.getUserInfo.dreamShadd1 +
        "&nbsp;" +
        this.$store.getters.getUserInfo.dreamShadd2 +
        "&nbsp;" +
        this.$store.getters.getUserInfo.dreamShadd3;
      let result = address.replace(/&nbsp;/gi, "");
      return result ? result : "还没有填写！";
    },
    userName() {
      return this.$store.getters.getUserInfo.dreamUsername;
    }
  },
  methods: {
    buNow() {
      let data = {};
      if (Number(this.totalVB) > Number(this.userVB)) {
        //余额不足;
        this.$router.push({
          path: "/vmall/short",
          query: { type: 2, uid: this.query.uid, brand: this.query.brand }
        });
      } else {
        data.dreamOrderzt = "待发货";
        data.dreamOrdernumber = this.query.num;
        data.dreamUserid = this.userName;
        data.dreamTotal = this.totalVB;
        vmallorder(data)
          .then(res => {
            if (!res.hasOwnProperty("code")) {
              this.$store.dispatch("setUserInfo", {
                dreamVcurrency: this.getUserInfo.dreamVcurrency - this.totalVB,
                update: true
              });
              this.$router.push({
                path: "/vmall/short",
                query: { type: 1, uid: this.query.uid, brand: this.query.brand }
              });
            } else {
              this.$refs.msg.state("添加订单失败");
            }
          })
          .catch(e => {
            this.$refs.msg.state("添加订单失败");
          });
      }
    }
  }
};
</script>
<style>
@import "~static/css/vmall/buy.css";
</style>