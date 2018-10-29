<template>
<div class="new_user_vbcz"
     id="new_user_vbcz">
  <div class="new_user_vbcztitle">
    <h3>续费会员</h3><span class="dq">会员到期时间:{{endTime}}</span></div>
  <div class="new_user_renewsm">您的V币剩余<i>{{remainderVB}}</i>个，会员续费1年消耗<i>299</i>个<br>您确定续费吗？</div>
  <form name="form1"
        method="post"
        action="user_renew.html">
    <input type="hidden"
           id="vbczkyvb"
           name="vbczkyvb"
           value="0">
    <input type="hidden"
           name="action"
           value="renewok">
    <div class="new_user_vbczan"><input name="button"
             type="button"
             value="确定续费"
             @click="renew">
    </div>
  </form>
</div>
</template>
<script>
import { dateFormat,  declassify} from '~static/js/util'
import { setrenewcode} from '~/apis/user.js'
import querystring from 'querystring'
import keepUserOnline from '~static/js/keepUserOnline'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    let data = await keepUserOnline(this.$route, 'user')
    this.userInfo = data.user
    this.$store.dispatch('setFooterShow', true)
  },
  computed: {
    remainderVB() {
      return this.userInfo.dreamVcurrency
    },
    endTime() {
      let endTime = this.userInfo.dreamEndtime
      return dateFormat('yy-MM-dd', endTime)
    }
  },
  methods: {
    async renew() {
      let result = await setrenewcode(this.userInfo.dreamUsername)

      if (result.data.code == 2000 && !result.data.data.code) {
        let { query } = this.$route
        let queryObj = {}
        //fullPath = encodeURIComponent(fullPath.substr(1))
        let free = result.data.data
        queryObj.uid = declassify(query.uid)
        queryObj.brand = query.brand


        if( free * 1 > 0) {
          return window.location.href = 'http://' + window.location.host + '/api/wechat-redirect?target=' + encodeURIComponent(querystring.stringify(queryObj)) + '&type=CloudCardRenew&wechatFree=' + free
        }else{
          this.$msg(result.data.data.data)
          setTimeout(() => {
            this.$router.push({
              path: '/wusercenter',
              query: query
            })
          }, 500)
        }

      } else {
        this.$msg(result.data.data)

        setTimeout(() => {
          this.$router.push({
            path: '/wusercenter',
            query: query
          })
        }, 500)
      }
      console.log(result);

    }
  }
};
</script>
<style>
.new_user_vbczform,
.new_user_vbczimg,
.new_user_vbcztitle {
  text-align: center;
  overflow: hidden;
}

.new_user_vbcztitle h3 {
  font-size: 30px;
  line-height: 180%;
}

.new_user_vbcztitle span.dq {
  color: #999;
  font-size: 14px;
  line-height: 160%;
}

.new_user_renewsm {
  margin: 0 auto;
  padding: 0;
  position: relative;
  overflow: hidden;
  text-align: center;
  color: #333;
  font-size: 14px;
  line-height: 150%;
}

.new_user_renewsm i {
  font-style: normal;
  color: red;
}

.new_user_vbczan {
  margin: 20px auto 0;
  width: 280px;
  text-align: center;
  overflow: hidden;
  padding-bottom: 50px;
}

.new_user_vbczan input {
  width: 100%;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  border: none;
  background: #fa0;
  color: #fff;
  cursor: pointer;
}

.new_user_vbczan input,
.new_user_vbczform .t {
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  float: left;
}

.new_user_vbcz {
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  overflow: hidden;
  padding-bottom: 60px;
}

.new_user_vbcztitle {
  margin: 50px auto 0;
  padding: 0;
  color: #333;
}
</style>
