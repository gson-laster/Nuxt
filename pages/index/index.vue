<template>
<div class="new_body box">
  <div class="newmb_mk1">
    <swiper :auto="4000">
      <swiper-item v-for="(item, index) in bannerList"
                   :key="index">
        <img src=""
             v-lazy="item.dreamDefaultpicurl"
             :alt="item.dreamTitle" />
      </swiper-item>
    </swiper>
  </div>

  <index-search :isPreview="isPreview"></index-search>
  <preview-bottom v-if="isPreview"
                  @setVip="setVip()"></preview-bottom>

  <div class="new_nav">
    <ul>
      <li v-for="(item, index) in navList.category"
          v-bind:key="index">
        <nuxt-link :to="{path: path, query: setQuery({cid: item.id, flag:item.dreamNames})}">
          <img src=""
               v-lazy="item.dreamDefaultpicurl">
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
             :articleData="articleData">
  </slide-tab>
</div>
</template>
<script>
import IndexSearch from '~components/common/search'
import IndexArticleItem from '~components/article/articleItem'
import IndexNavItem from '~components/common/navItem'
import swiper from '~components/swiper'
import swiperItem from '~components/swiper/swiper-item'
import slideTab from '~components/slideTab'
import {
  mapGetters
} from 'vuex'
import {
  getBannerList
} from '~/apis/banner'
import {
  fecthUserInfo
} from '~/apis/user'
import {
  getNavList,
  getArticleList
} from '~/apis/article'
import wechat from '~/static/mixins/wechat.js'
import setQuery from '~/static/mixins/setQuery.js'
import {
  selectorFunction
} from '~static/js/util'
import appConf from '~/app.config.js'
let list = {
  id: -1,
  dreamIsshow: true,
  dreamDefaultpicurl: appConf.index_default_img.register,
  dreamNames: '申请网站'
}
let recList = {
  dreamNames: '微信分享',
  dreamContent: '私人订制广告',
  dreamDefaultpicurl: appConf.index_default_img.wechat_share,
  dreamUrl: ''
}
export default {
  async asyncData({
    query,
    store
  }) {
    let brand = null
    if (query.hasOwnProperty('is_preview')) {
      brand = query.preview_brand
      store.dispatch('setUserDude',false)  
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
      }),
      getArticleList({
        pageSize: 16,
        dreamBrandid: brand,
        dreamHits: 1
      })
    ])
    let bannerList = indexArticleDataArr.shift()
    let navList = indexArticleDataArr.shift()
    let newArticleList = indexArticleDataArr.shift()
    let recommondArticleList = indexArticleDataArr.shift()
    navList.category.push(list)
    navList.recommond.push(recList)
    let tabData = query.brand * 1 == 0 ? appConf.index_tab_config.wv : appConf.index_tab_config.brand
    return {
      bannerList: bannerList,
      navList: navList,
      tabList: tabData,
      articleData: {
        newArticleList: newArticleList.result,
        recommondArticleList: recommondArticleList.result
      },
      brand: brand,
      isPreview: query.is_preview ? true : false
    }
  },
  fetch ({store}) {
    store.dispatch('setFooterShow', true)  
  },
  head() {
    return {
      title: '首页'
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
      isIndex: 0,
      swiperOption: {
        onSlideChangeStart: (swiper) => {
          this.$refs.slideBottomLine.style.left = (swiper.activeIndex / this.getCurrentTab.length) * 100 + 2 + '%'
        }
      }
    }
  },
  mixins: [wechat, setQuery],
  async beforeMount() {
    const url = 'http://' + window.location.host + this.$route.fullPath
    // console.log('url', url);
    // console.log(this.$route.fullPath);
    await this.wechatInit(url, {
      title: document.title,
      desc: selectorFunction("meta[name=description]")
        .innerHTML
    })
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
    },
    async setVip() {
      // 获取订单
      let res = await createVipOrder({
        username: this.$store.getters.getUserInfo.dreamUsername,
        openId: this.$store.getters.getAuthUser.openid,
        type: 'CloudCardOpen'
      })
      let {
        data
      } = res
      window.wx.chooseWXPay({
        timestamp: data.args.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.args.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.args.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.args.paySign, // 支付签名
        success: (res) => {
          try {
            window.WeixinJSBridge.log(res.err_msg)
          } catch (e) {
            console.error(e)
          }
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 支付成功
            toggleModal(_.modal, '支付成功')
          }
        }
      })
    }
  },
  components: {
    IndexSearch,
    IndexArticleItem,
    IndexNavItem,
    slideTab,
    swiper,
    swiperItem,
    'preview-bottom': require('~components/preview')
  }
}
</script>
<style>
@import '~static/css/pageIndex/index.css';
</style>
