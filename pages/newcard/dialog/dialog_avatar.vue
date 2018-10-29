<template>
  <div class="dialog-wrapper">
    <div id="dialog_itx" style="display: block;">
      <div class="mk">
        <div class="t" id="tab">
          <h3 v-for="(item,index) in dataTitle" v-bind:key="index" :class="{active:isActive==index}" @click="tabClick(index)" :style="{'width':widthScale}">
            {{item.title}}
          </h3>
          <div>
          </div>
        </div>
        <div id="ewm_con">
          <ul v-show="isActive==0"><img  :src="getUrl().ewmCon1">
            <br>长按二维码自动识别
            <br>保存到手机通讯录</ul>
          <ul v-show="isActive==1"><img  :src="cardQrcode">
            <br>长按二维码自动识别
            <br>微信沟通交流</ul>
          <ul v-show="isActive==2">
            <img :src="getImg(userinfo.dreamEwm)" alt="">
             <br>长按二维码自动识别
            <br>微信沟通交流</ul>
          </ul>
          <ul v-show="isActive==3">
            <img :src="getImg(userinfo.dreamFkewm)" alt="">
             <br>长按二维码自动识别
            <br>微信沟通交流</ul>
          </ul>
        </div>
      </div>
      <p class="dialog_close">
        <a href="javascript:void(0)" @click="closeAvatar">关闭</a>
      </p>
    </div>
  </div>
</template>
<script>
let dataTitle = [
  {title:'通讯录'},
  { title: '名片' }
]
let qrHost = {
  address:'http://qr.topscan.com/api.php?'
}
import {declassify} from '~static/js/util'
import appConf from '~/app.config'
import {getTyApi} from '~static/js/tyApi.js'
import {stringify} from 'querystring'
export default {
  props:['userinfo','query'],
  data() {
    return {
      isActive: 0,
      dataTitle: dataTitle,
      isShow:true,
      host:'',
      widthScale:'50%',
      cardQrcode:''
    }
  },
  created(){
    // 微信二维码,公众号二维码;
    let dreamEwm =this.getImg(this.userinfo.dreamEwm)
    let dreamFKewm =this.getImg(this.userinfo.dreamFkewm)
    let dataTitleArr =this.dataTitle.slice()
    if(dreamEwm){
      dataTitleArr.push({title:'微信'})
    }    
    if(dreamFKewm){
      dataTitleArr.push({title:'公众号'})
    }
    if(dataTitleArr.length==3){
      this.widthScale = '33.3%'
    }else if(dataTitleArr.length==4){
      this.widthScale = '25%'
    } 
    this.dataTitle = dataTitleArr   
    this.setQrcode()
  },
  methods: {
    closeAvatar() {
      this.$emit('closeAvatar',false)
    },
    tabClick(i) {
     this.isActive = i
    },
    getUrl(){
      let ewmCon1 = `http://qr.topscan.com/api.php?w=260&m=10&text=MECARD:TEL:${this.userinfo.dreamMobile};N:${this.userinfo.dreamFullname};ORG:${this.userinfo.dreamFullname};TIL:${this.userinfo.dreamServicename};ADR:${this.userinfo.dreamAddress};URL:${this.host}`
     return {
        ewmCon1:ewmCon1
      }
    },
    // 判断微信或公众号是否存在;
    getImg(param){
      if(!param||param=='null'){
          return ''
      }else{
        if(param.indexOf('http')!=-1){
           return param+'?w=260&h=260' 
        }else{
            return '/'+param+'?w=260&h=260'  
        }
      }
    },
     async setQrcode () {
      let params = {
        method: 'Qrcode.createQrcode',
        content: appConf.site_url +'/newcard?'+stringify(this.query),
        size: 10,
        background_color: 'fff',
        color: '000',
        opcity: 1,
        resource: 1
      }
      let data = getTyApi(params)
      this.cardQrcode = data
    }
  }
}
</script>

<style>
@import '~static/css/newcard/dialog/dialog_avatar.css';
</style>
