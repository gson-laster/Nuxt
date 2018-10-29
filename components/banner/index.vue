<template>
<div class="newmb_mk1">
  <swiper :auto="4000"
          ref="swiperWarrp"
          class="banner">
    <swiper-item v-for="(item, index) in bannerList"
                 :key="index"
                 ref="swItems"
                 class="banner">
      <img :src="setPicUrl(item.dreamDefaultpicurl)"
           :alt="item.dreamTitle" />
    </swiper-item>
  </swiper>
</div>
</template>
<script>
import swiper from '~components/swiper'
import swiperItem from '~components/swiper/swiper-item'

export default {
  props: {
    bannerList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    let items = this.$refs.swItems
    let imgHeightArr = []
    if(items) {
      for (let i = 0; i < items.length; i++) {
        let img = items[i].$el.children[0]
        img.onload = () => {
          imgHeightArr.push(img.height)
          let minHeight = Math.min.apply(null, imgHeightArr)
          this.$refs.swiperWarrp.$el.style.height = minHeight + 'px'
        }
      }
    }

  },
  methods: {
    setHeight() {
      let items = this.$refs.swItems
      let imgHeightArr = []
      for (let i = 0; i < items.length; i++) {
        let img = items[i].$el.children[0]
        img.onload = () => {
          imgHeightArr.push(img.height)
          let minHeight = Math.min.apply(null, imgHeightArr)
          this.$refs.swiperWarrp.$el.style.height = minHeight + 'px'
        }
      }
    }
  },
  //判断是否带有斜杠;
  methods: {
    setPicUrl(url) {
      if (url) {
        if (url.indexOf('http') != -1) {
          return url + '?w=auto&h=auto&q=0.6'
        } else {
          return '/' + url + '?w=auto&h=auto&q=0.6'
        }
      }
      return ''
    }
  },
  components: {
    swiper,
    swiperItem
  }
}
</script>

<style>
.mint-swipe-item.banner img {
  vertical-align: top;
}
</style>
