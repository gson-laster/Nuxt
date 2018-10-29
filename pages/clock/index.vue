<template lang="pug">
.box.clock(style='', ref="container")
  section
    .topimg
      img(src='/_nuxt/img/15269_wx.245c592.png')
      .now
        ul
          li
            p 北京时间
            p {{dateStr.date}}
          li
            p 星期{{dateStr.week}}
            p {{dateStr.mouth}}
  section
    .content
      .yijing
        | 已参与
        span {{totalPunch}}人
      .imglist
        ul
          li(v-for="(item, $index) in userPunchList" :key="$index")
            img(:src='setImgUrl({src: item.dreamImg, w: 120, h: 120, address: require("~static/img/preview/avatar_icon.jpg")})')
      .clear
      div.punch-btn-warrp(v-show="punchStatus")
        div(v-if="punchStatus == 'finish'")
          .btn
            | 今日已打卡,今日排名{{userPunchInfo.dreamWorldranking}}
          .fenxiangtu
            | 早安分享图已发送到微信公众号, 或
            span(@touchstart="doPunchcard()") 重新发送一次
        div(v-else-if="punchStatus == 'can'")
          .btn(@touchstart="remotePunchCard()", style='background:#749ED8;')
            img(src='/_nuxt/img/touch.e1e3c64.png')
            |  点击打卡
          .fenxiangtu
            | 每天早晨
            span(style='color:#FE1414;') 5点-10点
            | 参与打卡, 可获得早安分享图一张
        div(v-else)
          .btn(style='background:#AAAAAA;')
            img(src='/_nuxt/img/cry.76e66e3.png')
            | 距离打卡时间还剩: {{residueDateStr}}
          .fenxiangtu
            | 每天早晨
            span(style='color:#FE1414;') 5点-10点
            | 参与打卡, 可获得早安分享图一张
      .clockattention
        | 请先关注公众号，绑定微信，早安分享图才能正常推送。
  section
    .record
      .recordlist
        .flex_1
          | 您已连续打卡
          span {{userPunchInfo.dreamContinuity ? userPunchInfo.dreamContinuity : ''}}天
        .flex2
        .flex_1
          | 打卡总数
          span {{userPunchInfo.dreamDkcount ? userPunchInfo.dreamDkcount : ''}}天
      .recordlist
        .flex_1
          | 最高连续纪录
          span {{userPunchInfo.dreamTopranking ? userPunchInfo.dreamTopranking : ''}}天
        .flex2
        .flex_1
          | 最早纪录
          span {{userPunchInfo.dreamEarliest ? formatDate('H:m:s', new Date(userPunchInfo.dreamEarliest)) : ''}}
      a(href='/clock/seachrank')
        .chakan
          | 查看今日伙伴打卡排行
  section.rankinglistbg
    .ranktitle
      | 今日
      span 世界
      | 打卡排行榜
    .rankinglist
      loadmore(:bottom-method="loadBottom", @bottom-status-change="handleBottomChange", :bottom-all-loaded="allLoaded",:autoFill="false", :bottomPullText="bottomPullText", ref="loadmore")
        .flex-warrp
          .f1.paddnone 排行
          .f2 早起者
          .f3
          .f4 打卡时间
          .f5
        .flex-warrp(v-for="(item, $index) in userPunchListForList", :key="$index+item.id")
          .f1(style="align-self:normal") {{$index > 2 ? $index + 1 : ''}}
          .f2
            img(:src='setImgUrl({src: item.dreamImg, w: 120, h: 120, address: require("~static/img/preview/avatar_icon.jpg")})')
          .f3 {{item.dreamFullname}}
          .f4 {{formatDate('H:m:s', new Date(item.dreamUpdatetime))}}
          .f5(style="align-self:normal")
            span.add-like(@touchstart.self="addLike($index, $event)") {{item.dreamLikes}}
      .add-like-animate(ref="addLike")
        span +1
  canvas-element(:userInfo="userInfo", :punchInfo="userPunchInfo" ref="canvasWarrp")
  toast(:msg="loadingText", :show="loadingStatus")
  .img-warrp(style="display:none; opacity: 0", ref="imgWarrp")
    .shadow
    div.close-warrp(@touchstart="closeImg()")
      i.close
    .img-block
      //- img(src="~static/img/test_clock.jpg")
</template>

<script>
import html2canvas from 'html2canvas'
import {dateFormat, addClass, removeClass, declassify} from '~static/js/util'
import setImgUrl from '~static/mixins/setImgUrl'
import {getDayPrevAfter, getDateByNumber} from '~static/util/date'
import loadmore from '~components/common/loadmore'
import canvasElement from '~components/clock/canvasElement'
import keepUserOnline from '~static/js/keepUserOnline'
import {editorpunchcard, punchcardlike, getpunchacard, punchcardlist, getpunchacardone, wxQrcode, sendwxmsg} from '~/apis/user.js'
import config from '~/config/clock'
import Toast from '~components/common/toast'
/**
 * 获取倒计时时间
 * @param  {[type]} dateObj [description]
 * @return {[type]}         [description]
 */
function getLastTime (dateObj) {
  const punchCardTime = config.punchCardTime // 打卡时间
  const hours = dateObj.getHours()
  const tomorrow = getDayPrevAfter(dateObj, 'after', 1) // 获取一天以后的日期对象
  tomorrow.setHours(punchCardTime.start)
  tomorrow.setMinutes(0)
  tomorrow.setSeconds(0)
  const distans = (tomorrow.getTime()*1 - dateObj.getTime() * 1) / 1000
  const residueDate = getDateByNumber(distans)
  return residueDate.hours + '时' + residueDate.minutes + '分' + residueDate.seconds + '秒'
}

export default {
  async asyncData ({query}) {
    let userPunchList, allLoaded, hasNext, userPunchListForList, dreamUsername, totalPunch = 0, dateStr, residueDateStr
    let userPunchListData = await punchcardlist({pageSize: 10})
    userPunchListData = userPunchListData.data
    userPunchList = userPunchListData.code == 2000 ? userPunchListData.data.result : []
    userPunchListForList = userPunchList
    hasNext = userPunchListData.data.hasNext
    totalPunch = userPunchListData.data.totalCount
    allLoaded = hasNext ? false : true
    dreamUsername = declassify(query.uid, 2)
    const dateObj = new Date()
    const dateString = dateFormat('yyyy-M-d H:m:s w', dateObj)
    let [mouth, date, week] = dateString.split(' ')
    residueDateStr = getLastTime(dateObj)
    dateStr = {
      mouth,
      date,
      week
    }
    return {
      dateStr,
      residueDateStr,
      userPunchListForList, // 排名列表
      userPunchList,        // 优先显示列表
      allLoaded,            // 是否已经加载完了
      hasNext,               // 是否还有下一页
      dreamUsername,
      totalPunch
    }
  },
  head () {
    return {title: '早起打卡'}
  },
  data () {
    return {
      dateStr: { // 时间字符
        date: '',
        week: '',
        mouth: ''
      },
      residueDateStr: '', // 剩余时间字符
      timer: [], // 定时器集合
      listParams: { // 列表请求参数集合
        index: 1,
        pageSize: 10
      },
      bottomStatus: '', // 底部加载当前状态
      bottomPullText: '上拉加载更多', // 加载更多底部文字
      userInfo: {}, // 当前用户信息
      punchStatus: false, // 打开状态 can(可以打卡), pending(未打卡等待)，finish（完成打卡），finishPending(完成等待)
      userPunchInfo: {}, // 当前用户打卡信息
      loadingText: '',
      loadingStatus: false
    }
  },
  async beforeCreate () {
    const userData = await keepUserOnline(this.$route, 'user')
    this.userInfo = userData.user
    this.getUserPunchInfo() // 获取打卡信息和设置打卡状态
    this.dateStr = this.changeTime();
    let timer = setInterval(() => this.dateStr = this.changeTime(), 1000)
    this.timer.push({type: 'interval', timer: timer})

  },
  mixins: [setImgUrl],
  methods: {
    /**
     * 关闭图片
     * @return {[type]} [description]
     */
    closeImg () {
      const $imgElement = this.$refs.imgWarrp
      removeClass($imgElement, 'fadeIn')
      addClass($imgElement, 'fadeOut')
      let timer = setTimeout(() => {
        $imgElement.style.display = 'none'
      }, 1000)
      this.timer.push({type: 'timeout', timer: timer})
    },
    /**
     * 操作打卡
     * @return {[type]} [description]
     */
    doPunchcard(){

      this.loadingText = "正在创建打卡哦~~"
      this.loadingStatus = true
      // 创建canvas
      const canvas = document.createElement('canvas');
      const scaleBy = 2;
      const $element = this.$refs.canvasWarrp.$el
      const width = $element.offsetWidth;
      const height = $element.offsetHeight;
      const $imgElement = this.$refs.imgWarrp
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;

      canvas.style.width = width * scaleBy + 'px';
      canvas.style.height = height * scaleBy + 'px';
      canvas.getContext("2d").scale(scaleBy, scaleBy);
      const canvas2Image = require('~static/js/canvas2image.js')()
      html2canvas($element, {
          letterRendering: true,
          canvas,
          onrendered: (canvas) => {
              var context = canvas.getContext('2d');
              // 【重要】关闭抗锯齿
              context.mozImageSmoothingEnabled = false;
              context.webkitImageSmoothingEnabled = false;
              context.msImageSmoothingEnabled = false;
              context.imageSmoothingEnabled = false;
              // $element.style.display = 'none'
              // canvas is the final rendered <canvas> element
              // canvas2Image.convertToImage(canvas, width* scaleBy, height* scaleBy,'jpg')
              $imgElement.style.display = 'block'
              removeClass($imgElement, 'fadeOut')
              addClass($imgElement, 'animated fadeIn')

              $imgElement.querySelectorAll('.img-block')[0].appendChild(canvas2Image.convertToImage(canvas, canvas.width, canvas.height,'jpg'))

              let imgRes = document.querySelector('.img-warrp img')

              this.loadingStatus = false

              this.sendWecahtMsg({dreamUsername: this.userInfo.dreamUsername, type: 'img', file: imgRes.src, forever: false})

          }
      });
    },
    /**
     * 远程打卡
     * @return {[type]} [description]
     */
    remotePunchCard () {

      // 向服务器打卡
      const date = new Date()
      const hours = date.getHours()

      // 在时间区间内，并且没有打过卡
      if (hours >= config.punchCardTime.start && hours < config.punchCardTime.end && this.punchStatus == 'can') {
        editorpunchcard({dreamUsername: this.userInfo.dreamUsername, dreamImg: this.userInfo.dreamImg, dreamEwm: this.userInfo.dreamEwm, dreamFullname: this.userInfo.dreamFullname}).then(res => {
          if (res.data.code == 2000) {
            this.$msg(config.morningTips[new Date().getHours()], 4000)
            this.getUserPunchInfo() // 更新打卡当前用户信息
            this.doPunchcard() // 创建并发送卡片
            // 伪造一条当前用户的打卡信息到列表,下次刷新自动填充
            const _current_item = {
              dreamImg: this.userInfo.dreamImg,
              dreamFullname: this.userInfo.dreamFullname,
              dreamUpdatetime: Date.now(),
              dreamLikes: 0,
              dreamUsername: this.userInfo.dreamUsername
            }

            this.userPunchListForList.push(_current_item)
          }
        })
      }
    },
    /**
     * 发送微信图片
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    sendWecahtMsg (options) {
      sendwxmsg(options).then(res => {
        if(res.data.code == 2000) {
          let hour = new Date().getHours()
          this.$msg('发送成功')
        }else {
          this.$msg('无法发送,可以直接保存图片分享哦~')
        }
      }).catch(e=>{
        console.log(e);
      })
    },
    /**
     * 当前用户打卡信息
     * @return {Promise} [description]
     */
    async getUserPunchInfo () {
      // 获取当前用户打卡信息
      let userPunchInfo = await getpunchacardone({dreamUsername: this.dreamUsername})
      userPunchInfo = userPunchInfo.data
      this.userPunchInfo = !userPunchInfo.data.code ? userPunchInfo.data : {}
      // 获取今日是否打卡确定打开状态
      const nowHour = new Date().getHours()
      if(nowHour >= config.punchCardTime.start && nowHour <= config.punchCardTime.end) {
        // 可以打卡
        let getpunchacardRes = await getpunchacard({dreamUsername: this.dreamUsername})
        getpunchacardRes = getpunchacardRes.data
        if(getpunchacardRes.code == 2000 && !getpunchacardRes.data.code) {
          this.punchStatus = 'finish'
          return
        }
        this.punchStatus = 'can'
      } else {
        this.punchStatus = 'pending'
      }
    },
    /**
     * 清除定时器
     * @return {[type]} [description]
     */
    clearTimer () {
      this.timer.map(v => {
        if(v.type == 'interval') {
          clearInterval(v.timer)
        }else if (v.type == 'timeout') {
          clearTimeout(v.timer)
        }
      })
    },
    /**
     * 格式化时间
     * @param  {[type]} format [description]
     * @param  {[type]} date   [description]
     * @return {[type]}        [description]
     */
    formatDate (format, date) {
      return dateFormat(format, date)
    },
    /**
     * 改变时间
     * @return {[type]} [description]
     */
    changeTime () {
      const dateObj = new Date()
      const dateStr = dateFormat('yyyy-M-d H:m:s w', dateObj)
      let [mouth, date, week] = dateStr.split(' ')
      this.punchStatus == 'pending' && this.checkNextPunch(dateObj)
      return { mouth, date, week}
    },
    /**
     * 校验下次打卡时间
     * @return {[type]} [description]
     */
    checkNextPunch (dateObj) {
      this.residueDateStr = getLastTime(dateObj)
    },
    /**
     * 监听加载更多状态改变
     * @param  {[type]} status [description]
     * @return {[type]}        [description]
     */
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    /**
     * 监听当前加载更多
     * @return {[type]} [description]
     */
    loadBottom () {
      if (this.hasNext == false) {
        this.allLoaded = true
        this.$refs.loadmore.bottomStatus = 'loaded'
        this.bottomPullText = '我是有底线的-_-'
        return
      }
      this.listParams.index++
      punchcardlist(this.listParams).then( response => {
        let ajaxData = response.data
        if(ajaxData.code == 2000) {
          this.userPunchListForList.push.apply(this.userPunchListForList, ajaxData.data.result)
          this.hasNext = ajaxData.data.hasNext
          if(this.hasNext) {
            this.$refs.loadmore.onBottomLoaded()
          } else {
            this.allLoaded = true
            this.$refs.loadmore.bottomStatus = 'loaded'
            this.bottomPullText = '我是有底线的-_-'
          }
        }else{
          this.allLoaded = true
          this.$refs.loadmore.bottomStatus = 'loaded'
          this.bottomPullText = '我是有底线的-_-'
        }
        // console.log('allLoaded', this.allLoaded, 'bottomStatus', this.$refs.loadmore.bottomStatus,'allLoadText',  this.$refs.loadmore.bottomPullText, 'hasNext', this.hasNext);
      }).catch(e => {
        console.log(e)
      });
    },
    /**
     * 点赞
     * @param {[type]} item   [description]
     * @param {[type]} $event [description]
     */
    addLike ($index, $event) {
      const h = $event.target.getBoundingClientRect().height + 16
      const $addlike =  this.$refs.addLike
      let item = this.userPunchListForList[$index];
      let top = $index * h + 50

      $addlike.style.top = top + 'px'
      $addlike.style.display = 'block'
      addClass($addlike, 'animate-addlike')
      $addlike.addEventListener('webkitAnimationEnd', function (e) {
        this.style.display = 'none'
        removeClass(this, 'animate-addlike')
      })

      // 通知远程服务器打卡点赞成功
      punchcardlike({dreamUsername: item.dreamUsername}).then(res => {
        if (res.data.code == 2000 && !res.data.data.code) {
          this.$msg('点赞成功')
          this.$set(item, 'dreamLikes', ++item.dreamLikes)
        }else {
          this.$msg('无法发送，可以直接保存图片分享哦~')
        }
      }).catch( e => {
        console.log(e);
      });
    }
  },
  components: {
    Toast,
    loadmore,
    canvasElement
  },
  destroyed () {
    this.clearTimer()
  }
}
</script>

<style lang="css" scoped>
@import '~static/css/clock/index.css';
@import '~static/css/clock/both.css';
.shadow {
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, .4);
}
.img-warrp {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.img-block {
  position: absolute;
  left: 40px;
  top: 60px;
  bottom: 40px;
  right: 40px;
}
.close-warrp {
  position: absolute;
  top: 40px;
  right: 16px;
  z-index: 10;
}
.close-warrp .close {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
}
.close-warrp .close::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.close-warrp .close::after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.close-warrp .close::before,
.close-warrp .close::after {
  border-radius: 5px 0;
}
.close-warrp .close::before, .close-warrp .close::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  top: 50%;
  left: 0;
  margin-top: -1px;
  background: #fff;
}
.punch-btn-warrp {
  min-height: 45px;
}
</style>
