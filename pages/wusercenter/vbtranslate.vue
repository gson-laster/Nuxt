<template>
  <div class="box">
  <div class="new_user">
    <div class="new_vbzstitle" id="title">您的V币余额：<i>{{userInfo.dreamVcurrency}}</i></div>
      <div class="new_vbzsinput">
        <div class="t">转送数量</div>
        <div class="input">
          <input v-model="sendInfo.dreamPrice" type="text" placeholder="请输入小于余额的正整数">
        </div>
      </div>
      <div class="new_vbzsinput">
        <div class="t">对方的账号</div>
        <div class="input">
          <input v-model="sendInfo.dreamUseridxx" type="text" placeholder="请输入对方的账号">
        </div>
      </div>
      <div class="new_vbzsps"><i>注意*</i>请您核对好对方的账号后，再进行转送！</div>
      <div class="new_vbzsan">
        <!--<input name="button" type="button" value="确认转送" id="button" @click="send">-->
          <div class="confirm" @click="send">
          	确认转送
          </div>
      </div>
    <div class="recommend_list">
      <ul>
        <li class="t">
          <span>V币</span>
          <span>账号</span>
          <span>时间</span>
        </li>
        <li v-for="item in translateList" class="con">
          <span>{{item.dreamPrice}}</span>
          <span>{{item.dreamUseridxx}}</span>
          <span>{{time(item.dreamUpdatetime)}}</span>
        </li>
      </ul>
    </div>
    <pagination v-if="totalPages != 0" @changePagination="changePagination" :pagination="totalPages" nowActive="1"></pagination>
    <msg ref="msg"></msg>
  </div>
  </div>
</template>

<script>
import {vbzsList, vbzsns} from '~/apis/user.js'
import {returnTime} from '~static/js/util'
import keepUserOnline from '~static/js/keepUserOnline'
import pagination from '~/components/pagination'
const msg = () => import('~components/msg/msg')
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        sendInfo: {
          dreamPrice: '',
          dreamUseridxx: ''
        },
        userInfo: {},
        vb: '',
        translateList: [],
        pageNo: '',
        totalPages: '',
        dreamUser: '',
        id: '',
      }
    },
    middleware: ["auth"],
    async asyncData ({store, query}) {
      return {
        query: query
      }
    },
    async created(){
      await keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
      
      let list = ''
      await Promise.resolve(vbzsList({dreamUserid: this.userInfo.dreamUsername, index: 1})).then(res => {
        list = res.data
      })
      this.vb = this.userInfo.dreamVcurrency || 0
      this.dreamUser = this.userInfo.dreamUsername
        this.translateList = list.result || [],
        this.pageNo = list.pageNo || 0,
        this.totalPages = list.totalPages || 0,
        this.dreamUser = this.userInfo.dreamUsername,
        this.id = this.userInfo.id
    
    },
    methods: {
      send () {
        if (this.sendInfo.dreamPrice > this.vb) {
        	this.$refs.msg.state('余额不足')
        	return false
        }
        if ( this.sendInfo.dreamPrice < 1 || !/^[1-9]*[1-9][0-9]*$/.test(this.sendInfo.dreamPrice)) {
        	this.$refs.msg.state('请输入大于一的整数')
        	return false
        }
        if( /\d{11}/.test(this.sendInfo.dreamPrice.dreamUseridxx) ) {
        	this.$refs.msg.state('请输入正确的手机号')
        	return false
        }
//      this.sendInfo.id = this.id
        this.sendInfo.dreamUsername = this.dreamUser
        vbzsns(this.sendInfo).then(res => {
          if (res.code == 2000) {
            this.userInfo.dreamVcurrency -= this.sendInfo.dreamPrice
//          this.
            this.$msg('转送成功')
            setTimeout(()=>{
              this.$router.push({
                path: './',
                query: this.query
              })
            }, 1500)
          } else {
            this.$msg('转送失败')
          }
        }).catch(e => {
          console.log(e)
        })
      },
      time (time) {
      let t = returnTime(time)
        return t
      },
      changePagination (index) {
        Promise.resolve(vbzsList({dreamUserid: this.dreamUser, index: index})).then(res => {
          this.translateList = res.data.result,
          this.pageNo = res.data.pageNo,
          this.totalPages = res.data.totalPages
        })
      },
    },
    components: {
      pagination,
      msg
    },
    computed: {
      ...mapGetters({
//      userInfo: 'getUserInfo'
      })
    }
  }
</script>

<style>
  @import '~static/css/wusercenter/vbtranslate.css';
</style>
