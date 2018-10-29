<template>
  <!-- 添加标签弹出 -->
     <div class="layer-shadow" v-show="isShow">
      <div class="layer-container">
        <div class="laeyr-content-top">
          <input type="text" placeholder="请输入新标签名称...">
        </div>
        <div class="layer-content-bottom">
          <a href="javascript:;" @click="closeShow">取消</a>
          <a href="javascript:;" @click="confirm">确定</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    isShow:Boolean,
    default:false
  },
  data () {
    return {
     
    }
  },
  methods:{
    closeShow(){
      this.$emit('closeShow',false)
    },
    confirm(){
      this.$emit('closeShow',false)
    }
  }

}
</script>

<style scoped>
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
