<template>
  <div class="new_vbshop2 box vMall">
    <form name="form1" id="form1">
      <div class="shopcar_sm">
        <h2>请选择商品后结算</h2>
        <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=918890126&amp;site=qq&amp;menu=yes&amp;uid=%25D%25%25F%25%25L%25%25J%25%25C%25%25J%25%25C%25%25G%25%25H%25%25C%25%25I%25&amp;brand=0" target="_blank">联系客服</a>
      </div>
      <div id="shopcar-product">
        <div class="shopcarlist" v-for="(item,index) in shopCarData" v-bind:key="index">
          <label :class="{on:item.isOn}" @click="setIndex(index)">
            <i></i>
          </label>
           <nuxt-link :to="{path:path,query:{uid:query.uid,brand:query.brand,id:item.goodsId}}">
          <div class="goods_pic"><img :src="setImgSrc(imgResult[index])"></div>
           </nuxt-link>
          <div class="goods_del" @click.self="del(item.id,index)">
            <i>删除</i>
          </div>
          <div class="goods_nr">
            <nuxt-link :to="{path:path,query:{uid:query.uid,brand:query.brand,id:item.goodsId}}">
            <div class="goods_title">
               {{item.dreamGoodstitle}} 
            </div>
            </nuxt-link>
            <div class="goods_num"><input type="button" class="jian" value="-" @click="minus(item.id,index)"><input type="text" name="num" id="n" class="num" :value="item.num"><input type="button" class="add" value="+" @click="add(item.id,index)"></div>
            <div class="goods_spec">{{item.dreamGoodsspecname}}</div>
            <div class="goods_price">
              <span>
                <i>{{item.price}}</i>V币×
                <b class="thenum">{{item.num}}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="totalbar">
        <div class="total">
          <span>合计：
            <b id="totalmoney">{{totalCountVB}}V币</b>
          </span>
        </div>
        <div @click.stop="selectAll()" id="goodsalls">
        <label for="goodsall" :class="{on:isAll}"><i></i> 全选</label>
        </div>
        <div class="orderan"><input type="button" value="结算" @click="pay()"></div>
      </div>
    </form>
  <msg ref="msg"></msg>  
  <vmall-footer></vmall-footer>
  </div>
</template>
<script>
import vmallFooter from "~components/vmall/vmallFooter";
import { declassify } from "~static/js/util";
import { mapGetters } from "vuex";
import {
  editorshopcar,
  delshopcar,
  seachshopcar,
  getVmallGoodsInfo
} from "~/apis/vmall";
import msg from "~components/msg/msg";
export default {
  async asyncData({ query }) {
    let dreamUsername = declassify(query.uid);
    let result = await Promise.all([
      seachshopcar({ dreamShopper: `car_${dreamUsername}` })
    ]);
    // 获取购物车列表;
    let funcArr = [];
    let shopCarData = [];
    let imgResult = null;
    for (let value of result[0]) {
      shopCarData.push({
        isOn: false,
        num: value.dreamGoodsnum,
        price: value.dreamGoodsprice2,
        dreamGoodstitle: value.dreamGoodstitle,
        dreamGoodsspecname: value.dreamGoodsspecname,
        id: value.id,
        goodsId: value.dreamGoodsid
      });
      funcArr.push(getVmallGoodsInfo(value.dreamGoodsid));
    }
    //获取图片信息;
    imgResult = await Promise.all(funcArr);
    return {
      carList: result[0],
      query: query,
      imgResult: imgResult,
      shopCarData:shopCarData
    };
  },
  data() {
    return {
      count: 1,
      indexArr: [],
      numArr: [],
      isAll: false,
      path: "/vmall/goodsDetail"
    };
  },
  beforeCreate() {
    this.$store.dispatch("setFooterShow", false);
  },
  computed: {
    totalCountVB() {
      let total = null;
      for (let value of this.shopCarData) {
        if (value.isOn) {
          total += Number(value.num) * Number(value.price);
        }
      }
      return total ? total : 0;
    }
  },
  methods: {
    del(id, index) {
      delshopcar({ id: id })
        .then(res => {
          //成功
          if (res.code == 2000) {
            this.shopCarData.splice(index, 1);
          } else {
            this.$refs.msg.state("删除失败");
          }
        })
        .catch(e => {
          this.$refs.msg.state("删除失败");
        });
    },
    setIndex(index) {
      let isOnEvery = false;
      this.shopCarData[index]["isOn"] = !this.shopCarData[index]["isOn"];
      isOnEvery = this.shopCarData.every(item => {
        return item.isOn == false;
      });
      if (isOnEvery) {
        this.isAll = false;
      }
    },
    //数量加减;
    add(id, index) {
      this.shopCarData[index].num++;
      editorshopcar({ id: id, dreamGoodsnum: this.shopCarData[index].num })
        .then(res => {
          if (!res.code == 2000) {
            this.$refs.msg.state("添加失败");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    minus(id, index) {
      this.shopCarData[index].num--;
      if (this.shopCarData[index].num <= 1) {
        this.shopCarData[index].num = 1;
      }
    },
    selectAll() {
      this.isAll = !this.isAll;
      if (this.isAll) {
        for (let value of this.shopCarData) {
          value.isOn = true;
        }
      } else {
        for (let value of this.shopCarData) {
          value.isOn = false;
        }
      }
    },
    pay() {
      let bool = this.shopCarData.some(item => {
        return item.isOn;
      });
      //拼接参数;
      let str = "";
      for (let value of this.shopCarData) {
        if (value.isOn) {
          str += value.id + ",";
        }
      }
      if (bool) {
        this.$router.push({
          path: "/vmall/accounts",
          query: {
            total: this.totalCountVB,
            str: str,
            uid: this.query.uid,
            brand: this.query.brand
          }
        });
      } else {
        this.$refs.msg.state("请选择需要结算的商品");
      }
    },
    setImgSrc(item){
        let url = null
        if(item.dreamDefaultpicurl){
          url = '/'+item.dreamDefaultpicurl+'?w=80&h=80'  
        }else{
          url = ''
        }
        return url
    }
  },
  components: {
    vmallFooter,
    msg
  }
};
</script>

<style>
@import "~static/css/vmall/shopCar.css";
</style>
