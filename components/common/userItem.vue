<template>
  <div class="list">
  <span class="letter" :index="index" v-show="!index==0">{{user.letter}}</span>
  <div class="user-item">
      <ul><!--  -->
        <nuxt-link class="item" tag="li" v-for="(u,index) in user.data" :key="index" :to="{path: setItemUrl(u), query: query}">
          <img :src="u.dreamImg" alt="">
          <p class="text">{{u.dreamFullname}}</p>
        </nuxt-link>
      </ul>
  </div>
  </div>
</template>

<script>
export default {
  props:{
    user:{
      type:Object,
      required:true
    },
    index:{
      type:Number,
      required:true
    },
    query:{
      type:Object,
      required:true
    }
  },
  computed: {

  },
  methods: {
    setItemUrl (item) {
      if(item.hasOwnProperty('url')) {
        return item.url
      }else{
        return '/team/temuserdetail?to_uid='+item.dreamUsername
      }
    }
  }
}
</script>

<style scoped>
  .user-item{
    width: 100%;
  }
  .letter{
    margin-left: 10px;
    font-size: 16px;
    display: block;
    height: 24px;
    line-height: 24px;
    background: #eee;
  }
  .user-item ul{
    background-color: #fff;
  }
  .user-item .item{
    height:54px;
    background-color: #fff;
    overflow: hidden;
    margin: 0 10px;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .user-item .item img{
    width: 32px;
    max-height: 64px;
  }
  .user-item .item .text{
    font-size: 16px;
    margin-left: 10px;
  }
</style>
