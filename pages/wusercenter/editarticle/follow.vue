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
            <div @click="cancel(i.id, index)" class="cancelFollow">
              取消关注
            </div>
          </div>
          <articlefooter></articlefooter>
          <confirm :content="'您确定取消关注吗'" @cancel="can" @confirm="con" v-show="show"></confirm>
          <div v-if="res.result.length == 0" class="t_align">
          	没有更多数据了...
          </div>
         </div>
</template>

<script>
  import setImgUrl from "~static/mixins/setImgUrl.js"
  import articlefooter from '~/components/editarticle/articlefooter'
  import {delConcern, getConcernList} from '~/apis/editarticle.js'
  import keepUserOnline from '~static/js/keepUserOnline'
  
  export default {
//  async asyncData ({store}) {
//    let res = await getConcernList({dreamConcern: store.state.userInfo.dreamUsername, dreamType: 0, index: 1, pageSize: 10000})
//    if (res.data.code != 2000) {
//      res = {}
//    	res.result = []
//    }
//    return {
//      res: res.data.data,
//
//    }
//  },
    data () {
      return {
        show: false,
        id: -1,
        index: -1,
        res: {result: []},
        userInfo: {}
      }
    },
    async created (){
      this.$store.dispatch('setFooterShow', false)
      await keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
      
      let res = await getConcernList({dreamConcern: this.userInfo.dreamUsername, dreamType: 0, index: 1, pageSize: 10000})
      if (res.data.code != 2000) {
        res = {}
        res.result = []
      } else {
        res = res.data.data.data
      }
        this.res = res;

    
    },
    mixins: [setImgUrl],
    methods: {
      cancel (id, i) {
        this.show = true
        this.id = id
        this.index = i
      },
      con () {
        this.show = false
        delConcern({id: this.id}).then(res => {
          if (res.data.code == 2000) {
            this.res.result.splice(this.index, 1)
          	this.$msg('取消成功')
          } else {
          	this.$msg('取消失败')
          }
        })
      },
      can () {
        this.show = false
      }
    },
    components: {
      confirm: require('~components/msg/confirm.vue'),
      articlefooter
    }
  }
</script>

<style>
  @import '~static/css/editarticle/follow.css';
</style>