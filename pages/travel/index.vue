<template>
<div class="box travel">
  <search :placeholder="placeholder"
           toUrl="travel"
           :keyword="keyword"
           seacheField="dreamTitle"/>
  <banner :bannerList="banner"
          style="margin-top: 50px;" />
  <div class="newnews_list noline"
       style="margin-bottom: 100px;">
    <div class="lytc_tab">
      <ul class="lytc_tab_nav">
        <li v-for="(item, index) in tabList"
            :class="{active:tabActive==index}"
            @click="tabChange(index)"><a href="javascript:;">{{item.name}}</a><i v-if="index != (tabList.length - 1)"></i></li>
      </ul>
      <div class="lytc_tab_con"
           v-for="(tabItem, i) in tabContent"
           v-show="i == tabActive">
        <ul>
          <li :class="tabItem.liClass"
              v-for="(val, n) in tabItem.data"
              @click="setParams(val.params)"><a href="javascript:;">{{val.dreamNames}}</a>
          </li>
        </ul>
        <div class="lytc_tab_close"
             @click="closeTab(i)">关闭</div>
      </div>
      <div v-show="(tabActive==tabList.length-1)">
        <div class="form-item">
          <label class="text">积分</label>
          <input type="text"
                 v-model="recodeStart">
          <span>~</span>
          <input type="text"
                 v-model="recodeEnd">
        </div>
        <div class="form-item">
          <button class="selecte-btn"
                  @click="setRecodeParams()">筛选</button>
        </div>
      </div>
    </div>
    <!-- 列表内容 -->
    <div class="lytcclass"
         style="padding:0 3px; clear: both; float: none">
      <loadmore :bottom-method="loadBottom"
                @bottom-status-change="handleBottomChange"
                :bottom-all-loaded="allLoaded"
                :autoFill="false"
                ref="loadmore">
        <travel-item v-for="(item,index) in contentList"
                     :content="item"
                     :key="index"
                     :query="query"
                     :path="path"></travel-item>
      </loadmore>
    </div>
  </div>
</div>
</template>
<script>
import search from '~components/common/search'
import banner from '~components/banner'
import appConf from '~/app.config'
import loadmore from "~components/common/loadmore"
import travelItem from "~components/travel/index"
import msg from '~components/msg/msg.vue'
import {getBannerList} from '~/apis/banner'
import {getLytcClass, getLytcList} from '~/apis/travel'
import wechat from '~/static/mixins/wechat.js'
import expired from '~/static/mixins/expired.js'
export default {
  async asyncData({query, store}) {
    let bannerResult = await getBannerList({
      type: 'travel'
    })

    // tab
    let tabResult = appConf.travel_tab

    // tabContent
    let tabContent = [{
       data: [
         {dreamNames: '默认排序', params: {dreamUpdatetime: 0,dreamPrice2: 0}},
         {dreamNames: '更新时间',params: {dreamUpdatetime: 1}},
         {dreamNames: '价格从高到低',params: {dreamPrice2: 1}},
         {dreamNames: '价格从低到高',params: {dreamPrice2: 2}}
      ],
      liClass: 'full-raw'
    }]
    // 地域
    let cateResult = await getLytcClass()

    // 组装数据
    for (let k in cateResult) {
      cateResult[k].unshift({
        id: 0,
        dreamNames: '全部'
      })
      for (let i = 0; i < cateResult[k].length; i++) {
        cateResult[k][i]['params'] = {}
        cateResult[k][i]['params'][k] = cateResult[k][i]['id']
      }
      tabContent.push({
        liClass: 'col-3',
        data: cateResult[k]
      })
    }
    let options = {
      index: 1,
      pageSize: 10,
      dreamExamine: true
    }
    if (query.dreamTitle) {
      options.dreamTitle = query.dreamTitle
    }
    // 内容列表
    let contentList = await getLytcList(options)
    let lytcList = [], nextPage = 0, hasNext = false, allLoaded = false;
    console.log(contentList);
    if(!contentList.hasOwnProperty('code')) {
      lytcList = contentList.lytc.result
      nextPage = contentList.lytc.nextPage
      hasNext = contentList.lytc.hasNext
      allLoaded = false
    }
    return {
      banner: bannerResult,
      tabList: tabResult,
      tabContent: tabContent,
      contentList: lytcList,
      nextPage:  nextPage,
      hasNext:  hasNext,
      query: query,
      paramsObj: options,
      allLoaded: allLoaded,
      keyword: query.dreamTitle ? query.dreamTitle : ''
    }
  },
  head() {
    return {
      title: '旅行'
    }
  },
  data() {
    return {
      placeholder: '想去哪儿？从这里开始...',
      tabActive: -1,
      recodeStart: 0,
      recodeEnd: 0,
      allLoaded: false,
      bottomStatus: '',
      path: "travel/traveldetail",
      banner: [],
      tabList: [],
      tabContent: [],
      contentList: [],
      keyword: ''
    }
  },
  mixins: [wechat, expired],
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
      title: `旅行`, // 分享标题
      desc: `让我们带着梦想去旅行，享受每一份快乐！边旅行边赚钱！`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.banner[0].dreamDefaultpicurl.indexOf('http') != -1 ? this.banner[0].dreamDefaultpicurl : 'http://' + window.location.host + '/' + this.banner[0].dreamDefaultpicurl, // 分享图标
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
    this.loadBottom()
    this.expired(this.$store.state.userInfo.dreamETime)
  },
  created() {
    this.$store.dispatch('setFooterShow', true)
  },
  beforeRouteEnter(to, from, next) {
    if (from.query.hasOwnProperty('is_preview')) {
      next(false)
    } else {
      next()
    }
  },
  methods: {
    tabChange(index) {
      this.tabActive = index
    },
    closeTab() {
      this.tabActive = -1
    },
    setRecodeParams() {
      if (this.recodeStart > this.recodeEnd) {
        this.$msg.state('起始值不能大于结束值')
        return
      }
      this.setParams({
        dr1: this.recodeStart,
        dr2: this.recodeEnd
      })
    },
    setParams(param) {
      this.paramsObj = Object.assign(this.paramsObj, param)
      this.contentList = []
      this.nextPage = 1
      this.allLoaded = false
      this.loadBottom()
      this.tabActive = -1
    },
    checkParams() {
      let params = {}
      let oldParams = this.paramsObj
      for (let k in oldParams) {
        if (oldParams[k] == 0 || oldParams[k] == '') continue
        params[k] = oldParams[k]
      }
      return params
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    async loadBottom() {
      if (this.hasNext == false) {
        this.allLoaded = true
        this.$refs.loadmore.bottomStatus = 'loaded'
        return
      }
      let params = this.checkParams()
      // console.log(params);
      params = Object.assign(params, {
        index: this.nextPage
      })
      let contentResult = await getLytcList(params)
      if (!contentResult.hasOwnProperty('code')) {
        // success
        this.contentList.push.apply(this.contentList, contentResult.lytc.result)
        this.nextPage = contentResult.lytc.nextPage
        this.hasNext = contentResult.lytc.hasNext
        this.$refs.loadmore.onBottomLoaded()
      } else {
        this.allLoaded = true
        this.$refs.loadmore.bottomStatus = 'loaded'
      }
    }
  },
  components: {
    search,
    banner,
    loadmore,
    travelItem,
  }
}
</script>

<style scoped>
@import '~static/css/travel/travelTab.css';
.newnews_list {
  float: left;
  width: 100%;
}

.lytcclass {
  padding: 0 3px;
  margin: 0 5px;
  padding: 10px;
  font-size: 18px;
  font-family: "微软雅黑";
  border: 1px #e8e8e8 solid;
  border-top: none;
  background: #fff;
}

.newnews_list.noline .lytcclass,
.newnews_list.noline .single_item {
  margin: 0;
  border: none;
  border-bottom: 1px #e8e8e8 solid;
}

@media screen and (max-width: 380px) {
  .lytcclass {
    font-size: 16px;
    padding: 10px;
  }
}
</style>
