<template>
 <div class="box">

    <div class="new_user">
      <div class="new_user_vbglmk1">
        <div class="imgTop">
          <div class="vbgl_01 img">

          </div>
        </div>
        <div class="t" id="t"><span>我的V币</span>
          <h3>{{userInfo.dreamVcurrency}}</h3></div>
          <div class="clearfix">

          </div>
        <div class="an">
          <nuxt-link :to="{path: 'recharge', query: querys()}">Ｖ币充值</nuxt-link>
          <nuxt-link :to="{path: 'withdraw', query: querys()}" class="link">V币提现</nuxt-link >
        </div>
      </div>
      <div class="new_user_nav2">
        <ul>
          <li>
            <div class="link">
             <nuxt-link :to="{path: 'realname', query: query}"><div><div class="img vbmanager"></div><span>实名认证</span></div></nuxt-link>
            </div>
          </li>
          <li>
            <div class="link">
              <nuxt-link :to="{path: 'vbtranslate', query: querys()}">
                <div><div class="img vbmanager1"></div><span>V币转送</span></div>
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="new_user_vbgldq">账号 {{returnTime(userInfo.dreamEndtime)}} 到期
        <nuxt-link :to="{path: './vip/openNow', query: querys()}">续费</nuxt-link>
      </div>
    </div>
    </div>

 </template>

<script>
import {
  mapGetters
} from 'vuex'
import {
  returnTime
} from '~static/js/util'
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  data(){
    return {
      userInfo: {}
    }
  },
  methods: {
    querys() {
      return this.query
    },
    returnTime(time) {
      return returnTime(time, '/', false)
    }
  },
  computed: {
    ...mapGetters({
      query: 'get_router_query',
//    userInfo: 'getUserInfo'
    }),
  },
    middleware: ["auth"],
  created() {
    this.$store.dispatch('setFooterShow', true)
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
  }
}
</script>

<style scoped>
@import '~static/css/wusercenter/vbmanager.css';
@import '~static/css/wusercenter/img.css';
</style>
