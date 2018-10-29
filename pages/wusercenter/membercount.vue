<template>
  <section class="box membercount">
    <header class="header">
      <div class="selectTime">
        <i class="icon iconfont icon-rili icon-y"></i>
        <p>选择时间</p>
      </div>
    </header>
    <div class="date-container clear">
      <p>
        <select class="selectYear" v-model="nowYear">
        <option :value="item" v-for="(item,index) in year" v-bind:key="index">
          {{item}}
        </option>        
        </select>年
      </p>
      <p>
        <select class="selectMonth" v-model="nowMonth">
          <option v-for="(item,index) in month" v-bind:key="index">
            {{item}}
          </option>
        </select>月
      </p>
      <p>
        <select class="selectDay" v-model="nowDay">
          <option :value="item" v-for="(item,index) in day" :key="index">{{item}}</option>
        </select>  
      </p>
    </div>
    <div class="confirm-btn" @click="check">查看认证情况</div>
    <div class="count-detail">
      <p class="">截止到<span class="date-line">{{nowTime}}</span></p>
      <p>
        共有 <span class="member-count">{{account.allcount}}</span>名会员通过认证
      </p>
      <p>
        其中今日 <span class="member-todayCount">{{account.count}}</span>名
      </p>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { dateFormat } from "~static/js/util";
import { isLeapYear } from "~static/js/util";
import keepUserOnline from '~static/js/keepUserOnline'
import { getCountByIsOkTime2new } from "~/apis/agents";
export default {
  data() {
    return {
      time: {},
      nowTime: "",
      timer: null,
      year: [],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      initYear: 2015,
      nowYear: null,
      nowDay: null,
      nowMonth: null,
      account:{
        count:0,
        allcount:0
      },
      userInfos: {}
    };
  },
//computed: {
//  ...mapGetters({
//    userInfos: "getUserInfo"
//  })
//},
  created() {
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfos = res.user
      })
    
    // 设置年;
    this.nowYear = new Date().getFullYear();
    this.nowMonth = new Date().getMonth() + 1;
    this.nowDay = new Date().getDate();
    for (let i = this.initYear; i <= this.nowYear; i++) {
      this.year.unshift(i);
    }
    this.timer = setInterval(() => {
      this.nowTime = dateFormat("yy-MM-dd HH:mm:ss", Date.now());
    }, 500);
    this.getData().then(res=>{
      if(!res.hasOwnProperty('code')){
             this.account = res 
          }else{
             this.account.count =0
             this.account.allcount = 0    
          }   
    }).catch(e=>{
          console.log(e)
    })  
  },
  methods: {
    check() {
      this.getData().then(res=>{
          if(!res.hasOwnProperty('code')){
             this.account = res 
          }else{
             this.account.count =0
             this.account.allcount = 0    
          }   
      }).catch(e=>{
          console.log(e)
      })
    },
    async getData(time) {
      if (!time) {
        time = this.nowYear + "/" + this.nowMonth + "/" + this.nowDay;
      }
      let id = this.userInfos.id;  
      let result = getCountByIsOkTime2new({ dreamIsoktime: time, id: id });
      return result;
    }
  }
};
</script>
<style>
@import "~static/css/wusercenter/membercount.css";
</style>