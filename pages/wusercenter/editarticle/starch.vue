<template>
    <div class="followcontentList">
    <div class="followlist" v-for="(i, index) in res.result">
            <div class="followuserImg">
              <img :src="setImgUrl({src: i.dreamReimg})">
            </div>
            <div class="followuserInfo">
              <p>{{i.dreamRefullname}}</p>
              <p>{{i.dreamReconcern}}</p>
            </div>
          </div>
          <div v-if="!res.result" class="t_align">
          	没有更多数据了...
          </div>
          <articlefooter></articlefooter>
         </div>
</template>

<script>
import setImgUrl from "~static/mixins/setImgUrl.js"
import articlefooter from '~/components/editarticle/articlefooter'
import {getfans} from '~/apis/editarticle.js'
import keepUserOnline from '~static/js/keepUserOnline'
  
  export default {
    async asyncData ({store}) {
//    let res = await getfans({dreamReconcern: store.state.userInfo.dreamUsername, dreamType:0, index: 1, pageSize: 10000})
//    if (res.data.code != 2000) {
//      res.data.data = {}
//      res.data.data.result = []
//    }
      let res = {}
      res.result = []
      return {
        res: res
      }
    },
    mixins: [setImgUrl],
    data () {
      return {
        userInfo: {},
//      res: {'result': []}
      }
    },
    async created (){
      this.$store.dispatch('setFooterShow', false)
      await keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
      let res = await getfans({dreamReconcern: this.userInfo.dreamUsername, dreamType:0, index: 1, pageSize: 10000})
      if (res.data.code == 2000) {
//      res.data.data = {}
//      res.data.data.result = []
        this.res = res.data.data;
      }
    },
    components: {
      articlefooter
    }
  }
</script>

<style>
  @import '~static/css/editarticle/follow.css';
</style>