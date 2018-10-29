<template>
  <div class="addVideo box">
    <div class="suchAs">
    	视频地址格式:<br />(https://v.qq.com/iframe/player.html?vid=z00240l7gem&tiny=0&auto=0)
    </div>
  <div class="inbox">
    <input v-model="content.textContent" type="text" placeholder="视频地址" />
    <input style="margin-top: 20px;" v-model="content.videoTitle" type="text" placeholder="视频标题(如：百度)" />
  </div>
  	<div class="videowarn">
  		注意: 目前仅支持腾讯视频哟!
  	</div>
  	<btn  @cancel="cancel" @confirm="confirm">  </btn>
  	<msg ref='msg'></msg>
  </div>
</template>
<script>
  import btn from '~/components/editarticle/btn'
  import { mapGetters } from 'vuex'
  import {dataVideo} from '~static/js/util.js'
  export default {
    middleware: ["auth"],
    async asyncData ({store, query}) {
      let content = {
        type: 'video',
        textContent: '',
        videoTitle: ''
      };
      if (query.update) {
        content = Object.assign(content, store.state.articleList.tyContent[store.state.articleIndex])
      }
      return {
        content: content
      }
    },
    components: {
      btn,
      msg: require('~/components/msg/msg')
    },
    methods: {
      cancel () {
        delete this.query.update
        this.$router.replace({
          path: 'edit',
          query: this.query
        })
      },
      confirm () {
        if (this.content.textContent == '') {
        	this.$refs.msg.state('请输入视频地址')
        } else {
          this.content.textContent = 'https://v.qq.com/iframe/player.html?vid=' + dataVideo(this.content.textContent) + '&tiny=0&auto=0';
          if (this.query.update) {
            this.contentList.tyContent.splice(this.getArticleIndex, 1, this.content)
          } else {
            this.contentList.tyContent.splice(this.getArticleIndex, 0, this.content)
//          this.contentList.tyContent.push(this.content)
          }
          delete this.query.update
          this.$router.replace({
            path: 'edit',
            query: this.query
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        query: 'get_router_query',
        contentList: 'getArticleList',
        getArticleList: 'getArticleList',
        getArticleIndex: 'getArticleIndex'
      })
    }
}
</script>
<style scoped>
  @import '~static/css/editarticle/addvideo.css';
</style>
