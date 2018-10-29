<template>
<div class="new_user"
     style="position:relative">
  <div class="new_leaflets"
       id="new_leaflets">
    <div class="img">
      <img src="~static/img/preview/xcy_04.jpg">
    </div>

    <div class="new_leaflets_list noline"
         id="new_leaflets_list">
      <h3>A-G</h3>
      <div>
        <nuxt-link :to="{path:path,query:setQuery({is_preview:true,preview_brand:item.id, title: item.dreamBrandtitle, title: item.dreamBrandtitle})}"
                   v-for="(item,index) in brandList"
                   :key="index"
                   v-if="item.dreamSzm>='A'&&item.dreamSzm<='G'">{{item.dreamBrandtitle}}</nuxt-link>
      </div>
      <div>
      </div>
    </div>
    <div class="new_leaflets_list"
         id="new_leaflets_list1">
      <h3>H-M</h3>
      <div>
        <nuxt-link :to="{path:path,query:setQuery({is_preview:true,preview_brand:item.id, title: item.dreamBrandtitle})}"
                   v-for="(item,index) in brandList"
                   :key="index"
                   v-if="item.dreamSzm>='H'&&item.dreamSzm<='M'">{{item.dreamBrandtitle}}</nuxt-link>
      </div>
    </div>
    <div class="new_leaflets_list"
         id="new_leaflets_list2">
      <h3>O-T</h3>
      <div>
        <nuxt-link :to="{path:path,query:setQuery({is_preview:true,preview_brand:item.id, title: item.dreamBrandtitle})}"
                   v-for="(item,index) in brandList"
                   :key="index"
                   v-if="item.dreamSzm>='O'&&item.dreamSzm<='T'">{{item.dreamBrandtitle}}</nuxt-link>
      </div>
    </div>
    <div class="new_leaflets_list"
         id="new_leaflets_list3">
      <h3>U-Z</h3>
      <div>
        <nuxt-link :to="{path:'/',query:setQuery({is_preview:true,preview_brand:0, title: 'Worldventures'})}">
          Worldventures
        </nuxt-link>
        <nuxt-link :to="{path:path,query:setQuery({is_preview:true,preview_brand:item.id, title: item.dreamBrandtitle})}"
                   v-for="(item,index) in brandList"
                   :key="index"
                   v-if="item.dreamSzm>='U'&&item.dreamSzm<='Z'">{{item.dreamBrandtitle}}</nuxt-link>
      </div>
    </div>
    <div class="img">
      <img src="~static/img/preview/xcy_05.jpg">
    </div>
  </div>
  <div class="new_leaflets_an">
    <nuxt-link :to="{path:vipPath,query:setQuery()}">
      返回介绍
    </nuxt-link>
    <a href="javascript:;"
       @click="openNet">立即开通网站</a>
  </div>
</div>
</template>
<script>
import {getBrandList} from '~/apis/brand'
import {priviewbrandz} from '~/apis/preview'
import {declassify} from '~static/js/util'
import setQuery from '~/static/mixins/setQuery.js'
import querystring from 'querystring'
export default {
  async asyncData({
    query
  }) {
    let uid = declassify(query.uid)
    let brand = query.brand
    let result = await Promise.all([
      priviewbrandz({
        dreamUsername: uid,
        brand: brand,
        uid: uid,
        dreamIsshow: 1
      })
    ])
    return {
      brandList: result[0].list,
      query: query
    }
  },
  mixins: [setQuery],
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  data() {
    return {
      path: '/',
      vipPath: '/wusercenter/vip'
    }
  },
  methods: {
    openNet() {
    let queryObj = {}
    queryObj.uid =declassify(this.query.uid)
    queryObj.brand = this.query.brand
    return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(queryObj)) + '&type=CloudCardOpen'       
    }
  }
}
</script>

<style>
@import '~static/css/preview/index.css';
</style>
