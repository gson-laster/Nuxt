<template>
  <div class="box selfopusmap">
      <section>
        <div class="userInfos">
          <div @click="choice" class="editImg opu">
            <div class="img opus">

            </div>更换封面
          </div>
          <nuxt-link :to="{path: './draft', query: query}">
            <div class="draft editImg">
              <div class="img map">

              </div>草稿箱
            </div>
          </nuxt-link>
          <div class="bgImgs">
            <img v-if="res.userpic.hasOwnProperty('dreamUrl')&&res.userpic.dreamUrl != ''" :src="setImgUrl({src: res.userpic.dreamUrl})"/>
            <img v-else :src="topbg"/>
          </div>
          <div class="userImg"><img :src="setImgUrl({src:userInfo.dreamImg})"></div>
          <div class="userName">{{userInfo.dreamFullname}}</div>
          <div class="userLists">

            <ul>
              <li>文章&nbsp; {{res.artcount}}</li>
              <li>粉丝&nbsp;{{res.reconcerncount}}</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
      <div class="swiper-container">
        <div ref="trans" @touchmove="touch" @touchend="touchend" @touchstart="touchstart" :class="{swiperwrapper:true, transition: transi, classifyMap:true}">
            <div @click="changeslide(index, item.id)" :id="item.id" v-for="(item, index) in classify" :class="{color: item.id == activeClassifyId, swiperslider: true}">
              {{item.dreamTitle}}
            </div>
            <div class="clearfix">

            </div>
        <div ref="bottomslide" class="sliderBox">
          <div class="slider">

          </div>
        </div>
        </div>
    </div>
  </section>
  <div v-show="articleList.result.length" class="contentListss">
    <div class="listss" v-for="(item, index) in articleList.result" v-bind:key="index">
      <div class="title">
       {{item.tyTitle}}
      </div>
        <nuxt-link :to="{path:'/wusercenter/editarticle/articledetails',query: setQuery({id: item.id})}">
        <div class="contentImg">
          <img :src="titleImg(item.tyTitilebg)">
        </div>
         </nuxt-link>

        <div class="contentTime">
          {{time(item.tyUpdatetime)}}
          <div class="manipulate" v-if="none[index]">
            <div class="posBox">
            <ul>
              <li @click="editarticle(item.id)" class="edits">编辑</li>
              <li @click="sm(item.id)" class="setSm">设为私密</li>
              <li class="sc" @click="delArticle(item.id, index)" style="color: #FFAA01;">删除</li>
            </ul>
            <i class="posss icon iconfont icon-sanjiaoxing"></i>
            </div>
          </div>
          <div class="menu">
            <i class="icon iconfont selfopusicon icon-browse"><span>{{item.tyHits}}</span></i></span>
            <i class="icon iconfont selfopusicon icon-good"><span>{{item.artlike}}</span></i></span>
            <i @click="edit(index)" class="icon-code icon selfopusicon iconfont"></i>
          </div>
        </div>
    </div>
  </div>
  <div class="loader" v-show="!loadshow" style="margin-top: 20px;"> </div>
  <div class="t_align" v-show="articleList.result.length == 0 && loadshow">无更多数据了...</div>
  <pagination @changePagination="changePagination" v-show="articleList.result.length != 0 && articleList.totalPages > 1" :pagination="articleList.totalPages" :nowActive="articleList.pageNo"></pagination>
  <articlefooter></articlefooter>
  <msg ref="msg"></msg>
  <confirm v-if="show" @confirm="confirm"></confirm>
  </div>
</template>

<script>
import articlefooter from "~/components/editarticle/articlefooter";
import pagination from "~/components/pagination";
import {getClassify, getartclassList, delartclass, seachuserarticle, userarticleeditor, myuserarticleacount,  userpiceditor, delUserArticle} from "~/apis/editarticle.js";
import arr from "~/static/js/outeditarticle.js";
import { mapGetters } from "vuex";
import wechat from "~static/mixins/wechat.js";
import setQuery from "~static/mixins/setQuery.js";
import setImgUrl from "~static/mixins/setImgUrl.js"
import { zimgdel } from "~/apis/user.js";
import { returnTime } from "~static/js/util";
import appConf from "~/app.config";
import keepUserOnline from '~static/js/keepUserOnline'
import url from "url";
import imgarr from '~static/js/outgroompic.js'

export default {

  data() {
    return {
      classify: [],
      articleList: {result: [], totalPages: 1, pageNo: 1},
      none: [],
      res: {userpic: {dreamUrl: ''}},
      topbg: arr["a"],
      activeClassifyId: -1,
      touchstep: [], //移动步数
      trans: 0,
      transi: false,
      totalWidth: 0,
      pull: 1, //拉力
      onewidth: 0,
      allwidth: 0,
      show: false,
      activeId: -1,
      index: -1,
      avatar: appConf.preview.search_avatar,
      userInfo:{},
      loadshow: false
    }
  },
  head (){
    return {
      script: [
        {src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'}
      ]
    }
  },
  mixins: [wechat, setQuery,setImgUrl],
  beforeCreate() {
    this.$store.dispatch("setFooterShow", false);
  },
  async mounted() {

    await keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
    })

    let list;
    let secondList;
    let articleList = {};
    let none = [];
    let articleInfo;
    await Promise.all([
      getClassify(this.userInfo.dreamUsername),
      getartclassList(this.userInfo.dreamUsername),
      seachuserarticle({ tyUsername: this.userInfo.dreamUsername }),
      myuserarticleacount(this.userInfo.dreamUsername)
    ])
      .then(res => {
        list = res[0].data.data.result || []; //一级分类;
        secondList = res[1].data.data.result || []; //二级分类;
        if (res[2].data.code == 2000) {
          if (!res[2].data.data.hasOwnProperty("code")) {
            articleList = res[2].data.data.artlist;
          } else {
            articleList.result = [];
          }
        } else {
          articleList.result = [];
        }
        list.push.apply(list, secondList);
        list.unshift({ dreamTitle: "全部文章", id: -1 });
        none.length = articleList.result.length;
        none.fill(false);
        if (res[3].data.code == 2000) {
          if (!res[3].data.data.hasOwnProperty("code")) {
            articleInfo = res[3].data.data;
          } else {
            articleInfo = res[3].data.data.data;
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
      if (!articleInfo.userpic) {
        articleInfo.userpic = ''
      }
      this.classify = list
      this.articleList = articleList
      this.loadshow = true
      this.none = none
      this.res = articleInfo
    if (process.BROWSER_BUILD) {
      let sw = screen.width > 640 ? 640 : screen.width;
      this.onewidth = sw / 5;
      this.totalWidth = sw - this.onewidth * this.classify.length;
      this.allwidth = this.onewidth * this.classify.length;
//    if (res.userpic == '') {
//    res.userpic.dreamUrl = arr['a']
//  }
    }
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
      this.wechatInit(url)
  },
//async created (){},
  methods: {
    touch(event) {
      this.touchstep.push(event.changedTouches[0].pageX);
      let clientX = Number(
        this.touchstep[this.touchstep.length - 1] -
        this.touchstep[this.touchstep.length - 2]
      );
      //      clientX = this.trans > 0? clientX/5 : clientX
      if (this.trans > 0 || this.trans < this.totalWidth) {
        clientX = clientX / this.pull;
        this.pull = this.pull + 0.4;
      }
      //      clientX = this.trans < this.totalWidth ? clientX/5 : clientX
      this.trans = clientX + this.trans;
      this.$refs.trans.style.transform = "translateX(" + this.trans + "px)";
    },
    touchstart(event) {
      this.touchstep.push(event.changedTouches[0].pageX);
    },
    touchend() {
      this.touchstep = [];
      if (this.trans > 0 || this.trans < this.totalWidth) {
        this.transi = true;
        this.pull = 1;
        if (this.trans > 0 || this.allwidth < screen.width) {
          this.trans = 0;
        } else {
          this.trans = this.totalWidth;
        }
        this.$refs.trans.style.transform = "translateX(" + this.trans + "px)";
        setTimeout(() => {
          this.transi = false;
        }, 300);
      }
    },
  async  changeslide(index, id) {
      let json;
      if (id == -1) {
        json = { tyUsername: this.userInfo.dreamUsername };
      } else {
        json = { tyUsername: this.userInfo.dreamUsername, Classid: id };
      }
      // seachuserarticle(json)
      //   .then(res => {
      //     if (res.data.code == 2000) {
      //       this.articleList = res.data.data.artlist;
      //     } else {
      //       let data = { result: [] };
      //       this.articleList = data;
      //     }
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
      let result = await seachuserarticle(json)
      let arListResult = {}
      if(result.data.code==2000){
          if(!result.data.data.hasOwnProperty('code')){
              this.articleList = result.data.data.artlist
          }else{
            arListResult = {result:[]}
            this.articleList = arListResult
          }
      }else{
        arListResult = {result:[]}
        this.articleList = arListResult
      }
      let tra = this.onewidth * index;
      this.$refs.bottomslide.style.transform = "translate(" + tra + "px)";
      this.activeClassifyId = id;
    },
    titleImg(src) {
//    let src = option.src;
      if (src.indexOf('http://www.wvmp360.com') != -1 && src.indexOf('mingpianzxxt/userArticle/') == -1 && !/^\[.*\]$/.test(src)) {
      	return src;
      }
      if (/^\[.*\]$/.test(src)) {
        let src1 = JSON.parse(src)[0].src;
        if (/^\.\/img\/\d\.jpg$/.test(src1)) {
          let arr = src1.match(/\d/)[0]
          return imgarr.arr[Number(arr)]
        }
        if (src1.indexOf('_nuxt') != -1) {
          return src1;
        }
        if (src1.indexOf('http') != -1) {
          return src1;
        }
        return '/' + src1 + '?w=auto&h=auto&q=1';
      }
      if(src.indexOf('http://www.wvmp360.com/mingpianzxxt/userArticle/') != -1) {
        let arr = src.split('"src":"')[1]
       if (/^\.\/img\/\d\.jpg$/.test(arr)) {
          let arrs = arr.match(/\d/)[0]
          return imgarr.arr[Number(arrs)]
        }
        if(arr.indexOf('http') == -1) {
          return '/' + arr + '?w=auto&h=auto&q=1'
        } else {
          return arr
        }
      }
      return imgarr.arr[0]

    },
    time(t) {
      let ti = returnTime(t, "-", false);
      return ti;
    },
    edit(i) {
      if (this.none[i]) {
        this.$set(this.none, i, false);
      } else {
        this.none.fill(false);
        this.$set(this.none, i, true);
      }
    },
    delArticle(i, index) {
      this.activeId = i;
      this.index = index;
      this.none.fill(false);
      this.show = true;
    },
    confirm() {
      delUserArticle(this.activeId).then(res => {
        if (res.data.code == 2000) {
          this.articleList.result.splice(this.index, 1);
          this.$refs.msg.state("刪除成功");
        } else {
          this.$refs.msg.state("刪除失败,请重试");
        }
      });
      this.show = false;
    },
    sm(id) {
      let data = { tyState: 2, id: id, tyUsername: userInfo.dreamUsername };
      userarticleeditor(data).then(res => {
//      console.log(res);
      });
    },
    editarticle(id) {
      this.query.id = id;
      this.$router.push({
        path: "./edit",
        query: this.query
      });
    },
    choice() {
      this.choiceImg().then(res => {
        //          this.topbg = res.localId[0]
        var oldsrc = this.res.userpic.dreamUrl;
        this.$set(this.res.userpic, "dreamUrl", res.localId[0]);
        this.wxuploads(res.localIdAndserverId).then(data => {
          let src = "";
          for (let i in data) {
            src = data[i];
          }
          let arr = { dreamUserid: this.userInfo.dreamUsername, dreamUrl: src };
          if (this.res.userpic.id != -1) {
            arr.id = this.res.userpic.id;
          } else if (this.asas != "") {
            arr.id = this.res.userpic.id;
          }
          userpiceditor(arr).then(res => {
            if (res.data.code == 2000) {
              if (this.res.userpic.id == -1) {
                myuserarticleacount(this.userInfo.dreamUsername).then(res => {
                  this.asas = this.res.userpic.id;
                });
              } else {
                zimgdel(oldsrc);
              }
              this.$msg("修改成功");
            } else {
              this.$msg("修改失败");
            }
          });
        });
      });
    },
    // 设置背景图片地址;
    setBGImg(userPic) {
      let imgUrl;
      if (typeof userPic == "{}") {
        let bgUrl = userPic.dreamUrl;
        imgUrl = this.setImgUrl({src:bgUrl,w:'auto',h:'auto',q:0,address:this.topbg})
      } else {
        imgUrl = this.topbg;
      }
      return imgUrl;
    },
    async changePagination(i) {
      let json = { tyUsername: this.userInfo.dreamUsername, index: i }
      if (this.activeClassifyId != -1) {
        json.Classid = this.activeClassifyId
      }
            let result = await seachuserarticle(json)
      let arListResult = {}
      if(result.data.code==2000){
          if(!result.data.data.hasOwnProperty('code')){
              this.articleList = result.data.data.artlist
          }else{
            arListResult = {result:[]}
            this.articleList = arListResult
          }
      }else{
        arListResult = {result:[]}
        this.articleList = arListResult
      }
    }
  },
  components: {
    pagination,
    articlefooter,
    msg: require("~/components/msg/msg"),
    confirm: require("~/components/msg/confirm")
  },
  computed: {
    ...mapGetters({
//    userInfo: "getUserInfo",
      query: "get_router_query"
    })
  }
};
</script>

<style>
@import "~static/css/wusercenter/img.css";
@import "~static/css/editarticle/selfopusmap.css";
</style>
