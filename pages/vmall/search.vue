<template>
<div class="box vMall">
  <top-bar :title="title"></top-bar>
  <vmall-search @searchReceive="search"></vmall-search>
  <div class="n_vmalllist"
       id="n_vmalllist">
    <div class="n_vmalllist_t">精选商品</div>
    <ul v-for="(item,index) in listResult"v-bind:key="index">
        <vmall-item v-for="(ite,ind) in item" v-bind:key="ind" :item="ite">
        </vmall-item> 
    </ul>
  </div>
  <msg ref="msg"></msg>
  <pagination :pagination="pagination" :nowActive="nowActive" @changePagination="changePagination"></pagination>
  <vmall-footer></vmall-footer>
</div>
</template>
<script>
import { getVmallGoodsList } from "~/apis/vmall";
import { listTo2 } from "~static/js/util.js";
import vmallItem from "~components/vmall/vmallItem";
import vmallSearch from "~components/vmall/vmallSearch";
import topBar from "~components/vmall/topBar";
import vmallFooter from "~components/vmall/vmallFooter";
import pagination from "~components/pagination";
export default {
  async asyncData({ query }) {
    let pagination = 1,
      nowActive = 1;
    let result = await Promise.all([
      getVmallGoodsList({ inex: 1, pageSize: 12, dreamTitle: query.keys })
    ]);
    pagination = result[0].pageNo;
    nowActive = result[0].totalPages;
    let listResult = listTo2(result[0].result);
    return {
      listResult: listResult,
      pagination: pagination,
      nowActive: nowActive
    };
  },
  data() {
    return {
      title: "商品列表",
      content:''
    };
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
  methods: {
   async search(content,index) {
      index?index:1
      this.content = content
      if (this.content) {
       let result = await getVmallGoodsList({index:index,pageSize:12,dreamTitle:content})
       this.pagination = result.pageNo
       this.nowActive  = result.totalPages
       this.listResult = listTo2(result.result) 
      } else {
        this.$refs.msg.state("请输入搜索内容");
      }
    },
    changePagination(index){
     this.search(this.content,index)
    }
  },
  components: {
    topBar,
    pagination,
    vmallFooter,
    vmallSearch,
    vmallItem,
    pagination,
    msg: resolve => {
      require(["~components/msg/msg.vue"], resolve);
    }
  }
};
</script>
<style>
@import "~static/css/vmall/index.css";
</style>
