<template lang="html">
<div class="" ref="warrp" style="height: 100vh">
  <p>如果生成的海报出现内容不完整，可能是因为网络通信的问题，请您耐心多刷新几遍,长按图片3秒松手，再保存图片到手机，就可以用来发朋友圈啦！</p>
  <canvas id="canvas">您的浏览器是不是太落后了一点-_-!</canvas>
  <loading v-show="loading" style="left: 50%;right: 50%;margin-left: -1.25em;margin-top:-1.25em;"></loading>
</div>
</template>

<script>
import {getLytcDetail} from '~/apis/travel'
import {setBanner} from '~static/js/util'
import http from '~/apis/http.js'
import wechat from "~/static/mixins/wechat.js";
import appConf from '~/app.config.js'
import {getTyApi} from '~/static/js/tyApi.js'
import expired from "~/static/mixins/expired.js";
import keepUserOnline from '~static/js/keepUserOnline'
const querystring = require("querystring");
export default {
  async asyncData({query}) {
    let travelRes = await getLytcDetail(query.id)

    return {
      travelRes: travelRes,
      query: query,
      loading: true
    }
  },
  fetch({store}) {
    store.commit('SET_FOOTER_SHOW', false)
  },
  data() {
    return {
      pictures: [],
      currentPic: '',
      dateString: '',
      canvasWidth: 0,
      canvasHeight: 0,
      userInfo: {}
    }
  },
  mounted() {
    this.setCavinsPic()
    this.fillCanvas()
  },
  async created(){
    let data = await keepUserOnline(this.$route, 'user')
    this.userInfo = data.user
  },
  mixins: [wechat, expired],
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
      title: `${this.travelRes.dreamTitle}-旅行-值享云名片`, // 分享标题
      desc: `${this.travelRes.dreamDescription}`, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.travelRes.dreamDefaultpicurl.indexOf('http') != -1 ? this.travelRes.dreamDefaultpicurl : 'http://' + window.location.host + '/' + this.travelRes.dreamDefaultpicurl, // 分享图标
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
    this.expired(this.userInfo.dreamETime)
  },
  methods: {
    computedDate() {},
    radom(min, max) {
      return min + Math.round(Math.random() * (max - min));
    },
    cutString(str, leng) { //按字节长度截取字符串，返回substr截取位置
      var len = str.length,
        tlen = len,
        nlen = 0;
      for (var x = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
          if (nlen + 2 < leng) {
            nlen += 2;
          } else {
            tlen = x;
            break;
          }
        } else {
          if (nlen + 1 < leng) {
            nlen += 1;
          } else {
            tlen = x;
            break;
          }
        }
      }
      return tlen;
    },
    getTrueLength(str) { //获取字符串的真实长度（字节长度）
      var len = str.length,
        truelen = 0;
      for (var x = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
          truelen += 2;
        } else {
          truelen += 1;
        }
      }
      return truelen;
    },
    setCavinsPic() {
      this.pictures = setBanner(this.travelRes.dreamContent9)
      let num = this.radom(0, this.pictures.length - 1)
      console.log(num);
      this.currentPic = this.pictures[num]
    },
    monthSize(month) {
      let year = new Date()
        .getFullYear();
      let oDate = new Date(year, month, 0);
      return oDate.getDate();
    },
    getDays() {
      let dataString = ''
      let str = this.travelRes.dreamTime1
      if (typeof str !== 'string') {
        dataString = '';
      }
      var strArr = str.split('-');
      if (strArr.length == 1) {
        dataString = "一日游";
      } else if (strArr.length == 2) {
        var time1 = strArr[0],
          year1, month1, day1, years, month2, days, months;
        year1 = time1.split('年');
        //.log(year1)
        month1 = year1[1].split('月');
        // console.log(month1)
        day1 = month1[1].split('日');
        var time2 = strArr[1],
          year2 = time2.split('年'),
          day2;
        if (year2.length > 1) {
          month2 = year2[1].split('月');
        } else {
          month2 = year2[0].split('月');
        }
        day2 = month2[1].split('日');
        console.log(day1, month1, year1, "=====", day2, month2, year2);
        days = ((day2[0] - day1[0]) > 0) ? (day2[0] - day1[0] + 1) + "日" : ((this.monthSize(month1[0]) + day2[0] * 1) - day1[0] * 1 + 1) + '日';
        months = (day2[0] - day1[0]) > 0 ?
          ((month2[0] * 1 - month1[0] * 1) > 0 ? month2[0] * 1 - month1[0] * 1 + "月" : "") :
          (((month2[0] * 1 - 1) - month1[0] * 1) > 0 ? (month2[0] * 1 - 1) - month1[0] * 1 + "月" : '');
        years = (month2[0] - month1[0]) > 0 ? ((year2[0] - year1[0]) >= 0) ? year2[0] - year1[0] + "年" : '' : ((year2[0] * 1 - 1 - year1[0]) > 0) ? year2[0] * 1 - 1 - year1[0] + "年" : "";

        dataString = years + months + (days) + "游";
      }
      return dataString
    },
    creatBgImg(ctx, canvasWidth, canvasHeight) {
      return new Promise((resolve, reject) => {
        var bgImg = require("~static/img/travel/lytc-canvas.jpg");
        var img = document.createElement('img');
        img.src = bgImg;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);
          resolve(ctx)
        }
      })
    },
    createBanner(ctx, canvasWidth, canvasHeight) {
      return new Promise((resolve, reject) => {
        var imgBanner = this.currentPic.indexOf('http') != -1 ? '/api/hostImg?url='+encodeURIComponent(this.currentPic) : this.currentPic
        var banner = document.createElement('img');
        banner.src = imgBanner;
        banner.onload = function () {
          ctx.drawImage(banner, 0, 0, banner.width, banner.height, 0, canvas.height * 0.19, canvas.width, canvas.height * 0.333);
          resolve(ctx)
        }
      })
    },
    createEwm(ctx, canvasWidth, canvasHeight) {
      return new Promise((resolve, reject) => {
        //二维码
        let queryStr = querystring.stringify(this.query)
        var url = 'http://' + window.location.host + '/travel/travelDetail?' + queryStr + '&is_share=1';
        let params = {
          method: 'Qrcode.createQrcode',
          content: url,
          size: 10,
          background_color: 'fff',
          color: '000',
          opcity: 1,
          resource: 1
        }
        let data = getTyApi(params)

        // console.log(api)
        var imgEvm = document.createElement('img');
        let evmImage = '/api/hostImg?url=' + encodeURIComponent(data)
        //创建一个二维码对象
        imgEvm.src = evmImage;
        //console.log($(imgEvm).appendTo('body'))
        imgEvm.onload = function () { //
          ctx.drawImage(imgEvm, 0, 0, imgEvm.width, imgEvm.height, canvasWidth * 0.7, canvasHeight * 0.7586, canvasWidth * 0.25, canvasWidth * 0.25);
          resolve(ctx)
        }
      })
    },
    createUserImg(ctx, canvasWidth, canvasHeight) {
      return new Promise(async(resolve, reject) => {
        var userImg = document.createElement('img'),
          userImgSrc = '';
        if (this.userInfo.dreamImg == null || this.userInfo.dreamImg == "") {
          userImgSrc = "http://xzg168.weix360.cn/images/wv1.jpg"
        } else {
          // console.log(cardData.dreamImg);
          userImgSrc = appConf.site_url + '/' + this.userInfo.dreamImg;
        }

        if (userImgSrc.indexOf('http') != -1) {
          userImgSrc = '/api/hostImg?url=' + encodeURIComponent(userImgSrc)
        }

        userImg.src = userImgSrc
        userImg.onload = function () {
          //console.log(userImg)
          //var pattern = ctx.createPattern(userImg, "no-repeat");
          // 绘制一个圆
          ctx.globalCompositeOperation = 'source-atop';
          ctx.arc(canvasWidth * 0.0533 + canvasWidth * 0.185333 / 2, canvasHeight * 0.78 + canvasWidth * 0.185333 / 2, canvasWidth * 0.195333 / 2, 0, 2 * Math.PI);
          ctx.clip();
          //ctx.fillStyle = pattern;
          //ctx.fill();
          ctx.drawImage(userImg, 0, 0, userImg.width, userImg.height, canvasWidth * 0.045, canvasHeight * 0.75, canvasWidth * 0.25, canvasWidth * 0.25);
          resolve(ctx)
        }
      })
    },
    createText(ctx, canvasWidth, canvasHeight) {
      return new Promise((resolve, reject) => {
        //标题
        var title = this.travelRes.dreamTitle;
        ctx.font = canvasWidth * 0.064 + "px 微软雅黑 bold";
        ctx.fillStyle = "#fff";
        // ctx.fillText("aaaaaa", 50,50);
        for (var i = 1; this.getTrueLength(title) > 0; i++) {
          var tl = this.cutString(title, 30);
          ctx.textAlign = "center";
          ctx.globalCompositeOperation = 'source-atop';
          console.log(title.substr(0, tl)
            .replace(/^\s+|\s+$/, ""))
          ctx.fillText(title.substr(0, tl)
            .replace(/^\s+|\s+$/, ""), canvasWidth / 2, i * 95 + 25);
          title = title.substr(tl);
          console.log(title)
        }
        ctx.font = canvasWidth * 0.048 + "px 微软雅黑  bold";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.fillText(this.travelRes.dreamTime1, 20, canvasHeight * 0.18 + canvasHeight * 0.333 + canvasHeight * 0.05);

        var time2 = this.getDays();
        // console.log(time2)
        //价格
        // 会员价格
        ctx.fillText(this.travelRes.dreamPrice, canvasWidth * 0.786, canvasHeight * 0.639);
        ctx.font = canvasWidth * 0.1067 + "px 微软雅黑  bold ";
        ctx.fillStyle = "#0a5f94";
        ctx.fillText(this.travelRes.dreamCurrencySymbol + this.travelRes.dreamPrice2, 20, canvasHeight * 0.688);
        ctx.font = canvasWidth * 0.048 + "px 微软雅黑  bold ";
        ctx.fillStyle = "#999";
        ctx.fillText('/人', (canvasWidth - canvasWidth * 0.69), canvasHeight * 0.69);
        ctx.fillStyle = "#6AC5F4";
        ctx.fillText(time2, (canvasWidth - canvasWidth * 0.55), canvasHeight * 0.69);
        ///用户昵称
        var name = this.userInfo.dreamFullname;
        ctx.font = canvasWidth * 0.048 + "px 微软雅黑  bold ";
        ctx.fillStyle = "#0a5f94";
        ctx.fillText(name, canvasWidth * 0.29, canvasHeight * 0.825);
        ctx.font = canvasWidth * 0.0385 + "px 微软雅黑  bold ";
        ctx.fillStyle = "#000";
        var mobile = this.userInfo.dreamMobile;
        ctx.fillText(mobile, canvasWidth * 0.29, canvasHeight * 0.825 + 75);
        resolve(ctx)
      })
    },
    async fillCanvas() {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      canvas.width = 1150;
      canvas.height = Math.floor(1150 / 0.647);

      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height

      canvas.style.display = 'none';
      await this.creatBgImg(ctx, canvas.width, canvas.height)
      await this.createBanner(ctx, canvas.width, canvas.height)
      await this.createEwm(ctx, canvas.width, canvas.height)
      await this.createText(ctx, canvas.width, canvas.height)
      await this.createUserImg(ctx, canvas.width, canvas.height)

      var img = new Image()
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = canvas.toDataURL()
      var _this = this
      img.onload = function () {
        _this.$refs.warrp.appendChild(img)
        _this.loading = false
      }
    }
  },
  components: {
    'loading': require('~components/common/loading')
  }
}
</script>

<style lang="css" scoped>
</style>
