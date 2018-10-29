<template>
<footer class="footer">
  <ul flex="box:mean" v-show="!getUserDude">
    <li v-for="(item,index) in navList"
        v-bind:key="index"
        :class="currentRouter(item.iconClass, item.path)"
        >
      <nuxt-link :to="{path: item.path, query: query()}">
        <i></i>
        <em>{{ item.title }}</em>
      </nuxt-link>
    </li>
  </ul>
  <ul flex="box:mean" v-show="getUserDude">
    <li v-for="(item,index) in overDudeNav"
        v-bind:key="index"
        :class="currentRouter(item.iconClass, item.path)"
    >
    <a :href="setPath(item.path)">
        <i></i>
        <em>{{ item.title }}</em>
      </a>
    </li>
  </ul>
</footer>
</template>
<script>
import { mapGetters } from "vuex"
import { getWxConfig } from "~/apis/wechat.js"
import appConf from "~/app.config"
import {stringify} from 'querystring'
export default {
  props:{
    isOverdude:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["get_router_query",'getUserDude','getLoginState']),
    navList() {
      if(this.get_router_query.hasOwnProperty('is_preview')){
         if(this.get_router_query.preview_brand != 0 && this.get_router_query.brand != 74){
           return appConf.footer_nav.brand;
         }else{
           return appConf.footer_nav.travel;
         }
      }else{
         if(this.get_router_query.brand != 0 && this.get_router_query.brand != 74){
            return appConf.footer_nav.brand
         }else{
           return appConf.footer_nav.travel
         }
      }
    },
    overDudeNav(){
      if(this.get_router_query.brand!=0 && this.get_router_query.brand != 74){
        return [appConf.footer_nav.brand[0]]
      }else{
        return [appConf.footer_nav.travel[0]]
      }
    }
  },
  created(){
     if(!this.getLoginState){
        appConf.footer_nav.brand[appConf.footer_nav.brand.length-1].title = '登录'
        appConf.footer_nav.travel[appConf.footer_nav.travel.length-1].title= '登录'
     }
  },
  methods: {
    query() {
      return this.get_router_query;
    },
    setPath (path) {
      return path + '?' + stringify(this.query())
    },
    currentRouter(calssName, path) {
      let nCls = calssName;
      let query = this.get_router_query;
      let brand = null;
      if (query.hasOwnProperty("is_preview")) {
        brand = query.preview_brand;
      } else {
        brand = query.brand;
      }
      if (brand != 0 && brand != 74) {
        nCls += " brand";
      } else {
        nCls += " tra";
      }
      if (this.$route.path == path) {
        nCls += " active";
      }
      return nCls;
    }
  }
};
</script>
