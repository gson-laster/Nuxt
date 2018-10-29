<template>
<li>
  <nuxt-link :to="{path:'/newslist', query: setQuery({cid:cid,flag:flag,type:type})}" v-if="data.dreamUrl!=='/wechat'">
    <div class="imgs"><img :src="setImgUrl({src:data.dreamDefaultpicurl,w:60,h:60,q:0.8})"></div>
    <div class="txt"
         :class="itemColorClass">
      <i>{{data.dreamNames}}</i>
      <span>{{data.dreamContent}}</span>
    </div>
  </nuxt-link>
  <nuxt-link :to="{path:'/wechat',query:setQuery({type:'wx'})}" v-else>
  <div class="imgs"><img :src="data.dreamDefaultpicurl"></div>
    <div class="txt"
         :class="itemColorClass">
      <i>{{data.dreamNames}}</i>
      <span>{{data.dreamContent}}</span>
      </div>
  </nuxt-link>
</li>
</template>
<script>
import { mapGetters } from "vuex";
import setImgUrl from "~static/mixins/setImgUrl";
export default {
  props: ["data", "itemColorClass"],
  mixins: [setImgUrl],
  computed: {
    ...mapGetters(["get_router_query"])
  },
  data() {
    return {
      path: "",
      flag: "",
      dt: 1,
      cid: 0,
      type:''
    };
  },
  mounted() {
    if (this.data.dreamUrl.indexOf('brand_news') != -1||this.data.dreamUrl.indexOf('news')!=-1) {
        let dreamUrl = ''
        let dreamUrlArr = []
        let cidArr = []
        if(this.data.dreamUrl.indexOf('&')!=-1){
           dreamUrlArr = this.data.dreamUrl.split('&')
           for(let k in dreamUrlArr){
              if(dreamUrlArr[k].indexOf('?')!=-1){
                 cidArr = dreamUrlArr[k].split('?')[1]
              } 
           }
        }else{
          if(this.data.dreamUrl.indexOf('?')!=-1){
             cidArr = this.data.dreamUrl.split('?')[1]
          }
        }
        this.cid = cidArr.split('=')[1] 
        this.flag = this.data.dreamNames
        this.type = this.$route.query.type?this.$route.query.type:''
    }
  },
  methods: {
    setQuery(query) {
      return Object.assign({}, this.get_router_query, query);
    }
  }
};
</script>
<style scoped>
@import "~static/css/common/navitem.css";
</style>
