<template>
  <div class="box" v-cloak>
    <div v-if="produce == ''" class="paperboxs">
    <div style="opacity: 0;">
    	{{info}}
    </div>
<div v-if="!loaded">
    <div  class="paperBox">
      <div @click="prev" class="img btn btnl">

      </div>
        <div class="img stemp showdate">

        </div>
        <div class="img stemp time">

        </div>
      <div class="total">
      <div class="pabox" :style="'width: '+ showw + 'px;'">
      <div :style="'transform: translateX('+ paperT +'px);width:' + paperWidth +'px;'" class="paper">
        <div :style="'width: '+ showw + 'px;'" v-for="item in codepaper" class="paperList">
          <img :src='item.img'/>
        </div>
      </div>
      </div>
      <div class="creat" @click="createPaper">
        生成壁纸
      </div>
      </div>
      <div @click="next" class="img btn btnr">

      </div>
    </div>
<div class="btm">
    <div @touchmove="touch"  @touchstart="touchstart" :style="'transform: translate(' + trans + 'px);'"  :class="{tansition: transitons, bottom:true}"  @click="imgclick">
      <div :style="'width: '+ lw +'px;'" v-for="(item, i) in bottompaper" class="bottomlist" >
        <img num="2" :index="i" :items="item.index" :i="item.i" v-if="text(item.index)" :src='item.img'/>
        <img num="2" :index="i" :items="item.index" :i="item.i" v-else style="transform: translateY(0px);" :src='item.img'/>
      </div>
    </div>
</div>
<div class="bgimg">
  <img :src="activeimg"/>
</div>
</div>
<loading v-if="loaded"></loading>
    </div>

  </div>
</template>

<script>
  import {carr, warr} from '~static/img/paper/outpaperimg.js'
  import {siblings, nonce, createajaxData} from '~static/js/util.js'
  import md5 from 'md5'
  import {mapGetters} from 'vuex'
  export default {
    fetch ({store}) {
      store.state.footerShow = false
    },
    data () {
      return {
        loaded: true,
        path: '~static/img/paper/',
        codepaper: [],
        paperList: [],
        sc: '',
        bottomstyle: '',
        touchstep: 0,
        trans: 0,
        bw: 0,
        index: 0,
        paperWidth: 0,
        showList: {},
        showw: 0,
        num: 0,
        bottompaper: [],
        bottomTotalLength: 0, 
        bottomTrans: 0,
        key: 20,
        totalphoto: 20,    
        lw: 0,
        transitons: false,
        activeimg: '',

        i: 1,
        info: '',
        paperT: 0,
        produce: ''
      }
    },
    middleware: ["auth"],
    mounted () {
      if (process.BROWSER_BUILD) {
        this.sc = screen.width > 640 ? 640 : screen.width
        this.codepaper = carr
        this.bottompaper.push(...this.codepaper, ...this.codepaper, ...this.codepaper)
        this.lw = this.sc/7
        this.info = this.lw
        this.bw = this.lw * this.codepaper.length 
        this.bottomTotalLength = -(this.bw * 3 - this.sc)
        this.bottomTrans = -(this.bw * 2 - this.lw * 7)
        this.trans = - (this.lw * (this.codepaper.length - 3))
        this.paperList = warr
        this.showw = this.sc-150;
        this.paperWidth = this.showw * 20
        this.totalphoto = this.codepaper.length
        this.key = this.codepaper.length
        this.activeimg = this.codepaper[0].img
        this.loaded = false
      }
  },
  methods: {
    imgclick: function (event) {
      var e = event || window.event
      var target = e.target
      if (target.nodeName.toLowerCase() == 'img') {
        target.style.transform = 'translateY(0)'
        siblings(target.parentNode, function (n) {
          n.firstChild.style.transform = 'translateY(12px)'
        })
        this.index = target.getAttribute('items')
        this.key = Number(target.getAttribute('index'))
        this.i = Number(target.getAttribute('i'))
        this.trans = -(this.key - 3) * this.lw
      }
    },
    touch (event) {
      let x = event.changedTouches[0].pageX
      this.trans = x - this.touchstep + this.trans
      if (this.trans < this.bottomTotalLength) {
        this.trans = this.bottomTrans
      }
      if (this.trans > 0) {
        this.trans = -this.bw
      }
      this.touchstep = x
    },
    touchstart (event) {
      this.touchstep = event.changedTouches[0].pageX
    },
    prev () {
      if (this.index == 0) {
        this.index = this.totalphoto - 1
      } else {
        this.index = Number(this.index) - 1
      }
        this.key = this.key - 1
        this.key = this.key < 4 ? this.key + this.totalphoto : this.key
        this.nextPrev()
    },
    next () {
      if (this.index < this.codepaper.length - 1) {
        this.index = Number(this.index) + 1
      } else {
        this.index = 0
      }
      this.key  = this.key + 1
      this.nextPrev()

    },
    //当前选中图片
    text (i) {
      return this.index != i
    },
    nextPrev () {
        let trans = -(this.key - 3) * this.lw
        this.transitons = true
        let t = this
        setTimeout (function () {
          t.transitons = false
        }, 100)
    },
    createPaper () {
      var path = 'http://' +location.host + this.paperList[this.index].img;
//    var data = {};
//    data.app_id = 'TY4165710472';
//    data.nonce = nonce();
//    data.method = 'Wallpaper.createWallPaper';
//    data.app_secret = 'GZADPUMGFKMW7VKU6UD6TRVH6WPWHT7KEXYMM6TJBQ2RXQG1QPAYM3PSI5CCSJ84';
//    data.resource = 1;
//    data.qrcode_content = 'http://' + location.host +'/newcard?uid=' + encodeURI(this.query.uid) + '&brand=' + this.query.brand
//    data.wallpaper = path;
//    var cont = this.positionX[this.i];
//    if (cont.hasOwnProperty('qrcode_y')) {
//      data.qrcode_y = cont.qrcode_y;
//    }
//    if (cont.hasOwnProperty('qrcode_x')) {
//     data.qrcode_x = cont.qrcode_x;
//    }
//    if (cont.hasOwnProperty('qrcode_size')) {
//      data.qrcode_size = cont.qrcode_size;
//    }
//    if (cont.hasOwnProperty('qrcode_color')) {
//      data.qrcode_color = cont.qrcode_color;
//    }
//    if (cont.hasOwnProperty('qrcode_background_color')) {
//      data.qrcode_background_color = cont.qrcode_background_color;
//    }
//    var returnData = createajaxData(data);
//    returnData.qrcode_content = returnData.qrcode_content.replace('&', '%26');
//    var query_str = ''
//    for(var k in returnData){
//      var Ty = returnData[k];
//      query_str += k + '=' + Ty + '&'
//    }
//    query_str = query_str.substring(0, query_str.length - 1)
//    this.produce = {path: path, i: this.i}
      this.query.i = this.i
      this.query.path = path
      this.$router.push({
        path: './showpaper',
        query: this.query
      })
    }
  },
  computed: {
    ...mapGetters({
      query: 'get_router_query'
    })
  },
  watch: {
    index (now, old) {
      this.paperT = -now * this.showw
      this.activeimg = this.codepaper[this.index].img
    },
    key (now, old) {
      if (this.key < 4) {
        this.trans = this.trans - this.bw
        this.key = this.key + this.totalphoto
        return false;
      }
      if (this.key > this.totalphoto * 3 - 4) {
          this.trans = this.trans + this.bw
          this.key = this.key - this.totalphoto
          return false;
      }
      if (this.key >= 4 && this.key <= this.totalphoto * 3 - 4) {
        this.nextPrev()
      }
    }
  },
  components: {
    'loading': require('~components/common/loading')
  }
}
</script>

<style>

  @import '~static/css/wusercenter/img.css';
  @import '~static/css/wusercenter/paper.css';
</style>
