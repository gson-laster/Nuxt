<template>
<div v-if="sty">
  <div class="msgbox">
    <div class="msg">
      {{msg}}
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      sty: false,
      timer: '',
      msg: ''
    }
  },
  methods: {
    //通过父组件调用此方法
    state(msg = '修改成功', time = 2000) {
      this.msg = msg
      this.sty = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.sty = false
      }, time)
    }
  },
}
</script>

<style>
@import '~static/css/msg/msg.css';
</style>
