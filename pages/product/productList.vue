<template>
<div>
  <product-header :title="cateTitle"
                  :navData="parentCate"
                  :childCate="childCate"
                  @hdChange="hdChange"
                  @hdChildChange="hdChildChange"></product-header>
  <banner :bannerList="bannerList"
          style="margin-top: 50px;"></banner>
  <div class=""
       v-if="productList.length > 0">
    <loadmore :loading="loading"
              @load="load"
              style="margin-bottom: 80px;">
      <div class="new_productlist wf-container"
           id="new_productlist"
           ref="waterfallWarrp">
        <div class="wf-column"
             style="width: 50%">
          <product-item v-for="(item, index) in proList.left"
                        :key="index"
                        :cid="cid"
                        :productData="item"></product-item>
        </div>
        <div class="wf-column"
             style="width: 50%">
          <product-item v-for="(item, index) in proList.right"
                        :key="index"
                        :cid="cid"
                        :productData="item"></product-item>
        </div>
      </div>
    </loadmore>
  </div>
  <div class="empty-list"
       v-else>
    <span>暂时没有产品哦^_^</span>
  </div>
</div>
</template>
<script>
import productHeader from '~components/product/productHeader'
import productItem from '~components/product/productListItem'
import banner from '~components/banner'
import loadmore from './loadmore'
import {getProductCateList, getProductList} from '~/apis/product'
import { getBannerList} from '~/apis/banner'
import keepUserOnline from '~static/js/keepUserOnline'
import wechat from "~/static/mixins/wechat.js";
import {getRealPath} from '~static/js/util'
import expired from "~/static/mixins/expired.js";

export default {
  name: 'paroduct-list',
  async asyncData({ query,  store, route }) {
    console.log('route.fullPath',getRealPath(route.fullPath));
    if(!getRealPath(route.fullPath)){
      console.log('query.brand', query.brand);
      let productCate = await getProductCateList(query.brand)
      let productList = await getProductList({
        dreamBrandid: query.brand,
        dreamClassid: query.cid,
        dreamTitle: query.dreamTitle ? query.dreamTitle : '',
        pageSize: 8
      })
      let bannerList = await getBannerList({
        dreamBrandid: query.brand
      })

      // 处理active
      if (productCate.hasOwnProperty('code') && productCate.data.hasOwnProperty('code')) {
      	productCate = {};
      	productCate.data = []
      }
      productCate.data.unshift({
        id: 0,
        dreamNames: '全部'
      })
      productCate.data.map((item, index) => {
        return item.active = index == 0 ? true : false
      })

      // 处理高度
      let proData = productList.result ? productList.result : []
      let proList = {
        left: [],
        right: []
      }

      proData.map((v, i) => {
        if (i % 2 === 0) {
          proList.left.push(v)
        } else {
          proList.right.push(v)
        }
      })
      let brandData = await keepUserOnline(route, 'brand')

      // footer
      store.dispatch('setFooterShow', true)
      return {
        cateTitle: query.flag ? query.flag : '',
        parentCate: productCate.data,
        productList: proData,
        nextPage: productList.nextPage,
        hasNext: productList.hasNext,
        proList: proList,
        bannerList: bannerList,
        brand: query.brand,
        cid: query.cid ? query.cid : '',
        brandInfo: brandData.brand
      }
    }
  },
  data() {
    return {
      path: '/product/productDetail',
      align: 'center',
      busy: false,
      childCate: [{
        id: 0,
        dreamNames: '全部'
      }],
      loading: true,
      brandInfo: {},
      userInfo: {}
    }
  },
  async created() {
    return (async () => {
      let data = await keepUserOnline(this.$route, 'user')
      this.userInfo = data.user
      this.$store.dispatch('setFooterShow', true)
    })()
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
      title: `${this.brandInfo.dreamBrandtitle}-${this.cateTitle}`, // 分享标题
      desc: `${this.cateTitle},${this.brandInfo.dreamBrandtitlecon}`, // 分享描述
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
    this.expired(this.userInfo.dreamEndtime)

  },
  mounted() {
    this.$nextTick(() => {
      this.expired(this.userInfo.dreamEndtime)
    })
    this.$store.dispatch('setFooterShow', true)
  },
  methods: {
    hdChange(cid, title) {
      this.cateTitle = title
      this.proList.left = []
      this.proList.right = []
      this.getCateChild(cid)
      this.getCateProduct(cid)
    },
    hdChildChange(cid, title) {
      this.cateTitle = title
      this.proList.left = []
      this.proList.right = []
      this.getCateProduct(cid)
    },
    addItems: function () {
      if (!this.isBusy && this.items.length < 500) {
        this.isBusy = true
        this.items.push.apply(this.items, ItemFactory.get(50))
      }
    },
    shuffle: function () {
      this.items.sort(function () {
        return Math.random() - 0.5
      })
    },
    reflowed: function () {
      this.isBusy = false
    },
    async getCateChild(cid) {
      let result = await getProductCateList(this.brand, cid)
      this.childCate = result.data ? result.data : []
      this.childCate.unshift({
        id: 0,
        dreamNames: '全部'
      })
    },
    async getCateProduct(cid, index = 1) {
      let productList = await getProductList({
        dreamBrandid: this.brand,
        dreamClassid: cid,
        dreamTitle: '',
        pageSize: 8,
        index: index
      })
      this.productList = productList.result ? productList.result : []
      this.hasNext = productList.hasNext
      this.nextPage = productList.nextPage
      this.cid = cid
      this.productList.map((v, i) => {
        if (i % 2 === 0) {
          this.proList.left.push(v)
        } else {
          this.proList.right.push(v)
        }
      })
      this.loading = true
    },
    load() {
      if (!this.hasNext) {
        return this.loading = false
      }
      this.getCateProduct(this.cid, this.nextPage)
      this.expired(this.userInfo.dreamEndtime)
    }
  },
  components: {
    productHeader,
    productItem,
    banner,
    loadmore
  },
}
</script>
