<template>
  <div v-show="boxshow" class="box clock">
      <section>
        <div class="topimg">
        <img src="~static/img/clock/15269_wx.png"/>
        <div class="now">
          <ul>
            <li>
              <p>北京时间</p>
              <p>{{date.h}}:{{date.i}}:{{date.s}}</p>
            </li>
            <li>
              <p>星期{{date.day}}</p>
              <p>{{date.y}}-{{date.m}}-{{date.d}}</p>
            </li>
          </ul>
        </div>
      </div>
      </section>
      <section>
        <div class="content">
            <div class="yijing">
              已参与<span>{{list.totalCount}}人</span>
            </div>
          <div class="imglist">
            <ul>
              <li v-for="item in list.result"><img :src="item.dreamImg"/></li>
            </ul>
          </div>
          <div class="clear">

          </div>
          <div v-show="type == 1" >
              <div  class="btn">
              今日已打卡,今日排名{{myslef.dreamWorldranking}}

            </div>
                 <div class="fenxiangtu">
              早安分享图已发送到微信公众号, 或<span @click="newSend">重新发送一次</span>
            </div>
          </div>
           <div @click="isClock" v-show="type == 2">
               <div  style="background: #749ED8;"  class="btn">
             <img src="~static/img/clock/touch.png"/> 点击打卡
            </div>
                      <div class="fenxiangtu">
              每天早晨<span style="color: #FE1414;">5点-10点</span>参与打卡, 可获得早安分享图一张
            </div>
           </div>
           <div v-show="type == 3">
                      <div style="background: #AAAAAA;" class="btn">
              <img src="~static/img/clock/cry.png"/>距离打卡时间还剩: {{still.h}}时{{still.m}}分{{still.s}}秒
            </div>
                      <div class="fenxiangtu">
              每天早晨<span style="color: #FE1414;">5点-10点</span>参与打卡, 可获得早安分享图一张
            </div>
           </div>
       <div class="clockattention">
       	请先关注公众号，绑定微信，早安分享图才能正常推送。
       </div>
        </div>
      </section>
      <section>
        <div class="record">
          <div class="recordlist"><div class="flex1">您已连续打卡<span>{{myslef.dreamContinuity}}天</span></div><div class="flex2"></div><div class="flex3">打卡总数<span>{{myslef.dreamDkcount}}天</span></div></div>
          <div class="recordlist"><div class="flex1">最高连续纪录<span>{{myslef.dreamTopranking}}天</span></div><div class="flex2"></div><div class="flex3">最早纪录<span>{{getHis(myslef.dreamEarliest)}}</span></div></div>
          <nuxt-link :to="{path: './clock/seachrank', query: query}">
            <div class="chakan">
              查看今日伙伴打卡排行
            </div>
          </nuxt-link>

        </div>
      </section>
      <section class="rankinglistbg">
          <div class="ranktitle">
            今日<span>世界</span>打卡排行榜
          </div>
        <div class="rankinglist">
          <div class="flex">
            <div class="f1 paddnone">排行</div>
            <div class="f2">早起者</div>
            <div class="f3"></div>
            <div class="f4">打卡时间</div>
            <div class="f5"></div>
          </div>
          <div v-for="(l, index) in list.result" class="flex">
            <div class="f1">
              <img v-if="(index + 5 * (indexs -1))== 0" src="~static/img/clock/first.png"/>
              <img v-else-if="(index + 5 * (indexs -1)) == 1" src="~static/img/clock/second.png"/>
              <img v-else-if="(index + 5 * (indexs -1)) == 2" src="~static/img/clock/third.png"/>
              <span v-else>{{(index + 5 * (indexs -1)) + 1}}</span>
            </div>
            <div class="f2"><img :src="setImgUrl({src: l.dreamImg})"/></div>
            <div class="f3">{{l.dreamFullname}}</div>
            <div class="f4">{{getHis(l.dreamUpdatetime)}}</div>
            <div class="f5" @click="lick(l.dreamUsername, index, l.dreamLikes)"><p>{{l.dreamLikes}}</p><img src="~static/img/clock/good.png"/></div>
          </div>
          <div class="t_align" style="border-bottom: 1px solid #EEEEEE; border-top: 1px solid #EEEEEE;" v-if="list.result ? list.result.length == 0 : false">
          	没有更多数据了...
          </div>
        </div>
        <pagination v-if="list.totalPages != 1" @changePagination="changePagination" :pagination="list.totalPages" :nowActive="list.pageNo"></pagination>
      </section>
      <img class="sss"/>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import imglist from '~static/js/outSharingdiagram.js'
import {editorpunchcard, punchcardlike, getpunchacard, punchcardlist, getpunchacardone, wxQrcode, sendwxmsg} from '~/apis/user.js'
//import { returnTime } from "~static/js/util";
import setImgUrl from '~static/mixins/setImgUrl'
import {img2base64} from '~static/js/canvas'
import pagination from '~components/pagination'
import keepUserOnline from '~static/js/keepUserOnline'

//import share from '~pages/clock/_sharingdiagram.vue'
  export default {
//  type 1 已打卡, 2 打卡, 3在打卡时间范围外
    async asyncData({store}){
      let still = {h: '', m: '', s: '', chaju: ''}
      let list = {totalPages: '', result: '', pageNo: 1}
     // list.result = list.result.reverse()
      return {
        self: '',
        list: list,
        myslef: {
          dreamContinuity:0,
          dreamDkcount:0,
          dreamDknum:0,
          dreamEarliest:0,
          dreamEwm:"",
          dreamFullname:"",
          dreamImg:"",
          dreamLikes:0,
          dreamTeamranking:0,
          dreamTopranking:0,
          dreamUpdatetime:'',
          dreamUsername:'',
          dreamWorldranking:0,
        },
        type: '',
        still: still,

        canvas: '',
//      context: '',
        multiple: 2, // 放大倍数
       // ratio: 750 / 1334, //长宽比
      //  base: '',  //canvas => base64
        //path: a[0],
        everytext: [
          '关于自己的生活，我和你都不是读者，而是作者。至少结局，还是能自己说了算的。',
          '按照自己认为美丽的方式活下去。',
          '不要输给雨，不要输给风，也不要输给暴风雨，不管什么时候都笑容不断，我想成为那种坚强而美丽的东西',
          '即使被绝望击垮，我们也绝不能忘记：正如有光的地方就会有影一样，有影的地方也必定会有光。绝望的颜色越是浓重，在那里，一定会有光芒耀眼的希望。',
          '愿你的厨房有烟火，客厅有笑容，卧室有拥抱，爱人跟你一蔬一饭，你跟爱人一颦一笑。',
          '幸福是一种能力。好的人生并非外求，而是内修而成。每个人都可以通过整合和管理自己的生命资源，最大化自己的人生价值，达到个人与社会的双重满意。',
          '接纳自己是成长的第一步。当你读懂了情绪背后的需求，你就能找到自己成长的方向。厌倦需要变化，焦虑需要学习，失落需要价值。',
          '四季，不可能只有春天，生活，更不可能全是圆满。',
          '人生，不要预支明天的烦恼；生活，不要自寻烦恼。',
          '努力和上进，不是为了做给别人看，是为了不辜负自己，不辜负此生。',
          '身材不好就去锻炼没钱就努力去赚，永远别把窘境迁怒于别人，你唯一可以抱怨的，只有不够努力的自己！',
          '因为相信，所以看见，因为看见，所以不凡！',
          '勇者无惧，强者无敌',
          '你现在找的每个借口，都会阻碍前行的道路',
          '无须借光，你本就是一个光源，可以温暖周围的一切人与物！',
          '不积跬步，无以至千里；不积小流，无以成江海。',
          '白日不到处，青春恰自来，苔花如小米，也学牡丹开！',
          '没有特别幸福，请先特别努力！',
          '比起貌美，智慧才是让你更闪耀的特质！',
          '我喜欢和你在一起，因为你有正能量！',
          '人生只有一次，专注于自己的内心，活出自己的样子，才算没有白活！',
          '今天的生活是由三年前决定的，但是你今天还过着和三年前一样的生活，三年后你还是一样的过着。',
        ],
        postParamer: {},
        boxshow: false

      }
    },
      data() {
        return {
          date: {
            y: '',
            m: '',
            d: '',
            h: '',
            i: '',
            s: '',
            day: ''
          },
          day: ['一', '二', '三', '四', '五', '六', '日'],
//        type: 2
          morningterm: {
            5: '你已经接近神的级别!',
            6: '早睡早起身体好',
            7: '早睡早起身体好',
            8: '你是早上八九点钟的太阳',
            9: '晚上该早点放下手机关灯睡觉啦!'
          },
          indexs: 1,
          userInfo: {},
          timer: ''
        }
      },
      mixins: [setImgUrl],
      fetch ({store}) {
        store.state.footerShow = false
      },
      async created() {
        await keepUserOnline(this.$route, 'user').then(res => {
          this.userInfo = res.user
        })
        let user = this.userInfo
          let type = 2;
          let res =await getpunchacard({dreamUsername: user.dreamUsername})
          res = res.data.hasOwnProperty('data') ? res.data.data : []
          let myslef =await getpunchacardone({dreamUsername: user.dreamUsername})
          console.log(myslef.data)
          if (myslef.data.data.hasOwnProperty('id')){
            this.myslef = myslef.data.data
          }
          var still = {h: 0, m: 0, s: 0}
            var d = new Date();
            let h = d.getHours();
            var chaju = 0;
            if(h < 5){
              chaju = ( 5 * 60 * 60 ) - (h * 60 * 60 + d.getMinutes() * 60 + d.getSeconds())
            } else {
              chaju = ( 24 * 60 * 60 ) - (h * 60 * 60 + d.getMinutes() * 60 + d.getSeconds()) + ( 5 * 60 * 60 )
            }
            still.h = Math.floor(chaju / 3600)
            still.m = Math.floor((chaju % 3600) / 60)
            still.s = (chaju % 3600) % 60
            still.chaju = chaju
          if (res.hasOwnProperty('code')) {
            h >= 5 && h < 10 ? (type = 2) : (type = 3)
          } else {
            type = 1;
          }
          this.still = still
          this.type = type;
          let list = await punchcardlist()
          this.list = list.data.data.hasOwnProperty('code') ? list.data.data.data : list.data.data
          this.boxshow = true

          this.setTime();
        this.timer = setInterval(() => {
          this.date.s = this.num(++ this.date.s)
          this.date.s == 60 ? ( this.date.s = '00', this.date.i = this.num(++ this.date.i)) : this.date.s;
          this.date.i == 60 ? ( this.date.i = '00', this.date.h = this.num(++ this.date.h), this.date.h >= 5 && this.date.h < 10 ? (this.type = 2) : (this.type = 3)) : this.date.i;
          if (this.date.h == 24) this.setTime();
          this.daojishi()
        }, 1000)
      },
      methods: {
        setTime: function() {
          let date = new Date();
          this.date.h = this.num(date.getHours());
//        this.date.h >= 5 && this.date.h < 10 ? (this.type = 2) : (this.type = 3)
          this.date.y = date.getFullYear();
          this.date.m = this.num(date.getMonth() + 1);
          this.date.d = this.num(date.getDate());
          console.log()
          let getDay = date.getDay() == 0 ? 7 : date.getDay();
          this.date.day = this.day[getDay - 1];
          this.date.i = this.num(date.getMinutes());
          this.date.s = this.num(date.getSeconds());
        },
        num: function (num) {
          return num < 10 ? '0' + num : num;
        },
        daojishi(){
          this.still.chaju --;
          this.still.chaju = this.still.chaju == 0 ? (24 * 60 * 60) : this.still.chaju;
          this.still.h = Math.floor(this.still.chaju / 3600)
          this.still.m = Math.floor((this.still.chaju % 3600) / 60)
          this.still.s = (this.still.chaju % 3600) % 60
        },
        isClock(){
          editorpunchcard({dreamUsername: this.userInfo.dreamUsername, dreamImg: this.userInfo.dreamImg, dreamEwm: this.userInfo.dreamEwm, dreamFullname: this.userInfo.dreamFullname}).then(res => {
            if (res.data.code == 2000) {
              this.$msg(this.morningterm[new Date().getHours()], 4000)
              getpunchacardone({dreamUsername: this.userInfo.dreamUsername}).then(myslef => {
//              console.log(myslef)
                this.$set(this, 'myslef', myslef.data.data)
              	this.type = 1;
//            this.shows = true
                //  this.shareshow = true
//              	this.$refs.shares.fasongtupian();
                this.createCanvas()
              })
              punchcardlist().then(list => {
                 list = list.data.data.hasOwnProperty('code') ? list.data.data.data : list.data.data
               //  list.result = list.result
                 this.list = list;
               })
            }
          })
        },
        newSend(){
          if(this.type == 1){
            this.createCanvas();
            this.$msg('发送成功')
          } else {
           this.$msg('您还未打卡')
          }
        },
        getHis(t){
          if(t){
            let d = new Date(t);
            let h = this.num(d.getHours())
            let m = this.num(d.getMinutes())
            let i = this.num(d.getSeconds())
            return `${h}:${m}:${i}`
          }
        },
        lick(dreamUsername, i, like){
          punchcardlike({dreamUsername: dreamUsername}).then(res => {
            console.log(res.data.code)
            if (res.data.code == 2000) {
            	this.$msg('点赞成功')
            	this.$set(this.list.result[i], 'dreamLikes', ++ like)
            }
          })
        },
        async changePagination(index){
          //this.list = punchcardlist({index: index}).data.data
            let list = await punchcardlist({index: index})
            this.indexs = index
            list = list.data.data.hasOwnProperty('code') ? list.data.data.data : list.data.data
           // list.result = list.result.reverse()
            this.list = list
        },
        async drawimg(src){
          if (src.indexOf('_nuxt') == -1 && src.indexOf('http') != -1) {
            src = await img2base64('/api/hostImg?url='+encodeURIComponent(src))
          }
          return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = function(){

              resolve( img );

            }
          }).catch(err =>{
            console.log(err)
          })
        },
      splitText(w, t, size, fn){
        let section = Math.ceil(t.length * size / w); // 一共几部分
        let everysection =  Math.floor(w / size);
        for (let i = 0; i < section; i ++) {
          fn(t.slice((i * everysection), ((i + 1) * everysection)))
        }
      },
      drawBottomText(t1, t2, ct, h, o, t, tian){
        let w = Math.floor((o - (t1.length * 16 * this.multiple)) / 2) + (o * t)
        ct.fillStyle = '#888888';
        ct.font = "500 "+ Number(this.multiple * 16) +"px Arial";
        ct.fillText(t1, w, h)
        ct.fillStyle = '#EC6941';
        ct.font = "600 "+ Number(this.multiple * 30) +"px Arial";
        ct.fillText(t2, w, h + 40 * this.multiple)
        if (t != 2) {
          ct.strokeStyle = '#CCCCCC';
          ct.lineWidth = this.multiple
          ct.moveTo(o * (t + 1), h - 10 * this.multiple)
          ct.lineTo(o * (t + 1), h + 42 * this.multiple)
          ct.stroke()
        }
        if (tian) {
          ct.font = "500 "+ Number(this.multiple * 16) +"px Arial";
          ct.fillText(tian, w + t2.length * 18 * this.multiple, h + 38 * this.multiple)
        }
      },
      fasongtupian(){
       sendwxmsg(this.postParamer).then(res => {
          console.log(res)
       })
      },
      getEwm(){
        return new Promise((resolve, reject) => {
          wxQrcode({content: this.userInfo.dreamUsername}).then(r => {
            resolve(r.picurl)
          }).catch(e => {
            console.log(e)
          })
        })
       // return res.picurl
      },

        createCanvas(){

          var multiple = this.multiple;
          getpunchacardone({dreamUsername: this.userInfo.dreamUsername}).then(info => {
            var infos = info.data.hasOwnProperty('data') ? info.data.data : []
            this.getEwm().then(ewm => {
              let screenW = (screen.width > 640 ? 640 : screen.width) * multiple;
              this.canvas = document.createElement('canvas');
              this.canvas.width = screenW;
              this.canvas.height = 10000 * multiple;
              let ct = this.canvas.getContext('2d');
              ct.fillStyle = '#fff';
              ct.fillRect(0, 0, this.canvas.width, this.canvas.height);

          this.drawimg(imglist.list[Math.floor(Math.random() * imglist.list.length)]).then(res => {
            let imgheight = screenW * res.height / res.width;
            ct.drawImage(res, 0, 0, screenW, imgheight)
            ct.beginPath();
            ct.fillStyle = '#EC6941';
            let rectHeigth = 24 * multiple;
            let rectWidth = 76 * multiple;
            ct.arc(screenW / 2 - rectWidth / 2, imgheight, rectHeigth / 2, 0.5 * Math.PI, 1.5 * Math.PI)
            ct.fill()
            ct.closePath();
            ct.beginPath()
            ct.arc(screenW / 2 + rectWidth / 2, imgheight, rectHeigth / 2, 1.5 * Math.PI, 0.5 * Math.PI)
            ct.fill()
            ct.closePath();
            ct.beginPath();
            ct.fillRect(screenW / 2 - rectWidth / 2, imgheight - rectHeigth / 2, rectWidth, rectHeigth)
            ct.fill()
            ct.closePath();
            ct.font = "500 "+ Number(multiple * 16) +"px Arial";
            ct.fillStyle = '#FFFFFF';
            imgheight = imgheight + 5 * multiple;
            ct.fillText('早安心语', screenW / 2 - 2 * 16 * multiple, imgheight)
            ct.fillStyle = '#333333';
            imgheight = imgheight + 40 * multiple;
            this.splitText(screenW - 80 * multiple, this.everytext[Math.floor(Math.random() * this.everytext.length)], 14 * multiple, function(res){
              ct.fillText(res, 20 * multiple, imgheight)
              imgheight = imgheight + 24 * multiple;
            })
            ct.strokeStyle = '#CCCCCC';
            ct.lineWidth = '1'
            ct.moveTo(20 * multiple, imgheight);
            ct.lineTo(screenW - 20 * multiple, imgheight);
            ct.stroke()
            this.drawimg(this.userInfo.dreamImg).then(res => {
              imgheight = imgheight + 25 * multiple;
              let bigH = 100 * res.height / res.width * multiple;
              ct.drawImage(res, 20 * multiple, imgheight, 100 * multiple, bigH)
              this.drawimg(ewm).then(res => {
                let TimgH = 100 * res.height / res.width * multiple;
                bigH = bigH > TimgH ? bigH : TimgH ;
                ct.drawImage(res, screenW - 120 * multiple, imgheight, 100 * multiple, TimgH)
                ct.fillStyle = '#333333';
                ct.font = "600 "+ Number(multiple * 16) +"px Arial";
                imgheight = imgheight + 40 * multiple;
                ct.fillText(this.userInfo.dreamFullname, 130 * multiple, imgheight)
                ct.fillStyle = '#A2A2A2';
                ct.font = "500 "+ Number(multiple * 16) +"px Arial";
                imgheight = imgheight + 35 * multiple;
                ct.fillText(this.userInfo.dreamMobile || this.userInfo.dreamMobile2 || this.userInfo.dreamUsername || '', 130 * multiple, imgheight)
                let nowDate = new Date(infos.dreamUpdatetime), month = nowDate.getMonth() + 1, Dat = nowDate.getDate(), minutes = nowDate.getMinutes(), hours = nowDate.getHours();
                imgheight = bigH - 40 * multiple + imgheight;
                let oneWidth = screenW / 3;
                this.drawBottomText(`${month}月${this.num(Dat)}日早起`, `${this.num(hours)}:${this.num(minutes)}`, ct, imgheight, oneWidth, 0)
                this.drawBottomText('连续早起天数', ''+infos.dreamContinuity, ct, imgheight, oneWidth, 1, '天')
                this.drawBottomText('早起打卡总数', ''+infos.dreamDkcount, ct, imgheight, oneWidth, 2, '天')
                ct.fillStyle = '#DDDDDD';
                imgheight += (60 * multiple);

                ct.fillRect(0, imgheight, screenW, 40 * multiple);
                ct.fill()
             //   imgheight += bottomW;
                imgheight += (60 * multiple);
                this.drawimg(imglist.logo).then(res => {
                  let texts = '长按识别二维码, 参与早起打卡';
                  let wi = (screenW - (texts.length * 14 * multiple)) / 2
                  ct.drawImage(res, wi - 15 * multiple, imgheight - 52 * multiple, 24 * multiple, 24 * multiple)
                  ct.fillStyle = '#888888'
                  ct.fillText(texts, wi + 15 * multiple, imgheight - 35 * multiple)
                  ct.fill()
                  imgheight -= (20 * multiple)
                 let imgData = ct.getImageData(0, 0, screenW, imgheight);
                 let canvas2 = document.createElement('canvas');
                 canvas2.width = screenW;
                 canvas2.height = imgheight;
                 let ct2 = canvas2.getContext('2d')
                 ct2.putImageData(imgData, 0, 0);
                 let base64 = canvas2.toDataURL("image/jpeg", 1.0);
                  // document.querySelector('.ssss').src = base64;
                  this.postParamer = {dreamUsername: this.userInfo.dreamUsername, type: 'img',file: base64, forever: false}
                  this.fasongtupian()
                })
              })
            })
          })
          })
        })
        }
      },
      computed: {
      ...mapGetters({
        query: 'get_router_query'
      })
    },
    destroyed(){
      clearInterval(this.timer)
    },
    components: {
      pagination
    }
  }
</script>

<style>
  @import '~static/css/clock/index.css';
  @import '~static/css/clock/both.css';
</style>
