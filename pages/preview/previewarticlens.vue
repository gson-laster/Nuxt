<template>
<div ref="box"
     class="box previewarticlens">
  <div class="content">
    <div class="oneSection">
      <div class="title">
        文章标题
      </div>
      <div class="timeName">
        2017-7-20 <span ref="titles"
              class="name">您的昵称</span>
      </div>
      <div class="innav">
        <img src="~static/img/preview/xcy_02.jpg"  ref="bigImg"/>
      </div>
<div ref="article">
	      <div class="articleContent">
        文章每天我们更新上传，内容丰富，既有本品牌内容，又有行业动态类型文章，朋友圈转发量大的文章，可以达到吸粉和圈粉的效果。
      </div>
      <div class="view">
        阅读4130次
      </div>
</div>
    </div>
<div class="userListboxbg">
	<div ref="users" class="userListBox">
      <div class="userInfo">
          <div class="touxiangBox">
              <img src="~static/img/preview/preview_03.jpg"/>
          </div>
        <div class="code">
          <p>您的名字</p>
          <p>值享,让分享更有价值！</p>
        </div>
    </div>
    <div class="userInfoimgs">
      <ul>
        <li><img src="~static/img/preview/userInfoListImg_03.jpg" /><span>我的名片</span></li>
        <li><img src="~static/img/preview/userInfoListImg_05.jpg" /><span>在线聊天</span></li>
        <li><img src="~static/img/preview/userInfoListImg_07.jpg" /><span>微信二维码</span></li>
      </ul>
      <div class="clearfix">

      </div>
    </div>
</div>
</div>
    <!--<div class="new_ad2">
      <ul ref="listShadow">
        <li v-for="(item,index) in list" :key="index">
          <div class="imgpos">
            <div :class="item.icon">

            </div>
          </div>
          <div class="txt color0">
            <p>{{item.title}}</p><span>{{item.content}}</span>
          </div>
        </li>
        <div class="clearfix">

        </div>
      </ul>
    </div>-->
    <div class="xiangguan">
      <span>相关信息</span>
    </div>
    <div class="innav"
         id="inn"
         style="margin-bottom:30px;">
      <ul>
        <li>华为这个广告, 我愿一辈子不买苹果!</li>
        <li>继无人超市无人餐厅后, 中国又出现了无人警局, 再...</li>
        <li>为什么女人要不停的买买买?这是我见过最真实的回...</li>
        <li>一个历史老师讲汉子精髓的视频火了, 彻底服了!</li>
        <li>又一项微信服务宣布收费！"剁手党"听说后哭了...</li>
        <li>母女三人凭借一组照片爆红ins, 网友直呼:又来骗我...</li>
      </ul>
      <br>
      <div ref="bottomShadow"
           class="addregan">立即拥有专属电子名片</div>
    </div>
  </div>
  <div @click="hide"
       v-show="shadowShow"
       class="shadow">
    <div class="img close_btn">

    </div>
    <div class="contentShadow titleShadow"
         :style="titleShadow">

    </div>
    <div class="contentShadow articleShadow"
         :style="articleShadow">

    </div>
    <div class="contentShadow userShadow"
         :style="userShadow">

    </div>
    <!--<div class="contentShadow listShadow"
         :style="listShadow">

    </div>-->
    <div class="contentShadow bottomShadow"
         :style="bottomShadow">

    </div>
  </div>
  <div class="previewArticle-footer-btn">
      <a href="javascript:;" v-for="(item,index) in footerList" :key="index" @click="direction(item)">
        {{item.name}}
      </a>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { declassify } from "~static/js/util";
import querystring from "querystring";
export default {
  asyncData ({store, query}) {
    return {
      query: query
    }
  },
  data() {
    return {
      list: [
        {
          title: "网站首页",
          content: "全面了解新事业",
          icon: "img view_png_01"
        },
        {
          title: "我的名片",
          content: "联系我详细了解",
          icon: "view_png_02 img"
        },
        {
          title: "更多分享",
          content: "朋友圈优质分享",
          icon: "view_png_02 img"
        },
        {
          title: "申请网站",
          content: "个人专属的名片",
          icon: "view_png_05 img"
        }
      ],
      titleShadow: {},
      articleShadow: {},
      userShadow: {},
      listShadow: {},
      bottomShadow: {},
      shadowShow: false,
      footerList: [{ name: "返回介绍", id: 1 }, { name: "立即开通", id: 2 }]
    };
  },
  beforeCreate() {
    this.$store.dispatch("setFooterShow", false);
  },
  mounted() {
    let bigImg = this.$refs.bigImg
    let _this = this
    bigImg.onload=function(){
      _this.init()
    }
  },
  methods: {
    hide() {
      this.shadowShow = false;
    },
    direction(item) {
      if (item.id == 1) {
        let data = {};
        data.uid = this.query.uid;
        data.brand = this.query.preview_brand ? this.query.preview_brand : this.query.brand;
        this.$router.push({
          path: "../../wusercenter/vip",
          query: data
        });
      } else if (item.id == 2) {
        let queryObj = {};
        queryObj.uid = declassify(this.query.uid);
        queryObj.brand = this.query.preview_brand ? this.query.preview_brand : this.query.brand;

        return (window.location.href = "http://" +window.location.host +"/api/wechat-redirect?target=" +encodeURIComponent(querystring.stringify(queryObj)) +"&type=CloudCardOpen");
      }
    },
    init() {
      let titleInfomation = this.$refs.titles;
      // console.log(titleInfomation);
      this.titleShadow = {
        width: Number(titleInfomation.offsetWidth + 4) + "px",
        height: Number(titleInfomation.offsetHeight + 16) + "px",
        left: Number(titleInfomation.offsetLeft) + "px",
        top: Number(titleInfomation.offsetTop - 8) + "px"
      };
      let articleInfomation = this.$refs.article;
      this.articleShadow = {
        width: Number(articleInfomation.offsetWidth + 4) + "px",
        height: Number(articleInfomation.offsetHeight) + "px",
        left: Number(articleInfomation.offsetLeft - 4) + "px",
        top: Number(articleInfomation.offsetTop) + "px"
      };
      let users = this.$refs.users;
      this.userShadow = {
        width: Number(users.offsetWidth + 4) + "px",
        height: Number(users.offsetHeight + 4) + "px",
        left: Number(users.offsetLeft - 4) + "px",
        top: Number(users.offsetTop - 4) + "px"
      };
      document.styleSheets[0].insertRule(
        ".userShadow::after { left: " +
          Number(users.offsetLeft + users.offsetWidth - 8) +
          "px }",
        0
      ); // 支持非IE的现代浏览器
      document.styleSheets[0].insertRule(
        ".userShadow::before { left: " +
          Number(users.offsetLeft + users.offsetWidth - 3) +
          "px }",
        0
      ); // 支持非IE的现代浏览器
      let bottomShadow = this.$refs.bottomShadow;
      this.bottomShadow = {
        width: Number(bottomShadow.offsetWidth + 44) + "px",
        height: Number(bottomShadow.offsetHeight + 12) + "px",
        left: Number(bottomShadow.offsetLeft - 24) + "px",
        top: Number(bottomShadow.offsetTop - 8) + "px"
      };
      document.styleSheets[0].insertRule(
        ".bottomShadow::before { top: -" +
          Number(bottomShadow.offsetHeight + 10) +
          "px }",
        0
      ); // 支持非IE的现代浏览器
      document.styleSheets[0].insertRule(
        ".bottomShadow::after { top: -" +
          Number(bottomShadow.offsetHeight + 50) +
          "px }",
        0
      ); // 支持非IE的现代浏览器
      this.shadowShow = true;
    }
  }
};
</script>

<style>
@import "~static/css/preview/previewarticlens.css";
</style>
