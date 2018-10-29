<template>
<div>
  <!-- 轮播图 -->
  <div class="banner">
    <swiper :auto="4000">
      <swiper-item v-for="(item, index) in bannerList"
                   :key="index">
        <img src=""
             v-lazy="item.dreamDefaultpicurl+'?w=375&h=212'"
             :alt="item.dreamTitle" />
      </swiper-item>
    </swiper>
  </div>
  <travel-search :placeholder="placeholder"
                 toUrl="travel"
                 seacheField="dreamTitle"></travel-search>
  <div class="newnews_list noline"
       style="margin-bottom: 80px">

    <!-- tab切换 -->
    <div class="lytc_tab">
      <ul class="lytc_tab_nav">
        <li v-for="(item,index) in tabList"
            :key="index"
            :name="'#lytc_tab_con'+(index+1)"
            :class="{active:isTab==index}"
            @click="tabClick(index)">
          <a href="javascript:;">{{item.name}}</a>
          <i></i>
        </li>
      </ul>

      <div class="lytc_tab_con"
           :id="['lytc_tab_con'+(index+1)]"
           v-for="(item,index) in tabContentList"
           :key="index"
           v-if="isContentIndex==index">
        <div v-if="(index==tabContentList.length-1)">
          <div class="form-item">
            <label class="text">积分</label>
            <input type="text"
                   v-model="time1">
            <span>~</span>
            <input type="text"
                   v-model="time2">
          </div>
          <div class="form-item">
            <button class="selecte-btn"
                    @click="selectPoint()">筛选</button>
          </div>
        </div>

        <ul v-else>
          <li v-for="(li,i) in item"
              :key="i"
              @click="selectTabConLi(li,i)">
            <a href="javascript:;"
               :class="{a:i==firstAIndex}"
               v-if="index==0">{{li.dreamNames}}</a>
            <a href="javascript:;"
               :class="{a:i==secondAIndex}"
               v-if="index==1">{{li.dreamNames}}</a>
            <a href="javascript:;"
               :class="{a:i==thirdAIndex}"
               v-if="index==2">{{li.dreamNames}}</a>
            <a href="javascript:;"
               :class="{a:i==fourthAIndex}"
               v-if="index==3">{{li.dreamNames}}</a>
          </li>
        </ul>

        <div class="lytc_tab_close"
             @click="tabConClose(index)">关闭</div>
      </div>
    </div>

    <!-- 列表内容 -->
    <div class="lytcclass"
         style=" padding:0 3px;">
      <loadmore :bottom-method="loadBottom"
                :bottom-all-load="allLoaded"
                :auto-fill="true"
                :bottom-distance="30"
                :bottom-status.sync="bottomStatus"
                ref="loadmore">
        <travel-item v-for="(item,index) in travelList"
                     :content="item"
                     :key="index"
                     :query="query"
                     :path="path"></travel-item>
      </loadmore>
    </div>
  </div>
  <msg ref="msg"></msg>
</div>
</template>

<script>
import appConf from '~/app.config'
import {
  getBannerList
} from '~/apis/banner'
import {
  getLytcClass,
  getLytcList
} from '~/apis/travel'
export default {
  components: {
    "travel-search": require("~components/common/search.vue"),
    "travel-item": require("~components/travel/index.vue"),
    "swiper": require("~components/swiper/index.vue"),
    "swiper-item": require("~components/swiper/swiper-item.vue"),
    "msg": require("~components/msg/msg.vue"),
    "loadmore": require("~components/common/loadmore.vue")
  },
  async asyncData({
    store,
    query
  }) {
    let options = {
      index: 1,
      pageSize: 10
    }
    if (query.dreamTitle) {
      options.dreamTitle = query.dreamTitle
    }
    let result = await Promise.all([
      getBannerList({
        type: 'travel'
      }),
      getLytcClass(),
      getLytcList(options)
    ])
    let bannerList = result[0]
    let area = result[1]['area']
    let month = result[1]['month']
    let zt = result[1]['zt']
    let travelList = result[2].lytc.result
    return {
      bannerList: bannerList,
      area: area,
      month: month,
      zt: zt,
      travelList: travelList,
      query: query
    }
  },
  data() {
    return {
      placeholder: '想去哪儿？从这里开始...',
      path: "travel/traveldetail",
      isTab: -1,
      tabList: appConf.travel_tab,
      isAIndex: 0,
      isContentIndex: -1,
      firstAIndex: 0,
      secondAIndex: 0,
      thirdAIndex: 0,
      fourthAIndex: 0,
      tabContentList: [
        [
          {
            dreamNames: '默认排序'
          },
          {
            dreamNames: '更新时间',
            dreamUpdatetime: '2015/07/06'
          },
          {
            dreamNames: '价格从高到低',
            dreamPrice2: 1
          },
          {
            dreamNames: '价格从低到高',
            dreamPrice2: 2
          },
        ],
        //地域排序
        [
          {
            dreamNames: '全部'
          }
        ],
        // 主题排序;
        [
          {
            dreamNames: '全部'
          }
        ],
        // 月份;
        [
          {
            dreamNames: '全部'
          }
        ],
        // 积分;
        [

        ]
      ],
      dataArr: [],
      data_first: {},
      data_second: {},
      data_thir: {},
      data_four: {},
      data_fifth: {},
      time1: '',
      time2: '',
      pageIndex: 1,
      allLoaded: false,
      hasNext: true,
      bottomStatus: '',
      wrapperHeight: ''
    };
  },
  created() {
    // 地域排序内容;
    this.area.unshift(this.tabContentList[1][0])
    this.tabContentList[1] = this.area

    // 主题排序内容;
    this.zt.unshift(this.tabContentList[2][0])
    this.tabContentList[2] = this.zt

    // 月份;
    let monthArr = []
    monthArr.push(this.tabContentList[3][0])
    for (let value of this.month) {
      monthArr.push({
        dreamNames: value,
        dreamTime1: value
      })
    }
    this.tabContentList[3] = monthArr
  },
  mounted() {
    // if (process.BROWSER_BUILD) {
    //   this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // }


  },
  methods: {
    tabClick(index) {
      this.isTab = index
      this.isContentIndex = index
    },
    selectTabConLi(li, index) {
      this.isAIndex = index
      let _this = this
      switch (_this.isTab) {
      case 0:
        _this.firstAIndex = index
        for (let k in li) {
          if (k == 'dreamNames') {
            continue
          } else {
            _this.data_first[k] = li[k]
          }
        }
        break;
      case 1:
        _this.secondAIndex = index
        for (let k in li) {
          if (k == 'dreamNames') {
            continue
          } else {
            _this.data_second.dreamClassid = li[k]
          }
        }
        break;
      case 2:
        _this.thirdAIndex = index
        for (let k in li) {
          if (k == "dreamNames") {
            continue
          } else {
            _this.data_thir.dreamZtid = li[k]
          }
        }
        break
      case 3:
        _this.fourthAIndex = index
        for (let k in li) {
          if (k === "dreamNames") {
            continue
          } else {
            _this.data_four.dreamTime1 = parseInt(li[k])
          }
        }
        break
      }
      let data = this.concatParam()
      getLytcList(data)
        .then(res => {
          if (!res.hasOwnProperty('code')) {
            this.travelList = res.lytc.result
          }
        })
        .catch(e => {
          this.allLoaded = true
        })

    },
    tabConClose(index) {
      this.isContentIndex = -1
    },
    selectPoint() {
      if (this.time1 == '' || this.time2 == '') {
        this.$refs.msg.state('还有信息未填写')
        return
      }
      let data = this.concatParam()
      let result = getLytcList(data)
    },
    // 拼接请求参数;
    concatParam(index, pageSize) {
      let data = {}
      index = index ? index : 1
      pageSize = pageSize ? pageSize : 10
      if (JSON.stringify(this.data_fifth !== '')) {
        for (let k in this.data_first) {
          data[k] = this.data_first[k]
        }
      }
      if (JSON.stringify(this.data_second !== '')) {
        for (let k in this.data_second) {
          data[k] = this.data_second[k]
        }
      }
      if (JSON.stringify(this.data_thir !== '')) {
        for (let k in this.data_thir) {
          data[k] = this.data_thir[k]
        }
      }
      if (JSON.stringify(this.data_four !== '')) {
        for (let k in this.data_four) {
          data[k] = this.data_four[k]
        }
      }
      if (JSON.stringify(this.data_fifth !== '')) {
        for (let k in this.data_fifth) {
          data[k] = this.data_fifth[k]
        }
      }
      if (this.time1 !== '' && this.time2 !== '') {
        data['time1'] = this.time1
        data['time2'] = this.time2
      }
      data.index = index
      data.pageSize = pageSize
      return data
    },
    loadBottom(id) {
      if (this.hasNext == false) {
        this.allLoaded = false
        return
      }
      this.pageIndex++
        let data = this.concatParam(this.pageIndex)
      getLytcList(data)
        .then(res => {
          if (!res.hasOwnProperty('code')) {
            let loadList = res.lytc.result
            this.hasNext = res.lytc.hasNext
            this.travelList.push.apply(this.travelList, loadList)
            this.$refs.loadmore.onBottomLoaded()
          } else {
            this.allLoaded = false
          }
        })
        .catch(e => {
          this.allLoaded = false
        })
    }
  }
};
</script>
<style scoped>
@import '~static/css/travel/travelTab.css';
.newnews_list {
  float: left;
  width: 100%;
}

.lytcclass {
  padding: 0 3px;
  margin: 0 5px;
  padding: 10px;
  font-size: 18px;
  font-family: "微软雅黑";
  border: 1px #e8e8e8 solid;
  border-top: none;
  background: #fff;
  overflow: hidden;
}

.newnews_list.noline .lytcclass,
.newnews_list.noline .single_item {
  margin: 0;
  border: none;
  border-bottom: 1px #e8e8e8 solid;
}

@media screen and (max-width: 380px) {
  .lytcclass {
    font-size: 16px;
    padding: 10px;
  }
}
</style>
