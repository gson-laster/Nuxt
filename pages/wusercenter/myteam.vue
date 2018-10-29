<template>
  <div class="box myteam">
    <div class="codebg" v-if="code">
    <div class="yuanjiao">
      <div @click="close" class="close">
        X
      </div>
      <div>
      <div class="wcodeImg">
      	<img :src="weixinCode">
      </div>
      <div class="codeInfo">
      	<br>长按二维码识别<br>加我微信
      </div>
      </div>
    </div>
    </div>
    <div class="new_renmai">
      <div class="new_myfriendt">我有<i>{{Info.length}}</i>位伙伴 点击头像显示微信二维码</div>
      <div class="new_rm_mk">
        <div @click="viewCode(item.dreamEwm)" class="teamList" v-for="item in Info">
          <div class="single_item">
            <div class="new_rm_list">
                <div class="new_rm_list_img"><img :src="item.dreamImg" border="0"></div>
                <div v-if="item.dreamFullname" class="new_rm_list_con">{{item.dreamFullname}}</div>
                <div v-else class="new_rm_list_con">{{item.dreamUsername}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import keepUserOnline from '~static/js/keepUserOnline'
import {getfriend} from '~/apis/user.js';
  export default {

    middleware: ["auth"],
    created(){
      
     keepUserOnline(this.$route, 'user').then(res => {
       getfriend({dreamTjrid: res.user.dreamUsername}).then(res => {
        if (res.code == 2000) {
          this.info = res.data
        }
      })
     })
    
    },
    data () {
      return {
        code: false,
        weixinCode: '',
        Info: []
      }
    },
    head () {
      return {
        title: '我的伙伴'
      }
    },
    methods: {
      close () {
        this.code = false
      },
      viewCode(src) {
        this.weixinCode = src
        this.code = true
      }
    }
  }
</script>

<style>
  @import '~static/css/wusercenter/myteam.css';
</style>