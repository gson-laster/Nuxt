<template>
<div class="new_vbshop">

  <vmall-topbar :title="goodsInfo.dreamTitle"></vmall-topbar>
  <vmall-banner :bannerList="bannerList"></vmall-banner>
  <form>
    <div class="goods_view">
      <div class="goods_view_title"
           id="title">{{goodsInfo.dreamTitle}}</div>
      <div class="goods_view_pricebg">
        <div class="goods_view_price"
             id="proprice">
          <span class="price1">
              <font id="price1">{{goodsInfo.dreamPrice2}}</font>
              <i>V币</i>
            </span>
          <del>
              <h3>市场价：</h3>
              <font id="pr2">{{goodsInfo.dreamPrice1}}</font>V币</del>
        </div>
        <div class="goods_view_right"
             @click="collect">收藏</div>
      </div>
      <div class="goods_view_spec"
           id="goods_view_spec">
        <h3>规格：</h3>
        <div class="price">
          <div style="margin:0"
               v-for="(item,index) in specArr"
               v-bind:key="index"
               v-if="item.name!==''"
               @click="selectItem(item,index)">
            <input type="radio"
                   value="index"
                   :price1="item.price1"
                   :price2="item.price2"
                   :id="['spec'+index]">
            <label :for="['spec'+index]"
                   :class="{on:isOn==index}">{{item.name}}</label>
          </div>
        </div>
      </div>
      <div class="goods_view_num">
        <h3>数量：</h3><input type="button"
               class="jian"
               value="-"
               @click="number--"
               v-if="number<=0?number=1:number"><input type="text"
               name="num"
               class="num"
               id="num"
               v-model="number"><input type="button"
               class="add"
               value="+"
               @click="number++"></div>
      <div class="goods_buyan">
        <div>
          <nuxt-link :to="{path:path,query:setQuery({id:goodsInfo.id,type:chooseItem.name,num:number,price:chooseItem.price2,title:goodsInfo.dreamTitle,defpic:goodsInfo.dreamDefaultpicurl,timestamp:(new Date().getTime())})}">
            <input name="buy"
                   type="button"
                   class="buyan"
                   value="立即购买">
          </nuxt-link>

          <span class="shopcar"
                @click="addToShopCar()">加入购物车</span>

        </div>
      </div>
      <div style="clear:both"></div>
      <div class="goods_view_con"
           v-html="goodsInfo.dreamContent"></div>
    </div>
    <div class="view_buy">
      <nuxt-link :to="{path:vmallPath,query:{uid:query.uid,brand:query.brand}}"
                 class="view_buy_ico1">商城</nuxt-link>
      <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=918890126&amp;site=qq&amp;menu=yes"
         target="_blank"
         class="view_buy_ico2">客服</a>
      <span class="shopcar" @click="addToShopCar()">加入购物车</span>
      <nuxt-link :to="{path:path,query:setQuery({id:goodsInfo.id,type:chooseItem.name,num:number,price:chooseItem.price2,title:goodsInfo.dreamTitle,defpic:goodsInfo.dreamDefaultpicurl,timestamp:(new Date().getTime())})}">
        <input name="buy"
               type="button"
               class="buyan"
               value="直接购买">
      </nuxt-link>
    </div>
  </form>
  <msg ref="msg"></msg>
</div>
</template>
<script>
import vmallTopbar from "~components/vmall/topBar";
import {
  getVmallGoodsInfo,
  addVmallShopCar
} from "~/apis/vmall";
import swiper from "~components/swiper";
import swiperItem from "~components/swiper/swiper-item";
import {
  change
} from "~/apis/user";
import setQuery from "~static/mixins/setQuery";
import {
  mapGetters
} from "vuex";
import vmallBanner from '~components/banner'
export default {
  async asyncData({
    store,
    query
  }) {
    let result = await Promise.all([getVmallGoodsInfo(query.id)]);
    return {
      goodsInfo: result[0],
      query: query,
      bannerList:[result[0].dreamDefaultpicurl]
    };
  },
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  components: {
    vmallTopbar,
    swiper,
    swiperItem,
    vmallBanner,
    msg: resolve => {
      require(["~components/msg/msg.vue"], resolve);
    }
  },
  watch: {
    userInfo: {
      handler: function (newValue, oldValue) {
        this.$store.dispatch("setUserInfo", newValue);
      },
      deep: true,
      immediately: true
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      isLogin: "getLoginInfo"
    })
  },
  mixins: [setQuery],
  data() {
    return {
      specArr: [],
      isOn: 0,
      chooseItem: {},
      number: 1,
      path: "/vmall/buy",
      shopCarPath: "/vmall/shopCar",
      vmallPath: "/vmall"
    };
  },
  created() {
    let spec = "";
    let _this = this;
    let data = {};
    for (let i = 1; i <= 5; i++) {
      spec = _this.goodsInfo["dreamSpec" + i];
      spec = spec.split("|$|");
      _this.specArr.push({
        name: (data.name = spec[0]),
        price1: spec[1],
        price2: spec[2]
      });
    }
    _this.specArr.unshift({
      name: "默认规格",
      price1: _this.goodsInfo.dreamPrice1,
      price2: _this.goodsInfo.dreamPrice2
    });
    this.chooseItem = {
      name: "默认规格",
      price1: _this.goodsInfo.dreamPrice1,
      price2: _this.goodsInfo.dreamPrice2
    };
  },
  methods: {
    collect() {
      if (!this.query.hasOwnProperty("is_share") &&
        this.query.id !== null &&
        this.query.id
      ) {
        let data = {};
        data.dreamUsername = this.userInfo.dreamUsername;
        data.dreamVmallid = "|" + this.query.id;
        change(data)
          .then(res => {
            if (res.code == 2000) {
              this.userInfo.dreamVmallid += data.dreamVmallid;
              this.$refs.msg.state("收藏成功");
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    selectItem(item, index) {
      this.isOn = index;
      this.chooseItem = item;
    },
    addToShopCar() {
      let data = {};
      data.dreamGoodsid = this.goodsInfo.id;
      data.dreamGoodstitle = this.goodsInfo.dreamTitle;
      data.dreamGoodsprice1 = this.goodsInfo.dreamPrice1;
      data.dreamGoodsprice2 = this.goodsInfo.dreamPrice2;
      data.dreamGoodsspecname = this.chooseItem.name;
      data.dreamShopper = "car_" + this.userInfo.dreamUsername;
      data.dreamGoodsnum = this.number;
      data.dreamOrdernumber = new Date()
        .getTime();
      data.dreamGoodsspec = 0;
      addVmallShopCar(data)
        .then(res => {
          if (res.code == 2000) {
            this.$refs.msg.state("添加成功");
          } else {
            this.$refs.msg.state("添加失败");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
@import "~static/css/vmall/goodsDetail.css";
@import "~static/css/vmall/detailBottom.css";
</style>
