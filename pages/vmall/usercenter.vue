<template>
  <section class="box vMall">
    <vmall-topbar :title="title"></vmall-topbar>
    <div class="new_vbshop vmall">
      <div class="new_shopuser">
        <div class="new_shopuserinfo" id="new_shopuserinfo">
          <div class="new_shopuserlogo">
           <nuxt-link :to="{path:'/newcard',query:query}"><img :src="userInfos.dreamImg" border="0"></nuxt-link>
          </div>
          <div class="new_shopusername">{{userInfos.dreamFullname}}</div>
        </div>
        <div class="new_shopusermk1">
          <ul>
            <li>
              <i>{{vmallCount.d}}</i>
              <span>购物车</span>
            </li>
            <li>
              <i>{{vmallCount.a}}</i>
              <span>待发货</span>
            </li>
            <li>
              <i>{{vmallCount.b}}</i>
              <span>已发货</span>
            </li>
            <li>
              <i>{{vmallCount.c}}</i>
              <span>已完成</span>
            </li>
          </ul>
        </div>
        <div class="new_shopusermk2">
          <div class="new_shopusermk2_vb" id="vb">V币：
            <span>{{userInfos.dreamVcurrency}}</span>
          </div>
          <div class="new_shopusermk2_an">
          <nuxt-link :to="{path:recharge,query:query}" class="ico01">充值</nuxt-link>
          <nuxt-link :to="{path:withdraw,query:query}" class="ico02">提现</nuxt-link>       
          </div>
        </div>
        <div class="new_navjg"></div>
        <div class="new_shopusermk3">
          <nuxt-link :to="{path:path,query:query}">
            <h3>全部订单</h3>
          </nuxt-link>

        </div>
        <div class="new_navjg"></div>
        <div class="new_shopusermk5">
          <nuxt-link :to="{path:path2,query:query}">
            <h3>我的收藏</h3>
          </nuxt-link>
        </div>
        <div class="new_navjg"></div>
        <div class="new_shopusermk4">
          <nuxt-link :to="{path:path3,query:query}">
            <h3>收货地址管理</h3>
          </nuxt-link>
          <div class="new_addresslist" id="new_addresslist">
            <li>收货地址：{{userInfos.dreamShadd1?userInfos.dreamShadd1:'还没有填写！'}}&nbsp;{{userInfos.dreamShadd2?userInfos.dreamShadd2:'还未填写！'}}&nbsp;{{userInfos.dreamShadd3?userInfos.dreamShadd3:'还未填写！'}}</li>
            <li>邮编：{{userInfos.dreamShcode?userInfos.dreamShcode:'还未填写！'}}</li>
            <li>收件人：{{userInfos.dreamShname?userInfos.dreamShname:'还未填写！'}}（{{userInfos.dreamShphone?userInfos.dreamShphone:'还未填写！'}}）</li>
          </div>
        </div>
      </div>
    </div>
    <vmall-footer></vmall-footer>
  </section>
</template>

<script>
import vmallTopbar from '~components/vmall/topBar'
import vmallFooter from '~components/vmall/vmallFooter'
import  {getvmcount} from '~/apis/vmall'
import {mapGetters} from 'vuex' 
export default {
  async asyncData({query,store}){
     let dreamUsername = store.getters.getUserInfo.dreamUsername
    let result = await Promise.all([
        getvmcount({dreamUserid:dreamUsername})
    ])
    return {
      query:query,
      vmallCount:result[0]
    }
  },
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  components: {
    vmallTopbar,
    vmallFooter
  },
  computed:{
    ...mapGetters({
      'userInfos':'getUserInfo'
    })
  },
  data() {
    return {
      title: 'V币商城-个人中心',
      path: './orders',
      path2: './myCollect',
      path3:'./address',
      recharge:'../wusercenter/recharge',
      withdraw :'../wusercenter'
    }
  },
}
</script>
<style scoped>
@import '~static/css/vmall/vmallUserCenter.css';
</style>
