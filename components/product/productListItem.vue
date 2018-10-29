<template>
<li class="wf-box">
  <div class="listmk">
    <nuxt-link :to="{path: path, query: setQuery(Object.assign({product_id: productData.id, cid: cid}, query))}">
      <div class="img"><img src="~static/img/blank.gif"
             v-lazy="setImgUrl(productData.dreamDefaultpicurl, { f: 'png', w: 120, h: 120})"></div>
      <div class="text clear">
        <h3 v-html="productData.dreamTitle"></h3>
        <span class="price"></span>
        <div class="more">查看</div>
      </div>
    </nuxt-link>
  </div>
</li>
</template>
<script>
import setQuery from '~/static/mixins/setQuery'
import querystring from 'querystring'
import appConf from '~/app.config.js'
export default {
  props: {
    productData: {
      type: Object,
      require: true
    },
    cid: {
      type: String,
      default: ''
    },
    query: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      path: '/product/productDetail'
    }
  },
  mixins: [setQuery],
  methods: {
    setImgUrl (url, options) {
      let query = querystring.stringify(options), urlStr = ''
      if(url && url.indexOf('http') != -1) {
        urlStr =  url + '?' + query
      }else{
        urlStr = appConf.site_url + '/' + url + '?' + query
      }
      return urlStr
    }
  }
}
</script>
<style lang="" scoped>
@import '~static/css/product/productListItem.css';
.img {
  background-image: none;
  width: 100%;
}
</style>
