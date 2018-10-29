<!--效果见->(选择一级分类) http://127.0.0.1:3000/wusercenter/editarticle/classify?uid=%25D%25%25J%25%25J%25%25J%25%25L%25%25J%25%25G%25%25D%25%25F%25%25I%25%25J%25&brand=5-->
<template>
<div class="bom">
  <ul class="firstClassify scroll">
    <!--列表-->
    <slot name="list"></slot>
  </ul>
  <div class="qxclass"
       slot="cont"
       @click="cancelClass()" v-html="cancel"></div>
  <!--slot 底部按钮 -->
  <slot name="cont"></slot>
</div>
</template>

<script>
export default {
  methods: {
    cancelClass() {
      this.$emit('cancel')
    }
  },
  props: {
      cancel: {
        default: '取消'
      }
  }
}
</script>

<style>
@import '~static/css/msg/bottomslider.css';
</style>
