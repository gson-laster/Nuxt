<template>
    <div class="box w-leaflets" style="position:relative;">
        <div class="new_leaflets" id="new_leaflets">
            <div class="imgs">
                <img src="~static/img/wusercenter/xcy_01.jpg">
            </div>
            <div class="imgs">
                <img src="~static/img/wusercenter/xcy_02.jpg">
            </div>
            <div class="imgs">
                <img src="~static/img/wusercenter/xcy_03.jpg">
            </div>
            <div class="imgs">
                <img src="~static/img/wusercenter/xcy_04.jpg">
            </div>
            <div style="background-color:#fff">
              <div class="listBox">
                <div v-for="(i, index) in list" class="title">
                <h2>{{index}}</h2>
             <div class="list">
             	 <ul>
              <li  @click="query(j.id)" v-for="j in i">
                <span>{{j.dreamBrandtitle}}</span>
              </li>
              </ul>
              <div class="clearfix">

              </div>
             </div>
                </div>
              </div>
            <div class="imgs">
                <img >
            </div>

        </div>
        <div class="new_leaflets_an">
            <nuxt-link :to="{path: '../register', query:uid}">立即申请网站</nuxt-link>
        </div>
    </div>
    </div>

</template>
<script>
import wechat from "~/static/mixins/wechat.js";
import {brandListz} from '~/apis/user.js'
import keepUserOnline from '~static/js/keepUserOnline'
import {mapGetters} from 'vuex'
import {stringify} from 'querystring'
  export default {
    async asyncData ({store,query}) {
      let json = {
        'A-G': [],
        'H-N': [],
        'O-T': [],
        'U-Z': []
      }
      await brandListz({dreamIsshow: 1}).then(res => {
        let data = res.data.data || []
        for (let i = 0; i < data.length; i ++) {
          let dreamSzm = data[i].dreamSzm;
          if (data[i].dreamIsshow) {
          if ('A' <= dreamSzm && 'G' >= dreamSzm) {

          	json['A-G'].push(data[i])

          } else if ('H' <= dreamSzm && 'N' >= dreamSzm) {

          	json['H-N'].push(data[i])

          } else if ('O' <= dreamSzm && 'T' >= dreamSzm) {

          	json['O-T'].push(data[i])

          } else if ('U' <= dreamSzm && 'Z' >= dreamSzm) {
            json['U-Z'].push(data[i])

          }
        }
        }
        json['U-Z'].push({
          id: 0,
          dreamBrandtitle: 'Worldventures',
          dreamSzm: 'W'
        })
      })
      return {
        uid:query,
        list: json,
        userInfo: {}
      }
      },
      head(){
        return {
          title: '邀请好友'
        }
      },
      mixins: [wechat],
      created(){

      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })

      },
    	async beforeMount() {
        var url = ''
        // 判断是否是ios微信浏览器
        if (window.__wxjs_is_wkwebview === true) {
          url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
        } else {
          url = window.location.href.split('#')[0]
        }
        const shareUrl = 'http://'+window.location.host + this.$route.fullPath
    		const shareOpts = {
    			title: `邀请好友`, // 分享标题
    			desc: `一起来使用值享名片宣传工具吧！`, // 分享描述
    			link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    			imgUrl: `http://${window.location.host}/UploadFiles/1489999753693.jpg`, // 分享图标
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
      beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
    methods: {
      query (id) {
        let json = {uid: this.quer.uid, brand: id}
        // this.$router.push({
        //   path: '../',
        //   query: json
        // })
        window.location.href = 'http://' + window.location.host + '/?' + stringify(json)
      }
    },
    computed: {
      ...mapGetters({
//      userInfo: 'getUserInfo',
        quer: 'get_router_query'
      })
    }
  }
</script>

<style scoped>
  @import '~static/css/wusercenter/leaflets.css';
</style>
