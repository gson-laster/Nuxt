<template>
  <div class="box mycode">
<div class="title">
	   我的二维码
    <p>提示: 进入微信个人中心, 点击我的头像>二维码,点击右上角>保存到手机</p>
</div>
  	<div @click="choiceCode()" class="mycodes">
  		<div class="code">
  			<img :src="code"/>
  		</div>
  		<p>修改二维码</p>
  	</div>
  	<div @click="save" class="btn">
  		保存
  	</div>
  </div>
</template>

<script>
  import wechat from '~static/mixins/wechat.js'
  import {mapGetters} from 'vuex'
import keepUserOnline from '~static/js/keepUserOnline'
  import {change, zimgdel} from '~/apis/user.js'
  export default {
    mixins: [wechat],
    async asyncData ({store}) {
      return {
        code: '',
        ser: '',
        oldCode: '',
        userInfo: {}
      }
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
    created(){
     keepUserOnline(this.$route, 'user').then(res => {
       this.userInfo = res.user
        this.code = res.user.dreamEwm
        this.oldCode = res.user.dreamEwm
      })
    },
    head () {
      return{
        title: '修改信息'
      }
    },
    methods: {
      choiceCode () {
        this.choiceImg(1).then(res => {
          this.code = res.localId[0]
          this.ser = res.localIdAndserverId
        })
      },
      save () {
        this.wxuploads(this.ser).then(res => {
          var lo = ''
          for (let j in res) {
            lo = res[j]
          }
          change({dreamUsername: this.userInfo.dreamUsername, dreamEwm: lo}).then(res => {
            if (res.code == 2000) {
              zimgdel(this.oldCode).then(res => {
              })
              this.$set(this.userInfo, 'dreamEwm', lo)
              this.$msg('修改成功')
              setTimeout(() => {
                this.$router.push({
                  path: './edituserinfo',
                  query: this.query
                })
              }, 1500)
            } else {
              this.$msg('修改失败')
            }
          })
        })
      }
    },
    computed: {
      ...mapGetters({
//      userInfo: 'getUserInfo',
        query: 'get_router_query'
      })
    }
  }
</script>

<style scoped>
  /*@import '~static/css/wusercenter/mycode.css';*/
  .mycode {
    color: #999999;
    background: #fff;
  }
  .title{
    line-height: 24px;
    padding-left: 12px;
  }
  .mycodes{
    position: relative;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    height: 55px;
    padding: 8px;
  }
  .code{
    position: absolute;
    left: 12px;
    top: 6px;
    height: 55px;
    width: 55px;
    overflow: hidden;
  }
  /*.code img{
    height: 55px;
    width: auto;
  }*/
  .mycodes p{
    text-align: right;
    padding-right: 20px;
    position: relative;
    line-height: 55px;
    font-size: 16px;
  }
  .mycodes p:after{
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid #C8C8CD;
    border-right: 2px solid #C8C8CD;
    right: 6px;
    top: 50%;
    transform: rotate(-45deg) translateY(-50%);
  }
  .btn{
    padding-left: 14px;
    padding-right: 14px;
    /*box-sizing: border-box;*/
    margin: 40px 20px;
    font-size: 18px;
    text-align: center;
    /*text-decoration: none;*/
    color: #FFFFFF;
    line-height: 2.55555556;
    border-radius: 5px;
    /*-webkit-tap-highlight-color: rgba(0, 0, 0, 0);*/
    /*overflow: hidden;*/
    background: #1AAD19;
  }
</style>