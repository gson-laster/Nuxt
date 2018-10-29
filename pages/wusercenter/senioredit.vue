<template>
    <div class="newedit_title box">
    <div class="neweditbg">
      <form name="form1" method="post" action="http://www.wvmp360.com/edituser_ok.html?action=edituser_step5">
        <div class="newedit_form">
          <ul>
            <template v-for="i in list">
            <li><h3 class="w2">{{i.name}}</h3><i>（{{i.shortName}}）</i></li>
            <li class="inputedit"><input type="text" :placeholder="i.place" v-model="userInfos[i.module]"></li>
            <li class="nonr"></li>
            </template>
          </ul>
        </div>
        <div class="newedit_form_an" style="padding-bottom:20px;bottom:48px">
          <input type="button" value="使用默认链接" @click="redefault()"> 
          <input type="button" value="保存" @click="save"></div>
      </form>
      <div class="newedit_sm">
        <div>高级设置说明：<br>1、自定义链接的位置<br><img src="~static/img/wusercenter/newedit_04.png" align="absmiddle"> 或 <img src="~static/img/wusercenter/newedit_05.png" align="absmiddle"><br>2、如需网络建设服务，咨询热线： <i>4008958815</i><br>3、如无链接可不设置，即使用默认链接。</div>
      </div>
    </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
import keepUserOnline from '~static/js/keepUserOnline'
  import {change, changCardeditor} from '~/apis/user.js'
  export default {
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfos = res.user
      })
    },
    data () {
      return {
        list: [
          {name: '自定义链接一', shortName: '公司网站', module: 'dreamWeburl', place: '默认为 首页'},
          {name: '自定义链接二', shortName: '会员相册', module: 'dreamPhotourl', place: '默认为 会员分享'},
          {name: '自定义链接三', shortName: '事业画册', module: 'dreamYxtgurl', place: '默认为 通用的事业画册'},
          {name: '自定义链接四', shortName: '底部产品导航', module: 'dreamProurl', place: '默认为 品牌产品列表'},
        ],
        userInfos: {}
      }
    },
    middleware: ["auth"],
    methods: {
      save () {
        change ({dreamUsername: this.userInfo.dreamUsername, dreamWeburl: this.userInfos.dreamWeburl, dreamPhotourl: this.userInfos.dreamPhotourl, dreamYxtgurl: this.userInfos.dreamYxtgurl, dreamProurl: this.userInfos.dreamProurl}).then(res => {
          if (res.code == 2000) {
            this.$msg('修改成功')
          	Object.assign(this.userInfo, this.userInfos)
          	this.go()
          } else {
            this.$msg('修改失败')
          }
        })
      },
      redefault () {
        changCardeditor(this.userInfo.dreamUsername).then(res => {
          if (res.code == 2000) {
            this.$msg('重置成功')
            this.go()
          } else {
            this.go()
            this.$msg('设置成功')
          }
        })
      },
      go () {
        this.$router.push({
          path: './',
          query: this.query
        })
      }
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
  @import '~static/css/wusercenter/senioredit.css';
</style>