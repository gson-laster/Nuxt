<template>
<div class="box modifydata">
  <!-- 点击完成 -->
  <div class="modify-detail"
       @click="finish">
    <span class="arrow">&lt;</span>
    <p class="text">完<br>成</p>
  </div>
  <!-- 轮播图 -->
  <div class="banner">
    <banner :bannerList="bannerList"></banner>
    <nuxt-link :to="{path: '../wusercenter/uploadbanner', query: query}">
      <div class="xiugaibanner">点击更换轮播图</div>
    </nuxt-link>
  </div>

  <div class="modifydata-userInfo clearfix">
    <div class="user-avatar-container">
      <div @click="uploadImg"
           class="user-avatar">
        <img :src="setImgUrl({src:userInfo.dreamImg})"
             alt="">
        <div class="change-avatar">修改头像</div>
      </div>

    </div>
    <div class="user-desc clearfix">
      <input class="title border-dashed"
             v-model="userInfo.dreamFullname"
             placeholder="请输入您的姓名"
             type="text"></input>
      <input class="text border-dashed"
             v-model="userInfo.dreamContent"
             placeholder="请输入您的简介"
             type="text"></input>
    </div>
    <div class="modifydata-userLink clearfix">
      <ul class="linkContainer">
        <li v-for="(item,index) in userMenu"
            v-bind:key="index"
            @click="replaceIconPannel(item,index)"
            class="item">
          <div class="border-dashed">
            <div :class="['icon iconfont', 'icon-'+item.dreamCss]"></div>
            <p class="name">{{item.dreamMenuname}}</p>
            <!-- 关闭选项 -->
            <div :class="{'rightClose iconfont icon-rdominus-fill':index>3}"
                 @click.stop="rightClose(item)"></div>
          </div>
        </li>

        <!-- 点击新增选项 -->
        <li class="item"
            @click="addIconNav"
            v-show="userMenu.length<=7">
          <div class="border-dashed">
            <div class="icon iconfont icon-redColor icon-addition_fill"></div>
            <p class="name">新增一个</p>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- 用户信息 -->
  <div class="modifydata-userDetail">
    <ul class="item-wrapper">
      <li class="item" style="display:block">
        <div class="li clearfix" v-for="(item,index) in position" :key="index" >
          <div class="left">
            <input type="text" class="border-dashed" placeholder="公司名称..." v-model="item.dreamCompanyname">
            <span class="iconfont icon-barrage_fill" v-show="index==0" style="top:18px"></span>
          </div>
          <div class="right">
             <input type="text" class="border-dashed" v-model="item.dreamServicename" placeholder="头衔...">
              <!-- <cite class="red-point" v-show="index==0">*</cite> -->
              <span class="iconfont icon-addition_fill mobile-plus"  v-show="index==0" @click="plusPosit"></span>
              <span class="iconfont icon-rdominus-fill mobile-minus" v-show="index>0" @click="minusPosit(index)"></span>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="mobile">
          <input type="text"
                 v-model="userInfo.dreamMobile"
                 class="border-dashed"
                 placeholder="请输入您的电话号码"
                 style="width:190px;"
                 >
          <!-- <cite>*</cite>        -->
          <span class="iconfont icon-addition_fill mobile-plus"
                style="font-size:26px"
                @click="showMobile2"></span>
        </div>
        <div class="mobile"
             v-show="isMobile2Show"
             >
          <input type="text"
                 v-model="userInfo.dreamMobile2"
                 class="border-dashed"
                 placeholder="请输入您的电话号码"
                 style="width:190px;margin-top:4px;"
                 >
          <span class="iconfont icon-rdominus-fill mobile-minus"
                @click="hideMobile2"></span>
        </div>
        <span class="iconfont icon-mobilephone_fill" style="top:18px"></span>
      </li>

      <li class="item">
        <div class="mail">
          <input type="text"
                 v-model="userInfo.dreamEmail"
                 class="border-dashed"
                 placeholder="请输入您的邮箱"
                 style="width:190px;"
                 >
        </div>
        <span class="iconfont icon-mail_fill"></span>
      </li>
      <li class="item">
        <div class="QQ">
          <input type="number"
                 v-model="userInfo.dreamQq"
                 class="border-dashed"
                 placeholder="请输入您的QQ号码"
                 style="width:190px;"
                 >
        </div>
        <span class="iconfont icon-qq"></span>
      </li>
      <li class="item" style="width:280px;">
        <div class="address textarea-wrapper">
          <div class="content-editable" contenteditable="true">{{userInfo.dreamAddress}}</div>
          <textarea
                 v-model="userInfo.dreamAddress"
                 class="border-dashed field-textarea"
                 placeholder="请输入您的地址"
                 >
          </textarea>
        </div>
        <span class="iconfont icon-coordinates_fill"></span>
      </li>
    </ul>
  </div>

  <!-- 二维码和微信公众号 -->
  <div class="qrcode">
    <div class="left" @click="uploadQrcode">
      <span>微信二维码</span>
      <img :src="setImgUrl({src:userInfo.dreamEwm})" alt="">
      <span class="iconfont icon-wrong" @click.stop="deleteImg('dreamEwm')" v-show="userInfo.dreamEwm"></span>
    </div>
    <div class="right" @click="uploadWXAccount">
      <span>公众号</span>
      <img :src="setImgUrl({src:userInfo.dreamFkewm})" alt="">
      <span class="iconfont icon-wrong" @click.stop="deleteImg('dreamFkewm')" v-show="userInfo.dreamFkewm"></span>
    </div>
  </div>


  <!-- 选择图标模板 -->
  <div class="box modifydata-shadow"
       v-if="isIconPannelShow">
    <div class="container">
      <div class="nav">
        <div class="nav-header">
          <div>导航栏目设置</div>
          <p @click="toDefault">恢复默认</p>
        </div>
        <div class="nav-bottom">
          <input type="text"
                 placeholder="请输入名称"
                 v-model="navName"
                 @input="inputNavName"
                 >
        </div>
      </div>

      <div class="linkStyle">
        <p class="link-title">选择链接类型</p>
        <select v-model="val"
                name=""
                id=""
                @change="chooseCustomNet">
            <option value="0">自定义网址</option>
            <option value="1">站内网址</option>
          </select>
        <!-- 请输入或粘贴网址 -->
        <textarea name=""
                  id=""
                  cols="22"
                  rows="2"
                  class="pasteAddress"
                  v-show="isCustomNet"
                  placeholder="请输入或粘贴网址"
                  v-model="navUrl">
          </textarea>
        <select name=""
                id=""
                v-show="!isCustomNet">
            <option value="">值享商城</option>
          </select>
      </div>
      <div class="selectIcons">
        <p>请选择图标</p>
        <div class="icon">
          <ul>
            <li v-for="(item,index) in icons"
                v-bind:key="index">
              <div class="iconfont"
                   :class="['icon-'+item,{active:isIconActive==index}]"
                   @click="isIconActive=index"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="buttons">
        <a href="javascript:;"
           @click.prevent="hideShadow">取消</a>
        <a href="javascript:;"
           @click.prevent="submitData">保存</a>
      </div>
    </div>
    <msg ref="msg"></msg>
  </div>
</div>
</template>
<script>
import appConf from "~/app.config";
import { getusermenu, editorusermenu, delusermenu } from "~/apis/usermenu";
import { fecthUserInfo, change, zimgdel } from "~/apis/user";
import { getBannerList } from "~/apis/banner";
import { mapGetters } from "vuex";
import { declassify, setFields, arrayRemove, setBanner } from "~static/js/util";
import wechat from "~static/mixins/wechat";
import setImgUrl from "~static/mixins/setImgUrl"
import banner from "~components/banner";
import keepUserOnline from '~static/js/keepUserOnline'

export default {
  async asyncData({ store, query }) {
    let dreamUsername = declassify(query.uid);
    let result = await Promise.all([
      getBannerList({
        dreamBrandid: query.brand,
        dreamIsok: true
      }),
      fecthUserInfo({
        dreamUsername: dreamUsername
      }),
      getusermenu({dreamUsername:dreamUsername})
    ]);
    // 获取用户信息筛选字段;
    let oldUserInfo = setFields([result[1].userInfo[0]], appConf.params)[0];

    // 新模板图标;
    let userMenu = []
    if(result.length>=3){
      userMenu = result[2]
    }


    // 判断用户是否有设置自定义轮播
    let bannerData = [];
    if (oldUserInfo.dreamBanner && oldUserInfo.dreamBanner != "") {
      let userBannerArr = setBanner(oldUserInfo.dreamBanner);
      userBannerArr.map((v, i) => {
        bannerData.push({
          dreamTitle: i,
          dreamDefaultpicurl:
            v.indexOf("http") != -1 ? v : v.substr(1, v.length)
        });
      });
    } else {
      bannerData = result[0];
    }
    return {
      bannerList: bannerData,
      query: query,
      oldUserInfo: oldUserInfo,
      userMenu:userMenu
    };
  },
  data() {
    return {
      isIconPannelShow: false,
      saveData: {},
      isAddShow: true,
      isMobile2Show: false, // 第二个手机号是否显示;
      // 选择图标模板相关;
      icons: "", //图标内容;
      val: 0, //判断选中的是哪个;
      isCustomNet: true, //是否显示自定义粘贴文本框;
      isIconActive: -1, //某个图标是否被选中;
      navName: "",
      navUrl: "",
      isReplace: false, //判断是修改还是添加
      replaceItem: {}, //保存修改的项
      timer: "", //记录定时器
      params: [],
      position: [], //职位名称,
      deliveryLocation:'',
      userInfo: {}
    };
  },
  components: {
    msg: resolve => {
      require(["~components/msg/msg.vue"], resolve);
    },
    banner
  },
  mixins: [wechat,setImgUrl],

  async created() {
    let userData = await keepUserOnline(this.$route, 'user')
    this.userInfo = userData.user
    this.icons = appConf["card_icons"];
    if (!this.userInfo.dreamMobile2) {
      this.isMobile2Show = false;
    } else {
      this.isMobile2Show = true;
    }
    //获取称谓;
    let dreamCompanyname = this.oldUserInfo.dreamCompanyname;
    let dreamServicename = this.oldUserInfo.dreamServicename;
    let dreamCompanynameArr = [];
    let dreamServicenameArr = [];
    let data = {};
    if(!dreamCompanyname||!dreamServicename){
      dreamCompanyname = ''
      dreamServicename = ''
    }
    if (dreamCompanyname.indexOf("|$|") != -1) {
      dreamCompanynameArr = dreamCompanyname.split("|$|");
    } else {
      data.dreamCompanyname = dreamCompanyname;
    }
    if (dreamServicename.indexOf("|$|") != -1) {
      dreamServicenameArr = dreamServicename.split("|$|");
    } else {
      data.dreamServicename = dreamServicename;
    }
    console.log('card data', data);
    //根据公司名称是不是有多个进行判断;
    let _this = this;
    if (dreamCompanynameArr.length > 1) {
      for (let k in dreamCompanynameArr) {
        _this.position.push({
          dreamCompanyname: dreamCompanynameArr[k],
          dreamServicename: dreamServicenameArr[k]
        });
      }
    } else {
      this.position.push(data);
    }
  },
  async beforeMount() {
    var url = "";
    if (window.__wxjs_is_wkwebview === true) {
      url = this.$store.state.url.split("#")[0];
    } else {
      url = window.location.href.split("#")[0];
    }
    this.wechatInit(url);
  },
  // watch: {
  //   userMenu: {
  //     handler: function(newValue, oldVale) {
  //       this.$store.dispatch("setUserMenu", newValue);
  //     },
  //     deep: true,
  //     imidiately: true
  //   }
  // },
  destroyed() {
    this.timer = null;
  },
  methods: {
    minusPosit(index) {
      this.position.splice(index, 1);
      console.log(this.position);
    },
    // 职称;
    plusPosit() {
      console.log(this.position);
      if (this.position.length > 2) {
        this.$msg("最多只能添加两个哦~");
        return;
      }
      this.position.push({ dreamCompanyname: "", dreamServicename: "" });
    },
    // 修改导航;
    replaceIconPannel(item) {
      this.isIconPannelShow = true;
      this.isReplace = true;
      this.replaceItem = item;
      this.navName = item.dreamMenuname;
      this.navUrl = item.dreamUrl;
      let _this = this;
      this.icons.map(function(params, index) {
        if (item.dreamCss == params) {
          _this.isIconActive = index;
        }
      });
    },
    // 添加导航;
    addIconNav() {
      this.navName = "";
      this.navUrl = "";
      this.isIconActive = -1;
      this.isIconPannelShow = true;
      this.isReplace = false;
    },
    hideShadow() {
      this.isIconPannelShow = false;
    },
    // 选择自定义网址;
    chooseCustomNet() {
      let optionVal = this.val;
      if (optionVal == 0) {
        //站内网址;
        this.isCustomNet = true;
      } else {
        this.isCustomNet = false; //自定义网址;
      }
    },
    async rightClose(item) {
      let result = await delusermenu({
        id: item.id
      });
      if (result.code == 2000) {
        this.userMenu.map((value, index) => {
          if (item.id == value.id) {
            this.userMenu.splice(index, 1);
            return;
          }
        });
      }
    },
    // 显示第二个手机信息;
    showMobile2() {
      if (this.isMobile2Show == true) {
        alert("不能再添加了哦");
      }
      this.isMobile2Show = true;
    },
    // 关闭第二个手机信息;
    hideMobile2() {
      this.userInfo.dreamMobile2 = "";
      this.isMobile2Show = false;
    },

    // 提交图标数据;
    submitData() {
      if (!this.navName) {
        this.$refs.msg.state("请输入导航名称");
        return;
      }
      let data = {};
      this.isIconPannelShow = false;
      data.dreamUsername = this.userInfo.dreamUsername;
      data.dreamCss = this.icons[this.isIconActive];
      data.dreamMenuname = this.navName;
      data.dreamUrl = this.navUrl;
      if (this.isReplace) {
        data.id = this.replaceItem.id;
        editorusermenu(data)
          .then(res => {
            for (let k in this.userMenu) {
              if (this.userMenu[k].id == this.replaceItem.id) {
                this.userMenu.splice(k, 1, data);
                break;
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        editorusermenu(data)
          .then(res => {
            if (typeof res == "number") {
              data.id = res;
              this.userMenu.push(data);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    //恢复默认;
   async toDefault() {
      let result = await delusermenu({dreamUsername:this.userInfo.dreamUsername})
      if(result.code==2000){
         this.$msg('恢复默认成功')
         setTimeout(()=>{
           this.$router.push({
             path:'/newcard',
             query:this.query
           })
         },500)
      }else{
        this.$msg('恢复默认失败')
      }
      // if (this.userMenu.length <= 4) {
      //   this.$refs.msg.state("已经是默认的了");
      //   this.timer = setTimeout(() => {
      //     this.isIconPannelShow = false;
      //   }, 500);
      //   return;
      // }
      // // 删除默认的;
      // let str = "";
      // let strArr = [];
      // let needArr = [];
      // for (let i = 0; i < this.userMenu.length; i++) {
      //   if (this.userMenu[i].dreamZid !== 666) {
      //     strArr.push(this.userMenu[i]);
      //     this.userMenu.splice(i, 1);
      //     i = i - 1;
      //   }
      // }
      // delusermenu({
      //   str: JSON.stringify(strArr)
      // })
      //   .then(res => {
      //     if (res.code == 2000) {
      //       this.$refs.msg.state("设置默认成功!");
      //       this.isIconPannelShow = false;
      //     }
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    },
    // 点击完成;
    async finish() {
      // 需要的字段;
      let newUserInfo = setFields([this.userInfo], appConf.params)[0];
      // 拼接称谓;
      let companyName = "",
        serviceName = "";
      let _this = this;
      for (let k in _this.position) {
        if (
          _this.position[k].dreamCompanyname == "" ||
          !_this.position[k].dreamCompanyname
        ) {
          continue;
        }
        companyName += this.position[k]["dreamCompanyname"] + "|$|";
        serviceName += this.position[k]["dreamServicename"] + "|$|";
      }
      companyName = companyName.substr(0, companyName.length - 3);
      serviceName = serviceName.substr(0, serviceName.length - 3);
      newUserInfo.dreamCompanyname = companyName;
      newUserInfo.dreamServicename = serviceName;
      let data = {};
      for (let k in this.oldUserInfo) {
        if (this.oldUserInfo[k] == newUserInfo[k]) {
          continue;
        } else {
          data[k] = newUserInfo[k];
        }
      }
      data.dreamUsername = this.userInfo.dreamUsername;
      this.$set(this.userInfo, "dreamCompanyname", companyName);
      this.$set(this.userInfo, "dreamServicename", serviceName);
      //修改用户信息;
      let result = await change(data);
      if (result.code == 2000) {
        this.$store.dispatch("setUserInfo", this.userInfo);
        this.$router.push({
          path: "/newcard",
          query: this.query
        });
      }
    },
    async uploadImg() {
      await this.WXUploadImg("dreamImg", "修改成功");
    },
    async uploadQrcode() {
      await this.WXUploadImg("dreamEwm", "上传成功");
    },
    async uploadWXAccount() {
      await this.WXUploadImg("dreamFkewm", "上传成功");
    },
    inputNavName() {
      if (this.navName.length > 4) {
        this.$msg("名称不能超过4个字");
        this.navName = "";
        return;
      }
    },
    // 删除微信二维码和公众号二维码;
   async deleteImg(param) {
      let imgArr = [];
      let imgUrl = this.userInfo[param];
      let data = {};
      data.dreamUsername = this.userInfo.dreamUsername;
      data[param] = "";
      if (imgUrl.indexOf("http") != -1) {
        //图片服务器地址
        imgArr.push(this.userInfo[param]);
        let result  = await Promise.all([
          zimgdel(imgArr),
          change(data)
        ])
        if(result.length==2){
           if(result[0].data.code==2000&&result[1].code==2000){
              this.$set(this.userInfo,param,'')
              this.$msg('删除成功')
           }else{
             this.$msg('删除失败')
           }
        }else{
          this.$msg('删除失败')
        }
      } else {
        //非图片服务器地址
        let result = await change(data)
        if(res.code==2000){
          this.$set(this.userInfo,param,'')
          this.$msg('删除成功')
        }
      }
    },
    //上传方法
    async WXUploadImg(param, msg) {
      await this.choiceImg().then(res => {
        this.$set(this.userInfo, param, res.localId[0]);
        this.wxuploads(res.localIdAndserverId).then(res => {
          let lo = "";
          for (let j in res) {
            lo = res[j];
          }
          let data = {};
          data.dreamUsername = this.userInfo.dreamUsername;
          data[param] = lo;
          change(data).then(res => {
            if (res.code == 2000) {
              this.$set(this.userInfo, param, lo);
              this.$msg(msg);
            } else {
              this.$msg("失败");
            }
          });
        });
      });
    },
    trimSpacesAndUppercase(){

    }
  }
};
</script>
<style>
@import "~static/css/newcard/modify.css";
@import "~static/css/newcard/iconPannel.css";
</style>
