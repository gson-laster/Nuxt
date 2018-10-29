<template>
<div class="new_body box">
  <div class="newmb_mk1"
       style="margin-top: 46px">
    <banner :bannerList="bannerList"></banner>
  </div>
  <index-search :isPreview="isPreview" seacheField="dreamTitle" toUrl="newslist" :query="query"></index-search>
  <preview-bottom v-if="isPreview"
                  @setVip="setVip()"></preview-bottom>
  <div class="new_nav">
    <ul>
      <li v-for="(item, index) in navList.category"
          v-bind:key="index"
          v-if="item.dreamIsshow"
          >
        <nuxt-link :to="{path: item.path ? item.path : path, query: setQuery(Object.assign({cid: item.id, flag:item.dreamNames}, query))}">
          <img :src="item.dreamDefaultpicurl + '?w=120&h=120'">
          <span>{{item.dreamNames}}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
  <div class="new_ad">
    <ul>
      <index-nav-item v-for="(item,index) in navList.recommond"
                      v-bind:key="index"
                      :data="item"
                      :itemColorClass="getColorClass(index)"></index-nav-item>
    </ul>
  </div>
  <slide-tab :tabList="tabList"
             :articleData="articleData"
             :query="query">
  </slide-tab>
</div>
</template>
<script>
import IndexSearch from '~components/common/search'
import IndexArticleItem from '~components/article/articleItem'
import IndexNavItem from '~components/common/navItem'
import banner from '~components/banner'
import slideTab from '~components/slideTab'
import { mapGetters} from 'vuex'
import {getBannerList} from '~/apis/banner'
import {fecthUserInfo} from '~/apis/user'
import { getNavList, getArticleList} from '~/apis/article'
import wechat from '~/static/mixins/wechat.js'
import setQuery from '~/static/mixins/setQuery.js'
import expired from '~/static/mixins/expired.js'
import { getBrandList } from '~/apis/brand'
import appConf from '~/app.config.js'
import { getOAuthUrl} from '~/apis/wechat'
import keepUserOnline from '~static/js/keepUserOnline'

let list = {
  id: -1,
  dreamIsshow: true,
  dreamDefaultpicurl: appConf.index_default_img.register,
  dreamNames: '申请网站',
  path: '/register'
}
let recList = {
  dreamNames: '微信分享',
  dreamContent: '私人订制广告',
  dreamDefaultpicurl: appConf.index_default_img.wechat_share,
  dreamUrl:'/wechat',
  id:'-1'
}
export default {
  scrollToTop: true,
  async asyncData({ query, store}) {
    let brand = null, bannerList = [],navList = [],newArticleList=[],recommondArticleList=[];
    if (query.hasOwnProperty('is_preview')) {
      brand = query.preview_brand
    } else {
      brand = query.brand
    }
    let indexArticleDataArr = await Promise.all([
      getBannerList({
        dreamBrandid: brand,
        dreamIsok: true
      }),
      getNavList(brand),
      getArticleList({
        pageSize: 16,
        dreamBrandid: brand,
        dreamIsok:1,
        dt:1
      }),
      getArticleList({
        pageSize: 16,
        dreamBrandid: brand,
        dreamHits: 1
      })
    ])
    bannerList = indexArticleDataArr.shift()
    navList = indexArticleDataArr.shift()
    newArticleList = indexArticleDataArr.shift()
    recommondArticleList = indexArticleDataArr.shift()
    navList.category.push(list)
    navList.recommond.push(recList)
    let tabData = query.brand * 1 == 0 ? appConf.index_tab_config.wv : appConf.index_tab_config.brand
    let articleListData = {
      newArticleList: newArticleList.result,
      recommondArticleList: recommondArticleList.result
    }
    if (query.brand == 0) {
      let travelArticleData = await Promise.all([
        getArticleList({
          pageSize: 16,
          dreamBrandid: brand,
          dreamClassid: 40
        }),
        getArticleList({
          pageSize: 16,
          dreamBrandid: brand,
          dreamClassid: 91
        }),
        getArticleList({
          pageSize: 16,
          dreamBrandid: brand,
          dreamClassid: 127
        }),
      ])
      articleListData['thirdArticleList'] = travelArticleData.shift().result
      articleListData['forthArticleList'] = travelArticleData.shift().result
      articleListData['fivethArticleList'] = travelArticleData.shift().result
    }
    if (query.hasOwnProperty('title')) {
      store.state.previewTitle = query.title
    }
    let brandInfo = await getBrandList( { brandId: brand } )
    brandInfo = brandInfo[ 0 ]
    return {
      bannerList: bannerList,
      navList: navList,
      tabList: tabData,
      articleData: articleListData,
      brand: brand,
      query: query,
      brandInfo: brandInfo,
      isPreview: query.is_preview ? true : false,
    }
  },
  async fetch({store, route}){
    if(!store.state.brandInfo) {
      let data = await keepUserOnline(route, 'brand')
      store.dispatch('setBrandInfo', data.brand)
      store.dispatch('setFooterShow', true)
    }
  },
  head() {
    return {
      title:!this.isPreview ? (this.brandInfo ? this.brandInfo.dreamBrandtitle : '') : this.preTitle
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isPreview) {
      if (to.path == '/newslist' || to.path == '/index' || to.path == '/wechat' || to.path == '/product') {
        next(false)
      } else {
        next()
      }
    } else {
      next()
    }
  },
  data() {
    return {
      path: 'newslist',
      query: {},
      bannerList: [],
      isPreview: false,
      navList: [],
      tabList: [],
      articleData: [],
      isIndex: 0,
      swiperOption: {
        onSlideChangeStart: (swiper) => {
          this.$refs.slideBottomLine.style.left = (swiper.activeIndex / this.getCurrentTab.length) * 100 + 2 + '%'
        }
      },
      brandInfo: {}
    }
  },
  mixins: [wechat, setQuery, expired],
  async beforeMount() {
    let url = ''
    // 判断是否是ios微信浏览器
    if ( typeof window.entryUrl === 'undefined' || window.entryUrl === '' ) {
      window.entryUrl = location.href.split( '#' )[ 0 ]
    }
    if (window.__wxjs_is_wkwebview === true) {
      url = window.entryUrl
    } else {
      url = window.location.href.split('#')[0]
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
    const shareOpts = {
      title: `${this.brandInfo ? this.brandInfo.dreamBrandtitle : ''}`, // 分享标题
      desc: `${this.brandInfo ? this.brandInfo.dreamBranddescription : ''}`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `http://${window.location.host}/${this.bannerList[0]? this.bannerList[0].dreamDefaultpicurl: ''}`, // 分享图标
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
    this.expired(this.$store.state.userInfo ? this.$store.state.userInfo.dreamEndtime : 0)
  },
  methods: {
    // tab切换;
    tabChange(index) {
      this.isIndex = index
      this.swiper.slideTo(this.isIndex)
    },
    getArticleData(key) {
      return this[key]
    },
    getColorClass(index) {
      return 'color' + (index % 6)
    }
  },
  components: {
    IndexSearch,
    IndexArticleItem,
    IndexNavItem,
    slideTab,
    banner,
    'preview-bottom': require('~components/preview')
  },
  computed: {
    ...mapGetters({
      preTitle: 'getPreviewTitle'
    })
  }
}
</script>
<style>
@import '~static/css/pageIndex/index.css';
</style>
