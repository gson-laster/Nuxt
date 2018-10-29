<template>
<div class="vMall">
  <banner :bannerList="bannerList"></banner>
  <vmall-search @searchReceive="search"></vmall-search>
  <div class="n_vmalllist"
       id="n_vmalllist">
    <div class="n_vmalllist_t">精选商品</div>
    <ul v-for="(item,index) in listResult"
        v-bind:key="index">
      <vmall-item v-for="(ite,ind) in item"
                  v-bind:key="ind"
                  :item="ite">
      </vmall-item>
    </ul>
  </div>
  <!-- <pagination v-if="!isBannerShow"  @changePagination = "changePagination" :pagination="currentPage" :nowActive="totalPage"></pagination> -->
  <vmall-footer></vmall-footer>
</div>
</template>
<script>
import vmallSearch from "~components/vmall/vmallSearch";
import vmallItem from "~components/vmall/vmallItem";
import {
  listTo2
} from "~static/js/util.js";
import vmallFooter from "~components/vmall/vmallFooter";
import {
  getBannerList
} from "~/apis/banner";
import {
  getVmallGoodsList
} from "~/apis/vmall";
import banner from '~components/banner'

export default {
  components: {
    vmallSearch,
    vmallItem,
    vmallFooter,
    banner
  },
  async asyncData({
    store,
    query
  }) {
    let result = await Promise.all([
      getBannerList({
        type: "vmall"
      }),
      getVmallGoodsList({
        index: 1,
        pageSize: 12
      })
    ]);

    let listResult = listTo2(result[1].result);
    return {
      bannerList: result[0],
      listResult: listResult,
      query: query
    };
  },
  data() {
    return {
      listResult: [],
      path: "/vmall/goodsDetail",
      isBannerShow: true,
      title: "商品列表",
      currentPage: 1, //当前页
      totalPage: 1 //总页数
    };
  },
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  methods: {
    search(content) {
      console.log(this.$route.path);
      if (this.$route.path == "/vmall") {
        this.$router.push({
          path: "/vmall/search",
          query: {
            uid: this.query.uid,
            brand: this.query.brand,
            keys: content
          }
        });
      }
    },
    changePagination(pageIndex) {
      console.log(pageIndex);
    }
  }
};
</script>

<style>
@import "~static/css/vmall/index.css";
</style>
