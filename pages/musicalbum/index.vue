<template>
<div class="musicBtm">
  <div v-if="main">
        <div class="inputBox">
        <div class="inputContain">
            <div class="name">
              标题
            </div>
            <div class="input">
              <input type="text" placeholder="请输入文章标题(30字以内)" v-model="titleText" value="" />
            </div>
        </div>
        <div @click="musicShow" class="inputContain">
        <div style="font-weight: 500;" class="name">
                           添加音乐背景
        </div>
        <div class="input">
          <input v-if="!musicInfo" type="text" placeholder="点击查找音乐" value="" readonly/>
          <input v-else type="text" :placeholder="musicInfo.singername+'-'+musicInfo.songname" readonly/>
        </div>
        </div>
        <div class="inputContain">
          <div class="name">
                            请选择模板
          </div>
          <div class="input album"><nuxt-link :to="{path: '/musicalbum/my', query: setQuery({})}"><span>我的相册</span></nuxt-link></div>
        </div>
      </div>
    <div class="sliderContain">
       <div :class="{sliderBox:true, scroll: true}">
        <div  v-for="(item, index) in albumList" class="slider"  @click="albumSelect(index)" v-bind:key="index">
          <img :class="{ borderColor: index == activeAlbum }" :src="item.index"/>
          <div class="theme_name">{{item.name}}</div>
        </div>
      </div>
  </div>
  <div @click="uploadimg" class="uploadpic">
  	<i class="icon-pic iconfont uploadpici"></i>上传我的美照
    <span>已经选中{{localImages.length}}张</span>
  </div>
  <div @click="previewbtn" class="previewbtn">
  	预览
  </div>
    <div class="previw-image-list">
      <ul>
        <li v-for="(item, index) in localImages">
          <div class="img-box">
            <i class="iconfont icon-wrong delete" @click="deleteImg(index)"></i>
            <img :src="item" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
    
  <music @bgMusicBack="bgMusic" @selectClick="selectClick" v-show="musicshow"></music>
  <audio src="" autoplay loop ref="audio">
  </audio>
</div>
</template>
<script>
import arr from "~/static/js/outmusicalbum.js";
import music from "~/pages/wusercenter/editarticle/changebgmusic" ;
import wechat from '~static/mixins/wechat.js'
import setQuery from '~static/mixins/setQuery.js'
import {selectorFunction} from '~static/js/util'

export default {
  async asyncData({ store }) {
    return {
      userInfo: store.getters.getUserInfo,
      musicInfo: store.getters.getMusicAblumMusic,
      titleText: store.getters.getMusicAblumTitleText,
      localImages: store.getters.getMusicAblum.localImages
    };
  },
  middleware: ["auth"],
  data() {
    return {
      albumList: [],
      touchstep: [],
      listShow: [0, 1, 0, 0, 0, 0],
      btm: false,
      musicshow: false,   //选择音乐界面
      musicType: [
        { type: "热歌", topid: 26 },
        { type: "摇滚", topid: 19 },
        { type: "民谣", topid: 18 },
        { type: "内地", topid: 5 },
        { type: "欧美", topid: 3 },
        { type: "港台", topid: 6 },
        { type: "韩国", topid: 16 },
        { type: "日本", topid: 17 }
      ],
      activeType: 0,  //选中的类型
      modules:['autumnscenery', 'romanticbeach', 'starrynight', 'beautyfield', 'bluesky',  'travel'], //类型
      //: "", //音乐信息
      activeAlbum: 0, //选中的类型的索引
      musicp: false, //播放音乐
      //localImages: [],
      localImagesSource: [],
      totalImageLength: 10,
      moduleName: '',
      main: true      
    };
  },
  head(){
    return {
      title: '音乐相册'
    }
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },

  mixins: [wechat, setQuery],
  beforeMount(){
    this.moduleName = this.modules[this.activeAlbum]
    selectorFunction('meta[name="viewport"]')[0].content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
    this.wechatInit(url, {}, false)
  },
  mounted() {
    this.albumList = arr.arr;
    //if (process.BROWSER_BUILD) {
     // console.log(this.$refs.totalW)
      //this.totalWidth = -this.$refs.totalW[0].offsetWidth;
    //}
    document.addEventListener('touchmove', function (e) {
      e.returnValue = true;
		}, false);
    this.playMusic()

  },
  methods: {
    deleteImg(index){
      this.localImages.splice(index, 1)
    },
    musicShow() {
      this.btm = false
      this.main = false
      this.musicshow = true;
    },
    sliderClick(topid, index) {
      this.activeType = index;
      this.$refs.music.init(topid);
    },
    bgMusicBack() {
      this.musicshow = false;
      this.btm = true
      this.main = true
    },
    selectClick(src, name, songname, singername, songid, seconds, albumpic_big, albumpic_small) {
      this.musicInfo = {
        "url": src,
        "singername": singername,
        "songid": songid,
        "songname": songname,
        "seconds": seconds,
        "albumpicm": albumpic_small,
        "alnumpicb": albumpic_big,
      };
      this.playMusic()
    },
    // 播放音乐
    playMusic(){
      if(!this.musicInfo) return
      var audio = this.$refs.audio
      audio.src = this.musicInfo.url
      // audio.addEventListener('canpaly', function (e) {
      //   this.play()
      // }, false)
      audio.load()
      audio.play()
    },
    albumSelect(i) {
      this.activeAlbum = i;
      this.$store.dispatch('setMusicAlbumType', this.albumList[i].type)
      this.moduleName = this.modules[i]
    },
    bgMusic (bol) {
      if (bol) {
      	this.musicshow = false
      } else {
      	this.musicshow = false
        this.musicInfo = {}
      }
      this.main = true
    },
    previewbtn () {
      //this.main = false
      //this.btm = true
      // this.$set(this.listShow, this.activeAlbum, 1)
      if (this.titleText == "") {
        this.$msg("请输入标题");
        return false;
      }
      if (this.activeAlbum == -1) {
        this.$msg("请选择模板");
        return false;
      }
      console.log(this.$route.query);
      this.$store.dispatch('setMusicAlbumLocalImages', this.localImages)
      this.$store.dispatch('setMusicAlbumTitleText', this.titleText)
      this.$store.dispatch('setMusicAlbumMusic', this.musicInfo)
      this.$store.dispatch('setMusicAlbumPreview', true)
      this.$router.push({
        path: '/musicalbum/view/'+this.moduleName,
        query: this.$route.query
      })
    },
    async uploadimg () {
      let localData = await this.choiceImg(9, {tranfer: false})
      // this.localImages.push(...localData)
      this.localImagesSource = localData
      let selectImages = []
      this.$store.dispatch('setLocalImagesSource', this.localImagesSource) // 存localIds
      for (var i = 0; i < localData.length; i++) {
        let base64Data = await this.getLocalData(localData[i])
        selectImages.push(base64Data)
      }
      this.localImages = selectImages
    },
    /**
     * 获取微信图片转base64
     * @param  {[type]} localId [description]
     * @return {[type]}         [description]
     */
    getLocalData(localId){
      return new Promise((resolve, reject) => {
        wx.getLocalImgData({
          localId: localId,
          success: (res) => {
            var localData = res.localData;
            resolve(localData)
          },
          error: (err) => {
            reject(err)
          }
        })
      })
    }
  },
  components: {
    music,
  }
};
</script>

<style scoped>
@import "~static/css/musicalbum/index.css";
.uploadpic span{
  float: right;
  margin-right: 12px
}
.previw-image-list{
  width: 100%;
}
.previw-image-list li{
  float: left;
  width: 33.33%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 8px;
  min-height: 80px;
  position: relative;
}
.previw-image-list .delete{
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 18px;
  background: #fff;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}
.previw-image-list li .img-box{
  border: 1px solid #dedede;
  border-radius: 4px;
}
</style>
