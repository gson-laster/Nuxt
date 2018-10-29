<template>
  <div class="box vmall-shopcar" style="background-color:#fff">
    <top-bar :title="title"></top-bar>
    <div class="short-container">
    <div class="OrderFailure">
    <h3 :class="smile">{{content}}</h3>
    </div>
    <div class="OrderFailure_an" >
     <nuxt-link :to="{path:actionPath,query:{uid:query.uid,brand:query.brand}}">
        {{action}}
     </nuxt-link>
    </div>
    </div>
  </div>
</template>

<script>
import topBar from "~components/vmall/topBar";
export default {
  async asyncData({query,store}){
    return{
      query:query
    }
  },
  components: {
    topBar
  },
  computed:{
    title(){
      return this.query.type==1?'提交订单':'余额不足'
    },
    smile(){
      return this.query.type==1?'smile':''
    },
    content(){
      return this.query.type==1?'感谢您的购买':'余额不足，请先充值'
    },
    action(){
      return this.query.type==1?'查看订单':'V币充值'
    },
    actionPath(){
      return this.query.type==1?'/vmall/orders':'/vmall/short'
    }
  }
};
</script>
<style scoped>
  .vmall-shopcar .OrderFailure{
    margin: 20px 20px 0;
    overflow: hidden;
  }
 .vmall-shopcar .OrderFailure_an{
    margin: 0 auto 80px;
    width: 120px;
    color: #FFF;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #FFAA01;
    border-radius: 5px;
    font-size: 20px;
  }
 .vmall-shopcar .OrderFailure h3{
    background: url('~static/img/vmall/short.png') no-repeat center top; 
    margin: 20px auto 0;
    width: 300px;
    text-align: center;
    height: 70px;
    font-size: 22px;
    overflow: hidden;
    padding-top: 200px;
  }
  .vmall-shopcar .short-container{
    background-color: #fff;
  }
  .vmall-shopcar .OrderFailure_an a{
    color: #FFF;
  }
  .vmall-shopcar .OrderFailure h3.smile{
    background: url('~static/img/vmall/smile_face.png') no-repeat center top;
  }
</style>
