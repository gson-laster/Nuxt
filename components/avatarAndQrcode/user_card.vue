<template>
  <div class="container">
    <div class="wrapper">
       <div class="top">
        <div class="left"><img :src="setImgUrl({src:  userInfo ? userInfo.dreamImg : ''})" alt=""></div>
        <div class="right">
          <p class="name">专业顾问:{{userInfo ? userInfo.dreamFullname : ''}}</p>
          <a ref="telphone" :href="'tel:' + setPhone(userInfo)" class="content">{{setPhone(userInfo)}}</a>
          <!-- <span v-html="telphone"></span> -->
        </div>
    </div>
    <div class="bottom">
      <ul class="item-container">
        <li class="item yellow iconfont icon-businesscard" @click="gotoCard"><span>我的名片</span></li>
        <li class="item red iconfont icon-icon60wechatcard2x" @click="chatOnline"><span>在线聊天</span></li>
        <li class="item green iconfont icon-erweima" @click="showChatQrcode"><span>微信二维码</span></li>
      </ul>
    </div>
    </div>
    <div class="shadow" v-show="isShow">
      <div class="shadow-container">
      <div class="qrcode">
        <img :src="setImgUrl({src: userInfo ? userInfo.dreamEwm : '',w:130,h:130,p:1})" alt="">
      </div>
      <div class="hint" v-html="text">
      </div>
      <div class="close" @click="close">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
import setImgUrl from "~static/mixins/setImgUrl";
export default {
  mixins: [setImgUrl],
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    query:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      text:'长按二维码自动识别<br/>微信交流沟通',
      isShow:false,
      telphone: '<a href="tel:' + this.setPhone(this.userInfo) + '" class="content">'+ this.setPhone(this.userInfo)+'</a>'
    };
  },
  created(){
//  this.$refs.telphone.href = 'tel:' +
  },
  methods:{
    gotoCard(){
      this.$router.push({ path: '/newcard', query: this.query})
    },
    chatOnline(){
      this.$msg('功能正在紧张开发哦~~')
    },
    showChatQrcode(){
      this.isShow = true
    },
    close(){
      this.isShow = false
    },
    setPhone(userInfo) {
      if(userInfo && userInfo.dreamMobile && userInfo.dreamMobile != '' && userInfo.dreamMobile != null) {
        return userInfo.dreamMobile
      }else if(userInfo && userInfo.dreamMobile2 && userInfo.dreamMobile2 != '' && userInfo.dreamMobile2 != null){
        return userInfo.dreamMobile2
      }else {
        return ''
      }
    }
  }
};
</script>
<style scoped>
img{
  width: auto;
}
.container {
  width: 100%;
  background-color: #e3e3e3;
  overflow-x: hidden;
}
.container .shadow{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
}
.container .shadow .shadow-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  background-color: #fff;
  border-radius: 10px;
}
.container .shadow .hint{
  color: #ff0000;
  text-align: center;
  padding: 6px 0 ;
}
.container .shadow .qrcode{
  padding: 10px 20px;
}
.container .shadow .close{
  text-align: center;
  height: 34px;
  line-height: 34px;
  border-top: 1px solid #ccc;
  color: #333;
}
.wrapper {
  margin: 10px;
  background-color: #fff;
}
.wrapper .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e3e3e3;
}
.wrapper .right .name{
  color: #333;
}
.wrapper .right .content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #888;
  margin-top:8px;
}

.container .wrapper .left {
  width: 70px;
  height: 70px;
  background-color: #eeeeee;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 50%;
}
.container .wrapper .right {
  flex: 1;
  padding-left: 12px;
}
.bottom .item-container{
  display: flex;
}
.bottom .item-container .item{
  width: 33.3%;
  background-color: #f7f7f7;
  height: 40px;
  box-sizing: border-box;
  border-right: 1px solid #e3e3e3;
  font-size:26px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom .item-container .item span{
  font-size: 16px;
  margin-left: 4px;
  margin-top: -2px;
}

.bottom .item-container .item.red{
  color:#ec6941;
  font-size: 20px;
}
.bottom .item-container .item.yellow{
  color:#ffaa00;
}
.bottom .item-container .item.green{
  color:#22ac38;
  font-size:16px;
}
.bottom .item-container .item:last-of-type{
  border-right: none;
}
.container .wrapper .left img {
  border-radius: 50%;
  width: 100%;
}
</style>
