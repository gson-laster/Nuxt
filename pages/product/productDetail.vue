<template>
<div>
  <div class="new_body"
       style="padding-bottom:60px;overflow:hidden">
    <banner :bannerList="bannerList"></banner>
    <div class="info_t"
         id="info_t">
      <h3 v-html="pro.dreamTitle"></h3>
      <div class="info_sc">收藏</div>
      <div class="info_price"></div>
    </div>
    <div class="info_cont"
         id="info-cont">
      <ul>
        <li :class="{on: active == 0}"
            @click="changeTab(0)">
          产品详情
        </li>
        <li :class="{on: active == 1}"
            @click="changeTab(1)">
          产品参数
        </li>
      </ul>
      <div class="line"></div>
    </div>
    <loading v-show="loading"
             :style="{marginTop: 40 + 'px'}"></loading>

    <div class="product-warrp animated"
         :style="{width: warrpWidth + 'px', height: warrpHeight, opacity: detailOpcity, transform: 'translate3d('+translateX+'px, 0, 0)'}"
         :class="{fadeIn: fadeIn}">
      <!-- 产品详情 -->
      <div class="info_con"
           :style="{width: itemWith + 'px'}"
           ref="item0">
        <div style="padding:10px;"
             v-html="pro.dreamContent">
        </div>
      </div>
      <!-- 产品参数 -->
      <div class="info_con"
           :style="{width: itemWith + 'px'}"
           ref="item1">
        <div style="padding:10px;"
             v-html="pro.dreamContent2">
        </div>
      </div>
    </div>
    <!--同类产品-->
    <div class="clearfix"></div>
    <div class="info_more">
      <div class="info_more_t">同类产品</div>
      <div class=""
           v-if="productList.length > 0">
        <div class="new_productlist wf-container"
             id="new_productlist"
             ref="waterfallWarrp">
          <div class="wf-column"
               style="width: 50%">
            <product-item v-for="(item, index) in proList.left"
                          :key="index"
                          :cid="cid"
                          :productData="item" :query="query"></product-item>
          </div>
          <div class="wf-column"
               style="width: 50%">
            <product-item v-for="(item, index) in proList.right"
                          :key="index"
                          :cid="cid"
                          :productData="item"
                          :query="query"
                          ></product-item>
          </div>
        </div>
      </div>
      <div class="empty-list"
           v-else>
        <span>暂时没有产品哦^_^</span>
      </div>
    </div>
    <product-userinfo :userInfo="userInfo" :query="setQuery(query)"></product-userinfo>
    <product-bottom :list="bottomData" :query="query"></product-bottom>
    <preview-pic container=".product-warrp"></preview-pic>

  </div>
</div>
</template>
<script>
import productItem from '~components/product/productListItem'
import productBottom from '~pages/product/productBottom'
// import productUserinfo from '~components/avatarAndQrcode'
import productUserinfo from '~components/avatarAndQrcode/user_card'
import banner from '~components/banner'
import loading from '~components/common/loading'
import {getProductList} from '~/apis/product'
import {getProductDetail} from '~/apis/product'
import {setBanner} from '~static/js/util'
import wechat from "~/static/mixins/wechat.js";
import {fecthUserInfo} from '~/apis/user'
import { declassify } from "~static/js/util";
import setQuery from "~/static/mixins/setQuery.js";
import expired from "~/static/mixins/expired.js";
import previewPic from '~components/previewPic'

export default {
  async asyncData({query, isClient, store }) {
    let pro = await getProductDetail(query.product_id)
    let proDetail = pro.data
    let bannerList = setBanner(proDetail.dreamContent3)
    let productList = await getProductList({
      dreamBrandid: query.brand,
      dreamClassid: query.cid,
      dreamTitle: '',
      pageSize: 8
    })
    console.log(proDetail.dreamContent3);
    let banner = []
    bannerList.map((v, i) => {
      banner.push({
        dreamTitle: i,
        dreamDefaultpicurl: v.substr(1, v.length)
      })
    })
    let bottomData = [
      {
        name: '购买咨询',
        className: 'icon-interactive',
        path: '/newcard',
        query: {}
      },
      {
        name: '更多产品',
        className: 'icon-service1',
        path: '/product/productList',
        query: {
          cid: query.cid
        }
      },
      {
        name: '我要预订',
        className: 'icon-edit',
        path: '/product/productBook',
        query: {
          id: query.product_id,
          info: proDetail.dreamTitle
        }
      },
    ]

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

    return {
      pro: pro.data,
      bannerList: banner,
      productList: proData,
      warrpHeight: '140px',
      loading: true,
      proList: proList,
      cid: query.cid,
      query: query,
      bottomData: bottomData
    }
  },
  data() {
    return {
      warrpWidth: 0,
      itemWith: 0,
      detailOpcity: 0,
      fadeIn: false,
      translateX: 0,
      active: 0,
      userInfo: {}
    }
  },
  async created () {
    let userData = await fecthUserInfo({dreamUsername: declassify(this.query.uid, 2)})
    this.userInfo = userData.userInfo[ 0 ]
  },
  beforeCreate() {
    this.$store.dispatch('setFooterShow', false)
  },
  mixins: [wechat,setQuery, expired],
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
      title: `${this.pro.dreamTitle}`, // 分享标题
      desc: `${this.pro.dreamDescription}`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.pro.dreamDefaultpicurl.indexOf('http') != -1 ? this.pro.dreamDefaultpicurl : 'http://' + window.location.host + '/' + this.pro.dreamDefaultpicurl, // 分享图标
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
    this.initTab()
  },
  beforeRouteUpdate(to, from, next) {
    let winW = window.innerWidth
    this.warrpHeight = 'auto'
    this.itemWith = winW
    this.warrpWidth = winW * 2
    this.fadeIn = true
    this.loading = false
    next()
  },
  methods: {
    changeTab(index) {
      this.translateX = -index * window.innerWidth
      this.warrpHeight = this.$refs['item' + index].offsetHeight + 'px'
      this.loading = false
      this.active = index
    },
    initTab() {
      let winW = window.innerWidth
      this.warrpHeight = 'auto'
      this.itemWith = winW
      this.warrpWidth = winW * 2
      this.fadeIn = true
      this.loading = false
      console.log(this.warrpWidth);
    }
  },
  components: {
    productItem,
    productBottom,
    productUserinfo,
    banner,
    loading,
    'preview-pic': previewPic

  }
}
</script>

<style scoped="">
@import '~static/css/product/productDetail.css';
.new_productlist {
  background-color: #f5f5f5;
}

.wf-box .listmk {
  background-color: #f2f2f2;
  border-radius: 6px;
}
</style>
