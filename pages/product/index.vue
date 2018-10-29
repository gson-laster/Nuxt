<template>
<div style="margin-bottom: 80px;margin-top: 46px;">
  <product-search placeholder="输入关键字，找到您需要的产品"
                  seacheField="dreamTitle"
                  toUrl="/product/productList"
                  :query="query"
                  ></product-search>
  <banner :bannerList="banner"></banner>
  <div class="product-list">
    <ul class="product-content">
      <product-item :path="path"
                    v-for="(item, index) in productCate"
                    :cateData="item"
                    :key="index"
                    :query="query"  
                    ></product-item>
    </ul>
  </div>
</div>
</template>
<script>
import productItem from '~components/product'
import productSearch from '~components/common/search'
import banner from '~components/banner'
import keepUserOnline from '~static/js/keepUserOnline'
import { getBannerList} from '~/apis/banner'
import { getProductCateList} from '~/apis/product'
import { mapGetters} from 'vuex'
import wechat from "~/static/mixins/wechat.js";
import expired from "~/static/mixins/expired.js";
import {getRealPath} from '~static/js/util'
export default {
  async asyncData({ query, route }) {
    if(!getRealPath(route.fullPath)){
      try {
        let banner = await getBannerList({dreamBrandid: query.brand})
        let productCate = await getProductCateList(query.brand)
        let brandData = await keepUserOnline(route, 'brand')
        return {
          banner: banner,
          query: query,
          productCate: productCate.data,
          brandInfo: brandData.brand
        }
      } catch (e) {
        console.log('cuowu', e);
      }
    }else{

    }
  },
  data () {
    return {
      path: '/product/productList',
      banner: [],
      productCate: []
    };
  },
  mixins: [wechat, expired],
  async beforeMount() {
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
    const shareOpts = {
      title: `${this.brandInfo.dreamBrandtitle}`, // 分享标题
      desc: `${this.brandInfo.dreamBrandtitlecon}`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.brandInfo.dreamBrandlogo.indexOf('http') != -1 ? this.brandInfo.dreamBrandlogo : 'http://' + window.location.host + '/' + this.brandInfo.dreamBrandlogo, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: () => {
       alert('分享成功')
      }, // 用户确认分享后执行的回调函数
      cancel: () => {
        alert('分享取消')
      } // 用户取消分享后执行的回调函数
    }
    await this.wechatInit(url, shareOpts)
    this.expired(this.$store.state.userInfo.dreamEndtime)
  },
  beforeRouteEnter(to, from, next) {
    if (from.query.hasOwnProperty('is_preview')) {
      next(false)
    } else {
      next()
    }
  },
  components: {
    productSearch,
    productItem,
    banner
  }
}
</script>
<style scoped>
.product-list {
  max-width: 640px;
  margin: auto;
}
</style>
