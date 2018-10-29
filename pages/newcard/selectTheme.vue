<template>
<div class="box colorSelect clearfix">
  <div class="item"
       v-for="(item,index) in themes"
       v-bind:key="index"
        >
    <div class="container">
      <img :src="item.dreamDefaultpicurl"
           alt="">
      <div :class="['bottom',colors[index],{active:userInfo.dreamCardtemplate==item.id}]"  @click="selectColor(item)">
        <p>{{item.dreamCardtemplatename}}</p>
        <a href="javascript:;"
           v-if="userInfo.dreamCardtemplate==item.id">使用中</a>
        <a href="javascript:;"
           v-else>选择</a>
      </div>
    </div>
  </div>
  <v-dialog :show="dialogStatus" content="您确定要使用此模板吗？" @cancel="dialogCancel" @confirm="dialogConfirm"></v-dialog>
</div>
</template>
<script>
// 默认是brown
import {cradTemplateListz} from '~/apis/brand'
import {change} from "~/apis/user"
import arr from "~static/js/outNewcard.js"
import dialog from '~components/msg/dialog'
export default {
  async asyncData({store,query}) {
    let result  = await cradTemplateListz({pageSize:30})
    let themes = []
    let newThemes = []
    let startArr = [] ,endArr = []
    if(!result.hasOwnProperty('code')){
       themes = result.result
       startArr = themes.slice(0,9)
       endArr = themes.slice(9,themes.length) 
       newThemes = endArr.concat(startArr)
       themes = newThemes 
    }else{
       themes = []
    }
    return {
      userInfo: store.state.userInfo,
      query: query,
      themes:themes,
      colors:[
        'brown','green','pink','blue','purple','yellow','gray','red','orange-one','orange-two','light-yellow','orange-orange','gradient-blue','lake-blue','chocolate-brown','wood-brown','wood-black'
      ]
    }
  },
  data() {
    return {
      colors: arr,
      isCurr: -1,
      dialogStatus: false,
      currentItem: null
    };
  },
  components: {
    'v-dialog': dialog
  },
  methods:{
     selectColor(item) {
      this.dialogStatus = true
      this.currentItem = item
      console.log(this.currentItem)
    },
    dialogConfirm(){
      let data = {}
      this.userInfo.dreamCardtemplate = this.currentItem.id
      data.dreamUsername = this.userInfo.dreamUsername
      data.dreamCardtemplate = this.userInfo.dreamCardtemplate
      change(data)
        .then(res => {
          if (res.code == 2000) {
            this.$store.dispatch('setUserInfo', this.userInfo)
            this.dialogStatus = false
            this.$router.push({
              path: '/newcard',
              query: this.query
            })
          }else{
            this.dialogStatus =false
            this.$msg('切换模板失败')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    dialogCancel(){
      this.dialogStatus = false
    }
  }
  }
</script>
<style scoped>
@import "~static/css/newcard/selectTheme.css";
</style>
