<template>
  <div class="search-header">
        <slot>
           <div class="wrapper">
              <input type="text" placeholder="" @focus='isShow=false' @blur="isShow=true"/>
              <span class="search" v-show="isShow" @touchstart="isShow=false"><img src="~static/img/common/new_icon_vb2.png" alt="">搜索</span>
           </div>
           <p class="text">团队人数:&nbsp;{{teamNumber}}人</p>
        </slot>
  </div>
</template>
<script>
export default {
    props: {
      teamNumber: {
        default: 0,
        type: Number
      }
    },
    data () {
      return {
        isShow:true
      }
    }
}
</script>

<style scoped>
  .search-header{
    margin: 20px;
    margin-bottom: 0px;
  }
  .search-header .wrapper{
    position: relative;
  }
  .search-header .search{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    color: #888;
  }
  .search-header .search img{
    width: 30px;
    height: 30px;
  }
  .search-header input[type="text"]{
    width: 100%;
    font-size: 16px;
    border-radius: 6px;
    padding:4px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
  }
  .search-header input::-webkit-input-placeholder{
    text-align: center;
    font-size:16px;
    padding-left: 70px;

  }
  .search-header .text{
    text-align: center;
    font-size: 14px;
    padding: 6px;
  }
</style>
