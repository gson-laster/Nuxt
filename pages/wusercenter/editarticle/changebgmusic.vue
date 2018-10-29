<template>
<div class="changeBgmusic">
  <!--<div @click="bgMusicBack" class="back">
    	<i class="icon-back icon iconfont"></i>
    </div>-->
<div class="musicHeight">
	  <!--<div class="inpBox">
    <input class="musicinp" type="text" 
           v-model="keyword"
           placeholder="请输入音乐名称或歌手名" />
  </div>-->
  <!--<div @click="search"
       class="showkeyword"
       v-show="keyword != ''">
    搜索: {{keyword}}
  </div>-->
  <slot name="musicType"></slot>
  <div ref="musicListdom"
       class="musicList"
       v-show="musicList.length > 0">
    <div @click="selectClick(index, item)"
         v-for="(item, index) in musicList"
         class="musicItem">
      <!--<p>{{item.songname}}</p>-->
      <p>{{item.dreamMusicname}}</p>
      <i v-if="index == active"
         class="icon iconfont icon-success musicSelected">
        </i>
    </div>
  </div>
  <loading v-show="musicList.length == 0"></loading>
</div>
  <div class="musicbtn"
       :class="{fixed: musicList.length == 0}">
    <button @click="bgMusicBack(false)">取消</button>
    <button @click="bgMusicBack(true)">确定</button>
  </div>
  <audio :src="audioSrc" autoplay="autoplay" ref="audio"></audio>
</div>
</template>

<script>
import axios from 'axios'
import {
  formatterDateTime
} from '~static/js/util.js'
import {
   seachmusic
} from '~/apis/user.js'
export default {
  data() {
    return {
      keyword: '',
      musicList: [],
      active: -1,
      show: true,
      audioSrc: ''
    }
  },
//async asyncData(){
//  await axios.get('http://route.showapi.com/213-4?showapi_timestamp=' + formatterDateTime() + '&showapi_appid=7403&showapi_sign=9a93645b8f10483181c7e42e101dc4ff&showapi_sign_method=md5&topid=26')
//    .then(res => {
//      musicList = res.data.showapi_res_body.pagebean.songlist.reverse()
//    })
//},
  created() {
    //    axios.get('http://route.showapi.com/213-4?showapi_timestamp=' + formatterDateTime() + '&showapi_appid=7403&showapi_sign=9a93645b8f10483181c7e42e101dc4ff&topid=5&showapi_sign_method=md5').then(res => {
    //      this.musicList = res.data.showapi_res_body.pagebean.songlist
    //    })
//  this.init(26)
     seachmusic().then(res=>{
      if (res.data.code == 2000) {
        this.musicList = res.data.data
      }
    })
    
  },
  mounted(){
    this.musicAutoPlay()
    
  },
  updated() {
    //    if (process.BROWSER_BUILD) {
    //      let wi = screen.height - 200
    //      this.$refs.musicListdom.style.height = wi + 'px'
    //    }
  },
  middleware: ["auth"],
  methods: {
    init(topid) {
//    let str = 'showapi_timestamp=' + formatterDateTime() + '&showapi_appid=7403&showapi_sign=9a93645b8f10483181c7e42e101dc4ff&showapi_sign_method=md5'
//    if (topid) {
//      str = str + '&topid=' + topid
//    }
//    axios.get('http://route.showapi.com/213-4?' + str)
//      .then(res => {
//        this.musicList = res.data.showapi_res_body.pagebean.songlist
//      })
    },
    musicInp (){
      this.show = false
    },
    search() {
      this.active = -1
      axios.get('http://route.showapi.com/213-1?showapi_appid=7403&showapi_sign=9a93645b8f10483181c7e42e101dc4ff&keyword=' + this.keyword + '&page=1')
        .then(res => {
          this.musicList = res.data.showapi_res_body.pagebean.contentlist
        })
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
    selectClick(i, item) {
      this.active = i
      this.audioSrc = 'http://www.wvmp360.com' + item.dreamMusicurl
//    let musicName = item.dreamMusicname;
      this.$emit('selectClick', this.audioSrc, item)
    },
    bgMusicBack(bol) {
      this.$emit('bgMusicBack', bol)
    }
  },
  components: {
    'loading': require('~components/common/loading')
  }
}
</script>

<style scoped>
@import '~static/css/editarticle/changebgmusic.css';
</style>
