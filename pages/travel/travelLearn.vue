<template>
  <div>
    <div class="new_lytcorder_con" id="new_lytcorder_con">
      <div class="new_lytcorder_t1">我想了解：</div>
      <div class="new_lytcorder_t2">欢迎DreamTrip:{{content.dreamTitle}}{{content.dreamTime1}}</div>
      <div class="new_lytcorder_t3">会员价：
        <b>${{content.dreamPrice2}}</b>
        <i>（抵积分${{content.dreamPrice}}）</i>
      </div>
      <div class="new_lytcorder_t3">时间：
        <span>{{content.dreamTime1}}</span>
      </div>
    </div>
    <form name="form1"><input type="hidden" value="" name="tid">
      <div class="new_lytcform">
        <ul>
          <li>
            <div class="t">姓名：</div>
            <div class="input"><input   type="text" placeholder="您的姓名" v-model="name"></div>
          </li>
          <li>
            <div class="t">联系方式：</div>
            <div class="input"><input   type="number" placeholder="您的联系方式" v-model="phone"></div>
          </li>
          <li>
            <div class="t">微信号：</div>
            <div class="input"><input  type="text" placeholder="您的微信号" v-model="wechat"></div>
          </li>
        </ul>
      </div>
      <div class="new_lytcform_ps">
        <span>确认以上信息无误后，点击提交按钮确认！</span>Dreamtrips工作人员会尽快和您联系。</div>
      <div class="new_lytcform_an"><input name="button" type="button" value="提交"  @click="submitData"></div>
    </form>
    <msg ref="msg"></msg>
  </div>
</template>
<script>
import {getLytcDetail,orderlytc} from '~/apis/travel'
import {declassify} from '~/static/js/util'
export default {
  components:{
    'msg':require('~components/msg/msg')
  },
  async asyncData({store,query}){
    let result = await Promise.all([
      getLytcDetail(query.id)
    ])
    let detail = result[0]
    store.dispatch('setFooterShow',true)
    return{
       content:detail,
       query:query
    }
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
  data(){
    return{
      name:'',
      phone:'',
      wechat:''
    }
  },
  methods:{
    submitData(){
      if(this.name.length<=0){
         this.$refs.msg.state('请输入您的姓名')
         return 
      }else if(this.phone<=0){
        this.$refs.msg.state('请输入您的手机号')
        return
      }
      let data = {}
      data.dreamLytcid = this.query.id
      data.dreamNames = this.name
      data.dreamWx = this.wechat
      data.dreamPhone = this.phone
      data.dreamTjid = declassify(this.query.uid)
      if(!data.dreamLytcid||!data.dreamTjid){
        this.$refs.msg.state('您没有推荐人,请联系客服')
        return
      }
      orderlytc(data).then(res=>{
       if(res.data.code==200){
         this.$refs.msg.state('报名成功')
       }else{
         this.$refs.msg.state('报名失败')
       } 
      let _this = this
      this.$router.push({path:'../travel',query:{
        uid:_this.query.uid,
        brand:_this.query.brand
      }})  
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

<style>
@import '~static/css/travel/travelLearn.css';
</style>
