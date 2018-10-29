<template>
<div class="box changebgmusics">
  <div class="contain">
    <!--<div class="seach">
      <div class="seachInp">
        <input type="search"
               v-model="keyword" />
      </div>
      <div @click="search">搜索</div>
    </div>-->
    <div class="slidebox scroll">
      <ul>
        <li @click="select(item.id, item.dreamMusicurl, index)"
            v-for="(item, index) in musicList"
            :dreamMusicurl="item.dreamMusicurl">
          <div class="imgs">
          	<img class="pos "
               :src="setmuImg(item.dreamDefaultpicurl)" />
          </div>
          <div v-if="text(item.id, index)"
               class="pos active"></div>
          <p>
            <span class="songname">{{item.dreamMusicname}}</span>
            <span class="singername">{{item.singername}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="btnbox">
      <button @click="save(true)">不使用背景音乐</button>
      <button @click="save(false)">保存</button>
    </div>
  </div>
  <audio :src="audioSrc" autoplay="autoplay" ref="audio"></audio>
</div>
</template>

<script>
import {
  getUserInfo, formatterDateTime
} from '~/static/js/util.js'
import axios from 'axios'
import {
  mapGetters
} from 'vuex'
import {
  change, seachmusic
} from '~/apis/user.js'
import setImgUrl from '~static/mixins/setImgUrl'
import a from '~static/js/outMusicDefaultImg.js'
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  data() {
    return {
      active: 0,
      index: 0,
      first: 1,
      audioSrc: '',
      keyword: '',
      userInfo: {}
    }
  },
  head() {
    return {
      title: '更换背景音乐'
    }
  },
  mixins: [setImgUrl],
  async asyncData () {
    let musicList = [];
    await seachmusic().then(res=>{
      if (res.data.code == 2000) {
        musicList = res.data.data
      }
    })
//  await axios.get('http://route.showapi.com/213-4?showapi_timestamp=' + formatterDateTime() + '&showapi_appid=7403&showapi_sign=9a93645b8f10483181c7e42e101dc4ff&showapi_sign_method=md5&topid=26')
//    .then(res => {
//      musicList = res.data.showapi_res_body.pagebean.songlist.reverse()
//    })
    return {
      musicList: musicList
    }
  },
  mounted() {
    this.musicAutoPlay()
    //    const io = new IntersectionObserver(ioes => {
    //      ioes.forEach((ioe) => {
    //        const el = ioe.target;
    //        const intersectionRatio = ioe.intersectionRatio
    //        if (intersectionRatio > 0 && intersectionRatio <= 1) {
    //        	this.loadImg(el)
    //        	io.unobserve(el)
    //        }
    //      })
    //    })
    //    const imgs = Array.from(document.querySelectorAll('.imgs'))
    //    imgs.forEach(item => io.observe(item))
  },
  methods: {
    setmuImg(src){
      if (src) {
        setImgUrl({src: src, address: a['a']})
      } else {
        return a['a']
      }
    },
    //    loadImg (el) {
    //      const source = el.getAttribute('data-src');
    //      el.src = source
    //    },
    text(id, index) {
      if (id == this.active && index == this.index) {
        //        this.index = index
        return true;
      } else {
        return false;
      }
    },
    select(id, src, index) {
      this.active = id
      this.index = index
      this.audioSrc = 'http://www.wvmp360.com' + src
      this.$refs.audio.play()
      this.play()
    },
    play() {
      this.$refs.audio.play()
      let au = this.$refs.audio
      au.addEventListener("canplay", function () {
        au.play()
      }, false)
      document.addEventListener("WeixinJSBridgeReady", function () {
  au.play();
  }, false);

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
    save(bool) {
      if (bool) {
        this.active = 0;
        this.audioSrc = ''
      }
      change({
          dreamUsername: this.userInfo.dreamUsername,
          dreamMusic: this.audioSrc
        })
        .then(res => {
          if (res.code == 2000) {
            this.$set(this.userInfo, 'dreamMusic', this.audioSrc)
            this.$store.dispatch('setUserInfo', this.userInfo)
            this.$msg('修改成功')
            setTimeout(() => {
              this.$router.push({
                path: '../newcard',
                query: this.query
              })
            }, 1500)
          } else {
            this.$msg('修改失败')
          }
        })
    },
    search() {
      axios.get('http://route.showapi.com/213-1?showapi_appid=7403&showapi_sign=9a93645b8f10483181c7e42e101dc4ff&keyword=' + this.keyword + '&page=1')
        .then(res => {
          this.musicList = res.data.showapi_res_body.pagebean.contentlist
        })
    }
  },
  created() {
    this.$store.dispatch('setFooterShow', true)
    keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
    })
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
@import '~static/css/wusercenter/changebgmusic.css';
</style>
