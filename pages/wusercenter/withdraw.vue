<template>
  <div class="withdraw box">
  	<div class="title">
              申请提现
  	</div>
  	<div v-if="data.state == 2" class="error">
    		未通过实名认证!
  	</div>
  	 <div v-if="data.state == 0" class="error">
        未实名认证!
    </div>
  	<div v-if="data.state == 1" class="withdrawBox">
  	<div class="new_usersmrz">
  	  <ul>
  	    <li v-for="i in list"><div class="t">{{i.name}}：</div><div class="input"><input v-model="data.real[i.module]"></div></li>
  	  </ul>
  	  <div class="clearfix">

  	  </div>
  	</div>
  	  <div class="canwithdraw">
  	  	可提现v币： <span>{{userInfo.dreamVcurrency}}</span>
  	  </div>
  	     <div class="clearfix">

      </div>
  	  <div class="canwithdraw">
                    提现金额： <input type="text" v-model="money" />
      </div>
      <div class="clearfix">

      </div>
      <div @click="btn" class="btn">
      	提交申请
      </div>
         <div class="warn">
      提现说明:<br />
      1V币兑换1元，达到100v币后可以申请提现，提现需扣除手续费2%、税点5%，提交申请审核通过后1―3天到账。
    </div>
  	</div>
      <div class="rechargeList bgc">
        <div>金额</div>
        <div>状态</div>
        <div>时间</div>
      </div>
      <div  v-if="withdraw.result.length != 0"  v-for="i in withdraw.result" class="rechargeList list">
        <div>{{i.dreamSqtxprice}}</div>
        <div v-if="i.dreamIsok">已处理</div>
        <div v-else>未处理</div>
        <div>{{time(i.dreamIsoktime)}}</div>
      </div>
      <div v-if="withdraw.result.length == 0" class="t_align">
      	没有更多数据了...
      </div>
  	<pages v-if="withdraw.result.length != 0" :pagination="withdraw.totalPages" :nowActive="withdraw.pageNo" @changePagination="changePagination"></pages>
      <msg ref="msg"></msg>
  </div>
</template>

<script>
import {realNameInfo, usersqtxjl, sqtx} from '~/apis/user.js';
import {returnTime} from '~static/js/util.js'
import {mapGetters} from 'vuex'
import keepUserOnline from '~static/js/keepUserOnline'
import pages from '~components/pagination'
  export default {

    middleware: ["auth"],
    data () {
      return {
        list: [
          {name: '真实姓名', module: 'dreamSmrzname'},
          {name: '银行卡号', module: 'dreamSmrzyhkh'},
          {name: '开户银行', module: 'dreamSmrzkhyh'},
          {name: '手机号码', module: 'dreamSmrzphone'},
        ],
        money: '',
        userInfo: {},
        data: {},
        withdraw: {result: []}
      }
    },
    head () {
      return {
        title: '申请提现'
      }
    },
    async created () {
      await keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })

      let res = [];
      let lists = {};
      let result = await Promise.all([
        realNameInfo({dreamSmrzuserid: this.userInfo.dreamUsername}),
        usersqtxjl({dreamSqtxuserid: this.userInfo.dreamUsername, index: 1})
      ])

      res = result[0]
      if (result[1].data.code == 2000 && !result[1].data.data.code) {
        lists = result[1].data.data.txjl
      } else {
        lists.result = []
      }

      let state = ''
      if (res.data) {
        if (res.data.dreamIsok) {
          state = '1'
        } else {
          state = '2'
        }
      } else {
        state = '0'
      }
      let data = {state: state}
      if (res.data) {
        data.real = res.data
      }
        this.data = data,
        this.withdraw = lists

    },
    computed: {
      ...mapGetters({
//      userInfo: 'getUserInfo',
        query: 'get_router_query'
      })
    },
    methods: {
      btn () {
        if (this.money < 100) {
          this.$msg('提现金额不能小于100');
          return false;
        }
        sqtx({txje: this.money, dreamUsername: this.userInfo.dreamUsername,dreamSqtxyhkh: this.data.real.dreamSmrzyhkh, dreamSqtxkhyh: this.data.real.dreamSmrzkhyh, dreamSqtxphone: this.data.real.dreamSmrzphone, dreamSqtxname: this.data.real.dreamSmrzname }).then(res => {
          if(res.data.code == 2000 && !res.data.data.code) {
            this.$msg('提现成功')
            this.withdraw.result.unshift({
              dreamSqtxprice: this.money,
              dreamSqtxuserid: this.userInfo.dreamUsername,
              dreamUpdatetime: Date.now()
            })
          }else{
            this.$msg(res.data.data.data)
          }
        })
      },
      time (i) {
        let t = returnTime(i)
        return t
      },
      changePagination (i) {
        usersqtxjl({dreamSqtxuserid: this.userInfo.dreamUsername, index: i}).then(res => {
          if (res.data.code == 2000) {
            this.withdraw = res.data.data.txjl
          } else{
            this.withdraw.result = []
          }
        })
      }
    },
    components: {
      msg: (resolve) => require(['~components/msg/msg.vue'], resolve),
      pages
    }
  }
</script>

<style scoped>
  @import '~static/css/wusercenter/withdraw.css'
</style>
