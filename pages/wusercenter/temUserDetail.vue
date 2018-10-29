<template>
  <div class="box">
      <div class="team-user-detail-header">
        <div class="avatar">
          <img src="~static/img/test.jpg" alt="">
          </div>
        <div class="text">
          <p class="name"><span>彩虹</span><img src="~static/img/wusercenter/v_icon.png" alt=""></p>
          <p class="position">销售总监</p>
        </div>
      </div>  
      <div class="team-user-detail-set" @click="gotoMark()">
        <p>设置备注和标签</p>
        <span class="icon iconfont icon-rights"></span>
      </div>
      <div class="team-user-detail-user">
         <ul>
           <!-- <li class="item"><p class="left">企业名称</p><span class="right">向恒科技</span></li> -->
          <li v-for="(item,index) in details" :key="index" class="item">
            <p class="left">{{item.title}}</p>
            <span class="right">{{item.value}}</span>
          </li>
         </ul>
      </div>
      <div class="team-user-detail-bottom">
        <ul class="bottoms">
          <li>TA的名片</li>
          <li>加TA微信</li>
          <li>和TA聊天</li>
        </ul>
      </div>
  </div>
</template>

<script>
import keepUserOnline from '~static/js/keepUserOnline'
import setQuery from "~static/mixins/setQuery.js"
export default {
  mixins:[setQuery],
  data() {
    return {
      details: [
        { title: "企业名称", value: "向恒科技邮箱公司" },
        { title: "手机号", value: "17779741367" },
        { title: "微信", value: "1779741637" },
        { title: "QQ", value: "91779741637" },
        { title: "邮箱", value: "1779741637@qq.com" },
        { title: "地址", value: "江西省赣州市沙河镇龙村村庙前三六九等福利时间段可是来得及可是来得及" }
      ]
    };
  },
  methods:{
    gotoMark(){
      this.$router.push({
         path: '/team/addMark',query:this.setQuery()}
      )
    }
  }
};
</script>

<style scoped>
.team-user-detail-header {
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  margin-top: 10px;
  box-sizing: border-box;
}
.team-user-detail-header .avatar {
  width: 62px;
  height: 64px;
}
.team-user-detail-header .avatar img {
  width: 100%;
  min-height: 100%;
  border-radius: 6px;
}
.team-user-detail-header .text {
  font-size: 16px;
  margin-left: 14px;
  text-align: left;
}
.team-user-detail-header .text .name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.team-user-detail-header .text .name img {
  width: 14px;
  margin-left: 6px;
}
.team-user-detail-header .text .position {
  font-size: 14px;
  margin-top: 8px;
  color: #a5a5a5;
}
.team-user-detail-set {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  box-sizing: border-box;
}
.team-user-detail-user {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
}
.team-user-detail-user .item {
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  box-sizing: border-box;
  height: 46px;
  font-size: 14px;
  line-height: 46px;
  display: flex;
  text-align: left;
  overflow: hidden;
}
.team-user-detail-user .item .left {
  width: 90px;
  color: #666666;
}
.team-user-detail-user .item .right {
  color: #333333;
}
.team-user-detail-bottom {
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.team-user-detail-bottom .bottoms {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.team-user-detail-bottom .bottoms li{
  width: 110px;
  height: 36px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  line-height: 36px;
}
.team-user-detail-bottom .bottoms li:last-of-type{
  background-color: #22ac38;
  color: #fff;
}






</style>
