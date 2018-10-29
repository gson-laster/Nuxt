<template>
   <div class="box new_user">
        <div class="new_usertitle">提现实名认证<span class="red">认证状态：{{realname.state}}</span></div>
            <input name="imgpic" type="hidden">
            <input name="imgpic2" type="hidden">
            <div class="new_usersmrz">
                <ul>
                    <li>
                        <div class="t">真实姓名：</div>
                        <div class="input">
                          <input type="text" :disabled="!realname.btnStatus" v-model="realname.real.dreamSmrzname" placeholder="请填写真实姓名">
                        </div>
                    </li>
                    <li>
                        <div class="t">银行卡号：</div>
                        <div class="input">
                            <input type="text" :disabled="!realname.btnStatus"  v-model="realname.real.dreamSmrzyhkh" placeholder="请填写有效银行卡号">
                        </div>
                    </li>
                    <li v-if="realname.btnStatus">
                        <div class="t">确认卡号：</div>
                        <div class="input">
                            <input :disabled="!realname.btnStatus"  v-model="realname.real.confirmdreamSmrzyhkh" placeholder="再一次确认银行卡号">
                        </div>
                    </li>
                    <li>
                        <div class="t">开户银行：</div>
                        <div class="input">
                            <input :disabled="!realname.btnStatus"  v-model="realname.real.dreamSmrzkhyh" placeholder="如 建设银行/工商银行">
                        </div>
                    </li>
                    <li>
                        <div class="t">手机号码：</div>
                        <div class="input">
                            <input :disabled="!realname.btnStatus" v-model="realname.real.dreamSmrzphone" placeholder="填写真实有效的手机号码">
                        </div>
                    </li>
                </ul>
            </div>
            <div @click="save" v-if="realname.btnStatus" class="new_usersmrz_an">
                <input type="button" value="提交信息">
            </div>
            <div class="new_usersmrz_ps">提现温馨提示
                <br>关系到资金安全！请仔细核对以上相关信息！
                <br>通过认证的信息不能修改，如要修改信息请联系管理员，不便之处请谅解！
            </div>
            <msg ref="msgs"></msg>
    </div>
</template>

<script>
import {realNameInfo, userSmrz} from '~/apis/user.js';
const msg = () => import('~/components/msg/msg');
import keepUserOnline from '~static/js/keepUserOnline'
import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        dreamUsername: '',
        userInfo: {},
        realname: {
          real: {}
        }
      }
    },
    middleware: ["auth"],
    async beforeCreate(){
      let userData = await keepUserOnline(this.$route, 'user')
      this.userInfo = userData.user
      let res = await realNameInfo({dreamSmrzuserid: this.userInfo.dreamUsername})
      let state = ''
      let btnStatus = true
      if (res.code == 2000 && !res.data.code) {
        if (res.data.dreamIsok) {
        	state = '审核成功'
          btnStatus = false
        } else {
          state = '审核中'
          btnStatus = false
        }
      } else {
        state = '未提交'
        btnStatus = true
      }
      let data = {state: state, btnStatus: btnStatus}
      data.real = {}
      if (res.code == 2000 && !res.data.code) {
        data.real = res.data
      } else {
        data.real = {
          dreamSmrzname: '',
          dreamSmrzyhkh: '',
          confirmdreamSmrzyhkh: '',
          dreamSmrzkhyh: '',
          dreamSmrzphone: ''
        }
      }
      this.realname = data
    },
    methods: {
      save () {
        var sub = true
       for (let i in this.realname.real) {
        if (i == ('dreamSmrzname' || 'dreamSmrzyhkh' || 'confirmdreamSmrzyhkh' || 'dreamSmrzkhyh' || 'dreamSmrzphone')) {
         	if (this.realname.real[i] == '') {
         	  sub = false
         	  this.$refs.msgs.state('请完善所有资料')
         	  break
         	}
       	}
       }
       if (this.realname.real.dreamSmrzyhkh != this.realname.real.confirmdreamSmrzyhkh) {
   	      sub = false
       	  this.$refs.msgs.state('两次输入的银行卡号不一致')
       }
        if (sub) {
  //      delete this.data.real.confirmdreamSmrzyhkh
          this.realname.real.dreamSmrzuserid = this.userInfo.dreamUsername
       	    userSmrz(this.realname.real).then(res => {
  //          console.log(res);
              if (res.code == 4000) {
              	this.$msg('提交成功')
              	setTimeout(() => {
              	  location.reload()
              	}, 1500)
              }
       	  })
        }
      },
      computedValue(value){
        return value ? value : ''
      }
    },
    components: {
      msg
    },
//  computed: {
//    ...mapGetters({
//      userInfo: 'getUserInfo'
//    })
//  }
  }
</script>

<style scoped>
  @import '~static/css/wusercenter/realname.css';
</style>
