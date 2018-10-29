<template lang="pug">
  .nicecard_index.mt80.white-bg
    .nicecard_title
      h1 名片类型
    .nicecard_list
      ul
        nuxt-link(class="list_item fresh", tag="li" :to="{path: '/nicecard/list/fresh', query: setQuery()}")
          .list-img
            img(src="~static/img/nicecard/fresh_list_bg.jpg")
          .list-note
            span 清新
        nuxt-link(class="list_item business", tag="li" :to="{path: '/nicecard/list/business', query: setQuery()}")
          .list-img
            img(src="~static/img/nicecard/business_list_bg.jpg")
          .list-note
            span 商务
        nuxt-link(class="list_item classical", tag="li" :to="{path: '/nicecard/list/classical', query: setQuery()}")
          .list-img
            img(src="~static/img/nicecard/classical_list_bg.jpg")
          .list-note
            span 古典
        nuxt-link(class="list_item concise", tag="li" :to="{path: '/nicecard/list/concise', query: setQuery()}")
          .list-img
            img(src="~static/img/nicecard/concise_list_bg.jpg")
          .list-note
            span 简约
        nuxt-link(class="list_item specific", tag="li" :to="{path: '/nicecard/list/specific', query: setQuery()}")
          .list-img
            img(src="~static/img/nicecard/specific_list_bg.jpg")
          .list-note
            span 个性
</template>

<script>
import setQuery from '~static/mixins/setQuery.js'
import wechat from '~/static/mixins/wechat.js'

export default {
  head(){
    return {
      title: '精美名片'
    }
  },
  mixins: [setQuery, wechat],
  async beforeMount() {
    var url = ''
    // 判断是否是ios微信浏览器

    // if (window.__wxjs_is_wkwebview === true) {
    //   url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    // } else {
    //   url = window.location.href.split('#')[0]
    // }
    // 判断是否是ios微信浏览器
    if ( typeof window.entryUrl === 'undefined' || window.entryUrl === '' ) {
      window.entryUrl = location.href.split( '#' )[ 0 ]
    }
    if (window.__wxjs_is_wkwebview === true) {
      url = window.entryUrl
    } else {
      url = window.location.href.split('#')[0]
    }
    const shareUrl = 'http://'+window.location.host + this.$route.fullPath
    const shareOpts = {
      title: `精美名片`, // 分享标题
      desc: `漂亮的精美名片，快来制作一张属于自己的精美名片吧`, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `http://${window.location.host}/UploadFiles/1489999753693.jpg`, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: () => {
        alert('分享成功')
      }, // 用户确认分享后执行的回调函数
      cancel: () => {
        alert('分享取消')
      } // 用户取消分享后执行的回调函数
    }
    await this.wechatInit(url, shareOpts)
  },
}
</script>

<style lang="stylus" scoped>
.nicecard_index
  .nicecard_title
    border-bottom 2px solid #ddd
    height 42px
    line-height 42px
    text-align center
  .nicecard_list
    padding 12px
    .list_item
      border-radius 8px
      overflow hidden
      position relative
      margin-top 12px
      height 120px
      .list-note
        position absolute
        right 8px
        bottom 8px
        border-radius 5px
        height 28px
        line-height 28px
        overflow hidden
        span
          background #FEFEFE
          padding 4px 8px
          font-size 14px
</style>
