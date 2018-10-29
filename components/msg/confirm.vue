<template>
<div class="box confirm">
  <div class="comfirmbox">
    <div class="confirmcontent">
      <p v-html="content"></p>
      <slot name="txt"></slot>
    </div>
    <div class="btnconfirm">
      <ul>
        <li @click="cancel" v-html="leftbtn"></li>
        <li @click="confirm" v-html="rightbtn"></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
      content: {
        default: '您确定删除吗'
      },
      leftbtn: {
        default: '取消'
      },
      rightbtn: {
        default: '确定'
      },
    },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped>
@import '~static/css/msg/confirm.css';
</style>
