<template>
  <div class="box">
    <div class="mark-manage-list">
      <a href="javascript:;"></a>
      <div class="item">
        <span class="add" @click="isShow=true" v-show="!isDoneShow">添加新标签</span>
        <span class="del" v-show="isDoneShow">删除所选</span>
        <span class="manage" @click="isDoneShow=true" v-show="!isDoneShow">管理</span>
        <span class="done" v-show="isDoneShow" @click="isDoneShow=false">完成管理</span>
      </div>
      <div class="list">
         <div class="flex">
           <label>
           <p>
             <input type="checkbox" v-show="isDoneShow">
             <span class="lbl" v-show="isDoneShow"></span>
             <span class="name">合伙人(28)</span> 
           </p>
        </label>
        <span class="edit iconfont icon-Pencil" v-show="isDoneShow" @click="isShow=true"></span>
         </div>
         <ul>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
         </ul>
      </div>
       <div class="list">
        <div class="flex">
           <label>
           <p>
             <input type="checkbox" v-show="isDoneShow">
             <span class="lbl" v-show="isDoneShow"></span>
             <span class="name">合伙人(28)</span> 
           </p>
        </label>
        <span class="edit iconfont icon-Pencil" v-show="isDoneShow" @click="isShow=true"></span>
         </div>
         <ul>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
         </ul>
      </div>
       <div class="list">
        <div class="flex">
           <label>
           <p>
             <input type="checkbox" v-show="isDoneShow">
             <span class="lbl" v-show="isDoneShow"></span>
             <span class="name">合伙人(28)</span> 
           </p>
        </label>
        <span class="edit iconfont icon-Pencil" v-show="isDoneShow" @click="isShow=true"></span>
         </div>
         <ul>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
         </ul>
      </div>
       <div class="list">
        <div class="flex">
           <label>
           <p>
             <input type="checkbox" v-show="isDoneShow">
             <span class="lbl" v-show="isDoneShow"></span>
             <span class="name">合伙人(28)</span> 
           </p>
        </label>
        <span class="edit iconfont icon-Pencil" v-show="isDoneShow" @click="isShow=true"></span>
         </div>
         <ul>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
         </ul>
      </div>
       <div class="list">
         <div class="flex">
           <label>
           <p>
             <input type="checkbox" v-show="isDoneShow">
             <span class="lbl" v-show="isDoneShow"></span>
             <span class="name">合伙人(28)</span> 
           </p>
        </label>
        <span class="edit iconfont icon-Pencil" v-show="isDoneShow" @click="isShow=true"></span>
         </div>
         <ul>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
           <li>张三，</li>
         </ul>
      </div>
    </div>
    <mark-layer @closeShow="closeShow" :isShow="isShow"></mark-layer>
  </div>
</template>
<script>
import markLayer from '~components/team'
export default {
  data() {
    return {
      isShow: false,
      isDoneShow: false
    };
  },
  methods: {
    doManage() {},
    closeShow(bool){
     this.isShow = bool
    }
  },
  components:{
    markLayer
  }
};
</script>

<style scoped>
.box {
  padding-bottom: 0px;
  background-color: #fff;
  overflow-x: hidden;
}
.mark-manage-list {
  width: 100%;
}
.mark-manage-list .item {
  margin: 18px 10px;
  color: #ffaa00;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.mark-manage-list .add {
  padding-left: 30px;
  background: url("~static/img/wusercenter/addition_icon.png") no-repeat left
    center;
  background-size: 20px;
  font-size: 16px;
}
.mark-manage-list .list {
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #eee;
  overflow: hidden;
  font-size: 16px;
}
.mark-manage-list .list p {
  position: relative;
}

.mark-manage-list .list .flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.mark-manage-list .list label {
  min-height: 28px;
  display: block;
}
.mark-manage-list .list input[type="checkbox"] {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: red;
  border: 1px solid #7bc561;
  margin-right: 8px;
  border-radius: 4px;
  vertical-align: text-bottom;
}
.mark-manage-list .list p {
  margin-bottom: 4px;
}
.mark-manage-list .list .edit {
  padding: 8px;
}

.mark-manage-list .list input:checked + .lbl {
  display: inline-block;
  width: 8px;
  height: 1px;
  background-color: #7bc561;
  line-height: 0;
  font-size: 0;
  vertical-align: center;
  transform: rotate(45deg);
  position: absolute;
  top: 12px;
  left: 0px;
}
.mark-manage-list .list input:checked + .lbl::after {
  content: "/";
  display: block;
  width: 16px;
  height: 1px;
  background-color: #7bc561;
  transform: rotate(-90deg) translateX(50%) translateY(-50%);
}

.mark-manage-list .list ul {
  /* white-space: nowrap; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  width: 100%;
}
.mark-manage-list .list li {
  display: inline-block;
  color: #aaaaaa;
}
.mark-manage-list .list:last-of-type {
  border-bottom: 1px solid #ccc;
}
.mark-manage-list .item .done {
  color: #22ac38;
}
.mark-manage-list .item .del {
  color: #ec6941;
}
.layer-shadow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  position: fixed;
}

.layer-shadow .layer-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 250px;
}
.layer-shadow .layer-container input[type="text"] {
  border: 1px solid #ccc;
  width: 200px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  margin: 30px auto;
  display: block;
}
.layer-shadow .layer-container input[type="text"]::-webkit-input-placeholder {
  text-align: center;
}
.layer-shadow .layer-container .layer-content-bottom {
  width: 100%;
  border-top: 1px solid #ccc;
}
.layer-shadow .layer-container .layer-content-bottom a {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  text-align: center;
  height: 48px;
  line-height: 48px;
}
.layer-shadow .layer-container .layer-content-bottom a:first-of-type {
  border-right: 1px solid #ccc;
}
</style>
