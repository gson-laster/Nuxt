<template>
  <div class="box articledetail">
    <div class="title">
      <h1>{{content.tyTitle}}</h1>
      <p>{{time(content.tyUpdatetime)}}<span @click="gocard">{{author.dreamFullname}}</span></p>
      <!--<div class="toMe">
        换成我的
      </div>-->
    </div>
  <div class="content">
    <template v-for="i in content.tyContent">
      <div v-if="i.type == 'text'" v-html="breakLine(i.css, i.text)" style="line-height: 28px; font-size: 14px;">
      </div>
      <div v-if="i.type == 'img'">
          <img :src="setImgUrl({src: i.src,isAuto:2})" />
      </div>
      <div v-if="i.type == 'video'">
        <embed :src="setVideoSrc(i)"></embed>
      </div>
    </template>
      <div class="dashang">
        <i class="icon-browse icon iconfont"><span>{{content.tyHits || 0}}</span></i>
        <i @click="addLike" class="icon-good icon iconfont"><span>{{content.artlike || 0}}</span></i>
      </div>
    </div>
    <div class="dashangs">
      <div @click="shangShow" class="shang">
        赏
      </div>
      <p>已有{{rewardingo}}打赏</p>
    </div>
    <div class="authorInfo">
      <div @click="gocard" class="authorImg">
        <img :src="setImgUrl({src:author.dreamImg})"/>
      </div>
      <div @click="gocard" class="alignSelf">
      <div class="authorName">
        <h1>{{author.dreamFullname}}</h1>
      </div>
      <div v-show="author.dreamContent" class="authorSign">
        <h2>{{author.dreamContent}}</h2>
      </div>
      </div>
      <div @click="follow" class="followMe">
        关注我
      </div>
    </div>
    <div v-show="shang" class="bgcolor">
    <div class="shangBox">
      <div class="closeses">
        <i @click="close" class="icon iconfont icon-wrong"></i>
      </div>
      <div class="toWho">
        <ul>
          <li>打赏给:{{author.dreamFullname}}</li>
          <li>余额:{{userInfo.dreamVcurrency || 0}}</li>
        </ul>
        <div class="clearfix">

        </div>
        <div class="moneySlider">
          <ul>
            <li v-for="item in moneyList"><span @click="changeMoney(item)" :class="{active: item == money}">￥{{flo(item)}}</span></li>
          </ul>
           <div class="clearfix">

        </div>
        <div @click="sub" class="subsss">
          打赏
        </div>
        </div>
      </div>
    </div>
    </div>
    <div @click="goToEdit" class="goToEdit">
      我也想写文章
    </div>
    <div v-if="reglogin" class="select-container">
        <div class="select-wrapper">
            <div class="go-login" @click="goLogin()">登录</div>
            <div class="go-register" @click="goRegister()">注册</div>
        </div>
    </div>
    <audio ref="audio" loop="loop" autoplay="autoplay" :src="setMusic(content.tyMusic)" style="width: 0; height: 0;"></audio>
    <msg ref="msg"></msg>
    <confirm :content="'您确定打赏吗'" v-show="show" @confirm="confirm" @cancel="cancel"></confirm>
  </div>
  </template>
<script>
import {seachuserarticleone, orderinforewardwx, Concernditor, addLikes} from '~/apis/editarticle.js'
import querystring from 'querystring'
import {returnTime,declassify} from '~static/js/util.js'
import {mapGetters} from 'vuex'
import { numToCharacter } from "~static/js/util";
import wechat from "~/static/mixins/wechat.js"
import setImgUrl from "~static/mixins/setImgUrl.js"
import keepUserOnline from '~static/js/keepUserOnline'
import imgarr from '~static/js/outgroompic.js'
export default {
  async asyncData({store, query }) {
    let id = query.id
    return {
      author: '',
      id: id,
      rewardingo: ''
    }
  },
   computed: {
    ...mapGetters({
//    userInfo: 'getUserInfo',
      query: 'get_router_query',
      isLogin:'getLoginState'
    })
  },
  async created(){
    await keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
    })
    await seachuserarticleone({
        id: this.id,
        dreamUsername: this.userInfo.dreamUsername
    }).then(res => {
        res.data.data.artinfo.tyContent =  JSON.parse(res.data.data.artinfo.tyContent)
        Object.assign(this.content, res.data.data.artinfo)
//      console.log(this.content)
        this.author = res.data.data.userinfo
        this.rewardingo = res.data.data.rewardingo
      })


    let url = ''
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
    this.content.tyTitilebg = this.titleImg(this.content.tyTitilebg);
    let shareContent =  this.getShareDesc(this.content)
    const shareOpts = {
      title: `${this.content.tyTitle}` || '文章', // 分享标题
      desc:shareContent, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.content.tyTitilebg, // 分享图标
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
  mounted(){
    this.musicAutoPlay();
  },
  beforeCreate() {
    this.$store.dispatch('setFooterShow', false)
  },
  data() {
    return {
      moneyList: [1.00, 5.00, 10.00],
      money: 1,
      show: false,
      shang: false,
      reglogin: false,
      userInfo: {},
//    iscontent: {
      content: {"id":'',"tyTitle":"","tyMusic":"|$|","tyCount":null,"tyUsername":"","tyHits":'',"tyState":'',"tyUpdatetime":'',"tyIsok":'',"tyIsoktime":'',"tyTitilebg":{"src":""},"tyContent":[],"dreamFullname":null,"dreamUsername":null,"tyZid":null,"artlike":'',"dreamImg":null,"tflike":false,"collect":false,"ty_Username":null,"ty_Titilebg":null,"classid":0,"ty_Music":null,"ty_Count":null,"ty_Zid":null,"dream_Username":null,"ty_Updatetime":null,"ty_Isoktime":null,"dream_Fullname":null,"ty_Content":null,"ty_Title":null,"ty_Hits":null,"ty_State":null,"ty_Isok":null},
//    }
    }
  },
  mixins: [wechat,setImgUrl],
//async beforeMount() {},
  methods: {
    time(i) {
      return returnTime(i, '-', false)
    },
    setVideoSrc(i){
      if (i.hasOwnProperty('video_url')) {
        return i.video_url;
      } else {
        return i.textContent;
      }
    },
    setMusic(src){
      return src.split('|$|')[0];
    },
    goToEdit(){
      if(!this.isLogin){
//      this.$msg('您未登录,请先登录')
//      this.query.redirect = '/wusercenter/editarticle/edit?brand='+this.query.brand
//      setTimeout(()=>{
//        this.$router.push({path: '/login', query:this.query})
//      },500)
        this.reglogin = true
        return
      } else {
        this.$router.push({path: './edit', query:this.query})
      }
    },
    goLogin(){
        this.query.redirect = '/wusercenter/editarticle/edit?brand='+this.query.brand
        this.$router.push({path: '/login', query:this.query})
    },
    goRegister() {
      this.query.redirect = '/wusercenter/editarticle/edit?brand='+this.query.brand
      this.$router.push({path: '/register', query:this.query})
    },
      musicAutoPlay() {
      let musicEle = this.$refs.audio;
      musicEle.addEventListener("canplay", () => {
        musicEle.play();
      });
      document.addEventListener(
        "WeixinJSBridgeReady",
        () => {
          musicEle.play();
        },
        false
      );
    },
    follow() {
      if(!this.isLogin){
        this.$msg('您未登录,请先登录')
        this.query.redirect = '/wusercenter/editarticle/articledetails?id='+this.content.id + '&brand='+this.query.brand
        setTimeout(()=>{
          this.$router.push({path: '/login', query:this.query})
        },500)
        return
      }
      Concernditor({
          dreamReconcern: this.author.dreamUsername,
          dreamConcern: this.userInfo.dreamUsername
        })
        .then(res => {
          if (res.data.code == 2000) {
            this.$refs.msg.state('关注成功')
            this.$set(this.content, 'artlike', this.content.artlike + 1)
          } else {
            this.$refs.msg.state('您已经关注过啦~')
          }
        })
    },
    close() {
      this.shang = false
    },
    changeMoney(m) {
      this.money = m
    },
    flo(num) {
      return num.toFixed(2)
    },
    sub() {
      this.show = true
    },
    async addLike() {
      await addLikes(this.id, this.userInfo.dreamUsername, )
        .then(res => {
          if (res.data.code == 2000 && !res.data.data.hasOwnProperty('code')) {
            this.$refs.msg.state('点赞成功')
            this.content.artlike ++
          } else {
            this.$refs.msg.state('您已经点过赞了~')
          }
        })
    },
    confirm() {
      orderinforewardwx({
        dreamUsername:this.userInfo.dreamUsername,
        dreamMoney: this.money,
        dreamTousername:this.author.dreamUsername,
        dreamArticleid: this.content.id
      }).then(res => {
          this.show = false  //隐藏选择框
          this.shang = false //隐藏打赏金额选择框
          if(typeof(res.data.data) == 'object') {
            let amount = res.data.data.amount
            let rowid = res.data.data.rowid
            let {
              query
            } = this.$route
            //fullPath = encodeURIComponent(fullPath.substr(1))
            query.uid = declassify(query.uid)
            return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&type=UserRw&wechatFree=' + amount +'&rowid='+rowid
          }else if(res.data.code == 2000) {
            this.rewardingo ++
            this.userInfo.dreamVcurrency = Number(this.userInfo.dreamVcurrency-this.money)
            this.$store.dispatch('setUserInfo', this.userInfo)
            this.$msg(res.data.data)
          }
        }).catch(e=>{
          console.log(e);
        })
    },
    cancel() {
      this.show = false
    },
    shangShow() {
      if(!this.isLogin){
        this.$msg('您未登录,请先登录')
        this.query.redirect = '/wusercenter/editarticle/articledetails?id='+this.content.id + '&brand='+this.query.brand
        setTimeout(()=>{
          this.$router.push({path: '/login', query:this.query})
        },500)
        return
      }
      this.shang = true
    },
    gocard() {
      let old = {}
      old.ouid = this.query.uid
      old.obrand = this.query.brand
      let uid = numToCharacter(this.author.dreamUsername, 2)
//    let json = {uid: uid, brand: this.author.dreamBranddefault}
      old.uid = numToCharacter(this.author.dreamUsername, 2)
      old.brand = this.author.dreamBranddefault
      this.$router.push({
        path: '../../newcard',
        query: old
      })
    },
    breakLine(styleText,text){
      // console.log(styleText);
      var style = ''
      for (let j in styleText) {
        style += j + ':' + styleText[j] + ';'
      }
      var str = text.split('\n')
      var contentHtml = ''
      var len=str.length;
      for(var i=0;i<len;i++){
          if(i==0){
              contentHtml+='<p style="' + style + ';line-height:2;font-size:16px;text-indent:2em;min-height:32px;">'+str[i]+'</p>'
          }else{
              contentHtml+='<p style="' + style + ';line-height:2;font-size:16px;text-indent:0em;min-height:32px;">'+str[i]+'</p>'
          }
      }
      return contentHtml
    },
    getShareDesc(content){
      let descContent = content.tyContent
      let descShare = ''
      if(Array.isArray(descContent)){
         for(let i=0;i<descContent.length;i++){
             if(descContent[i].hasOwnProperty('text')){
               descContent = descContent[i]['text']
               if(descContent.indexOf('。')!=-1){
                  descShare = descContent.split('。')[0]
               }else if(descContent.indexOf('，')!=-1){
                descShare = descContent.split[0]
               }else if(descContent.indexOf('\n')){
                descShare = descContent.split('\n')[0]
               }else{
                descShare = descContent.substring(20)
               }
               break;
            }else{
               descShare = content.tyTitle
              }
         }
      }
      return descShare
    },
    titleImg(src) {
//    let src = option.src;
      if (/^\[.*\]$/.test(src)) {
        let src1 = JSON.parse(src)[0].src;
        if (/^\.\/img\/\d\.jpg$/.test(src1)) {
          let arr = src1.match(/\d/)[0]
          return imgarr.arr[Number(arr)]
        }
        if (src1.indexOf('_nuxt') != -1) {
          return src1;
        }
        if (src1.indexOf('http') != -1) {
          return src1;
        }
        return '/' + src1 + '?w=auto&h=auto&q=1';
      }
      if(src.indexOf('http://www.wvmp360.com/mingpianzxxt/userArticle/') != -1) {
        let arr = src.split('"src":"')[1]
       if (/^\.\/img\/\d\.jpg$/.test(arr)) {
          let arrs = arr.match(/\d/)[0]
          return imgarr.arr[Number(arrs)]
        }
        if(arr.indexOf('http') == -1) {
          return '/' + arr + '?w=auto&h=auto&q=1'
        } else {
          return arr
        }
      }
      return imgarr.arr[0]

    },
  },
  components: {
    msg: require('~/components/msg/msg.vue'),
    confirm: require('~/components/msg/confirm.vue')
  }
}
</script>

<style scoped>
@import '~static/css/editarticle/articledetails.css';
.title h1 {
  color: #1A1A1A;
  padding-right: 74px;
  min-height: 32px;
}
.alignSelf {
  align-self: center;
  padding: 8px;
}
</style>
