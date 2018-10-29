<template>
  <section class="box vMall">
    <vmall-topbar :title="title" ></vmall-topbar>
    <div class="userfavorites">
      <ul>
        <li v-for="(item,index) in list" v-bind:key="index">
          <nuxt-link :to="{path:path}">
            <div class="sol_img">
              <img :src="'/'+item.dreamDefaultpicurl+'?w=80&h=80'" alt="">
            </div>
            <div class="sol_con">
              <h3>{{item.dreamTitle}}</h3>
              <span>{{item.dreamPrice2}}V币&nbsp;<del>{{item.dreamPrice1}}币</del></span>
            </div>
          </nuxt-link>
          <div class="sol_del" @click="del(item.id,index)">
            <a href="javascript:;"  title="删除">X</a>
          </div>
        </li>
      </ul>
    </div>
    <vmall-footer></vmall-footer>
    <msg ref="msg"></msg>
  </section>
</template>
<script>
import vmallTopbar from '~components/vmall/topBar';
import {mapGetters} from 'vuex';
import {getVmallListhyc,changuserfavorite} from '~/apis/vmall'
import msg from '~components/msg/msg'
import vmallFooter from '~components/vmall/vmallFooter'
export default {
  components: {
    vmallTopbar,
    msg,
    vmallFooter
  },
  computed:{
    ...mapGetters({
      'userInfos':'getUserInfo'
    })
  },
  data() {
    return {
      title: '我的收藏-个人中心',
      list:[],
      path:'/vmall/goodsDetail'
    }
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
  async created(){
    let dreamCollect = this.userInfos.dreamVmallid
    let collectStr = dreamCollect.substring(1)
    let paramStr = collectStr.split('|').join()
    let list = await getVmallListhyc({str:paramStr})  
    this.list = list
  },
  methods:{
    del(id,index){  
    let _this = this  
    for(let k of this.list){
        if(k.id==id){
          _this.list.splice(index,1)
          break
        }
    }
    console.log(_this.list)
    changuserfavorite({dreamVmallid:id,dreamUsername:this.userInfos.dreamUsername}).then(res=>{
       if(!res.hasOwnProperty('code')){
           this.$refs.msg.state(res) 
       }else{
           this.$refs.msg.state('删除失败') 
       }
    }).catch(e=>{
        console.log(e)
    })
  }
}
}
</script>
<style scoped>
@import '~static/css/vmall/myCollect.css';
</style>
