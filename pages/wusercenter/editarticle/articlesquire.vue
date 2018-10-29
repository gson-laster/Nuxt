<template>
<div class="box articlesquire">
  <div class="topsearch">
    <div class="miniseach img">

    </div>
    <div class="inp">
      <input v-model="tyTitle"
             class="searchimg"
             type="search"
             placeholder="搜索文章">
    </div>
    <div @click="seach"
         class="btn">
      搜索
    </div>
  </div>
  <div class="classify">
    <div @touchmove="touch"
         @touchend="touchend"
         @touchstart="touchstart"
         ref="trans"
         :class="{transi: transi}">
      <div @click="slideclick(index, item.id)"
           v-for="(item, index) in slider"
           :class="{slider: true, clo: text(index)}">
        {{item.dreamTitle}}
      </div>
    </div>
  </div>
  <banner :bannerList="bannerList"></banner>
  <div class="usbox">
    <squire @addLikes="addLike"
            @articleClick="articleClick"
            v-if="i.tyTitle"
            v-for="(i, index) in content.result"
            :key="index"
            :keys="index"
            :id="i.id"
            :img="i.tyTitilebg"
            :title="i.tyTitle"
            :userimg="i.dreamImg"
            :view="i.tyHits"
            :praise="i.artlike"
            :name="i.dreamFullname"></squire>
  </div>
  <pagination v-if="content.result.length != 0"
              :pagination="content.totalPages"
              @changePagination="changePagination"
              :nowActive="content.pageNo"></pagination>
  <div v-show="content.result.length == 0"
       class="t_align">
    没有更多数据啦...
  </div>
  <articlefooter></articlefooter>
  <msg ref="msg"></msg>
</div>
</template>
<script>
import articlefooter from '~/components/editarticle/articlefooter'
import squire from '~/components/editarticle/squire'
import banner from '~components/banner'
import pagination from '~/components/pagination'
import arr from '~static/js/outeditarticle.js'
import {seachuserarticle, getClassify, addLikes} from '~/apis/editarticle.js'
import { getuserbannerList} from '~/apis/banner'
import { setFields} from '~static/js/util'
import { mapGetters} from 'vuex'
import wechat from "~/static/mixins/wechat.js";
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  async asyncData() {
    let contents;
    let classifyList;
    let bannerList;
    await seachuserarticle({
        index: 1,
        pageSize: 15,
        tyIsok: 1,
        Classid: 0
      })
      .then(res => {
        contents = res.data.data.artlist
      })
    await getClassify(undefined, undefined, undefined, 1000)
      .then(res => {
        classifyList = res.data.data.result || []
        classifyList.unshift({
          id: 0,
          dreamTitle: '热点'
        })
      })
    await getuserbannerList()
      .then(res => {
        bannerList = setFields(res.result, ['id', 'dreamTitle', 'dreamDefaultpicurl', 'dreamUpdatetime'])
      })
      .catch(e => {
//      console.log(e)
      })
    return {
      content: contents || [],
      slider: classifyList,
      bannerList: bannerList
    }
  },
  data() {
    return {
      activeSlider: 0,
      touchstep: [], //移动步数
      trans: 0,
      transi: false,
      totalWidth: 0,
      pull: 1, //拉力
      activeSlide: 0,
      onewidth: 0,
      allwidth: 0,
      tyTitle: '',
      activeClassifyId: 0,
      userInfo: {}
    }
  },
  beforeCreate() {
    this.$store.dispatch('setFooterShow', false)
  },
  mixins: [wechat],
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
    const shareOpts = {
      title: `美文广场`, // 分享标题
      desc: `精美文章`, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.bannerList[0].dreamDefaultpicurl.indexOf('http') != -1 ? this.bannerList[0].dreamDefaultpicurl : 'http://' + window.location.host + '/' + this.bannerList[0].dreamDefaultpicurl, // 分享图标
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
  },
  mounted() {
    if (process.BROWSER_BUILD) {
      let sw = screen.width > 640 ? 640 : screen.width
      this.onewidth = sw / 4
      this.totalWidth = sw - this.onewidth * this.slider.length
      this.allwidth = this.onewidth * this.slider.length
    }
  },
  created() {
    keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
    })
  },
  methods: {
    text(i) {
      if (i == this.activeSlider) {
        return true;
      } else {
        return false;
      }
    },
    touch(event) {
      this.touchstep.push(event.changedTouches[0].pageX)
      let clientX = Number(this.touchstep[this.touchstep.length - 1] - this.touchstep[this.touchstep.length - 2])

      if (this.trans > 0 || this.trans < this.totalWidth) {
        clientX = clientX / this.pull
        this.pull = this.pull + 0.4
      }
      this.trans = clientX + this.trans
      this.$refs.trans.style.transform = 'translateX(' + this.trans + 'px)'
    },
    touchstart(event) {
      this.touchstep.push(event.changedTouches[0].pageX)
    },
    touchend() {
      this.touchstep = []
      if (this.trans > 0 || this.trans < this.totalWidth) {
        this.transi = true
        this.pull = 1
        if (this.trans > 0 || this.allwidth < screen.width) {
          this.trans = 0
        } else {
          this.trans = this.totalWidth
        }
        this.$refs.trans.style.transform = 'translateX(' + this.trans + 'px)'
        setTimeout(() => {
          this.transi = false
        }, 300)
      }
    },
    slideclick(i, id) {
      seachuserarticle({
          index: 1,
          pageSize: 15,
          Classid: id,
          dreamUsername: this.userInfo.dreamUsername
        })
        .then(res => {
          if (res.data.code == 2000) {
            this.content = res.data.data.artlist
          } else {
            this.content.result = []
          }
        })
      getuserbannerList({
          dreamClassid: id
        })
        .then(res => {
          let result = res.result
          this.bannerList = setFields(result, ['id', 'dreamTitle', 'dreamDefaultpicurl', 'dreamUpdatetime'])
        })
        .catch(e => {
          console.log(e)
        })
      this.activeClassifyId = id
      this.activeSlider = i
      let trans = -i * this.onewidth
      if (trans >= this.totalWidth) {
        this.transi = true
        this.trans = trans
        this.$refs.trans.style.transform = 'translateX(' + this.trans + 'px)'
        setTimeout(() => {
          this.transi = false
        }, 300)
      }
    },
    changePagination(i) {
      seachuserarticle({
          index: i,
          pageSize: 15,
          tyIsok: 1,
          Classid: this.activeClassifyId,
          dreamUsername: this.userInfo.dreamUsername
        })
        .then(res => {
          this.content = res.data.data.artlist || []
        })
    },
    seach() {
      seachuserarticle({
          tyTitle: this.tyTitle
        })
        .then(res => {
          if (res.data.data.artlist) {
            this.content = res.data.data.artlist
          } else {
            this.$refs.msg.state('此分类下没有文章')
          }
        })
    },
    articleClick(id) {
      this.$router.push({
        path: './articledetails',
        query: Object.assign(this.query, {
          id: id
        })
      })
    },
    async addLike(id, i) {
      await addLikes(id, this.userInfo.dreamUsername, )
        .then(res => {
          if (res.data.code == 2000) {
            this.$set(this.content.result[i], 'artlike', this.content.result[i].artlike + 1)
            this.$refs.msg.state('点赞成功')
          } else {
            this.$refs.msg.state('您已经点过赞了~')
          }
        })
    },
  },
  components: {
    articlefooter,
    pagination,
    squire,
    banner,
    msg: require('~/components/msg/msg')
  },
  computed: {
    ...mapGetters({
//    userInfo: 'getUserInfo',
      query: 'get_router_query'
    })
  }
}
</script>

<style>
@import '~static/css/editarticle/articlesquire.css';
@import '~static/css/wusercenter/img.css';
</style>
