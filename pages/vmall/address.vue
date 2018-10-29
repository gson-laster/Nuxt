<template>
  <section>
    <vmall-topbar :title="title"></vmall-topbar>
    <div class="new_reg">
      <div class="new_address_con">
        <form name="form1" method="post" id="form1" action="vmall_address.asp">
          <ul>
             <li v-for="(item,index) in list" v-bind:key="index">
            <div class="t">{{item.title}}</div>
            <div class="rinput">
              <input type="text" :name="item.name" :id="item.name" :placeholder="item.placeholder" class="input" v-model="userInfo[item.model]">
            </div>
            </li> 
          </ul>
          <div class="new_address_sm">
            <h3>此地址为默认收货地址</h3>
            <span>请确认无误后保存</span>
          </div>
            <input type="button" name="button" id="button" value="保存" class="but" @click="submit">
          </form>
      </div>
    </div>
    <msg ref="msg"></msg>
  </section>
</template>

<script>
import vmallTopbar from '~components/vmall/topBar'
import msg from '~components/msg/msg'
import {change} from '~/apis/user'
let list = [
  {title:'省份:',name:'user_add1',placeholder:'请输入省份(必填)',model:'dreamShadd1'},
  {title:'城市/县:',name:'user_add2',placeholder:'请输入城市/县(必填)',model:'dreamShadd2'},
  {title:'详细地址:',name:'user_add3',placeholder:'城区/街道/门牌号(必填)',model:'dreamShadd3'},
  {title:'邮编:',name:'user_code',placeholder:'邮政编码(选填)',model:'dreamShcode'},
  {title:'收件人:',name:'user_name',placeholder:'收件人姓名(必填)',model:'dreamShname'},
  {title:'联系方式:',name:'user_phone',placeholder:'收件人电话(必填)',model:'dreamShphone'},
]
import {mapGetters} from 'vuex'
export default {
  components: {
    vmallTopbar,
    msg
  },
  computed:{
      ...mapGetters({
        userInfo:'getUserInfo'
      })
  },
   beforeCreate () {
        this.$store.dispatch('setFooterShow', false)
      },
  watch:{
    userInfo:{
      handler:function(newValue,oldValue){
          this.$store.dispatch('setUserInfo',newValue)
      },  
      deep:true,
      immediately:true
    }
  },
  data() {
    return {
      title: '修改收货地址',
      list:list
    }
  },
  methods:{
    submit(){
       let data = {}
       let province = this.userInfo.dreamShadd1 
       let city = this.userInfo.dreamShadd2 
       let town = this.userInfo.dreamShadd3 
       let email = this.userInfo.dreamShcode
       let receiverName = this.userInfo.dreamShname
       let connect = this.userInfo.dreamShphone
       data.dreamUsername = this.userInfo.dreamUsername
       data.dreamShadd1 = province 
       data.dreamShadd2 = city 
       data.dreamShadd3 = town 
       data.dreamShcode = email 
       data.dreamShname = receiverName
       data.dreamShphone = connect
       if(!province||!city||!receiverName||!connect){
          this.$refs.msg.state('您还有必要信息未填写')
          return
       }
       change(data).then(res=>{
             if(res.code==2000){
               this.$refs.msg.state('修改成功') 
             }else{
               this.$refs.msg.state('修改失败')
             }
       }).catch(e=>{

       })
    }
  }
}
</script>

<style scoped>
@import '~static/css/vmall/vmallAddress.css';
</style>
