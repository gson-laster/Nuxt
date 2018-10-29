<template>
  <div class="teamBottom">
    <ul>
      <li v-for="(link,index) in links" :key="index" @click="go(link)">
        <div :class="[link.className,currentRouter(link.url,index)]">
          <p>{{link.name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import setQuery from "~static/mixins/setQuery.js";
export default {
  mixins: [setQuery],
  data() {
    return {
      links: [
        { name: "团队", url: "/team", className: "team", open: true},
        { name: "消息", url: "/team/message", className: "message", open: false },
        { name: "我的", url: "/wusercenter", className: "my", open: true }
      ]
    };
  },
  methods:{
    go(link){
      if(!link.open) {
        this.$msg('暂未开放');
        return
      }else{
        this.$router.push({
          path: link.url,
          query: this.setQuery()
        })
      }
    },
    currentRouter(path,index){
      if(this.$route.path==path){
        return 'active'
      }else{
        if(this.$route.path=='/team'&&index==0){
           return 'active'
        }else{
          return ''
        }
      }
    }
  }
};
</script>

<style scoped>
.teamBottom {
  width: 100%;
  height: 56px;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  max-width: 640px;
  margin: 0 auto;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.teamBottom ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
}
.teamBottom ul li {
  height: 100%;
}
.teamBottom .team {
  height: 100%;
  background: url("~static/img/wusercenter/team.png") no-repeat;
  width: 50px;
  text-align: center;
  background-position: center 2px;
  background-size: 32px;
}
.teamBottom .team.active {
  background: url("~static/img/wusercenter/team_active.png") no-repeat;
  height: 100%;
  width: 50px;
  text-align: center;
  background-position: center 2px;
  background-size:32px;
  color:#ffaa00;
}
.teamBottom .message {
  height: 100%;
  background: url("~static/img/wusercenter/message.png") no-repeat;
  width: 50px;
  text-align: center;
  background-position: center 2px;
  background-size: 32px;
}
.teamBottom .message.active{
  height: 100%;
  background:url("~static/img/wusercenter/message_active.png") no-repeat;
  width: 50px;
  text-align: center;
  background-position: center 2px;
  background-size: 32px;
  color: #ffaa00;
}
.teamBottom .my {
  height: 100%;
  background: url("~static/img/wusercenter/my.png") no-repeat;
  width: 50px;
  text-align: center;
  background-position: center 2px;
  background-size:32px;
}
.teamBottom p {
  line-height:86px;
}
</style>
