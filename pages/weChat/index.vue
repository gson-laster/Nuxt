<template>
<div class="new_body">
  <wechat-search :userInfo="userInfo" toUrl="newslist" seacheField="dreamTitle"></wechat-search>

  <div class="new_nav">
    <ul>
    </ul>
  </div>

  <div class="new_ad">
    <ul>
      <nav-item v-for="(item, i) in navList"
                :data="item"
                :itemColorClass="getColorClass(i)"
                :key="i"></nav-item>
    </ul>
  </div>
  <slide-tab :tabList="tabText"
             :articleData="articleData"
             :query="query"></slide-tab>
</div>
</template>
<script>
import WechatSearch from '~components/common/search'
import navItem from '~components/common/navItem'
import slideTab from '~components/slideTab'
import {
  getNavList,
  getArticleList,
  indextjlist
} from '~/apis/article'
export default {
  async asyncData({
    query
  }) {
    let result = await Promise.all([
      // getNavList(query.brand, {
      //   type: 'recommond'
      // }),
      indextjlist(1),
      getArticleList({
        pageSize: 16,
        dreamBrandid: query.brand,
        dreamClassid: '128',
        dt: 0,
        type: 'wx'
      }),
      getArticleList({
        pageSize: 16,
        dreamBrandid: query.brand,
        dreamHits: 1,
        dreamClassid:'128',
        type: 'wx'
      })
    ])
    let navList = result.shift()
    let newArticleList = result.shift()
    let recommondArticleList = result.shift()
    return {
      navList: navList,
      articleData: {
        newArticleList: newArticleList.result ? newArticleList.result : [],
        recommondArticleList: recommondArticleList.result ? recommondArticleList.result : []
      },
      brand: query.brand,
      query:query
    }
  },
  head() {
    return {
      title: '微信分享文章'
    }
  },
  data() {
    return {
      tabText: [{
        title: '最新文章',
        type: 'newArticleList',
      }, {
        title: '热门文章',
        type: 'recommondArticleList'
      }],
      userInfo: {},
      navList: [],
      articleData: {
        newArticleList: [],
        recommondArticleList: []
      },
      query: {}
    }
  },
  mounted(){
    getNavList(this.query.brand,{
       type: 'recommond'
    })
  },
  methods: {
    getColorClass(index) {
      return 'color' + (index % 6)
    }
  },
  components: {
    WechatSearch,
    navItem,
    slideTab
  }
}
</script>

<style scoped>
.new_nav {
  float: left;
  width: 100%;
}

.new_nav ul {
  margin: 50px 5px 5px 5px;
  border: 1px #E8E8E8 solid;
  padding: 10px 0;
  background: #FFF;
  overflow: hidden;
}

.new_ad ul {
  margin: 0 5px;
  border: 1px #E8E8E8 solid;
  padding: 0;
  border-bottom: none;
  background: #FFF center top repeat-y;
  overflow: hidden;
}
</style>
