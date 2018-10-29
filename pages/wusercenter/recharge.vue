<template>
<div class="box rechargeContainer">
  <div class="rechargeBox">
    <h3>自动充值</h3>
    <p class="title">请输入您要充值的金额</p>
    <div class="inputBox">
      <input v-model="money"
             type="text" /><span>元/人民币</span>
    </div>
    <div @click="recharge"
         class="recharge">
      完成充值
    </div>
    <div class="rechargeList bgc">
      <div>金额</div>
      <div>状态</div>
      <div>时间</div>
      <div>操作</div>
    </div>
    <div v-for="i in data.result"
         class="rechargeList list">
      <div>{{i.dreamVbczprice}}</div>
      <div v-if="i.dreamIsok">已处理</div>
      <div v-else>未处理</div>
      <div>{{time(i.dreamIsoktime)}}</div>
      <div></div>
    </div>
  </div>
  <msg ref="msg"></msg>
  <pages :pagination="data.totalPages"
         :nowActive="data.pageNo"
         @changePagination="changePagination"></pages>
</div>
</template>

<script>
import {
  orderinfo,
  getUserVbczList
} from '~/apis/user.js'
import {
  mapGetters
} from 'vuex'
import {
  returnTime,
  declassify
} from '~static/js/util.js'
import pages from '~components/pagination'
import keepUserOnline from '~static/js/keepUserOnline'
import querystring from 'querystring'
export default {

  data() {
    return {
      money: 0,
      sub: true,
      userInfo: {},
      data: []
    }
  },
  middleware: ["auth"],
  
  methods: {
    recharge() {
      // if (this.sub) {
      //   this.sub = false
      //     orderinfo({brand: this.query.brand, type: 'CloudCard', money: this.money}).then(res => {
      //       if (res.data.data.code == 2000) {
      //       	this.$refs.msg.state('充值成功')
      //       	this.$router.push({
      //       	  path: './',
      //       	  query: this.query
      //       	})
      //       } else {
      //         this.sub = true
      //       	this.$refs.msg.state('充值失败')
      //       }
      //     })
      //   }
      let {
        query
      } = this.$route
      //fullPath = encodeURIComponent(fullPath.substr(1))
      query.uid = declassify(query.uid)
      return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(query)) + '&type=CloudCard&wechatFree=' + this.money
    },
    time(i) {
      let t = returnTime(i)
      return t
    },
    changePagination(i) {
      getUserVbczList({
          dreamVbczuserid: this.userInfo.dreamUsername,
          index: i
        })
        .then(res => {
          if (res.data.code == 2000) {
            this.data = res.data.data
          }
        })
    }
  },
  created() {
    this.$store.dispatch('setFooterShow', true)
    keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
//    let data = []
      getUserVbczList({
        dreamVbczuserid: res.user.dreamUsername,
        index: 1
      }).then(res => {
        if (res.data.code == 2000) {
          this.data = res.data.data
        }
      })
    })
  },
  components: {
    msg: (resolve) => require(['~components/msg/msg.vue'], resolve),
    pages
  },
  computed: {
    ...mapGetters({
      query: 'get_router_query',
//    userInfo: 'getUserInfo'
    })
  }
}
</script>

<style scoped>
@import '~static/css/wusercenter/recharge.css';
</style>
