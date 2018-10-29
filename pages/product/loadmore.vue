<template>
<div class="loadmore"
     ref="loadmore">
  <div class="loadmore__body">
    <slot></slot>
  </div>
  <div class="loadmore__footer">
    <span v-if="loading">
        <i class="tc-loading"></i>
        <span>正在加载</span>
    </span>
    <span v-else-if="loading">正在加载...</span>
    <span v-else>没有更多了</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    /**
     * 是否加载
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * 滚动外部容器, 选择器字符串
     */
    container: {
      default: () => (global),
    },

    /**
     * 距离底部多远加载
     */
    distance: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      dom: null, // 外部容器dom
    }
  },
  mounted() {
    if (this.container !== global) {
      this.dom = document.querySelector(this.container)
    } else {
      this.dom = this.container
    }
    if (!this.dom) {
      return
    }
    this.dom.addEventListener('scroll', this.scroll, false)
    if (this.autoload && !this.loading) {
      this.load()
    }
  },

  methods: {
    /**
     * 滚动钩子
     */
    scroll() {
      if (!this.loading) {
        return
      }
      const viewHeight = global.innerHeight
      let parentNode
      if (this.container !== global) {
        parentNode = this.$el
      } else {
        parentNode = this.$el.parentNode
      }
      if (parentNode) {
        const rect = parentNode.getBoundingClientRect()
        if ((rect.bottom <= viewHeight + this.distance)) {
          this.load()
        }
      }
    },
    /**
     * 加载一组数据的方法
     */
    load() {
      this.$emit('load')
    },
  },
  beforeDestroy() {
    if (this.dom) {
      this.dom.removeEventListener('scroll', this.scroll, false)
    }
  },
}
</script>
<style scoped>
.loadmore {
  user-select: none;
}

.loadmore__footer {
  color: #e4e4e4;
  padding: 20px;
  text-align: center;
}

.tc-loading span {
  vertical-align: middle;
}
</style>
