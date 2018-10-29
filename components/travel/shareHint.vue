<template>
  <div class="pass fxImg" @click="hideShare">
    <img alt="" :src="imgPath">
  </div>
</template>

<script>
export default {
  props: ['imgPath'],
  methods: {
    hideShare() {
      this.$emit('hideShare',false)
    }
  }
}
</script>

<style>
.pass {
  width: 100%;
  height: 100%;
  min-height: 900px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, .5);
}
.fxImg img{
  width: 90%;
  padding: 20px 0 0 5%;
}
</style>
