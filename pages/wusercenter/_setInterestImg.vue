<template>
   <div class="operationPanel box">
    <div class="interestImgShow">
      <div @touchstart="logostart" @touchmove.prevent ="logomove" @touchend="logoend" :style="'transform: translate(' + logopos.x +'px, '+ logopos.y +'px) rotate(0) scale('+logopos.s+');'" class="poslogo">
        <img ref="logo" :src="imgSrc(logosrc)"/>
      </div>
      <img ref="localImg" :src="localIds"/>
    </div>
    <div class="pageContWarrp">
    <div class="rangeBox">
    <div ref="range" class="range">
      <div v-if="pointShow" :style="'left: '+ point +'%'" class="pointShow">
        {{tofixed(logopos.s)}}
      </div>
      <div class="point" :style="'width: '+ point +'%'">
        
      </div>
    <div @touchstart="start" :style="'left:' + le + 'px'" @touchend="end" @touchmove="move" class="radius">
      
    </div>
    </div>
    </div>
    <div @click="choice" class="onceChoice">
      重新上传
    </div>
    <div style="color: red;">
    	{{info}}
    </div>
    <div class="pelaceChoice">
      <div class="pelace">
        请选择贴图
      </div>
    </div>
    <div class="logoList scroll">
      <ul>
        <li v-for="(i, index) in logo">
          <div @click="choiceLogo(i, index)" :class="{logos:true, borderColor: index == logoIndex}">
            <img :src="setlogo(i.dreamGjurl)"/>
          </div>
        </li>
      </ul>
    </div>
    </div>

    <div class="interestbtn">
      <div>
        重置
      </div>
      <div @click="save">
        完成
      </div>
    </div>
  </div>
</template>

<script>
  import wechat from '~static/mixins/wechat.js'
  import {listfunny, listGj, Thum, addfunny} from '~/apis/user.js'
  import {mapGetters} from 'vuex'
  import keepUserOnline from '~static/js/keepUserOnline'
  
  export default {
    data () {
      return {
        le: 'auto',
         width: 0,
        step: 0,
        point: '33',
        logo: [],
        logosrc: '',
        logopos: {
          x: 40,
          y: 30,
          s: 1
        },
        logostep: {
          x: 0,
          y: 0
        },
        pointShow: false,
        logoIndex: 0,
        info: '',
        userInfo: {}
      }
    },
        mixins: [wechat],
    created() {
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
//    var url = ''
//        if (window.__wxjs_is_wkwebview === true) {
//    url = this.$store.state.url.split('#')[0]
//  } else {
//    url = window.location.href.split('#')[0]
//  }
//  console.log(url)
//  this.info = url
//    this.wechatInit(url, {}, false)
  },
    mounted () {
                listGj().then(res => {
          if (res.data.code == 2000) {
            this.logo = res.data.data
            this.logosrc  = this.logo[0].dreamGjurl
          }
        })
        this.width = this.$refs.range.offsetWidth
        this.le = this.width / 3
    },
    methods: {
        start (event) {
        this.step = event.changedTouches[0].pageX
        this.pointShow = true
      },
      end() {
        this.pointShow = false
      },
      move (event) {
        let s = event.changedTouches[0].pageX
        let st = this.le + s - this.step
//      console.log(this.width)
        if (st >= 0 && st <= this.width) {
          this.le = st
          this.step = s
          this.point = this.le / this.width * 100
          this.$set(this.logopos, 's', this.le / this.width * 3.03)
        }
      },
      choiceLogo(i, index) {
        this.logosrc = i.dreamGjurl
        this.logoIndex = index
      },
      tofixed(num) {
        return num.toFixed(2)
      },
      logostart (e) {
        this.logostep.x = e.changedTouches[0].pageX
        this.logostep.y = e.changedTouches[0].pageY
      },
      logomove (e) {
        let x = e.changedTouches[0].pageX
        let y = e.changedTouches[0].pageY
        let stepX =  x - this.logostep.x + this.logopos.x
        let stepY =  y - this.logostep.y + this.logopos.y
        this.$set(this.logopos, 'x', stepX)
        this.$set(this.logopos, 'y', stepY)
        this.logostep.x = x
        this.logostep.y = y
      },
           choice () {
        this.panel = true
        this.choiceImg().then(res => {
          this.localIds = res.localId[0]
          this.serAndLo = res.localIdAndserverId
        })
      },
      logoend () {
        
      },
           setlogo (s) {
        return  'http://www.wvmp360.com/' + s
      },
      save () {
        let w = this.$refs.localImg.offsetWidth
        let h = this.$refs.localImg.offsetHeight
        let x1 = this.$refs.logo.offsetWidth
        let y1= this.$refs.logo.offsetHeight
/*  
 * {
       w : 底图宽,
       h: 底图高,
       x1: logo宽,
       y1: logo高,
       x: logo X轴位移,
       y: logoY轴位移,
       scale: logo放大倍数,
       alpha: 透明度,
       r: '',
       path1: logo路径,
       path2: 底图路径,
       rotate: 旋转角度
}
*/
        this.wxuploads(this.serAndLo).then(res => {
          let path2 = ''
          for (let i in res) {
            path2 = res[i]
          }
          let p1 = 'http://www.wvmp360.com/' + this.logosrc;
          let ress = {w: w, h: h, x1: x1, y1: y1, x: this.logopos.x, y: this.logopos.y, scale: this.logopos.s, alpha: 1, path1: p1, path2: path2, rotate: 0, r: 0}
          Thum(ress).then(res => {
            if (res.data.code == 2000) {
              addfunny({ dreamUsername: this.userInfo.dreamUsername, dreamImgurl: res.data.data, dreamWtoh: w / h}).then(ressss => {
                this.info = ressss.data.code
                if (ressss.data.code == 2000) {
                  this.$msg('生成成功')
               setTimeout(() => {
                 location.reload()
               }, 1500)
                } else {
                  this.$msg('生成失败')
                }
              })
            } else {
              this.$msg('生成失败')
            }
          })
        })
      },
          imgSrc (srcStr) {
        return  'http://www.wvmp360.com/'+srcStr
      },
    },
    props: ['localIds', 'serAndLo'],
    computed: {
      ...mapGetters({
       // userInfo: 'getUserInfo',
        query: 'get_router_query'
      }),
    }
  }
</script>

<style>
</style>