<template>
    <div class="box">
      <search-header></search-header>
      <div class="content-list">
        <ul>
          <nuxt-link tag="li" class="item" :to="{path:'/wusercenter/chat',query:setQuery()}" v-for="(item,index) in contact" :key="index">
            <div class="avatar"><img :src="item.avatar" alt=""></div>
            <div class="content">
              <div class="left">
                <p class="name">{{item.name}}</p>
                <p class="text">{{item.content}}</p>
              </div>
              <p class="time">{{item.time}}</p>
            </div>
          </nuxt-link>
        </ul>
      </div>
      <team-bottom></team-bottom>
    </div>
</template>
<script>
import searchHeader from "~components/common/searchHeader.vue";
import setQuery from "~static/mixins/setQuery.js";
import appConf from "~/app.config.js";
import teamBottom from "~components/usercenter/teamBottom.vue";
import {mapGetters} from 'vuex'
export default {
  mixins: [setQuery],
  data() {
    return {
      contact:[
        {name:'阿里里',avatar:appConf.book_mark,time:'2018-1-08',content:'OK,我已经加你微信了,微信聊天OK,我已经加你微信了,微信聊天OK,我已经加你微信了,微信聊天',offline:false},
        {name:'阿里里',avatar:appConf.book_mark,time:'2018-1-08',content:'OK,我已经加你微信了,微信聊天',offline:false},
        {name:'阿里里',avatar:appConf.book_mark,time:'2018-1-08',content:'OK,我已经加你微信了,微信聊天',offline:false},
        {name:'阿里里',avatar:appConf.book_mark,time:'2018-1-08',content:'OK,我已经加你微信了,微信聊天',offline:false},
        {name:'阿里里',avatar:appConf.book_mark,time:'2018-1-08',content:'OK,我已经加你微信了,微信聊天',offline:false},
        {name:'阿里里',avatar:appConf.book_mark,time:'2018-1-08',content:'OK,我已经加你微信了,微信聊天',offline:false},
      ]
    };
  },
  mounted(){
		// connect socket
    socket.emit('online', this.getUserInfo.dreamUsername)
    socket.on('online', (data) => {
      console.log('socket data', data);
    })
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  components: {
    searchHeader,
    teamBottom
  }
};
</script>

<style scoped>
.content-list {
  width: 100%;
  background-color: #fff;
}
.content-list .content .time {
  color: #888;
  position: absolute;
  right: 0;
}
.content-list .content {
  position: relative;
}

.content-list .item {
  margin: 0 10px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.content-list .item .avatar {
  width: 50px;
  height: 50px;
}
.content-list .item .content {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
}
.content-list .item .content .left .text {
  margin-top: 8px;
  color: #888;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.content-list .item .avatar img {
  width: 100%;
  min-height: 100%;
  border-radius: 4px;
}
.content-list .item .avatar .grayscale {
  filter: grayscale(100%);
}
</style>
