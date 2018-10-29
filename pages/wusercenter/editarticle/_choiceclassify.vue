<template>
<div v-if="a"
     class="choicebox scroll fadeIn">
  <div class="List">
    <span>
                默认文章分类:
      </span>
    <ul>
      <li @click="choice(item.id)"
          v-for="(item, index) in firstList"
          :class="{active: item.id == activeId}"><em>{{item.dreamTitle}}</em></li>
    </ul>
    <div class="clearfix"></div>
  </div>
  <div class="List">
    <span>自定义文章分类:</span>
    <ul>
      <li @click="choice(item.id)"
          v-for="(item, index) in secondList"
          :class="{active: item.id == activeId}"><em>{{item.dreamTitle}}</em></li>
    </ul>
    <div class="clearfix"></div>
  </div>
  <div class="btnList List">
    <ul>
      <li>
        <div @click="cancal"><em>取消</em></div>
      </li>
      <li>
        <div @click="choicesm"
             :class="{active: sm}"><em>私密上传</em></div>
      </li>
      <li>
        <div @click="fabu"><em>发布</em></div>
      </li>
    </ul>
    <div class="clearfix"></div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    userInfo: {
      require: true,
      type: Object
    },
    firstList: {
      default: [],
      type: Array
    },
    secondList: {
      default: [],
      type: Array
    }
  },
  data () {
    return {
      List: [],
      // secondList: [],
      a: false,
      activeId: -1,
      sm: false
    }
  },
  methods: {
    cancal() {
      this.a = false
      this.activeId = this.firstList[0].id || this.secondList[0].id || -1
      this.sm = false
      this.$emit('cancel')
    },
    b() {
      this.a = true
    },
    choice(id) {
      this.activeId = id
    },
    choicesm() {
      this.sm = !this.sm
    },
    fabu() {
      this.a = false
      this.sm = false
      this.activeId = this.firstList[0].id || this.secondList[0].id || -1
      this.$emit('fabu', this.sm, this.activeId)
    }
  }
}
</script>

<style scoped>
@import '~static/css/editarticle/choiceclassify.css';
</style>
