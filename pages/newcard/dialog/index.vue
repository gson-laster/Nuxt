<template>
  <div class="dialog-container" v-show="show">
    <div id="dialog" style="display:block" v-if="imgSrc && imgSrc != ''">
      <p class="close">
        <a href="javascript:void(0)" @click="hideWXQrcode()">X</a>
      </p>
      <div id="im2" >
        <img border="0" :src="imgSrc" >
        <br>长按二维码自动识别
        <br>微信沟通交流
      </div>
    </div>
    <p v-else style="height: 28px; color: #fff; font-size: 18px;text-align:center; position: absolute; top: 50%; transform: translateY(-50%); width: 100%">用户没有二维码</p>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  methods: {
    hideWXQrcode() {
      this.$emit('hide', false)
    }
  }
}
</script>

<style scoped>
@import '~static/css/newcard/dialog/index.css'
</style>
