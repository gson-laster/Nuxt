<template>
  <div class="box team"  ref="scroll-container">
     <search-header ref="title" :teamNumber="teamNumber"></search-header>
     <user-item ref="userItems" v-for="(user,index) in Info" :key="index" :user="user" :index="index" :query="setQuery()"></user-item>
     <div class="fixedBar" v-show="isShowBar">
       <span>{{current}}</span>
     </div>
     <div class="indexlist-indicator" v-show="showIndex">{{current}}</div>
     <team-bottom></team-bottom>
     <div class="initail-bar">
       <ul>
         <li v-for="(alpha,index) in barData" :key="index" :class="{active:index==currentIndex}" @click="selectIndex(index)"> <span>{{alpha}}</span> </li>
       </ul>
     </div>
  </div>
</template>
<script>
import searchHeader from "~components/common/searchHeader.vue";
import userItem from "~components/common/userItem.vue";
import teamBottom from "~components/usercenter/teamBottom.vue";
import appConf from "~/app.config.js";
import setQuery from "~static/mixins/setQuery.js";
import {getRect, throttle} from "~static/js/util.js"
import {getfriend} from '~/apis/user.js';
export default {
  async asyncData ({store, query}) {
    let info = [{
      letter: "★",
      data: [{ name: "标签", imgUrl: appConf.book_mark ,url:'/team/markManage'}]
    }]
    let teamNumber = 0
    let friends = await getfriend({dreamTjrid: store.state.userInfo.dreamUsername}).then(res => {
      if (res.code == 2000) {
        let _data = res.data
        for (var k in _data) {
          if(_data[k].length > 0 ) {
            let tmp = {
              letter: k,
              data: _data[k]
            }
            teamNumber += _data[k].length
            info.push(tmp)
          }
        }
      }
    })
   return {
     Info: info || [],
     teamNumber: teamNumber
   }
  },
  data() {
    return {
      barData: [],
      titleHeight:null,
      currentIndex:1,
      current: '',
      isShowBar: false,
      docEleTop: 0,
      showIndex: false,
      needReduce: false, // 记录是否需要减
      clickSelectIndex: 0
    };
  },
  mixins:[setQuery],
  created() {
    // 内容组和整个list的高度
    this.listHeight = []
    this.groupList = []
    // touchstart的坐标;
    this.startPos = {}
    this.movePos = {}
    this.position =0
    let arr = [];
    for(var i=0;i<this.Info.length;i++){
        arr.push(this.Info[i]['letter'])
    }
    this.barData = arr;
  },
  mounted() {
      this.$nextTick(()=>{
         this.titleHeight = this.$refs.title.$el?getRect(this.$refs.title.$el).height:0
         this._calculateHeight()
         window.addEventListener('scroll',throttle(this.scrollHandler, 200, 1000/60), false)
      })
      require('~static/js/animation.js')
      window.addEventListener('scroll',throttle(this.scrollHandler, 200, 1000/60), false)
  },
  methods:{
    changeStyle(currentIndex){
      this.current = this.users[currentIndex].letter
      this.isShowBar = true
    },
    selectIndex(index){
      let docTop = document.documentElement.scrollTop
      this.clickSelectIndex = index
      if(index > 0) {
        Math.animation(docTop, document.querySelectorAll('.list')[index].offsetTop, 5000,function (value) {
          document.documentElement.scrollTop = value
        })
      }else{
        Math.animation(docTop, 0, 5000,function (value) {
          document.documentElement.scrollTop = value
        })
      }
      this.current = this.users[index].letter
      this.showIndex = true
      setTimeout(() => this.showIndex = false, 1500)
    },
    scrollHandler(){
      let listItems = document.querySelectorAll('.list')
      let docTop = document.documentElement.scrollTop

      if(!listItems[this.currentIndex]) return
      if(docTop - this.docEleTop > 0){
        // console.log('向下');
        if(listItems[this.currentIndex].offsetTop - docTop <= -(listItems[this.currentIndex].offsetHeight)){
          this.currentIndex = this.currentIndex+1
        }
      }else{
        // console.log('向上');
        if(listItems[this.currentIndex-1].offsetTop - docTop >= -(listItems[this.currentIndex-1].offsetHeight)){
          if(this.currentIndex != this.clickSelectIndex)
            this.currentIndex = this.currentIndex >= 2 ? this.currentIndex - 1 : 1
          else
            this.currentIndex = this.currentIndex
        }
      }
      this.docEleTop = docTop
      if(listItems[1].offsetTop - docTop > 0) {
        this.isShowBar = false
        return;
      }
      this.changeStyle(this.currentIndex)
    },
    _calculateHeight(){
      this.groupList =this.$el.getElementsByClassName('list')
      if(!this.groupList){
        return
      }
      let height =  this.titleHeight
      this.listHeight.push(height)
      for(let i=0;i<this.groupList.length;i++){
         let item = this.groupList[i]
         height+=item.clientHeight
         this.listHeight.push(height)
      }
    }
  },
  components: {
    searchHeader,
    userItem,
    teamBottom
  },
  destroy(){
    window.addEventListener('scroll', null, false)
  }
};
</script>

<style scoped>
.team{
  /* pointer-events: none; */
}
.team .initail-bar {
  position: fixed;
  right: 4px;
  top: 50%;
  width: 34px;
  transform: translate3d(0, -50%, 0);
}
.team .initail-bar li{
  width: 100%;
  height: 28px;
  text-align: center;
}
.team .initail-bar span {
  display: inline-block;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  padding: 1px;
}
.team .initail-bar .active span{
  background-color: #80c269;
  border-radius: 50%;
  color: #fff;
  width: 20px;
  height: 20px;
  /* transition: 500 ease-in-out; */
  animation: alternate ;
}
.team .fixedBar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #eee;
  height: 24px;
}
.team .indexlist-indicator {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    line-height: 50px;
    background-color: rgba(0,0,0,.7);
    border-radius: 5px;
    color: #fff;
    font-size: 22px;
}
</style>
