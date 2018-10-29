<template>
  <div class="imgbox cover">
	  <p class="imgtitle">上传图片</p>
    <div @click="uploadImg" class="upload imgList">
      <i class="icon icon iconfont icon-pic-copy"></i>上传
    </div>
	  <p class="imgtitle">推荐美图</p>
	  <div class="imgRecContainer listBox">
  	  <div @click="bgSelect(index)" v-for="(item, index) in groomPicList" :class="{imgList: true, coverList: true, coveTrans: index == active, border: index == active}">
  	  	<img :src="item"/>
  	  </div>
	  </div>
  	<btn  @cancel="cancel" @confirm="confirm">  </btn>
  </div>
</template>

<script>
  import btn from '~components/editarticle/btn'
  import {mapGetters} from 'vuex'
  import groompic from '~static/js/outgroompic.js'
  export default {
    data () {
      return {
        groomPicList: [],
        active: -1
      }
    },
    created () {
      this.groomPicList = groompic.arr
    },
    components: {
      btn
    },
    methods: {
      cancel　()　{
        this.$emit('cancel')
      },
      bgSelect (i) {
        this.active = i
      },
      confirm () {
        this.$emit('confirm', this.groomPicList[this.active])
      },
      uploadImg () {
        this.$emit('uploadImg')
      }
    },
    middleware: ["auth"],
    computed: {
      ...mapGetters({
        imgList: 'getOldImgList'
      })
    }
  }
</script>

<style scoped>
  @import '~static/css/editarticle/changecover.css';
</style>