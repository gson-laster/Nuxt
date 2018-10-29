<template>
   <div class="rel">
   	 <div class="musicPlay wimg" @click="changeMusicStatus()">
      <img :class="{zhuan: musicStatus}" src="~static/img/musicalbum/music_note_big.png"/>
      <div id="music_txt" class="music_text" :class="{music_text_hid: !textStatus}">{{!musicStatus ? '关闭' : '打开'}}</div>
    </div>
   </div>
</template>

<script>
export default {
  data(){
    return {
      musicStatus: true,
      textStatus: false
    }
  },
  methods: {
    changeMusicStatus(){
      this.musicStatus = !this.musicStatus
      this.textStatus = true
      setTimeout(()=>this.textStatus=false, 2000)
      this.$emit('changeMusicStatus', this.musicStatus)
    }
  }
}
</script>

<style>
  @import '~static/css/musicalbum/musicplay.css';
</style>
