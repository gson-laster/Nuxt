<template>
  <div class="box">
    <div class="new_user">
      <div class="new_usertitle">意向咨询客户</div>
      <div class="lytcorder_list">
        <ul v-if="result != ''" v-for="item in result.result">
          <li>
            <span>姓名: {{item.dreamNames}}</span>
            <span>联系方式：{{item.dreamPhone}}</span>
            <span>微信号：{{item.dreamWx}}</span>
            <span>状态：<b style="color:#009900 ;">{{state(item.dreamIsok)}}</b></span>
            <span>提交时间：{{time(item.dreamUpdatetime)}}</span>
            <span @click="shanchu(item.id)" class="an"><i>删除预定</i></span>
          </li>
        </ul>
      <div class="other" v-if="result == ''">
      	无数据...
      </div>
      </div>
    </div>
    <pagination v-if="result != ''" @changePagination="changePagination" :nowActive="result.pageNo" :pagination="result.totalPages">
      <li slot="total"><span>共<font style="font-weight:bolder">{{result.totalPages}}</font>条记录</span></li>
      <li slot="active">页次：
        <font style="color:red">{{result.pageNo}}</font>/<span>{{result.totalPages}}</span></li>
    </pagination>
  </div>
</template>

<script>
  import {lytcOrder, dellytc} from '~/apis/user'
  import {returnTime} from '~static/js/util'
  import keepUserOnline from '~static/js/keepUserOnline'
  import pagination from '~components/pagination'
  export default {

    head () {
      return {
        title: '意向咨询客户'
      }
    },
    data () {
      return {
        Username: '',
        result: ''
      }
    },
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
        this.Username = res.user.dreamUsername;
        lytcOrder({dreamTjid: res.user.dreamUsername, pageSize: 2, index: 1}).then(data => {
        var res = ''
        
        if (data.code && data.code == 2000 && !data.data.hasOwnProperty('code')) {
            res = data.data.lytc
        } else {
          res = []
        }
        this.result = res
      })
      })
    },
    methods: {
      time (i) {
        return returnTime(i)
      },
      changePagination (i) {
        lytcOrder({dreamTjid: this.Username, pageSize: 2, index: i}).then(res => {
          this.result = res.data.lytc
      })
      },
      state (s) {
        if (s) {
        	return '已联系'
        } else{
        	return '未联系'
        }
      },
      shanchu (id) {
        dellytc({id: id}).then(res => {
          if (res.data.code == 2000) {
          	this.$msg('删除成功')
          	setTimeout(() => {
          	  location.reload()
          	}, 1200)
          } else{
          	this.$msg('删除失败')
          }
        })
      }
    },
    components: {
      pagination
    }
  }
</script>

<style>
  @import '~static/css/wusercenter/intentclient.css';
</style>