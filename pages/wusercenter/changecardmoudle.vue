<template>
  <div class="moudle box">
    <div ref="trans" @touchmove="touch" @touchend="touchend" @touchstart="touchstart" class="sliderBox">
      <div @click="active(item.id)" v-for="(item, index) in cardList" class="slider">
        <img :src="item.dreamDefaultpicurl"/>
       <div v-if="text(item.id)" class="bg">
       	  <div class="confirm">
          
          </div>
       </div>
      </div>
    </div>
    <div @click="save" class="btn">
    	提交
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
//import Services from '~/store/services.js';
  import {cardTemplateListz, change} from '~/apis/user.js'
  import {getUserInfo} from '~/static/js/util.js'
  import keepUserOnline from '~static/js/keepUserOnline'
  
  const msg = () =>  import('~/components/msg/msg')
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        touchstep: [],
        trans: 0,
        pull: 1,//拉力
        totalWidth: 0,
        index: 0,
        userInfo: {}
      }
    },
    async asyncData () {
      let list = null;
      await cardTemplateListz({pageSize: 10000}).then(res => {
         list = res.data.data.result || []
       })
      return {
        cardList: list
      }
    },
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
    },
    mounted () {
      if (process.BROWSER_BUILD) {
        this.totalWidth = screen.width - this.totalWidth 
      }
    },
    methods: {
      touch (event) {
        this.touchstep.push(event.changedTouches[0].pageX)
        let clientX = Number(this.touchstep[this.touchstep.length - 1] - this.touchstep[this.touchstep.length - 2])
        if (this.trans > 0 || this.trans < this.totalWidth) {
          clientX = clientX/this.pull
          this.pull = this.pull + 0.4
        }
        let step = clientX + this.trans
        this.$refs.trans.style.transform = 'translateX('+ step +'px)'
        this.trans = step
      },
      touchstart (event) {
        this.touchstep.push(event.changedTouches[0].pageX)
      },
      touchend () {
        this.touchstep = []
        if (this.trans > 0 || this.trans < this.totalWidth) {
          this.$refs.trans.style.transition = 'all 300ms ease-out'
          this.pull = 1
          if (this.trans > 0) {
            this.trans = 0
          } else {
            this.trans = this.totalWidth
          }
          this.$refs.trans.style.transform = 'translateX('+ this.trans +'px)'
          setTimeout(()=>{
            this.$refs.trans.style.transition = ''
          }, 300)
        }
      },
      save () {
        change({dreamUsername: this.userInfo.dreamUsername, dreamCardtemplate: this.index}).then(res => {
          if (res.code == 2000) {
            this.$set(this.userInfo, 'dreamCardtemplate', this.index)
          	this.$refs.msg.state('修改成功')
          	this.$router.push({
          	  path: './',
          	  query: this.query
          	})
          } else{
          	this.$refs.msg.state('修改失败')
          }
        })
      },
      text (id) {
        if (id == this.index) {
        	return true;
        } else {
          return false;
        }
      },
      active (index) {
        this.index = index
      }
    },
    components: {
      msg
    },
    computed: {
      ...mapGetters({
//      userInfo: 'getUserInfo',
        query: 'get_router_query'
      })
    }
  }
</script>

<style>
  @import '~static/css/wusercenter/changecardmoudle.css';
</style>