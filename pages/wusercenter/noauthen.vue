<template>
  <section class="container authenticated">
      
    <!-- 时间弹层 -->
    <div class="layer-date"  v-if="none">
      <div class="date-content">
        <div class="top">
          <div class="left">
            <div class="year">
              <p>开始时间</p>
              <select v-model="startTime.year" class="leftYear">
                <option v-for="item in year" :value="item">{{item}}</option>
              </select>&nbsp;年
            </div>

            <div class="date-container clearfix">
              <div class="month ">
                <select v-model="startTime.month" class="leftMonth">
                  <template v-for="item in month">
                    <option v-if="item == startTime.month" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>月
              </div>
              <div class="day">
                <select v-model="startTime.day" class="leftDay">
                  <template v-for="item in day">
                    <option v-if="item == startTime.day" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>日
              </div>
            </div>
          </div>
          <div class="right">
            <div class="year">
              <p>结束时间</p>
              <select v-model="endTime.year" class="rightYear">
                <option v-for="item in year" :value="item">{{item}}</option>
              </select>&nbsp;年
            </div>

            <div class="date-container clearfix">
              <div class="month">
                <select v-model="endTime.month" class="rightMonth">
                  <template v-for="item in month">
                    <option v-if="item == endTime.month" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>月
              </div>
              <div class="day">
                <select v-model="endTime.day" class="rightDay">
                  <template v-for="item in day">
                    <option v-if="item == endTime.day" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>日
              </div>
            </div>
          </div>
        </div>
        <div @click="confirm" class="confirm-btn">确定</div>
      </div>
    </div>
    <header @click="selectTimeShow" class="header">
      <div class="date-wrapper">
        <span class="todayDate">
          <i class="icon iconfont icon-rili icon-y"></i>
          {{startTime.year}}/{{startTime.month}}/{{startTime.day}}</span>-<span class="tomorrowDate">{{endTime.year}}/{{endTime.month}}/{{endTime.day}}</span>
      </div>

      <div class="selectTime">选择时间</div>
    </header>

    <div class="content">
      <div class="scrollload-container">
        <div class="wrapper scrollload-content">
        <div class="list" v-for="(item,index) in contentList.result" v-bind:key="index">
        <ul><li class="clear"><div class="left">会员编号</div><div class="right">{{item.dreamUsername}}<a href="javascript:;" class="copy clipBtn" data-clipboard-text="990">复制</a></div></li><li class="clear"><div class="left">推广人</div><div class="right"><span>{{item.dreamTjrid}}</span></div></li><li class="clear"><div class="left">注册时间</div><div class="right">{{item.dreamUpdatetime}}</div></li></ul>
        </div>
           <pagination v-if="contentList.totalPages" :pagination="contentList.totalPages" @changePagination="changePagination" :nowActive="contentList.pageNo" style="margin-bottom:56px;margin-top:10px;"></pagination>
          <div v-if="!contentList.totalPages" style="text-align:center;line-height:36px;background-color:#f3f3f3">没有更多数据啦......</div>
        </div>
     </div>
    </div>
  </section>
</template>

<script>
import { getUserList2new } from "~/apis/agents";
import { mapGetters } from "vuex";
import pagination from "~components/pagination";
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  data() {
    return {
      initYear: 2015,
      startTime: {},
      endTime: {},
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
      year: [],
      none: false,
      tabActiveIndex: 1,
      tabList: [
        { className: "second", text: "级别" },
        { className: "last", text: "认证时间" }
      ],
      contentList: [],
      userInfos: {}
    };
  },
  components: {
    pagination
  },
    middleware: ["auth"],
//computed: {
//  ...mapGetters({
//    userInfos: "getUserInfo"
//  })
//},
  created() {
     keepUserOnline(this.$route, 'user').then(res => {
       this.userInfos = res.user
     })
    let date = new Date();
    let nowYear = date.getFullYear();
    for (let i = nowYear; i >= this.initYear; i--) {
      this.year.push(i);
    }
    this.startTime = {
      year: nowYear,
      month: Number(date.getMonth() + 1),
      day: date.getDate()
    };
    let end = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    this.endTime = {
      year: end.getFullYear(),
      month: Number(end.getMonth() + 1),
      day: end.getDate()
    };
    this.getList(0)
      .then(res => {
        this.contentList = res;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    selectTimeShow() {
      this.none = true;
    },
    confirm() {
      this.none = false;
      this.getList(0)
        .then(res => {
          this.contentList = res;
        })
        .catch(e => {
          console.log(e);
        });
    },
    dateJoin(time) {
      let str = [];
      for (let value in time) {
        str.push(time[value]);
      }
      return str.join("-");
    },
    async getList(dreamIsok = 0, dreamAgent = 0, index = 1) {
      let data = {};
      let startT = this.dateJoin(this.startTime);
      let endT = this.dateJoin(this.endTime);
      let userId = this.userInfos.id;
      let returnResult = null;
      data.startTime = startT;
      data.endTime = endT;
      data.id = userId;
      data.dreamIsok = dreamIsok;
      data.dreamAgent = dreamAgent;
      data.index = index;
      let result = await getUserList2new(data);
      // 没有数据的时候;会返回code
      if (!result.hasOwnProperty("code")) {
        returnResult = result;
      } else {
        returnResult = result.data;
      }
      return returnResult;
    },
    changePagination(index) {
      this.getList(0,0,index).then(res=>{
        this.contentList = res
      }).catch(e=>{
        console.log(e)
      }) 
    }
  }
};
</script>
<style scoped>
@import "~static/css/wusercenter/authenticated.css";
</style>