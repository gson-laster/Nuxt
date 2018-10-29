<template>
  <div class="chat-box">
    <div class="hint" v-show="isShow"><p>点击头像显示TA的微信二维码</p> <span class="close"@click="isShow=false">x</span></div>
    <div class="chat-list">
      <ul>
        <li v-for="(item,index) in chatDetail" :key="index" class="item" :class="item.role==1?'sender':'receiver'">
          <div class="avatar">
            <img :src="item.avatar" alt="">
          </div>
          <div class="content">
            <p v-html="item.content"></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="message-send">
      <div class="send-img"> <img src="~static/img/wusercenter/img_icon.png" alt=""></div>
      <div class="input"><input type="text" placeholder="在此输入消息..." v-model="messageContent"></div>
      <input type="button" value="发送" @click="sendMsg()">
    </div>
  </div>
</template>
<script>
import appConf from "~/app.config.js";
export default {
  data() {
    return {
      chatDetail: [
        {
          name: "阿里里",
          avatar: appConf.book_mark,
          content:"我对你做的直销品牌很感兴趣，可以留个联系方式吗？自我介绍一下，我叫阿里里我对你做的直销品牌很感兴趣，可以留个联系方式吗？自我介绍一下，我叫阿里里",
          role: 1
        },
        {
          name: "阿里里",
          avatar: appConf.book_mark,
          content: "我对你做的直销品牌很感兴趣，可以留个联系方式吗？自我介绍一下，我叫阿里里",
          role: 0
        },
        {
          name: "阿里里",
          avatar: appConf.book_mark,
          content:`<img src=`+appConf.test+`>`,
          role: 0
        },
      ],
      messageContent: '',
      isShow:true
    };
  },
  created(){
    console.log(appConf.test);
  },
  methods: {
    sendMsg(){
      socket.emit('message', {to: 18170873407, content: this.messageContent})
    }
  },
  mounted(){
    socket.on('message', (data) => {
      // 服务器数据
      console.log('message Data', data);
    })
  }
};
</script>

<style scope>
.chat-box{
  position: fixed;
}
.hint{
  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 6;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 640px;
}
.hint p{
  height:100%;
  line-height: 30px;
}
.hint .close{
  font-size: 14px;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.chat-list {
  margin: 0 10px;
}
.chat-list .item{
  margin-bottom: 40px;
  margin-top:10px;
}
.chat-list .avatar {
  width: 40px;
  height: 40px;
  float: left;
}
.chat-list .item.receiver .avatar{
  float:right;
}
.chat-list .avatar img {
  width: 100%;
  min-height: 100%;
  border-radius: 4px;
}
.chat-list .item .content {
  margin-left: 60px;
  max-width: 250px;
  padding:6px;
  background-color: #fff;
  border-radius:6px;
  border: 1px solid #eee;
}
.chat-list .item.receiver .content{
  margin-right: 60px;
  background-color: #80c269;
  color: #fff;
}
.chat-list .item.receiver .content p::after{
  content: "";
  position: absolute;
  right:-24px;
  top:8px;
  background: url('~static/img/wusercenter/reciver_icon.png') no-repeat ;
  width: 20px;
  height: 20px;
  z-index:2;

}
.chat-list .item .content p {
  position: relative;
}
.chat-list .item.sender .content p::after {
  content: "";
  position: absolute;
  left:-18px;
  top:8px;
  background: url('~static/img/wusercenter/sender_icon.png') no-repeat ;
  width: 20px;
  height: 20px;
   z-index:2;
}
.message-send{
  padding: 0 10px;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 50px;
  bottom: 0;
  left: 50%;
  width: 100%;
  box-sizing: border-box;
  max-width: 640px;
  overflow: hidden;
  transform: translate3d(-50%,0,0);
}
.message-send .send-img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #aaa;
  display: flex;
  justify-content:center;
  align-items: center;
}
.message-send .send-img  img{
 width: 24px;
}
.message-send .input{
  flex-grow: 1;
  margin: 0 8px;
}
.message-send .input input[type="text"]{
  display: block;
  padding:6px;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}
.message-send input[type="button"]{
  padding: 10px;
  color: #fff;
  background-color: #ffaa00;
  border-radius: 4px;
}
</style>
