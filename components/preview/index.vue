<template>
<div class="btn-container-fixed">
  <nuxt-link :to="{path:path,query:setQuery()}">
    <div class="btn_list">返回列表</div>
  </nuxt-link>
  <div class="preview_btn"
       @click="setVip()">立即开通</div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import {
  declassify
} from '~static/js/util.js'
import querystring from 'querystring'
export default {
  data() {
    return {
      path: './preview'
    }
  },
  computed: {
    ...mapGetters({
      'routerQuery': 'get_router_query'
    })
  },
  methods: {
    setQuery() {
      let data = {}
      data.uid = this.routerQuery.uid
      data.brand = this.routerQuery.brand
      return data
    },
    setVip() {
      let {
        query
      } = this.$route
      //fullPath = encodeURIComponent(fullPath.substr(1))
      console.log(query);
      query.uid = declassify(query.uid)
      return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&type=CloudCardOpen'

      this.$emit('setVip')
    }
  }
};
</script>

<style scoped>
.btn-container-fixed {
  width: 100px;
  height: 100px;
  bottom: 60px;
  right: 10px;
  position: fixed;
  z-index: 10;
}

.btn_list {
  width: 70px;
  height: 36px;
  background-color: #fff;
  text-align: center;
  margin: 0 auto;
  line-height: 36px;
  color: #ff0000;
  border: 1px solid #ff0000;
  border-radius: 4px;
}

.preview_btn {
  width: 70px;
  border-radius: 4px;
  height: 36px;
  line-height: 36px;
  background-color: #ff0000;
  text-align: center;
  color: #fff;
  z-index: 10;
  box-shadow: 0px 0px 2px 2px #ccc;
  margin: 16px auto 0 auto;
}
</style>
