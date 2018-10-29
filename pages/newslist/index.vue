<template>
<div class="brandnews_list_warrp">
  <div class="brandnews_listitle" v-show="isTitleShow">{{title}}</div>
  <div class="brandnews_listnav"
       ref="wrapper">

    <loadmore :bottom-method="loadBottom"
              @bottom-status-change="handleBottomChange"
              :bottom-all-loaded="allLoaded"
              :autoFill="false"
              ref="loadmore">
      <ul class="page-loadmore-list">
        <article-item v-for="(item, index) in articleList"
                      :key="index"
                      :article="item"
                      :query="query"></article-item>
      </ul>
    </loadmore>
  </div>
</div>
</template>
<script>
import wechat from '~/static/mixins/wechat.js'
import setQuery from '~/static/mixins/setQuery.js'
import expired from '~/static/mixins/expired.js'
import ArticleItem from '~components/article/articleItem'
import loadmore from '~components/common/loadmore'
import spinner from '~components/common/spinner/snake.vue';
import { mapGetters } from 'vuex'
import { getArticleList } from '~/apis/article'
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  async asyncData({query}) {
    let options = {
      dreamBrandid: query.brand,
      pageSize: 16,
      dreamIsok: true,
      dt: 1,
    }
    if (query.dt) {
      options['dt'] = query.dt
    }
    if (query.dreamHits) {
      options['dreamHits'] = query.dreamHits
    }

    if (query.cid) {
      options['dreamClassid'] = query.cid
    }

    let isTitleShow = true
    if (query.dreamTitle) {
      options['dreamTitle'] = query.dreamTitle
    }else{
      isTitleShow = false
    }
    if(query.type){
       options['type'] = query.type
    }
    let articleList = await getArticleList(options);
    let flagStr = query.flag ? query.flag : (query.dreamTitle? `搜索"${query.dreamTitle}"` : '搜索')
    return {
      articleList: articleList.result ? articleList.result : [],
      title: flagStr,
      pageIndex: articleList.pageNo ? articleList.pageNo * 1 : 0,
      hasNext: articleList.hasNext ? articleList.hasNext : false,
      dreamBrandid: query.brand,
      dreamClassid: query.cid ? query.cid : '',
      options: options,
      dreamTitle: query.dreamTitle,
      isTitleShow:isTitleShow,
      query: query
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      query: {}
    }
  },
  async created () {
    if(!this.$store.state.userInfo) {
      let data = await keepUserOnline(this.$route, 'user')
      this.$store.dispatch('setUserInfo', data.user)
    }
  },
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
      title: `${this.title}`, // 分享标题
      desc: `${this.title}`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `http://${window.location.host}/${this.articleList[0].dreamDefaultpicurl}`, // 分享图标
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
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      if (this.articleList.length === 0) {
        this.allLoaded = true
        this.$refs.loadmore.bottomStatus = 'loaded'
        return
      }
      this.pageIndex += 1
      this.options.index = this.pageIndex
      getArticleList(this.options)
        .then(res => {
          if (!res.hasOwnProperty('code') && res.length !== 0) {
            this.articleList.push.apply(this.articleList, res.result)
            this.pageIndex = res.pageNo
            this.hasNext = res.hasNext
            this.$refs.loadmore.onBottomLoaded();
          } else {
            this.allLoaded = true
            this.$refs.loadmore.bottomStatus = 'loaded'
          }
        })
        .catch(e => {
          this.allLoaded = true;
        })
    }
  },

  mounted() {
    if (process.BROWSER_BUILD) {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  },
  mixins: [wechat, setQuery, expired],
  components: {
    ArticleItem,
    loadmore,
    spinner
  }
}
</script>

<style scoped>
.brandnews_listitle {
  margin: 0 auto;
  clear: both;
  line-height: 35px;
  font-size: 18px;
  font-weight: 700;
  background-color: #fff;
  border-bottom: 1px #DBDBDB solid;
  padding-left: 8px;
}

.brandnews_list_warrp {
  width: 100%;
  margin-bottom: 40px;
}

.brandnews_list {
  margin-bottom: 80px;
}
</style>
