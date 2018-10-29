<template lang="pug">
.mt80
  .brandnews_listnav(ref='wrapper')
    ul.page-loadmore-list
      li.li_list(v-for="(article, index) in articleList")
        slider-delete(:sliderConf="sliderConf", :transformX="transformX")
          .newmk_list_new
            a(href="javascript:;", @click="goArticle(index)")
              .single_item
                .fl(style="position:relative")
                  span(class="tablename" v-if="article.dreamTable == 'wv'") {{'wv'}}
                  img(src='~static/img/blank.gif', v-lazy="setImg(article.dreamImgurl)")
                .fr
                  h3 {{article.dreamTitle}}
                  span {{formatTime(article.dreamAddtime)}}
                  i {{article.dreamHits}}
        .delete_button(@click="deleteItem(index)")
          span 删除
    .loadmore(@click="loadedMore()") {{text}}
  v-dialog(:show="dialogStatus", content="确定要删除吗?", @cancel="dialogCancel", @confirm="dialogConfirm")
</template>

<script>
import {
  dateFormat
} from '~/static/js/util'
import articleItem from '~components/article/articleItem'
import {getCollviewList,delCollview} from '~/apis/article'
import setQuery from '~static/mixins/setQuery'
import loadmore from '~components/common/loadmore'
import SliderDelete from "~components/common/slider-delete.vue";
import keepUserOnline from '~static/js/keepUserOnline'
import vDialog from '~components/msg/dialog'
export default {
  asyncData ({query}) {
    return {
      query: query
    }
  },
  data(){
    return {
      articleList: '',
      path: '',
      hasNext: '',
      nextPage: '',
      options: {dreamUserid: '', pageSize: 10, index: 1},
      text: '',
      query: '',
      allLoaded: false,
      bottomStatus: '',
      sliderConf:{//滑动配置
                    distance:3.8,
                },
      dialogStatus: false,
      activeItemIndex: -1,
      transformX: 0,
      userInfo: {}
    }
  },
  mixins:[setQuery],
  async created(){
    this.$store.dispatch('setFooterShow', true)
    let userData = await keepUserOnline(this.$route, 'user')
    this.userInfo = userData.user
    this.options.dreamUserid = this.userInfo.dreamUsername
    let result = await getCollviewList(this.options)
    this.text = result.data.hasNext ? '加载更多' : '没有更多了'
    this.articleList = result.data.result;
    this.hasNext = result.data.hasNext;
    this.nextPage = result.data.nextPage;
  },
  methods: {
    deleteItem(index){
      this.activeItemIndex = index
      this.dialogStatus = true
    },
    async loadedMore(){
      if(!this.hasNext){
        this.text = '没有更多了'
        return
      }
      this.options.index = this.nextPage
      let result = await getCollviewList(this.options)
      if(result.code == 2000) {
        this.hasNext = result.data.hasNext
        this.nextPage = result.data.nextPage
        this.articleList.push(...result.data.result)
      }
    },
    dialogCancel(){
      this.dialogStatus = false
    },
    async dialogConfirm(){
      let result = await delCollview(this.articleList[this.activeItemIndex].id)
      this.dialogStatus = false
      if(result.code == 2000) {
        this.$msg('删除成功')
        this.articleList.splice(this.activeItemIndex, 1)
        this.transformX = 0
      }else{
        this.$msg('删除失败')
      }

    },
    formatTime(date) {
      return dateFormat('y-M-d', date)
    },
    setImg(dreamImgurl){
      if(!dreamImgurl) return ''
      else return dreamImgurl.indexOf('http') != -1 ? dreamImgurl : '/' + dreamImgurl+'?w=80&h=80'
    },
    setPath(url, aid, table) {
      let path = ''
      let brand = table == 'wv' ? 0 : this.$route.query.brand
      path = url + '?uid='+ encodeURIComponent(this.$route.query.uid) + '&brand='+brand+'&aid='+aid
      console.log(path);
      return path
    },
    goArticle(index) {
      let item = this.articleList[index]
      let brand = this.query.brand
      if((item.dreamTable == 'wv' && brand == 0) || (item.dreamTable != 'wv' && brand != 0)){
        let url = this.setPath(item.dreamUrl, item.dreamAid, item.dreamTable)
        window.location.href = 'http://'+window.location.host + url
      }else{
        this.$msg('当前品牌不支持查看该文章！')
      }
    }
  },
  components: {
    articleItem,
    loadmore,
    SliderDelete,
    vDialog
  },
}
</script>

<style lang="css" scoped>
@import '~static/css/article/articleItem.css';
.li_list{
  height: 91px;
}
.loadmore{
  height: 40px;
  width: 60%;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  border-radius: 25px;
  border: 1px solid #ddd;
  margin-top: 10px;
}
.delete_button{
    position: absolute;
    background-color: #ffb219;
    right: 0;
    height: 100%;
    width: 60px;
    text-align: center;
    line-height: 90px;
    color: #fff;
}
.tablename{
  position: absolute;
  top: 0;
  left: 0;
  background: #fa0;
  padding: 0 2px;
  color: #fff;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
}
</style>
