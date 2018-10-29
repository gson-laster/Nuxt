<template>
  <div class="article-bottom" id="article-bottom">
     <div class="relative">相关信息</div>
    <div class="realative-articleList">
      <ul>
        <nuxt-link v-for="(item,index) in articleList.result"
         :to="{path:'/article', query:{uid: query.uid, brand:query.brand, aid:item.id}}"
         v-bind:key="index+'i'" class="article" v-html="item.dreamTitle"></nuxt-link>
      </ul>
    </div>
   <nuxt-link :to="{path:'/register',query:query}">
    <div class="bottom-hint">立即拥有专属电子名片</div>
  </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    query: {
      type: Object,
      default: ""
    },
    articleList: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      list: [
        { title: "网站首页", content: "全面了解新事业", link: "/" },
        { title: "我的名片", content: "联系我了解详情", link: "/newcard" },
        { title: "更多分享", content: "朋友圈优质分享", link: "/wechat" },
        { title: "申请网站", content: "个人专属名片", link: "/register" }
      ]
    };
  }
};
</script>
<style>
@import '~static/css/article/articleBottom.css'
</style>
