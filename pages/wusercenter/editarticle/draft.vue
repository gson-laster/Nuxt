<template>
  <div class="box">
      <section>
        <div class="contentList">
          <div v-for="(item, index) in classifyList" class="list">
            <p>
              {{item.tyTitle}}
            </p>
            <p>
              {{time(item.tyUpdatetime)}}
            </p>
            <div @click="fabu(item.id, index)" class="release"> 发布   </div>  
            <div class="release bj" @click="bianji(item.id, index)">编辑</div>
            <div class="release sc" @click="shanchu(item.id, index)">删除</div>
          </div>
          <div class="t_align" v-if="classifyList.length == 0">
              无更多数据了...
          </div>
        </div>
      </section>
      <section>
        <div class="selectClassify">
          <div class="classifyTitle">
            请选择文章分类:
          </div>
          <ul class="classifyList"><li>
            <div class="changeBg">
            A
          </div></li><li><div>不分类</div></li></ul>
            <div class="clearfix">
            
            </div>
          <ul class="manipulate">
            <li><div class="qx">取消</div></li>
            <li><div class="sm">私密上传</div></li>
            <li><div class="fb">发布</div></li>
          </ul>
          <div class="clearfix">
            
          </div>
        </div>
      </section>
      <confirm v-if="confirm" @cancel="cancel" @confirm="con"></confirm>
      <choiceclassify ref="cho" @fabu="release"></choiceclassify>
      <msg ref = "msg"></msg>
    </div>
</template>

<script>
//import confirm from '~/components/msg/confirm.vue';
  import {seachuserarticle, delUserArticle, userarticleeditor} from '~/apis/editarticle.js';
  import {returnTime} from '~static/js/util.js';
  import {mapGetters} from 'vuex'
  import keepUserOnline from '~static/js/keepUserOnline'
  
  export default {
    data () {
      return {
        confirm: false,
        activeId: -1,
        index: -1,
        choiceCla: false
      }
    },
    middleware: ["auth"],
    beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
    async asyncData ({store}) {

      return {
        classifyList: []
      }
    },
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
//      this.userInfo = res.user
        let options = {};
      options.tyUsername = res.user.dreamUsername;
      options.tyState = 0;
      options.pageSize = 10000;
      options.index = 1;
          seachuserarticle(options).then(res => {
           if (res.data.hasOwnProperty('code') && res.data.code == 2000 && !res.data.data.hasOwnProperty('data')) {
               this.classifyList = res.data.data.artlist.result || []
           }
         })
      })
    },
    methods: {
      fabu (id, i) { 
        this.activeId = id
        this.index = i
//      this.choiceCla = true
        this.$refs.cho.b()
      },
      bianji (id, i) {
        this.query.id = id
        this.$router.push({
          path: './edit',
          query: this.query
        })
      },
      shanchu (id, i) {
        this.activeId = id
        this.confirm = true
        this.index = i
      },
      cancel () {
        this.confirm = false
      },
      time (time) {
        return returnTime(time, '/', false)
      },
      con () {
        delUserArticle(this.activeId).then(res => {
          if (res.data.code == 2000) {
          	this.$refs.msg.state('删除成功')
          	this.classifyList.splice(this.index, 1)
          } else {
          	this.$refs.msg.state('删除失败')
          }
          this.confirm = false
        })
      },
      release (sm, id) {
        let json = {id: this.activeId, classid: id}
                if (sm) {
          json.tyState = 2
        } else{
          json.tyState = 1
        }
        userarticleeditor(json).then(res => {
          if (res.data.code == 2000) {
          	this.classifyList.splice(this.index, 1)
          	this.$msg('发布成功')
          } else{
          	this.$msg('发布失败')
          }
        })
      }
    },
    components: {
      confirm: require('~components/msg/confirm.vue'),
      msg: require('~components/msg/msg.vue'),
      choiceclassify: require('~/pages/wusercenter/editarticle/_choiceclassify.vue')
    },
    computed: {
      ...mapGetters({
        query: 'get_router_query'
      })
    }
  }
</script>

<style scoped>
  @import '~static/css/editarticle/draft.css';
</style>