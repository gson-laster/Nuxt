<template>
<nuxt-link :to="{path: path, query: setQuery(Object.assign(query,{cid: cateData.id, flag: cateData.dreamNames}))}"
           tag="li">
  <img :src="cateData.dreamDefaultpicurl">
  <div>
    <h4>{{cateData.dreamNames}}</h4>
    <p></p>
  </div>
  <span class="arrow"></span>
</nuxt-link>
</template>
<script>
import setQuery from '~/static/mixins/setQuery'
export default {
  props: {
    path: {
      type: String,
      default: '/'
    },
    cateData: {
      type: Object,
      default: {}
    },
    query: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      urlPath: this.path
    }
  },
  mixins: [setQuery]
}
</script>
<style>
@import '~static/css/product/inline_two.css'
</style>
