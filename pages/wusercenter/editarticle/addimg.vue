<template>
<div class="imgbox addimg">
  <p class="imgtitle">上传图片</p>
	<div @click="contentImg" class="upload imgList">
		<i class="icon icon iconfont icon-pic-copy"></i>上传
	</div>
  <p class="imgtitle ">历史上传</p>
  <div class="iList scroll">
    <div @click="oldimg(item, index)"  v-for="(item, index) in newList" :class="{border: activeIndex == index}">
    	<img :src="srcs(item)"/>
    </div>
  </div>
  <btn @confirm="confirm" @cancel="cancel"></btn>
</div>
</template>

<script>
  import btn from '~/components/editarticle/btn'
  import wechat from "~static/mixins/wechat.js";
  import {mapGetters} from 'vuex'
  export default {
    middleware: ["auth"],
    data () {
      return {
        jsons: {},
        list: [],
        newList: [],
        activeIndex: -1
      }
    },
    mixins: [wechat],
    mounted() {
     var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
    this.wechatInit(url)
    },
    created () {
      for (let i in this.imgList) {
      	this.newList.push( this.imgList[i])
      }
      this.newList.sort((x, y) => {
        return x.id - y.id < 0
      })
    },
    methods: {
      contentImg () {
        this.$emit('contentImg')
      },
      cancel () {
        this.$emit('addimgCancel')
      },
      oldimg (json, index) {
//      delete json.id
        let src = this.srcs(json)
        this.jsons = {type: 'img', src: src, active: true, localId: src}
        this.activeIndex = index
      },
      confirm () {
        if (JSON.stringify(this.jsons) == '{}') {
        	this.$msg('您未选择图片')
        } else {
          this.articleList.tyContent.splice(this.index, 0, this.jsons)
          this.$emit('addimgCancel')
        }
      },
      srcs (i) {
        let s = ''
        for (let c in i) {
        	if (c != 'id') {
        	  s = c
        	}
        }
        return s
      }
    },
    components: {
      btn
    },
    computed: {
      ...mapGetters({
        imgList: 'getOldImgList',
        articleList: 'getArticleList',
        index: 'getArticleIndex'
      })
    }
  }
</script>

<style scoped>
  @import '~static/css/editarticle/addimg.css';
</style>