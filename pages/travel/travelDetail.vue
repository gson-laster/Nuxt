<template>
<div class="mt80">
  <div class="lytc-banner">
    <!-- 轮播图 -->
    <div class="banner">
      <banner :bannerList="bannerList"></banner>
    </div>
    <div class="create-image">
      <nuxt-link :to="{path: '/travel/travelCanvas', query: setQuery({id: contentDetail.id})}"><i></i></nuxt-link>
    </div>
  </div>
  <!-- 详情页参数内容 -->

  <div class="lytc_canshu"
       id="lytc_canshu">
    <div class="lytc_mk">
      <div class="lytc_t">{{contentDetail.dreamTitle}}</div>
    </div>
    <div class="lytc_price2">
      <span>{{contentDetail.dreamPrice2}}/人</span>
    </div>
    <div class="lytc_price">
      <span>抵积分:{{contentDetail.dreamPrice}}</span>
      <i>会员专享</i>
    </div>
    <div class="lytc_time">时间：
      <span>{{contentDetail.dreamTime1}}</span>
    </div>
    <div class="lytc_like"
         id="likean"
         @click="dianZan">
      <i class="icon iconfont icon-good"></i>
      <span class="">点赞:</span>
      <i id="like">{{dreamLike}}</i>
    </div>
  </div>
  <div class="lytc_canshu2"
       id="lytc_canshu2">
    <div class="lytc_canshu2_left">
      <a :href="['tel:'+userInfo.dreamUsername]" class="tc_tel">
      <div class="lytc_phone">
        <div class="lytc_phone_container">
          <span><i class="tel iconfont icon-phone"></i>&nbsp;电话咨询</span>
        </div>
      </div>
      </a>
    </div>
    <div class="lytc_canshu2_right">
      <div class="lytc_more">
        <nuxt-link :to="{path: '/travel', query: setQuery({})}">更多旅游套餐</nuxt-link>
      </div>
    </div>
  </div>

  <div id="th">
    <!-- tab切换 -->
    <div class="lytc_tab_t"
         id="tab">
      <ul>
        <li :class="{a:isA}"
            @click="tabChange(1)">套餐介绍</li>
        <li :class="{a:!isA}"
            @click="tabChange(2)">相关推荐</li>
      </ul>
      <div class="lytc_tab_line"></div>
    </div>
    <!-- 内容 -->
    <tab-content v-show="isTabContent"
                 :content="contentDetail"></tab-content>
  </div>
  <!-- 用户信息 -->
  <user-info :userInfo="userInfo" :query="query"></user-info>

  <!-- 事业说明 -->
  <div class="innav t_center"
       style="clear:both;float: none; height: 48px;
       line-height: 48px; margin-top:18px;">
    <div class="career"><nuxt-link :to="{path: '/newcard', query: setQuery({})}"><span>事业说明</span></nuxt-link></div>
    <div class="applyweb"><nuxt-link :to="{path: '/register', query: setQuery({})}"><span>申请网站</span></nuxt-link></div>
  </div>

  <!-- 底部导航 -->
  <div class="footer travel">
    <nuxt-link :to="{path: '/newcard', query:setQuery({})}">
      <i class="iconfont icon-iconlocation"></i>
      <em>旅游咨询</em>
    </nuxt-link>

    <nuxt-link :to="{path:'/travel',query:setQuery({})}">
      <i class="iconfont icon-earth"></i>
      <em>更多套餐</em>
    </nuxt-link>
    <nuxt-link :to="{path:'/travel/travelLearn',query:setQuery({id:query.id})}">
      <em>我想了解</em>
    </nuxt-link>
  </div>
  <preview-pic container=".tab_content" :isArticle="false"></preview-pic>

</div>
</template>
<script>
import imgArr from "~/static/js/outTravel.js";
import {getLytcDetail,secLytcBylike} from "~/apis/travel";
import {mapGetters,mapActions} from "vuex";
import wechat from "~/static/mixins/wechat.js";
import setQuery from "~/static/mixins/setQuery.js";
import expired from "~/static/mixins/expired.js";
import {setBanner} from "~static/js/util";
import keepUserOnline from '~static/js/keepUserOnline'
import previewPic from '~components/previewPic'

export default {
  components: {
    "tab-content": require("~pages/travel/_tabContent"),
    "user-info": require("~components/avatarAndQrcode/user_card"),
    banner: require("~components/banner"),
    'preview-pic': previewPic

  },
  async asyncData({store, query}) {
    let result = await Promise.all([getLytcDetail(query.id)]);
    let contentDetail = result[0];
    let bannerImages = setBanner(contentDetail.dreamContent9);
    let bannerList = [];
    for (let v of bannerImages) {
      bannerList.push({
        dreamTitle: v,
        dreamDefaultpicurl: v.indexOf('http') != -1 ? v : v.substr(1, v.length)
      });
    }

    return {
      contentDetail: contentDetail,
      query: query,
      bannerList: bannerList
    };
  },
  head() {
    return {
      title: this.contentDetail.dreamTitle,
      meta: [
        {
          name: "description",
          content: this.contentDetail.dreamDescription
        },
        {
          name: "keywords",
          content: this.contentDetail.dreamKeyword
        }
      ]
    };
  },
  data() {
    return {
      imgPath: "", //分享图片地址;
      isShow: false, //是否显示分享遮罩;
      isA: true, //是否显示a类;
      isTabContent: true, //是否显示旅游文章内容;
      userInfo: {},
      query: {}
    };
  },
  computed: {
    ...mapActions({
      footerShow: "setFooterShow"
    }),
    dreamLike() {
      return this.contentDetail.dreamLike ? this.contentDetail.dreamLike : 0
    }
  },
  async created() {
    let data = await keepUserOnline(this.$route, 'user')
    this.userInfo = data.user
    this.query = this.$route.query
    this.$store.dispatch("setFooterShow", false);
  },
  mixins: [wechat, setQuery, expired],
  async beforeMount() {
    var url = ''
    // 判断是否是ios微信浏览器
    // if (window.__wxjs_is_wkwebview === true) {
    //   url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    // } else {
    //   url = window.location.href.split('#')[0]
    // }
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
      title: `${this.contentDetail.dreamTitle}`, // 分享标题
      desc: `${this.contentDetail.dreamDescription}`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.contentDetail.dreamDefaultpicurl.indexOf('http') != -1 ? this.contentDetail.dreamDefaultpicurl : 'http://' + window.location.host + '/' + this.contentDetail.dreamDefaultpicurl, // 分享图标
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
    this.expired(this.userInfo.dreamETime)
  },
  methods: {
    hideShow(v) {
      this.isShow = v;
    },
    // 套餐相关推荐切换;
    tabChange(e) {
      switch (e) {
      case 1:
        this.isTabContent = true;
        this.isA = true;
        break;
      case 2:
        this.isTabContent = false;
        this.isA = false;
        break;
      }
    },
    dianZan() {
      secLytcBylike(this.query.id)
        .then(res => {
          if (res.code == 2000) {
            this.contentDetail.dreamLike = Number(this.contentDetail.dreamLike) + 1
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
};
</script>
<style scoped>
@import "~static/css/travel/travelDetail.css";
@import "~static/css/travel/travelCanshu.css";
.career,
.applyweb {
  width: 50%;
  float: left;
  box-sizing: border-box;
}
.tc_tel{
  display: block;
  width: 100%;
  height: 34px;
  line-height: 34px;
}
.career span,
.applyweb span {
  border: 1px solid #ddd;
  padding: 8px 24px;
  border-radius: 25px;
  color: #fff
}

.career {
  text-align: right;
  padding-right: 12px;
}

.applyweb {
  text-align: left;
  padding-left: 12px;
}

.career span {
  background: #e06517;

}

.applyweb span {
  background: #7b8edc
}

.create-image {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  bottom: 24px;
  z-index: 100000000;
  cursor: pointer;
}

.create-image i {
  display: inline-block;
  height: 50px;
  width: 50px;
  background: url(~static/img/travel/lytc-icon.png) no-repeat;
  background-size: 100%;
}

.lytc-banner {
  position: relative;
}

.lytc-banner {
  margin: 0 auto;
  padding: 10px;
  overflow: hidden;
  background: #fff;
}

.footer.travel {
  z-index: 100;
  display: flex;
  justify-content: flex-start;
}

.footer.travel a {
  display: block;
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.footer.travel a i {
  margin: 0px 0px;
  line-height: 35px;
  font-size: 20px;
}

.iconfont {
  background: none !important;
}

.footer.travel a:last-of-type {
  background-color: #fa0;
  color: #fff;
}
</style>
