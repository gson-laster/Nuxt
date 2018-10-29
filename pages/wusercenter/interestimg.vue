<template>
<div class=" box interesting">
  <div v-show="!panel" class="page-1-warrp"style="height: 282px;">
      <div class="page-1-pic"></div>
      <div :style="length1" class="page-1-line page-1-line1"></div>
      <div :style="length2" class="page-1-line page-1-line2"></div>
      <div class="page-1-maskcenter"></div>
      <div class="page-1-btnbox">
          <button class="page-1-button" @click="choice">上传照片</button>
      </div>
  </div>
  <div v-show="!panel" class="page-1-picwarrp">
      <div class="page-1-pictitle">
          <h3>我的图片</h3>
          <div class="intimgList">
            <div  v-if="list.length == 0" class="t_align">
            	没有更多图片了...
            </div>
          	<ul v-else>
          		<li @click="sel(i)" v-for="(i, index) in list"><img   src="~static/img/blank.gif"
               v-lazy="imgSrc(i.dreamImgurl)" />
          		<div @click="deletes(i.id, index)" class="deles">
          			X
          		</div>
          		</li>
          	</ul>
          </div>
      </div>
  </div>
  <div  v-show="show && !panel"  @click="close($event)" class="interimgBox">
    <div class="interp">
    	<img :src="nowImg"/>
    	<p>长按几秒就可保存图片到手机哟</p>
    </div>
  </div>
  <setInterestImg :localIds="localId" :serAndLo="serAndLo" v-if="panel"></setInterestImg>
</div>
</template>

<script>
  import {mapGetter} from 'vuex'
  import wechat from '~static/mixins/wechat.js'
  import {listfunny, listGj, Thum, delfunny} from '~/apis/user.js'
  import keepUserOnline from '~static/js/keepUserOnline'
  import setInterestImg from '~pages/wusercenter/_setInterestImg.vue'
  export default {
    data () {
      return {
        length1: {},
        length2: {},
        nowImg: '',
        show: false,
        localId: '',
        panel: false,
        ran: 1,
        serAndLo: '',
        list: []
      }
    },
    head () {
      return {
        title: '趣味图片'  
      }
    },
    mixins: [wechat],
      async beforeMount() {
      var url = ''
          if (window.__wxjs_is_wkwebview === true) {
      url = this.$store.state.url.split('#')[0]
    } else {
      url = window.location.href.split('#')[0]
    }
      this.wechatInit(url, {}, false)
  },
    mounted () {
      if (process.BROWSER_BUILD) {
        let swidth = screen.width > 640 ? 640 : screen.width
        let deg = Math.atan(swidth / 282) * (180 / Math.PI)
        let len = Math.sqrt(swidth * swidth + 79524)
        this.length1 = {height: len + 'px', transform: 'rotate('+ deg + 'deg)'}
        this.length2 = {height: len + 'px', transform: 'rotate(-' + deg + 'deg)'}
      }
    },
     created(){
      keepUserOnline(this.$route, 'user').then(res => {
        
        listfunny (res.user.dreamUsername).then(res =>{
         let data = []
         if (res.data.code == 2000) {
           data = res.data.data
         }
         this.list = data
       })
    
      })
    },
    fetch ({store}) {
      store.dispatch('setFooterShow', false)
    },
    methods: {
 
      choice () {
        this.choiceImg().then(res => {
          this.localId = res.localId[0]
          this.serAndLo = res.localIdAndserverId
          this.panel = true
        })
      },
      imgSrc (srcStr) {
        if (srcStr.indexOf('http') != -1) {
        	return srcStr
        } else{
          return  'http://www.wvmp360.com/'+srcStr
        }
      },
      sel (i) {
        if (srcStr.indexOf('http') != -1) {
        
        this.nowImg = 'http://www.wvmp360.com/' + i.dreamImgurl 
        } else {
          return  'http://www.wvmp360.com/'+srcStr
        }
        this.show = true
      },
      close (obj) {
        if (obj.toElement.nodeName.toUpperCase() != 'IMG') {
          this.show = false
        }
      },
        deletes (id, index) {
      delfunny({id: id}).then(res => {
        if (res.data.code == 2000) {
          this.list.splice(index, 1)
        	this.$msg('删除成功')
        } else{
        	this.$msg('删除失败')
        }
      })
    }
    },
    components: {
      setInterestImg
    },
  
  }
</script>

<style scoped>
  @import '~static/css/wusercenter/interestimg.css';
</style>
