<template lang="pug">
.card-user-profile
  .newcard-userInfo.clearfix
    // 申请名片
    .newcard-profile
      nuxt-link(:to="{path:'/register',query:setQuery()}", v-show='isApplyShow')
        .apply-card
          i.iconfont.icon-emoji
          span.text 申请名片
      .user-avatar-container
        .user-avatar(@click='showDialog')
          img(:src="(isPreview || userInfos.dreamImg == null || userInfos.dreamImg =='')?avatar:setImgUrl({src:userInfos.dreamImg,w:120,h:120,q:0})", alt='')
        .qrcode.iconfont.icon-icon-QR-code
      .user-desc
        h3.title {{nickName}}
        .text {{comments}}
      // <div class="collect icon iconfont icon-like">收藏</div>
    .userLink(ref='userLinkLen', v-show='linkWarrpStatus')
      ul.linkContainer(ref='navEle')
        li(v-for='(item,index) in userMenu', v-bind:key='index', :style="{width: itemLiWidth + 'px'}")
          nuxt-link(:to='{path:item.dreamUrl,query:setQuery()}', v-if='index!==userMenu.length-1')
            .icon.iconfont(:class="['icon-'+item.dreamCss,colorTheme]")
            p {{item.dreamMenuname}}
          a(v-else='', :href='item.dreamUrl')
            .icon.iconfont(:class="['icon-'+item.dreamCss,colorTheme]")
            p {{item.dreamMenuname}}
    .left.icon.iconfont.icon-rights(style='transform:rotate(180deg)', @click.stop='toLeft')
    .right.icon.iconfont.icon-rights(@click.stop='toRight')
  user-profile(:userInfos="userInfos", :colorTheme="colorTheme", :isPreview="isPreview")
</template>

<script>
import setQuery from '~static/mixins/setQuery'
import setImgUrl from '~static/mixins/setImgUrl'
import userProfile from './userProfile'
import {card_nav} from '~/config/userMenu'
import { editorusermenu, getusermenu } from "~/apis/usermenu"
import appconf from '~/app.config'
export default {
  name: 'new-card-tempalte',
  props: {
    isApplyShow: {
      default: false,
      type: Boolean
    },
    userInfos: {
      require: true,
      type: Object
    },
    isPreview: {
      default: false,
      type: Boolean
    },
    templateId: {
      require: true,
      type: Number
    },
    colorTheme: {
      require: true,
      type: String
    }
  },
  data () {
    return {
      linkWarrpStatus: false, // 图标状态,
      // colorTheme: "", //颜色主题
      itemLiWidth: 0, // 图标Item
      touchStep: [],
      transX: 0,
      distanceX: 0,
      isTransition: false,
      navKickBackTimer: [],
      userMenu: [],
      avatar: appconf.preview.search_avatar,
    }
  },
  mixins: [setQuery, setImgUrl],
  computed: {
    /**
     * 组合计算nickname
     * @return {[type]} [description]
     */
    nickName() {
			return this.isPreview ||this.userInfos.dreamFullname == "" ||this.userInfos.dreamFullname == null ? "" :this.userInfos.dreamFullname;
		},
    /**
     * 组合计算个人说明
     * @return {[type]} [description]
     */
    comments() {
      return this.isPreview ||this.userInfos.dreamContent == "" ||this.userInfos.dreamContent == null ?"" :this.userInfos.dreamContent;
    },
  },
  created () {
    this.fetchUserMenu() // 获取user menu
  },
  beforeMount () {
    this.initItemStyle() // 样式
  },
  mounted () {
    const navEle = this.$refs.navEle
    navEle.addEventListener('touchstart', this.touchStart, false)
    navEle.addEventListener('touchmove', this.touchMove, false)
    navEle.addEventListener('touchend', this.touchEnd, false)
  },
  methods: {
    showDialog () {
      this.$emit('showDialog', true)
    },
    /**
     * 获取用户的图标数据
     * @return {[type]} [description]
     */
    fetchUserMenu () {
      getusermenu({dreamUsername: this.userInfos.dreamUsername}).then(async userMenuRes => {
        if (!userMenuRes.hasOwnProperty('code')) {
          if (userMenuRes.length>0) {
            // 已经存了新模板图标;显示新模板图标;
            this.userMenu = userMenuRes
          } else {
            //  没有新模板图标;显示配置默认的;并且发送批量图标至数据库;
            this.userMenu = card_nav
            let data = {}
            let userMenuArr = []
            this.userMenu.map((value,index)=>{
              userMenuArr.push({
                dreamCss: value.dreamCss,
                dreamMenuname: value.dreamMenuname,
                dreamUrl: value.dreamUrl,
                dreamUsername: this.userInfos.dreamUsername,
                dreamZid: 666   //修改页面排序图标
              })
            })
            let sendUserMenu = await editorusermenu({str:JSON.stringify(userMenuArr)})  //返回修改的条数;
            if(sendUserMenu){
              console.log('存储新图标成功')
            }else{
              this.userMenu =appconf.card_nav
              console.log('存储新图标失败')
            }
          }
        }
      }).catch(e => {
        console.log('获取名片错误', e);
      })
    },
    /**
     * 清除定时器
     * @return {[type]} [description]
     */
    clearTimeout () {
      for (var i = 0; i < this.navKickBackTimer.length; i++) {
        clearTimeout(this.navKickBackTimer[i])
        this.navKickBackTimer.splice(i, 1)
      }
    },
    /**
     * 初始化图标的样式
     * @return {[type]} [description]
     */
    initItemStyle () {
      let winWidth = 0
  		winWidth = window.innerWidth;
  		if (winWidth > 640) {
  			winWidth = 640;
  		}
  		this.itemLiWidth = (winWidth - 36) / 4;
  		this.linkWarrpStatus = true
    },
    /**
     * touch start 记录信息
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    touchStart (e) {
      this.touchStep.push(e.changedTouches[0].pageX);
    },
    /**
     * 移动计算偏移距离
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    touchMove (e) {
      this.$refs.navEle.style.transition = "";
			this.isTransition = false;
			this.touchStep.push(e.changedTouches[0].pageX);
			this.distanceX =
				this.touchStep[this.touchStep.length - 1] -
				this.touchStep[this.touchStep.length - 2];
			this.transX += this.distanceX;
			this.$refs.navEle.style.transform = "translateX(" + this.transX + "px)";
    },
    /**
     * 完成移动
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    touchEnd (e) {
      // 清除定时器
      this.clearTimeout()
      //获取navEle的长度;
      let moveLen = this.getMoveUlLen();
      this.touchStep = [];
      this.isTransition = true;
      if (this.distanceX < 0) {
        this.transX = -moveLen;
      } else {
        this.transX = 0;
      }
      //根据图标个数来计算是否可以再向左拉动;
      if (this.userMenu.length <= 4) {
        this.transX = 0;
      }
      this.$refs.navEle.style.transform = "translateX(" + this.transX + "px)";
      this.$refs.navEle.style.transition = "all ease-in-out 0.3s";
      this.navKickBack();
    },
    /**
     * 往左移
     * @return {[type]} [description]
     */
		toRight() {
      if (this.userMenu.length <= 4) return;
      if (this.transX > -this.getMoveUlLen()) {
        this.transX = -this.getMoveUlLen();
        this.$refs.navEle.style.transform = "translateX(" + this.transX + "px)";
        this.$refs.navEle.style.transition = "all ease-in-out 0.5s";
      }
      this.navKickBack();
		},
		/**
     * 往右移动
     * @return {[type]} [description]
     */
		toLeft() {
      if (this.transX == 0) return;
      this.transX = 0;
      this.$refs.navEle.style.transform = "translateX(" + this.transX + "px)";
      this.$refs.navEle.style.transition = "all ease-in-out 0.5s";
      let timer = setTimeout(() => {
        this.$refs.navEle.style.transition = "";
      }, 500);
      this.navKickBackTimer.push(timer)
    },
    /**
     * 获取整个容器的长度
     * @return {[type]} [description]
     */
    getMoveUlLen() {
      let moveUl = this.$refs.navEle.getBoundingClientRect();
      let right = moveUl.right + 10,
      left = moveUl.left + 10;
      return right - left;
		},
    /**
     * 设置导航回弹
     * @return {[type]} [description]
     */
		navKickBack() {
      if (this.transX < 0) {
        let timer = setTimeout(() => {
          this.$refs.navEle.style.transform = "translateX(0px)";
        }, 5000);
        this.navKickBackTimer.push(timer)
      }
    },
  },
  components: {
    userProfile
  },
  /**
   * 销毁实例时
   * @return {[type]} [description]
   */
  destroyed () {
    for (var i = 0; i < this.navKickBackTimer.length; i++) {
      clearTimeout(this.navKickBackTimer[i])
    }
  }
}
</script>

<style lang="css" scoped>
.cardIndex .newcard-userInfo .userLink{
  margin: 10px 8px 0;
}
.newcard-profile {
  min-height: 50px;
  overflow: hidden;
}
</style>
