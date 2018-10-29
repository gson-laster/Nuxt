<template>
  <div class="n_vmallsearch">
    <div>
      <div class="s-btn" @click="search">
        <button type="button"><img src="~static/img/vmall/n_vmallsearch_an.png"></button>
      </div>
      <div class="s-val"><input type="text" v-model="content" name="keys" id="keys" v-on:blur="seachVmall()" :placeholder="placeholder"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    placeholder:{
      type:String,
      default:'输入你想要的商品'
    }
  },
  data(){
    return{
      content:''
    }
  },  
  methods:{
    search(){
      this.$emit('searchReceive',this.content)
    },
    seachVmall(){
      this.default = '输入你想要的商品'
    }
  }
}
</script>

<style>
@import '~static/css/vmall/vMallSearch.css'
</style>
