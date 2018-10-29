<template>
  <div class="vmallfooter">
      <ul flex="box:mean">
        <li v-for="(item,index) in list" v-bind:key="index" :class="{active:item.isActive}">
        <nuxt-link :to="{path:item.path,query:query}" >
        <i :class="['iconfont',item.className]"></i>
        <em>{{item.title}}</em>
        </nuxt-link>
      </li>
      </ul>
      <div class="clearfix">
      	
      </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          title: "首页",
          path: "/",
          className: "icon-homepage",
          isActive: false
        },
        {
          title: "搜索",
          path: "/vmall/search",
          className: "icon-search",
          isActive: false
        },
        {
          title: "V币商城",
          path: "/vmall",
          className: "icon-shop",
          isActive: false
        },
        {
          title: "购物车",
          path: "/vmall/shopcar",
          className: "icon-shopcar",
          isActive: false
        },
        {
          title: "个人中心",
          path: "/vmall/usercenter",
          className: "icon-group",
          isActive: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      query: "get_router_query"
    })
  },
  created() {
    this.$store.dispatch('setFooterShow', false)
     let currentPath = this.$route.path
     this.list.map((value,index)=>{
       if(this.list[index].path == currentPath){
         this.list[index].isActive = true 
       }else{
         if(currentPath=='/vmall/myCollect'||currentPath=='/vmall/orders'||currentPath=='/vmall/address'){
           this.list[4].isActive = true
         }else if(currentPath=='/vmall/buy'){
           this.list[3].isActive = true
         }
       }
     })
  },
};
</script>
<style scoped>
.vMall .vmallfooter {
  z-index: 100;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  background: rgba(255, 255, 255, 1);
  border-top: 1px #EAEAEA solid;
}
.vMall .vmallfooter li {
  width: 20%;
  float: left;
  text-align: center;
  padding: 4px 0;
}
.vMall .vmallfooter li i {
  color: #C6C6C6;
  font-size: 28px;
  text-align: center;
  background-image: url();
}
.active a {
  color: #fa0;
}
.active i {
  color: #FFB218 !important;
}
em {
  display: block;
  font-size: 14px;
}
</style>
