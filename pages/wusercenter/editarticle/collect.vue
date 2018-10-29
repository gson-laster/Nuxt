<template>
  <div class="box">
    <section>
      <div class="contentList">
         <div v-for="(item, index) in res.result" class="list">
          <div class="collectuserInfo">
            <div class="collectuserImg">
              <img :src="setImgUrl({src:item.dreamImg})">
            </div>
            <div class="collectname">
              {{item.dreamUsername}}
            </div>
            <div class="collecttime">
              {{time(item.dreamUpdatetime)}}
            </div>
            <div @click="cancelCollect(item.dreamArtid, index)" class="cancelcollect">取消收藏</div>
          </div>
          <div class="articleInfo">
            {{item.dreamArttitle}}
          </div>
        </div>
      </div>
    </section>
    <div v-if="res.length == 0" class="t_align">
    	没有更多数据了...
    </div>
    <pagination v-else :pagination='res.pageCount' :nowActive="res.pageNo"></pagination>
    <confirm @cancel="cancel" @confirm="confirm" v-if="show" :content="'您确定取消收藏吗'"></confirm>
  </div>
</template>

<script>
import pagination from '~/components/pagination'
import confirm from '~/components/msg/confirm'
import {getuserartcollerList, artcollectordel} from '~/apis/user.js'
import {returnTime} from '~static/js/util.js'
import {mapGetters} from 'vuex'
import keepUserOnline from '~static/js/keepUserOnline'
import setImgUrl from "~static/mixins/setImgUrl.js"
  
  export default {
//  async asyncData ({store}) {
//    let data = null
//    let res = await getuserartcollerList({dreamUserid: store.state.userInfo.dreamUsername, index: 1, pageSize: 10000})
//    if (res.data.code == 2000) {
//    	data = res.data.data
//    } else {
//    	data = []
//    }
//    return {
//      res: data
//    }
//  },
    data () {
      return {
        show: false,
        activeId: -1,
        index: -1,
        userInfo: {},
        res: []
      }
    },
    mixins: [setImgUrl],
    
    async created(){
      await keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
      let res = await getuserartcollerList({dreamUserid: this.userInfo.dreamUsername, index: 1, pageSize: 10000})
      if (res.data.code == 2000) {
        this.res = res.data.data
      }
    },
    middleware: ["auth"],
    methods: {
      cancelCollect (i, index) {
        this.activeId = i
        this.show = true
        this.index = index
      },
      cancel () {
        this.show = false
      },
      confirm () {
        artcollectordel({dreamUserid: this.userInfo.dreamUsername, dreamArtid: this.activeId}).then(res => {
//        console.log(res.data.code)
          if (res.data.code == 2000) {
            this.res.result.splice(this.index, 1)
            this.show = false
            this.$msg('删除成功')
          } else {
            this.$msg('删除失败')
          }
        })
      },
      time (t) {
        let ti = returnTime(t, '-', false)
        return ti
      }
    },
    components: {
      pagination,
      confirm
    },
//  computed: {
//    ...mapGetters({
//      userInfo: 'getUserInfo'
//    })
//  }
  }
</script>

<style scoped>
  @import '~static/css/editarticle/collect.css';
</style>