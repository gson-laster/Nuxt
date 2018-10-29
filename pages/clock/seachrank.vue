<template>
   <div class="box seachrank">
       <section>
        <div class="record ">
          <div class="recordbg">
            <div class="rankimg">
              <img :src="setImgUrl({src: userInfo.dreamImg})"/>
            </div>
            <div class="recordlist"><div class="flex1">您已连续打卡<span>{{self.dreamContinuity}}天</span></div><div class="flex2"></div><div class="flex3">打卡总数<span>{{self.dreamDkcount}}天</span></div></div>
            <div class="recordlist"><div class="flex1">最高连续纪录<span>{{self.dreamTopranking}}天</span></div><div class="flex2"></div><div class="flex3">最早纪录<span>{{getHis(self.dreamEarliest)}}</span></div></div>
          </div>

           <div class="chakan">
                                您今日在伙伴中的排名 &nbsp;第<span>{{self.dreamWorldranking}}</span>名
          </div>

        </div>
      </section>
      <section class="rankinglistbg">
          <div class="ranktitle">
            今日<span>世界</span>打卡排行榜
          </div>
        <div class="rankinglist">
          <div class="flex">
            <div class="f1 paddnone">排行</div>
            <div class="f2">早起者</div>
            <div class="f3"></div>
            <div class="f4">打卡时间</div>
            <div class="f5"></div>
          </div>
          <div  v-for="(l, index) in list.result" class="flex">
            <div class="f1">
                <img v-if="(index + 5 * (indexs -1))== 0" src="~static/img/clock/first.png"/>
                <img v-else-if="(index + 5 * (indexs -1)) == 1" src="~static/img/clock/second.png"/>
                <img v-else-if="(index + 5 * (indexs -1)) == 2" src="~static/img/clock/third.png"/>
                <span v-else>{{(index + 5 * (indexs -1)) + 1}}</span>
              </div>
            <div class="f2"><img :src="setImgUrl({src: l.dreamImg})"/></div>
            <div class="f3">{{l.dreamFullname}}</div>
            <div class="f4">{{getHis(l.dreamUpdatetime)}}</div>
            <div @click="lick(l.dreamUsername, index, l.dreamLikes)" class="f5"><p>{{l.dreamLikes}}</p><img src="~static/img/clock/good.png"/></div>
          </div>
                    <!--<div v-for="(l, index) in list.result" class="flex">
            <div class="f1">
              <img v-if="(index + 5 * (indexs -1))== 0" src="~static/img/clock/first.png"/>
              <img v-else-if="(index + 5 * (indexs -1)) == 1" src="~static/img/clock/second.png"/>
              <img v-else-if="(index + 5 * (indexs -1)) == 2" src="~static/img/clock/third.png"/>
              <span v-else>{{(index + 5 * (indexs -1)) + 1}}</span>
            </div>
            <div class="f2"><img :src="setImgUrl({src: l.dreamImg})"/></div>
            <div class="f3">{{l.dreamFullname}}</div>
            <div class="f4">{{getHis(l.dreamUpdatetime)}}</div>
            <div class="f5" @click="lick(l.dreamUsername, index, l.dreamLikes)"><p>{{l.dreamLikes}}</p><img src="~static/img/clock/good.png"/></div>
          </div>-->
        </div>
        <pagination v-if="list.totalPages != 1" @changePagination="changePagination" :pagination="list.totalPages" :nowActive="list.pageNo"></pagination>
            <div class="t_align" style="border-bottom: 1px solid #EEEEEE; border-top: 1px solid #EEEEEE;" v-if="list.result.length == 0">
                                 没有更多数据了...
          </div>
      </section>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {editorpunchcard, punchcardlike, getpunchacard, punchcardlist, getpunchacardone} from '~/apis/user.js'
  import pagination from '~components/pagination'
  import setImgUrl from '~static/mixins/setImgUrl'
  import keepUserOnline from '~static/js/keepUserOnline'
  
  export default{
    async asyncData({store}){
      
 let list = {totalPages: '', result: '', pageNo: 1}
     // list.result = list.result.reverse()
      return {
        self: {},
        list: list,
        indexs: 1,
        
        
      }
    },
    mixins: [setImgUrl],
    data () {
      return {
        userInfo: {dreamImg: ''}
      }
    },
    fetch ({store}) {
      store.state.footerShow = false
    },
      async created() {
        await keepUserOnline(this.$route, 'user').then(res => {
          this.userInfo = res.user
      })
     let res =await getpunchacardone({dreamUsername: this.userInfo.dreamUsername})
      this.self = res.data.hasOwnProperty('data') ? res.data.data : []
      let list =await punchcardlist()
//    console.log(list)
      this.list = list.data.data.hasOwnProperty('code') ? list.data.data.data : list.data.data
      },
    methods:{
      getHis(t){
        if (t) {
          let d = new Date(t);
          let h = this.num(d.getHours())
          let m = this.num(d.getMinutes())
          let i = this.num(d.getSeconds())
          return `${h}:${m}:${i}`
        }
      },
      num: function (num) {
        return num < 10 ? '0' + num : num;
      },
      changePagination(index){
        let _t = this;
        let list = punchcardlist({index: index}).then(list => {
            _t.indexs = index
          _t.list = list.data.data.hasOwnProperty('code') ? list.data.data.data : list.data.data
        })
      },
      lick(dreamUsername, i, like){
          punchcardlike({dreamUsername: dreamUsername}).then(res => {
            console.log(res.data.code)
            if (res.data.code == 2000) {
              this.$msg('点赞成功')
              this.$set(this.list.result[i], 'dreamLikes', ++ like)
            }
          })
        },
    },
    computed: {
      ...mapGetters({
        query: 'get_router_query',
//      userInfo: 'getUserInfo'
        
      })
    },
    components: {
      pagination,
    },
  }
</script>

<style>
  @import '~static/css/clock/seachrank.css';
  @import '~static/css/clock/both.css';
</style>