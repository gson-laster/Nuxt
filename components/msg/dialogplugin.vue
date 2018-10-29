<template lang="pug">
#iosDialog1.js_dialog(:class="{fadeIn: show}" v-if="show")
  .weui-mask
  .weui-dialog
    .weui-dialog__hd
      strong.weui-dialog__title {{title}}
    .weui-dialog__bd {{content}}
    .weui-dialog__ft
      a.weui-dialog__btn.weui-dialog__btn_default(href='javascript:;', v-if="cancelStatus", @click="cancel") {{cancelText}}
      a.weui-dialog__btn.weui-dialog__btn_primary(href='javascript:;', @click="confirm") {{confirmText}}
</template>

<script>
export default {
  data () {
    return {
      show: false,
      title: '提示',
      content:'您确定要这样操作吗？',
      cancelText:'取消',
      confirmText: '确认',
      cancelStatus: true
    }
  },
  methods: {
    cancel(){
      this.show = false
    },
    confirm(){
      this.show = false
    }
  }
}
</script>

<style lang="css" scoped>
.weui-mask {
    position: fixed;
    z-index: 19930113;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}
.weui-dialog {
    position: fixed;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    z-index: 19930114
}
.weui-dialog__hd {
    padding: 1.3em 1.6em 0.5em;
}
.weui-dialog__title {
    font-weight: 400;
    font-size: 18px;
}
.weui-dialog__bd {
    padding: 0 1.6em 0.8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999999;
}
.weui-dialog__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.weui-dialog__btn_default {
    color: #353535;
}
.weui-dialog__btn {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #3CC51F;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
}
.weui-dialog__btn_primary {
    color: #0BB20C;
}
.weui-dialog__btn {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #3CC51F;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
}
.weui-dialog__btn:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }
  .weui-dialog__ft:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D5D5D6;
      color: #D5D5D6;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
  }
</style>
