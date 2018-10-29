<template>
<div class="box edituserinfo"
     style="margin-bottom:40px;">
  <div class="editInf_warrp"
       style="width: 100%;">
    <!-- 列表 -->
    <section class="editInf_page">
      <div class="user-info__list">
        <div @click="uploadImg"
             class="weui-cells user-img">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <div class="userImg">
                <img :src="setImgUrl({src:userimg})" alt="">
              </div>
            </div>
            <div class="weui-cell__ft">修改头像</div>
          </div>
        </div>
        <div v-for="(item,index) in menuList"
             class="weui-cells"
             v-bind:key="index"
             >
          <template v-for="(i,ind) in item" v-if="i.path!==''" >
            <nuxt-link  class="weui-cell weui-cell_access" :to="{path: i.path, query: querys()}" v-bind:key="ind">
              <div class="weui-cell__bd">
                <p>{{i.name}}</p>
              </div>
              <div class="weui-cell__ft bindWeiXinContent">{{i.note}}</div>
            </nuxt-link>
            </template>
            <template v-else>
              <a href="javascript:;" class="weui-cell weui-cell_access" @click="bindWX">
              <div class="weui-cell__bd">
                <p>{{i.name}}</p>
              </div>
              <div class="weui-cell__ft bindWeiXinContent">{{i.note}}</div>
              </a>  
            </template>
        </div>
      </div>
    </section>
    <section class="editInf_page"
             style="display: none; width: 375px;">
      <div class="weui-cells__title">
        我的二维码 <br>提示:进入微信个人中心，点击头像&gt;二维码，点击右上角&gt;保存到手机
      </div>
      <div class="weui-cells user-img">
        <a class="weui-cell weui-cell_access"
           href="javascript:;"
           id="userEwm">
          <div class="weui-cell__bd">
            <img>
          </div>
          <div class="weui-cell__ft">修改二维码</div>
        </a>
      </div>
      <div class="page__bd page__bd_spacing">
        <a href="javascript:;"
           class="weui-btn weui-btn_primary"
           id="toPage1">保存</a>
      </div>
    </section>
  </div>
  <!--{{aas}}-->
  <confirm v-show="isConfirmShow"
           @cancel = "cancel"
           @confirm = "confirm"
           :content = "content" 
  ></confirm>
  <msg ref="msg"></msg>


</div>
</template>

<script>
import {
  fecthUserInfo,
  change,
  zimgdel,
  getwxbdinfos,
  delwxbd
} from "~/apis/user.js"
import wechat from "~/static/mixins/wechat"
import setImgUrl from "~static/mixins/setImgUrl"
import msg from "~components/msg/msg"
import confirm from "~components/msg/confirm"
import {declassify} from "~static/js/util"
import querystring from 'querystring'
import { mapGetters } from "vuex"
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  data() {
    return {
      userInfos: {},
      menuList: [
        [
          { name: "修改资料", path: "editdata", note: "" },
          { name: "微信二维码", path: "mycode", note: "二维码" },
          { name: "切换品牌", path: "brand", note: "" }
        ],
        [
          { name: "绑定微信", path: "", note: "" },
          { name: "选择名片模板", path: "/newcard/selectTheme", note: "" },
          { name: "更换背景音乐", path: "changebgmusic", note: "" },
          { name: "上传滚动图片", path: "uploadbanner", note: "" }
        ],
//      [
//        {name: '高级编辑', path: 'senioredit',  note: ''}
//      ]
      ],
        userimg: "",
      isBindWX: false,
      isConfirmShow: false,
      content: "是否解绑微信"
      //      aas: ''
    };
  },
  head() {
    return {
      title: "修改信息"
    };
  },
  middleware: ["auth"],
  mixins: [wechat,setImgUrl],
  async created() {
      await keepUserOnline(this.$route, 'user').then(res => {
        this.oldUserInfo = Object.assign({}, res.user)
        this.userInfo = res.user
        this.userimg = this.userInfo.dreamImg
        let dreamContentLength = this.userInfo.dreamContent?this.userInfo.dreamContent.length:0
        this.count = 140 - dreamContentLength
      })
    Object.assign(this.userInfos, this.userInfo);
    //获取微信绑定信息;
    let username = this.userInfo.dreamUsername;
    await getwxbdinfos(username).then(result => {
      if (result.code != 40001) {
        this.$set(this.menuList[1][0], "note", "已绑定");
        this.isBindWX = true;
      } else {
        this.$set(this.menuList[1][0], "note", "未绑定");
        this.isBindWX = false;
      }
    }).catch(e => {
      console.log(e)
    });
  },
   mounted() {
    var url = "";
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url = this.$store.state.url.split("#")[0];
    } else {
      url = window.location.href.split("#")[0];
    }
     this.wechatInit(url, {}, false);
  },
  methods: {
    slider: function() {
      this.$router.push({
        path: "/wusercenter/editdata",
        query: this.query
      });
    },
    //    path (path) {
    //      this.$router.push({
    //        path: '/wusercenter/' + path,
    //        query: this.query
    //      })
    //    },
    async uploadImg() {
      var oldsrc = [this.userInfos.dreamImg];
      await this.choiceImg().then(res => {
        this.userimg = res.localId[0];
        //      this.aas = res.serverId[0]
        this.wxuploads(res.localIdAndserverId).then(res => {
          var lo = "";
          for (let j in res) {
            lo = res[j];
          }
          this.$set(this.userInfo, "dreamImg", lo);
          change({
            dreamUsername: this.userInfo.dreamUsername,
            dreamImg: lo
          }).then(res => {
            if (res.code == 2000) {
              this.$store.dispatch("setUserInfo", this.userInfo);
              zimgdel(oldsrc);
              this.$msg("修改成功");
            } else {
              this.$msg("修改失败");
            }
          });
        });
      });
    },
    querys() {
      return this.query;
    },
    bindWX() {
      // 已经绑定就弹窗
      if (this.isBindWX) {
        this.isConfirmShow = true;
      } else {
        this.isConfirmShow = false;
        let {query} = this.$route
        query.uid = declassify(query.uid)
        // console.log(query)
        window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&bindewx=api_wechatBindHide&uid='+this.userInfos.dreamUsername+'&brand='+this.query.brand
      }
    },
    // 解绑微信;
    async unBindWX(username) {
      let result = await delwxbd(username);
      if (result.code == 2000) {
        this.$refs.msg.state("解绑成功");
        this.$set(this.menuList[1][0],"note",'未绑定')
      } else {
        this.$refs.msg.state("解绑失败");
      }
    },
    confirm() {
      this.isConfirmShow = false;
      let username = this.userInfo.dreamUsername
      this.unBindWX(username);
    },
    cancel() {
      this.isConfirmShow = false;
    },
    // 设置头像显示;
//  setAvatar(url){
//    let imgUrl = ''
//    if(url){
//      
//    }
//    return  
//
//  }  

  },
  computed: {
    ...mapGetters({
//    userInfo: "getUserInfo",
      query: "get_router_query"
    })
  },
  components: {
    msg,
    confirm
  }
};
</script>

<style scoped>
@import "~static/css/wusercenter/editusercenter.css";
</style>
