<template>
<div class="footer productBottom">
  <ul flex="box:mean">
    <li v-for="(item,index) in list"
        v-bind:key="index">
      <nuxt-link :to="{path: item.path,query: setQuery(Object.assign(query,item.query))}">
        <i :class="['iconfont',item.className]"></i>
        <em>{{item.name}}</em>
      </nuxt-link>
    </li>
  </ul>
</div>
</template>

<script>
import setQuery from '~static/mixins/setQuery'
export default {
  data() {
    return {
      path: "/product/productBook",
    };
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    query: {
      type: Object,
      default: {}
    }
  },
  mixins: [setQuery]
};
</script>

<style scoped>
.productBottom.footer {
  z-index: 100;
}

.productBottom .iconfont {
  background-image: none
}

.productBottom.footer li {
  width: 33.3%;
  background-color: #A9CBCC;
  border-right: 1px solid #fff;
  box-sizing: border-box;
}

.productBottom.footer a {
  display: flex;
  align-items: center;
  height: 55px;
  padding: 10px;
  box-sizing: border-box;
}

.productBottom.footer li i {
  font-size: 34px;
  line-height: 35px;
  text-align: center;
  color: #fff;
}
.productBottom.footer li em {
  font-size: 16px;
  color: #fff;
}
@media screen and  (max-width:320px){
  .productBottom.footer a{
    padding:0px;
    font-size:20px;
  },
  .productBottom.footer li em{
    font-size:16px;
  }
}
</style>
