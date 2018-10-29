<template>
  <div class="register box">
  	<div class="registerTitle">
  		新账号注册
  	</div>
  	<div class="step">
  		1
  	</div>
  	<div class="attention">
  		填写个人信息(*为必填)
  	</div>
  	<div class="inputBox">
  		<div v-for="(i,index) in list" class="input" :key="index">
  			<span>{{i.name}}：</span>
  			<div class="inp">
          <input v-if="i.type == 'number'" v-model="registerInfo[i.module]" :placeholder="i.place" type="number" />
          <input v-if="i.type == 'password'" v-model="registerInfo[i.module]" :placeholder="i.place" type="password" />
        </div>
  		</div>
  	</div>
  	<div @click="after" class="sub">
  		确认提交,下一步
  	</div>
  	<msg ref="msg" v-if="true"></msg>
  </div>
</template>

<script>
  const msg = () =>  import('~/components/msg/msg')
  import {register} from '~/apis/user'
  import {declassify,numToCharacter,setCookie} from '~static/js/util'
  import {mapGetters} from 'vuex'
  export default {
    asyncData ({query}) {
      return {
        query: query
      }
    },
    data () {
      return {
        registerInfo: {
          username: '',
          password: '',
          password_confirm: ''
        },
        list: [
          {name: '手机号码', module: 'username' , type: 'number', place: '请您用手机号注册'},
          {name: '设置密码', module: 'password', type: 'password', place: '请设置密码' },
          {name: '确认密码', module: 'password_confirm', type: 'password', place: '请确认密码' },
        ],
        alerts: {
          username: '请输入手机号码',
          password: '请输入密码',
          password_confirm: '请确认密码',
        }
      }
    },
    beforeCreate () {
      this.$store.dispatch('setFooterShow', false)
    },
    computed:{
         ...mapGetters({
           'routerQuery':'get_router_query'
         })
    },
    methods: {
      async after () {
        let subm = true
        for (let i in this.registerInfo) {
        	if (this.registerInfo[i] == '') {
        		this.$refs.msg.state(this.alerts[i])
        		subm = false
        		break
        	}
        }
        if (this.registerInfo.password != this.registerInfo.password_confirm) {
      		this.$refs.msg.state('两次输入的密码不一致')
      		subm = false
        }
        if (subm) {
          let recommendName = declassify(this.query.uid)
          let brand = this.query.brand
          this.registerInfo.dreamTjrid = recommendName
          let registerRes = await register(this.registerInfo)
          if(registerRes.data.code==2000){
             this.$refs.msg.state('注册成功')
             setCookie('loginUser','',-1)
             setCookie('loginUser',this.registerInfo.username)
             setTimeout(()=>{
               // let querystr = 'uid='+numToCharacter(this.registerInfo.username)+'&brand='+brand
               // let url = 'http://' + window.location.host + '/preview?' + querystr
               // console.log(url);
               // window.location.href=
               
              this.$router.push({
                path:'../preview',
                query:{
                   uid:numToCharacter(this.registerInfo.username),
                   brand:brand
                 }
               })
             },500)
          }else{
            this.$refs.msg.state(registerRes.data.msg)
          return
          }
        }
      }
    },
    components: {
      msg
    }
  }
</script>
<style scoped>
  @import '~static/css/wusercenter/register.css';
</style>
