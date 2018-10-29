<template>
<div class="contentHeaderWrapper">
  <div class="addContentHeader"
       @click="showAddBtn()"><i class="addIcon">+</i>&nbsp;添加内容</div>
  <div class="addContentBottom"
       :style="{display:showAdd}">
    <div class="fugai">

    </div>
    <span @click="addImage"><i class="icon iconfont icon-tupian"></i><span>图片</span></span>
    <span @click="addText"><i class="icon iconfont icon-wenzizujian"></i><span>文字</span></span>
    <span @click="addVideo"><i class="icon iconfont icon-shipin"></i><span>视频</span></span>
  </div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      //      showAddBtn: 'none',
    }
  },
  methods: {
    addImage() {
      this.$emit('addImage')
    },
    addText() {
      this.$emit('addText')
    },
    addVideo() {
      this.$emit('addVideo')
    },
    showAddBtn() {
      this.$store.dispatch('setArtIndex', this.i)
      this.$emit('showAddBtn', this.i)
    }
  },
  props: [
      'showAdd',
      'i'
    ],
    computed: {
      ...mapGetters({
        index: 'getArticleIndex'
      })
    }
}
</script>

<style scoped>
@import '~static/css/editarticle/addcontent.css'
</style>
