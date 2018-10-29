<template>
<div class="page">
  <ul>
    <slot name="total"></slot>
    <li @click="first" style="border-bottom:none">首页</li>
    <li @click="prev"  style="border-bottom:none">上一页</li>
    <li  style="border-bottom:none">
      <select v-model="active"
              @change="change()"
              class="changePage">
              <option  v-for="item in pagination" :value="item">
                {{item}}/{{pagination}}
              </option>
          </select>
    </li>
    <li @click="next"  style="border-bottom:none">下一页</li>
    <li @click="last"  style="border-bottom:none">尾页</li>
    <slot name="active"></slot>
  </ul>
  <msg ref="msg"></msg>
</div>
</template>

<script>
import msg from '~/components/msg/msg'
export default {
  data() {
    return {
      active: this.nowActive,
    }
  },
  methods: {
    next() {
      if (this.active >= this.pagination) {
        this.$refs.msg.state('超出总页数啦~')
      } else {
        this.active++
          this.emit()
      }
    },
    prev() {
      if (this.active <= 1) {
        this.$refs.msg.state('到第一页啦~')
      } else {
        this.active--
          this.emit()
      }
    },
    change() {
      this.emit()
    },
    first() {
      this.active = 1
      this.emit()
    },
    last() {
      this.active = this.pagination
      this.emit()
    },
    emit() {
      this.$emit('changePagination', this.active)
    }
  },
  props: [
      'pagination', //总页数
      'nowActive' //当前页
    ],
  components: {
    msg
  }
}
</script>

<style scoped>
@import '~static/css/pagination/index.css';
</style>
