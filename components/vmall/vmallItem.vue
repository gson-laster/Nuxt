<template>
  <li>
    <nuxt-link :to="{path:path,query:setQuery({id:item.id})}">
    <div class="n_vmalllist_con">
      <div class="n_vmalllist_img">
          <img src="~static/img/blank.gif"
               v-lazy ="item.dreamDefaultpicurl+'?w=auto&h=auto'">
      </div>
      <div class="title">
       {{item.dreamTitle}}
      </div>
      <div class="price">
        <span>{{item.dreamPrice2}}</span>
        <del>{{item.dreamPrice1}}</del>
      </div>
      <div class="buy">
        购买
      </div>
    </div>
    </nuxt-link>
  </li>
</template>

<script>
import setQuery from '~static/mixins/setQuery'
export default {
   props:['item'],
   mixins:[setQuery],
   data(){
     return{
       path:'/vmall/goodsDetail'
     }
   }
}
</script>
<style>
@import '~static/css/vmall/vMallItem.css'
</style>
