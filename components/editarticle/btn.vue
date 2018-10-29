<template>
<div class="btnbox">
  <div @click="cancelclick"
       class="lbtn">
    <span>{{ca}}</span>
  </div>
  <div @click="confirmclick"
       class="rbtn">
    <span>{{co}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      ca: this.cancel || '取消',
      co: this.confirm || '确定'
    }
  },
  methods: {
    cancelclick() {
      this.$emit('cancel')
    },
    confirmclick() {
      this.$emit('confirm')
    }
  },
  props: [
      'cancel',
      'confirm'
    ]
}
</script>

<style scoped>
@import '~static/css/editarticle/btn.css';
</style>
