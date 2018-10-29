<template>
  <div class="box">
    <div class="header">
      <div class="headimg">
        <img :src="articleList.tyTitilebg"/>
      </div>
      <div class="editTitle">
        <div class="inp">
          <textarea v-model="articleList.tyTitle" type="text" placeholder="请在这里输入你的标题" />
        </div>
      </div>
      <div class="musicAndBg">
        <div>
          <span @click="musicShow" :class="{paddr: this.articleList.tyMusic != ''}">{{musicNs(false)}}
            <i @click.stop="closeMusic" v-if="this.articleList.tyMusic != ''" class="icon iconfont icon-wrong closemusic"></i>
          </span>
        </div>
        <div>
          <span @click="coverClick">添加封面</span>
        </div>
      </div>
    </div>
    <addcontent :key="0" :i= '0' @showAddBtn="showAddBtn" ref="addcontents" @addText="addText" @addVideo="addVideo" @addImage="addImage" :showAdd="none[0]"></addcontent>
    <div class="contentBox">
      <template  v-for="(item, index) in articleList.tyContent">
        <div :class="{contentList: true, con: articleIndex == index}">
          <div @click="close(index)" class="close">
            <i class="icon iconfont icon-wrong"></i>
          </div>
          <div @click="update(index, item.type)" v-if="item.type == 'text'" :style="item.css" class="contenttttxt">
            {{item.text}}
          </div>
          <div @click="update(index, item.type)" v-if="item.type == 'video'" class="video">
            <embed :src="item.textContent"></embed>
          </div>
           <div  @click="update(index, item.type)" v-if="item.type == 'img'" class="video">
            <img :src="item.src"/>
          </div>
          <div v-if="index != 0" @click="prev(index)" class="upArrow">
            <i class="icon iconfont icon-icondownload-copy"></i>
          </div>
           <div v-if="index != articleList.tyContent.length - 1" @click="next(index)" class="downArrow">
            <i class="icon iconfont icon-icondownload"></i>
          </div>
        </div>
        <addcontent :key="index + 1" :i="index + 1" :showAdd="none[index + 1]" @showAddBtn="showAddBtn" @addImage="addImage" @addVideo="addVideo" ref="addcontents" @addText="addText"></addcontent>
      </template>
    </div>
    <addimg @addimgCancel="addimgCancel" @contentImg='contentImg' v-if="addImgShow"></addimg>
    <changecover @uploadImg="upload(1, true, 'titlebg')" @cancel="cancel" @confirm="confirm" v-if="cover"></changecover>
    <changebgmusic @bgMusicBack="bgMusicBack" @selectClick="selectClick" v-show="changeBgMusicShow"></changebgmusic>
    <choiceclassify :userInfo="userInfo" :firstList="articleClassList" :secondList="userArticleClassList" @fabu="fabu" @cancel="closeClassify" ref="classify"></choiceclassify>
    <msg ref="msg"></msg>
  	<audio autoplay="autoplay" ref="audio"></audio>
  	<div v-if="btm" class="sub">
  		<ul>
  			<li @click="fabu('draft')"><i class="icon iconfont icon-box"><span>存草稿</span></i></li>
  			<li @click="relase"><i class="icon iconfont icon-success"><span>发布文章</span></i></li>
  		</ul>
  	</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {userarticleeditor, seachuserarticleone} from '~/apis/editarticle.js'
  import wechat from '~/static/mixins/wechat.js'
  import addimg from '~pages/wusercenter/editarticle/addimg'
  import changecover from '~pages/wusercenter/editarticle/changecover'
  import choiceclassify from '~/pages/wusercenter/editarticle/_choiceclassify.vue'
  import changebgmusic from '~pages/wusercenter/editarticle/changebgmusic'
  import keepUserOnline from '~static/js/keepUserOnline'
  import {getClassify, getartclassList, artclasseditor, delartclass} from '~/apis/editarticle.js';

  export default {
    async asyncData ({store, query}) {
      if (query.hasOwnProperty('id')) {
        await	seachuserarticleone({id: query.id}).then(res => {
      	  let data = res.data.data.artinfo
      	  data.tyContent = JSON.parse(data.tyContent)
      	  store.state.articleList.id = data.id
          for (let i in store.state.articleList) {
            if (data.hasOwnProperty(i)) {
              store.state.articleList[i] = data[i]
            }
          }
          store.state.articleList.tyTitilebg = store.state.articleList.tyTitilebg.split('"')[3]
      	})
      }
      let none = []
      none.length = store.state.articleList.tyContent.length + 1
      none.fill('none')
      return {
        none: none
      }
    },
  head() {
    return {
      title: '文章编辑'
    }
  },
    data () {
      return {
        cover: false,
        addImgShow: false,
        changeBgMusicShow: false,
        btm: true,
        userInfo: {},
        articleClassList: [], // 默认分类
        userArticleClassList: [] // 用户自定义分类
      }
    },
    middleware: ["auth"],
    mixins: [wechat],
    async created () {
      const userDate = await keepUserOnline(this.$route, 'user')
      this.userInfo = userDate.user
      this.$store.dispatch('setFooterShow', false)
      if (this.articleList.tyTitilebg == '') {
        this.articleList.tyTitilebg = require('~/static/js/outeditarticle.js')['a']
      }
      this.articleClassList = await this.getArticleClassList(this.userInfo)
      this.userArticleClassList = await this.getUserArticleClassList(this.userInfo)

    },
     mounted () {
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
     this.wechatInit(url)
    },
    components: {
      addcontent: require('~/components/editarticle/addcontent'),
      addimg,
      changecover,
      changebgmusic,
      choiceclassify,
      msg: (resolve) => require(['~/components/msg/msg'], resolve),

    },
    methods: {
      /**
       * 获取文章分类，默认分类和会员自定义分类
       * @return {[type]} [description]
       */
      async getArticleClassList (userInfo) {
        let firstList
        firstList = !firstList && await getClassify(userInfo.dreamUsername)
        return firstList.data.data.result
      },
      async getUserArticleClassList (userInfo) {
        let secondList
        secondList = !secondList && await getartclassList(userInfo.dreamUsername)
        return secondList.data.data.result
      },
      addText () {
        this.$router.replace({
          path: './edittext',
          query: this.query,
        })
      },
      addVideo () {
        this.$router.replace({
          path: './addvideo',
          query: this.query
        })
      },
      addimgCancel () {
        this.addImgShow = false
      },
      showAddBtn (i) {
        this.none.fill('none')
        this.$set(this.none, i, 'flex')
//      this.$store.dispatch('setArtIndex', i)
      },
      close (i) {
        this.articleList.tyContent.splice(i, 1)
//      this.$store.dispatch('setArticleList', this.articleList)
      },
      prev(i) {
        let now = this.articleList.tyContent[i]
        let prev = this.articleList.tyContent[i - 1]
        this.articleList.tyContent.splice(i - 1, 2, now, prev)
//      this.$store.dispatch('setArticleList',  this.articleList)
      },
      next(i) {
        let now = this.articleList.tyContent[i]
        let prev = this.articleList.tyContent[i + 1]
        this.articleList.tyContent.splice(i, 2, prev, now)
//      this.$store.dispatch('setArticleList', this.articleList)
      },
      addImage() {
        this.addImgShow = true
      },
      contentImg () {
        this.upload(9)
      },
      coverClick () {
        this.cover = true
      },
      cancel () {
        this.cover = false
      },
      confirm (bg) {
//      this.$set(this.articleList.tyTitilebg[0], 'src', bg)
        this.articleList.tyTitilebg = bg
        this.cover = false
      },
      musicShow () {
        this.btm = false
        this.changeBgMusicShow = true
      },
      selectClick (src, item) {
        this.articleList.tyMusic = src + '|$|' + item.dreamMusicname
        let musicEle = this.$refs.audio
        musicEle.src = src
        // musicEle.load()
        musicEle.addEventListener('canplay', (e) => {
          musicEle.play();
        }, false)
      },
      bgMusicBack (bol) {
        let musicEle = this.$refs.audio
        let music
        if (!bol) {
          this.articleList.tyMusic = ''
          musicEle.src = ''
        }
        this.changeBgMusicShow = false
        this.btm = true
        music =  this.articleList.tyMusic.split('|$|')[0]
        musicEle.src = music
        musicEle.load()
        musicEle.play()
      },
      closeMusic () {
        this.articleList.tyMusic = ''
        this.$refs.audio.pause()
      },
      update (i, type) {
        this.$store.dispatch('setArtIndex', i)
        this.query.update = true
        if (type == 'text') {
      	  this.$router.replace({
            path: './edittext',
            query: this.query
          })
        }
        if (type == 'video') {
          this.$router.replace({
            path: './addvideo',
            query: this.query
          })
        }
        if (type == 'img') {
          this.upload(1, true)
        }
      },
      musicNs(bool) {
        let music = this.articleList.tyMusic
        let arr = music.split('|$|')
        if (bool) {
        	return arr[0] || ''
        } else {
          return arr[1] || '添加背景音乐'
        }
      },
      relase () {
        if (this.articleList.tyTitle == '') {
        	this.$msg('给你的文章取个漂亮的标题吧(ˇˍˇ)')
          this.btm = true
        } else{
          this.btm = false
          this.$refs.classify.b()
        }
      },
      closeClassify () {
        this.btm = true
      },
      fabu (sm, classifyId) {
       // this.imgList = [];
        if (!this.articleList.tyTitle || this.articleList.tyTitle == '') {
          this.$msg('给你的文章取个漂亮的标题吧(ˇˍˇ)')
          this.btm = true
          return false
        }
        let json = Object.assign({}, this.articleList)
        if (sm == 'draft') {
        	json.tyState = 0
        } else {
          json.Classid = classifyId
          this.btm = true
          if (sm) {
            json.tyState = 2
          } else {
            json.tyState = 1
          }
        }
        json.tyUsername = this.userInfo.dreamUsername
        json.tyContent = JSON.stringify(json.tyContent)
        let arr = [{src: json.tyTitilebg}]
        json.tyTitilebg = JSON.stringify(arr)
        json.ServerId = JSON.stringify(json.ServerId)
        userarticleeditor(json).then(res => {
          if (res.data.code == 2000) {
          	this.articleList = Object.assign(this.articleList, {
              tyContent: [],
              tyTitle: '',
              tyTitilebg: '',
              tyMusic: '',
             // ServerId: []
            })
          	delete this.articleList.id
          	this.$msg('文章保存成功');
          	this.$router.push({
          	  path: './selfopusmap',
          	  query: this.query
          	})
          } else {
          	this.$msg('文章保存失败');
          }
        })
      },
      musicAutoPlay(){
        let musicEle =this.$refs.audio
        musicEle.addEventListener("canplay",()=>{
          musicEle.load()
          musicEle.play()
        })
        document.addEventListener("WeixinJSBridgeReady",()=>{
          musicEle.load()
          musicEle.play()
        },false)
      },
      async upload (n, update = false, type = 'con') {
       await this.choiceImg(n).then(res => {
        let {localId, loAndSer} = res
        this.articleList.ServerId.push(...loAndSer)
        for (let c in loAndSer) {
          for (let lo in loAndSer[c]) {
            let js = {}
            js[lo] = loAndSer[c][lo]
            js.id = new Date().getTime()
            this.imgList[lo] = js
          }
        }
          for (let i = 0; i < localId.length; i ++) {
            if (type != 'con') {
            	this.articleList.tyTitilebg = localId[i]
            	this.cover = false
            } else {
              this.addImgShow = false
              if (update) {
                this.articleList.tyContent.splice(this.articleIndex, 1, {type: 'img', src: localId[i], active: true, localId: localId[i]})
              } else {
                this.articleList.tyContent.splice(this.articleIndex, 0, {type: 'img', src: localId[i], active: true, localId: localId[i]})
//              this.articleList.tyContent.push({type: 'img', src: localId[i], active: true, localId: localId[i]})
              }
            }
          }
          this.none.length = this.articleList.tyContent.length
          this.none.fill("none")
        })
      }
    },
    computed: {
      ...mapGetters({
        query: 'get_router_query',
//      userInfo: 'getUserInfo',
        articleList: 'getArticleList',
        articleIndex: 'getArticleIndex',
        imgList: 'getOldImgList'
      })
    },
    beforeRouteLeave (to, from, next) {
      delete this.query.id
      next()
    }
  }
</script>

<style scoped>
  @import '~static/css/editarticle/edit.css';
</style>
