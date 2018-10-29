<template>
<div class="page box edituserinfo" id="editUserInfo">
  <div class="editInf_warrp">
  
  <div v-for="(i,ind) in list"
       class="weui-cell"
       v-bind:key="ind"

       >
    <div class="weui-cell__hd">
      <label class="weui-label">{{i.name}}<b v-if="i.need" style="color:red">*</b></label>
    </div>
    
    <div class="weui-cell__hd" v-if="ind!==list.length-1">
      <input :placeholder="i.place"
             type="text"
             class="weui-input"
             v-model="userInfo[i.module]" :reg="userInfo[i.module]" />
    </div>
    <div class="weui-cell__hd" v-else >
      <div class="textarea-wrapper">
        <div class="content-editable" contenteditable="true">{{userInfo[i.module]}}</div>
        <textarea placeholder="请输入您的地址" class="field-textarea" v-model="userInfo[i.module]">

        </textarea>
      </div>
    </div>
  </div>

  <div v-for="(item,index) in position"
       class="weui-cell"
       v-bind:key="index" 
  >
  <div class="weui-label__hd">
    <label class="weui-label">{{item.title}}</label>
  </div>
  <div class="weui-cell__hd">
    <input :placeholder="item.placeholder"
           v-model ="item.nameArr"
           type="text"
           class="weui-input"
    />
  </div>
  </div>
  <div class="weui-cell">
    <div class="weui-cells__title"
         style="color:#333;padding:0;font-size:18px;">个人介绍</div>
  </div>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <textarea @input="note" v-model="userInfo.dreamContent" class="weui-textarea"  placeholder="请输入个人介绍140字内(选填)" rows="3"></textarea>
        <div class="weui-textarea-counter">
          <span>{{count}}</span>/140
        </div>
      </div>
    </div>
  </div>
  <div class="page__bd page__bd_spacing">
    <div @click="save"
         class="weui-btn weui-btn_primary">保存</div>
  </div>
  </div>
</div>
</template>

<script>
  import { localStore } from "~static/js/util";
import {change} from '~/apis/user';
import {mapGetters} from 'vuex'
import keepUserOnline from '~static/js/keepUserOnline'
export default {

  middleware: ["auth"],
  data() {
    return {
      list: [
        {
          name: '昵称',
          need: true,
          place: '请输入昵称',
          module: 'dreamFullname',
          reg: ""
        },
        {
          name: '手机号1',
          need: false,
          place: '请输入正确的手机号',
          module: 'dreamMobile',
          reg: "\+?[1-9]\d*$"
        },
        {
          name: '手机号2',
          need: false,
          place: '请输入正确的手机号(选填)',
          module: 'dreamMobile2',
          reg: "\+?[1-9]\d*$"
        },
        {
          name: '微信号',
          need: false,
          place: '请输入微信号(选填)',
          module: 'dreamWx',
          reg: ""
        },
        {
          name: 'Q Q号',
          need: false,
          place: '请输入QQ号(选填)',
          module: 'dreamQq',
          reg: ""
        },
        {
          name: '邮箱',
          need: false,
          place: '请输入邮箱(选填)',
          module: 'dreamEmail',
          reg: "[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?"
        },
        {
          name: '地址',
          need: false,
          place: '请输入地址(选填)',
          module: 'dreamAddress',
          reg: ""
        }
        ],
        // 公司名称和职称
        position:[
          {title:'企业名称',nameArr:[],placeholder:'请输入企业名称(选填)'},
          {title:'职位',nameArr:[],placeholder:'请输入职位名称(选填)'}
        ],
        oldUserInfo: {},
        count: '',
        userInfo: {}
    }
  },
   computed: {
    ...mapGetters({
//    userInfo: 'getUserInfo',
      query: 'get_router_query'
    })
  },
  async created(){
      await keepUserOnline(this.$route, 'user').then(res => {
        this.oldUserInfo = Object.assign({}, res.user)
        this.userInfo = res.user
        let dreamContentLength = this.userInfo.dreamContent?this.userInfo.dreamContent.length:0
        this.count = 140 - dreamContentLength
      })
//  let companyArr =this.splitData(this.userInfo.dreamCompanyname)
//  let serviceArr =this.splitData(this.userInfo.dreamServicename)
//  console.log(companyArr)
//  console.log(serviceArr)
    this.position[0].nameArr = this.userInfo.dreamCompanyname ? this.userInfo.dreamCompanyname : ''
    this.position[1].nameArr = this.userInfo.dreamServicename ? this.userInfo.dreamServicename : ''
  },
  methods: {
    save() {
      let data = {}
//    let companyName = this.position[0].nameArr
//    let serviceName = this.position[1].nameArr
//    let arrCompany=[],arrService=[]
//    let companyStr,serviceStr
//    for(let key of companyName){
//        if(key.name&&key.name!==""){
//           arrCompany.push(key.name) 
//        }else{
//          continue
//        }
//    }
//    for(let key of serviceName){
//      if(key.name&&key.name!==""){
//        arrService.push(key.name)
//      }
//    }
//    companyStr = arrCompany.join('|$|')
//    serviceStr = arrService.join('|$|')    
      this.userInfo.dreamCompanyname = this.position[0].nameArr
      this.userInfo.dreamServicename = this.position[1].nameArr     
      for (let i in this.userInfo) {
        if (this.userInfo[i] != this.oldUserInfo[i]) {
          data[i] = this.userInfo[i]
        }
      }
      data.dreamUsername = this.oldUserInfo.dreamUsername
//    console.log(data)
      change(data).then(res => {
          if (res.code == 2000) {
            this.$store.dispatch('setUserInfo', this.userInfo)
              localStore.set(
                "userInfo",
                JSON.stringify({
                  userInfo: this.userInfo,
                  expires_in: new Date() * 1,
                  share: false
                }),
                "wvmp360"
              );
              this.$msg('修改成功')
    setTimeout(()=>{
              this.$router.push({
              path: './edituserinfo',
              query: this.query
            })
    }, 2000)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    note () {
      this.count = 140 - this.userInfo.dreamContent.length
      if ( this.count < 1) this.userInfo.dreamContent = this.userInfo.dreamContent.slice(0, 140)
    },
    splitData(data){
      if(!data){
        return
      }
      let arr = []
      let jsonArr = []
      if(data.indexOf('|$|')!=-1){
        arr = data.split('|$|')
      }else{
        arr[0] =data 
      }
      for(let i in arr){
          jsonArr.push({name:arr[i]})
      }
      return jsonArr   
    }
  }
}
</script>

<style scoped>
@import '~static/css/wusercenter/editusercenter.css';
</style>
