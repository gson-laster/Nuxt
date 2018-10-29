<template>
<div class="box">
  <div class="layer-qrcode none">
    <div>
      <span class="content">您还没有绑定微信哦！</span>
    </div>
  </div>
  <section id="wusecenter">
    <div>
      <div class="userTop">
        <div class="topImg">
        	<img :src="setImgUrl({src: userInfos ? userInfos.dreamImg : ''})" />
          <span class="img-vip"></span>
        </div>
        <div class="identfication"></div>
        <div class="userInfo">
          <p>{{nickName}}</p>
          <p>{{userInfos ? userInfos.dreamUsername : ''}}</p>
          <p>余额&nbsp;:<span>{{remainder}}</span>
          </p>
        </div>
        <div @click="LoginOut"
             class="outLoginBox">
          <div class="outLogin img">
          </div>退出</div>
      </div>
    </div>
    <div class="userList">
      <ul>
        <li @click="router('/wusercenter/vip')">
          <div class="img VIP">
          </div>
          <p class="ListFirstP">会员VIP权益</p>
          <p class="black">续费会员</p>
        </li>
        <li @click="router('/wusercenter/edituserinfo')">
          <div class="img data">

          </div>
          <p class="ListFirstP">完善名片信息</p>
          <p class="black">修改信息</p>
        </li>
      </ul>
      <div class="clearfix">

      </div>
    </div>
  </section>

  <section class="ListItem"
           v-for="(items,index) in user_menu"
           :key="index"
           v-show="showAgent(index, items)"
           >
    <section>
      <div class="titles">
        {{items.title}}
      </div>
      <ul>

        <items @router="router"
               v-for="(item, ind) in items.list"
               :key="item.name"
               :name="item.name"
               :classname="item.classname"
               :path="item.path"
               v-show="showAgentItem(item)"
               >
        </items>


        <div class="clearfix">
        </div>
      </ul>
    </section>
  </section>
  <!-- 预览按钮 -->
  <preview-bottom v-if="isPreview"></preview-bottom>
  <div class="new_bottom">
    <div class="new_bottomin"></div>
  </div>
  <msg ref="msg"></msg>
  <confirm v-if="isConfirmShow"
           @cancel="cancel"
           @confirm="confirm"
           :content="content"></confirm>
  <div @click.self="wixincodehidden" v-show="weixincode" class="weixincodealerts">
  	<div class="weixincodeimgs">
  		<img src="~static/img/wusercenter/weixincode.png"/>
  		<p>请识别二维码关注服务公众号！</p>
  	</div>
  </div>
</div>
</template>
<script>
import {userLoginOut,delwxbd} from "~/apis/user"
const msg = () =>import ("~/components/msg/msg")
import confirm from "~/components/msg/confirm"
import {mapGetters} from "vuex"
import items from "~/components/usercenter"
import {localStore,setCookie,getCookie,declassify} from "~/static/js/util"
import appConf from "~/app.config.js"
import previewBottom from "~components/preview"
import {getwxbdinfos, newbd} from "~/apis/user"
import {setrenewcode} from '~/apis/user.js'
import setImgUrl from '~static/mixins/setImgUrl'
import expired from '~static/mixins/expired'
import keepUserOnline from '~static/js/keepUserOnline'
import querystring from 'querystring'
export default {
  async asyncData({query, route, store}) {
    let isPreview = null;
    if (query.hasOwnProperty("is_preview")) {
      isPreview = true;
    } else {
      isPreview = false;
    }

    return {
      isPreview: isPreview,
      // userInfos: store.getters.getUserInfo,
      // brandInfo: store.getters.getBrandInfo,
      query: query
    };
  },
  head() {
    return {
      title: "用户中心"
    };
  },
  data() {
    return {
      user_menu:appConf.user_menu,
      isConfirmShow: false,
      content: "开通VIP才能使用该功能奥!",
      isWeXinConfirm: false, //是否是微信绑定,
      agentDetail:appConf.agentDetail,
      isPreview: false,
      userInfos: {},
      brandInfo: {},
      query: {},
      weixincode: false
    };
  },
   computed: {
    // ...mapGetters({
    //   query: "get_router_query",
    //   // userInfos: "getUserInfo",
    //   // brandInfo: 'getBrandInfo'
    // }),
    nickName() {
      return this.isPreview ? "您的昵称" : this.userInfos ? this.userInfos.dreamFullname : '';
    },
    remainder() {
      return this.isPreview ? "0" : this.userInfos ? this.userInfos.dreamVcurrency : 0;
    },
    isAgent(){
      let boolAgent = false
      if(!this.userInfos.dreamAgent||this.userInfos.dreamAgent=='null'){
        boolAgent = false
      } else {
        boolAgent = true
      }
      return boolAgent
    }
  },
  middleware: ["auth"],
  mixins: [setImgUrl, expired],
  created() {
    this.$store.dispatch('setFooterShow', true)
    keepUserOnline(this.$route, 'userbrand').then(res => {
      this.userInfos = res.user
      this.brandInfo = res.brand
      
        // 判断是否有绑定微信;
        let dreamUsername = this.userInfos.dreamUsername
        getwxbdinfos(dreamUsername)
          .then(res => {
            if (res.code != 40001) {} else {
              this.weixincode = true
            }
          })
          .catch(e => {
            console.log(e)
          });
        return false;
      
    })
//    let json = {
//      classname: '',
//      path: '',
//      name: '',
//    }
//  if(this.userInfos.dreamAgent||this.userInfos.dreamAgent!='null') {
//    this.user_menu[0].list.push(json);
//  }
  },
  mounted(){

    this.expired(this.userInfos.dreamEndtime)
  },
  methods: {
  showAgent(index, item){
    if (this.isAgent) {
    	return true
    } else {
    if (item.hasOwnProperty('isagent')) {
    	return false
    } else {
      return true
    }
  }

  },
  wixincodehidden(){
    this.weixincode = false
  },
  showAgentItem(item){
    if((item.path=="/wusercenter/recruit" && this.isAgent)){
      return false
    }
    else{
      if(this.isAgent && item.hasOwnProperty('isagent')){
        return true;
      } else {
        if ((this.brandInfo.id == 0)) {
        	return true
        } else {
          if (item.hasOwnProperty('iswv')) {
          	return false
          } else{
            return true
          }
        }
      }
    }
  },
    LoginOut() {
      userLoginOut()
        .then(res => {
          if (res.data.code == 2000) {
            document.cookie ='dreamUsername="";expires=' + new Date(0).toUTCString();
            setCookie('loginUser',"",-1)
            this.$store.dispatch("LoginOut");
            localStore.delete("userInfo");
            localStore.delete("brandInfo");
            // localStore.delete("userMenu");
            this.$router.push({
              path: "/login",
              query: {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
   async router(path) {
      if (this.isPreview) {
        if (path == "/wusercenter/inlineservice") {
          this.$router.push({
            path:path,
            query:this.query
          });
        } else {
          this.isConfirmShow = true;
        }
        return;
      }
//    if(path=='vmall'){
//         this.$router.push({
//          path:'/wusercenter/vmall',
//          query:this.query
//          })
//    }

      if(path=='/wusercenter/vip'){
       //用户续费;当前时间戳和到期时间对比;
       let nowTimeStamp = new Date().getTime()
       let dreamETime = null
       if(!this.userInfos.dreamEndtime||this.userInfos.dreamEndtime==''){
          dreamETime = ''
       }else{
         dreamETime = this.userInfos.dreamEndtime
       }
       let queryObj = {}
       queryObj.uid = declassify(this.query.uid)
       queryObj.brand = this.query.brand
      //判断续费还是开通;
      if(!dreamETime){
        //开通
      return  window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(queryObj)) + '&type=CloudCardOpen'
      }else{
        //续费
        this.$router.push({
          path:'/wusercenter/vip/openNow',
          query:this.query
        })
      }
      return
      }
      if (path == "weixin") {
        // 判断是否有绑定微信;
        let dreamUsername = this.userInfos.dreamUsername
        getwxbdinfos(dreamUsername)
          .then(res => {
            if (res.code != 40001) {
              // 解绑;
              this.content = '是否解绑'
              this.isWeXinConfirm = true //设置微信绑定标志
              this.isConfirmShow = true  //显示确定弹窗,遇上面这行位置不能换;
            } else {
               let {query} = this.$route
              query.uid = declassify(query.uid)
              // fullPath = encodeURIComponent(fullPath.substr(1))
              window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&bindewx=api_wechatBindHide&uid='+this.userInfos.dreamUsername+'&brand='+this.query.brand
            }
          })
          .catch(e => {
            console.log(e)
          });
        return false;
      }
      if (path == "") {
        this.$refs.msg.state("开发中,敬请期待");
      }
      if (path == "/wusercenter/vmall") {
        this.$router.push({
          path: "/wusercenter/vmall",
          query: this.query
        });
      } else {
        this.$router.push({
          path: path,
          query: this.query
        });
      }
    },
    develop() {
      this.$refs.msg.state("开发中,敬请期待");
    },
    // 解绑微信;
    async unbinbWX(username){
     let result = await delwxbd(username)
     if(result.code==2000){
       this.$refs.msg.state('解绑成功')
     }else{
       this.$refs.msg.state('解绑失败')
     }
    },
    cancel() {
      this.isConfirmShow = false;
    },
    confirm() {
      this.isConfirmShow = false;
      let username = this.userInfos.dreamUsername
      if (this.isWeXinConfirm) {
          this.unbinbWX(username)
      } else {
        //预览进行支付
        let queryObj = {}
        queryObj.uid = declassify(this.query.uid)
        queryObj.brand =this.query.brand
        window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(queryObj)) + '&type=CloudCardOpen'
     }
    }
  },
  components: {
    msg,
    items,
    previewBottom,
    confirm
  }
};
</script>
<style scoped>
@import "~static/css/wusercenter/index.css";
@import "~static/css/wusercenter/img.css";
</style>
