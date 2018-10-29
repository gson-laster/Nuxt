<template>
  <div class="box team" @touchstart="scrollStart" ref="scroll-container">
     <search-header ref="title"></search-header>
     <user-item ref="userItems" v-for="(user,index) in users" :key="index" :user="user" :index="index" :query="setQuery()"></user-item>
     <team-bottom></team-bottom>
     <div class="initail-bar">
       <span v-for="(alpha,index) in barData" :key="index" :class="{active:index==currentIndex}">{{alpha}}</span>
     </div>
  </div>
</template>
<script>
import searchHeader from "~components/common/searchHeader.vue";
import userItem from "~components/common/userItem.vue";
import teamBottom from "~components/usercenter/teamBottom.vue";
import appConf from "~/app.config.js";
import setQuery from "~static/mixins/setQuery.js";
//import keepUserOnline from '~static/js/keepUserOnline'
import { getRect } from "~static/js/util.js";
export default {
  data() {
    return {
      users: [
        {
          letter: "★",
          data: [
            {
              name: "标签",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/markManage"
            }
          ]
        },
        {
          letter: "A",
          data: [
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test1",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            }
          ]
        },
        {
          letter: "B",
          data: [
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test2",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            }
          ]
        },
        {
          letter: "C",
          data: [
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            }
          ]
        },
        {
          letter: "D",
          data: [
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            }
          ]
        },
        {
          letter: "E",
          data: [
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            }
          ]
        },
        {
          letter: "F",
          data: [
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            },
            {
              name: "test3",
              imgUrl: appConf.book_mark,
              url: "/wusercenter/temUserDetail"
            }
          ]
        }
      ],
      barData: [],
      titleHeight: null,
      currentIndex: 0,
      top:0
    };
  },
  mixins: [setQuery],
  created() {
    // 内容组和整个list的高度
    this.listHeight = [];
    this.groupList = [];
    // touchstart的坐标;
    this.startPos = {};
    this.movePos = {};
    this.position = 0;
    let arr = [];
    for (var i = 0; i < this.users.length; i++) {
      arr.push(this.users[i]["letter"]);
    }
    this.barData = arr;
  },
  mounted() {
    this.$nextTick(() => {
      this.titleHeight = this.$refs.title.$el? getRect(this.$refs.title.$el).height: 0;
      this._calculateHeight();
      if(process.BROWSER_BUILD){
         window.addEventListener('scroll', this.onScroll)
      }   
    });
  },
  methods: {
    _calculateHeight() {
      this.groupList = this.$el.getElementsByClassName("list");
      if (!this.groupList) {
        return;
      }
      let height = this.titleHeight;
      this.listHeight.push(height);
      for (let i = 0; i < this.groupList.length; i++) {
        let item = this.groupList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    scrollStart(e) {
      //  获取touchstart后的坐标;
      let _x = e.touches[0].pageX;
      let _y = e.touches[0].pageY;
      this.startPos.x = _x;
      this.startPos.y = _y;
    },
    // scrollMove(e) {
    //   // 滚动条是否到底或到顶;
    //   let scrollTopDis = 0;
    //   let movePos = {};
    //   if (
    //     document.documentElement.scrollHeight -
    //       document.documentElement.scrollTop ==
    //     document.documentElement.clientHeight
    //   ) {
    //     console.log("到底了");
    //     return;
    //   } else if (document.documentElement.scrollTop == 0) {
    //     console.log("到顶了");
    //     return;
    //   } else {
    //     // 滚动条的scrollTop的距离就是元素移动的距离;
    //     scrollTopDis = document.documentElement.scrollTop;
    //     // 判断是向上还是向下;
    //     movePos.x = e.touches[0].pageX;
    //     movePos.y = e.touches[0].pageY;
    //     // console.log(movePos)
    //     if (movePos.y - this.startPos.y > 0) {
    //       this.position = -scrollTopDis;
    //     } else if (movePos.y - this.startPos.y < 0) {
    //       this.position = -scrollTopDis;
    //     } else {
    //       console.log("没有移动");
    //     }
    //     if (this.position > -this.titleHeight) {
    //       this.currentIndex = 0;
    //       return;
    //     }
    //     const listHeight = this.listHeight;
    //     for (let i = 0; i < listHeight.length - 1; i++) {
    //       let height1 = listHeight[i];
    //       let height2 = listHeight[i + 1];
    //       if (-this.position >= height1 && -this.position < height2) {
    //         this.currentIndex = i;
    //         return;
    //       }
    //     }
    //     this.currentIndex = listHeight.length - 2;
    //   }
    // },
    onScroll(){
      this.top = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop
      if(this.top==0){
        console.log('到顶了')
        return
      }else if(this.top==document.documentElement.clientHeight){
       console.log('到底了');
      }else{
        if(this.top<=this.titleHeight){
          this.currentIndex =0
          return
        }
        const listHeight = this.listHeight
        for(let i=0;i<listHeight.length-1;i++){
            let height1 = listHeight[i]
            let height2 = listHeight[i+1]
            if(this.top>=height1&&this.top<height2){
               this.currentIndex = i
               return
            }
        }
        this.currentIndex = this.listHeight.length -2;
      }
    }
  },
  components: {
    searchHeader,
    userItem,
    teamBottom
  }
};
</script>

<style scoped>
.team .initail-bar {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.team .initail-bar span {
  display: block;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  padding: 1px;
}
.team .initail-bar .active {
  background-color: #80c269;
  border-radius: 50%;
  color: #fff;
  width: 20px;
  height: 20px;
  /* transition: 500 ease-in-out; */
  animation: alternate;
}
</style>
