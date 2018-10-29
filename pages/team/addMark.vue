<template>
  <div class="box">
    <div class="add-mark-header">
      <p class="name">备注名</p>
      <input type="text" class="text" value="上来的积分上来的积分看">
    </div>
    <div class="add-mark-bottom">
     <p class="name">标签</p>
     <div class="content">
       <span @click="addMark">+添加新标签</span>
       <!-- <span class="active">添加新标签</span>
       <span>标签</span>
       <span>添加</span> -->
       <span v-for="(item,index) in tabList" :key="index" :class="{active:activeIndex==index}"  @click="activeIndex=index">{{item.name}}</span> 


     </div>
    </div>
    <div class="add-mark-btn" @click="save">
      <a href="javascript:;">确定</a>
    </div>
    <mark-layer :isShow="isLayerShow" @closeShow="closeShow" v-show="isLayerShow"></mark-layer>
  </div>
</template>
<script>
import markLayer from '~components/team'
export default {
  data() {
    return {
      isLayerShow: false,
      tabName: "",
      tabList:[
        {name:'朋友'},
        {name:'合伙'},
        {name:'同事'},
        {name:'互联网'},
      ],
      activeIndex:-1
    };
  },
  components:{
    markLayer
  },
  methods: {
    addMark() {
      this.isLayerShow = true
      this.tabName = ""
    },
    cancel() {
      this.isLayerShow = false
      this.tabName =""
    },
    confirm() {
      this.isLayerShow = false
      if(!this.tabName){
         this.$msg('请输入标签名称')
         return
      } 
      this.tabList.push({name:this.tabName})
    },
    save(){
      this.$msg('您要保存的标签是:'+this.tabName)
    },
    closeShow(bool){
      this.isLayerShow = bool
    }
  }
};
</script>

<style scoped>
.box {
  padding-bottom: 0px;
}
.add-mark-header {
  width: 100%;
  margin-top: 10px;
}
.add-mark-header .name {
  font-size: 14px;
  margin: 10px 6px;
  color: #999;
}
.add-mark-header .text {
  font-size: 14px;
  width: 100%;
  background-color: #fff;
  height: 36px;
  line-height: 36px;
  padding-left: 8px;
  box-sizing: border-box;
}
.add-mark-bottom .name {
  margin: 10px 6px;
}
.add-mark-bottom .content {
  padding: 0 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.add-mark-bottom .content span {
  font-size: 14px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 8px;
  margin-top: 10px;
  margin-left: 10px;
}
.add-mark-bottom .content span:first-of-type {
  border: 1px dotted #ccc;
  color: #999;
}
.add-mark-bottom .content span.active {
  border: 1px solid #ffaa00;
  color: #ffaa00;
}
.add-mark-btn {
  position: fixed;
  width: 100%;
  bottom: 10px;
}
.add-mark-btn a {
  display: block;
  margin: 0 8px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background-color: #ffaa00;
  border-radius: 4px;
  bottom: 10px;
  left: 0px;
}

.laeyr-content-top input[type="text"] {
  padding: 6px;
  box-sizing: border-box;
  font-size: 14px;
  text-indent:8px;
}

</style>
