<template>
  <ul>
    <li v-for="(item,index) in arrName" v-bind:key="index" >
      <a href="javascript:;">
        <i :class="['icon_1'+index,'mb'+mbIndex+'_icon_'+(index+1)]"></i>
        <div>{{item.name}}</div>
      </a>
    </li>
  </ul>
</template>

<script>
// 模板5,9,10,11,12,13公用组件
let arrName = [
  {name:'公司介绍'},
  {name:'事业说明'},
  {name:'我的原创'},
  {name:'个人信息'},
  {name:'分享论坛'},
  {name:'申请网站'},
]
export default {
  props:['mbIndex'],
  data() {
    return {
      arrName: arrName,
      index: this.mbIndex,
      hrefUrl:''
    }
  },
  created() {
    this.getMBIndex(this.index);
   },

  methods: {
    //根据不同的模板加载不同的css
    getMBIndex(index) {
      this.hrefUrl = '../../css/card/cardmb' + index + '.css'
      console.log(index)
    }  
  },
  head() {
    return {
     title:'Foo Bar', 
     link: [
       {rel:'stylesheet',href:this.hrefUrl}
       ]
    }
  }
}
</script>

<style>
@import '~static/css/card/userLink.css' ;
</style>
