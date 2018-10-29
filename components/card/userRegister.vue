<template>
   <div class="new_wvcon_form">
      <h3>马上注册成为{{brand}}会员</h3>
      <div class="new_wvcon_form_nr">
        <ul>
          <li><label>您的姓名：</label><input name="lytcxm" id="lytcxm" type="text" v-model="dreamNames" /></li>
          <li><label>联系电话：</label><input name="lytclxfs" id="lytclxfs" type="number" v-model="dreamPhone"/></li>
          <li><label>联系微信：</label><input name="lytcwxh" id="lytcwxh" type="text" v-model="dreamWx"/></li>
        </ul>
      </div>
      <div class="new_wvcon_form_sm">检查确认无误后，提交申请<br>我们会及时与您沟通</div>
      <div class="new_wvcon_form_an">
        <input name="button" type="button" alt="submit" class="submit" :value="submitText" @click="submitHandler"/>
      </div>
    </div>
</template>
<script>
export default {
  props: {
       brand:{
         type:String,
         default:''
       },
       recommender:{
         type:String,
         default:''
       },
       isSubmit:{
         type:Boolean,
         default:false
       },
       submitText:{
         type:String,
         default:'提交'
       }
  },
  data() {
    return {
      dreamPhone: "",
      dreamWx: "",
      dreamNames: "",
    };
  },
  methods: {
    submitHandler() {
    if(this.isSubmit){
      this.$msg('您已提交申请,请勿重复提交')
      return
    }
     let data = {}
     if(!this.dreamPhone||this.dreamPhone.length<=0){
       this.$msg('请输入您联系方式')
       return
     }else if(!this.dreamWx||this.dreamWx.length<=0){
       this.$msg('请输入您的微信号')
       return
     }else if(!this.dreamNames||this.dreamNames.length<=0){
       this.$msg('请输入您的姓名')
       return
     }else if(!this.recommender||this.recommender.length<=0){
       this.$msg('缺少推荐人信息,请联系客服')
     }
     else{
      data.dreamPhone = this.dreamPhone
      data.dreamWx = this.dreamWx
      data.dreamNames = this.dreamNames
      data.dreamTjid = this.recommender
      this.$emit("submit", data)
     }
    }
  }
};
</script>
<style scoped>
@import "~static/css/newcard/cardRegister.css";
</style>
