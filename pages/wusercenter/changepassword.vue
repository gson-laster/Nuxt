<template>

    <div class="editpass">
      <div class="editpass_t">修改密码</div>
      <div class="editpass_form">
        <form name="form1" id="editFrom">
          <ul>
            <li v-for="i in list">
              <div class="t">{{i.name}}：</div>
              <div class="rinput"><input type="password" v-model="passInfo[i.module]" class="input"></div>
            </li>
          </ul><input type="hidden" name="action" value="editpass">
          <input type="button" value="修改" class="but" @click="changPass()">
        </form>
        <nuxt-link :to="{path: './inlineservice', query: query}"><span style="font-size: 12px;">不记得原密码了，马上联系客服?</span></nuxt-link>
      </div>
      <msg ref="msg"></msg>
    </div>

</template>

<script>
  const msg = () => import('~components/msg/msg')
  import {changePassword} from '~/apis/user.js'
  import {mapGetters} from 'vuex'
import keepUserOnline from '~static/js/keepUserOnline'
  
  export default {
    asyncData ({store}) {
      return {
        passInfo: {
          Dream_password: '',
          rep_password: '',
          ag_password: '',
          id: store.state.userInfo.id
        },
      }
    },
    data () {
      return {
        list: [
          {name: '原密码', module: 'Dream_password',},
          {name: '新密码', module: 'rep_password',},
          {name: '确认密码', module: 'ag_password',},
        ],
        alerts: {
          Dream_password: '请输入原密码',
          rep_password: '请输入新密码',
          ag_password: '请确认密码',
        },
        userInfo: {}
      }
    },
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
    },
    methods: {
      changPass() {
        let sub = true
        for(let i in this.passInfo) {
          if (this.passInfo[i] == '') {
            this.$refs.msg.state(this.alerts[i])
            sub = false
            break
          }
        }
        if (this.passInfo.rep_password != this.passInfo.ag_password) {
          this.$refs.msg.state('两次密码不一致')
          sub = false
        }
        if (sub) {
          this.passInfo.dreamUsername = this.userInfo.dreamUsername
          changePassword(this.passInfo).then(res => {
            if (res.data.code == 2000) {
            	this.$msg('修改成功')
            	setTimeout(()=> {
            	  this.$router.push({
                  path: './',
                  query: this.query
                })
            	}, 1500)
            } else {
              this.$msg('修改失败')
            }
          })
        }
      }
    },
    components: {
      msg
    },
    computed: {
      ...mapGetters({
//      userInfo: 'getUserInfo',
        query: 'get_router_query'
      })
    }
  }
</script>

<style scoped>
  @import '~static/css/wusercenter/changepassword.css';
</style>