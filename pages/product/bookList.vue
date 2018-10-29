<template>
  <div>
    <div class="lytcorder_list" id="lytcorderlist">
      <ul>
        <li class="con" style="text-align:center">
          <span>产品名称：<a href="javascript:;" target="_blank">安洁空气净化器</a></span>
          <span>姓名：测试一波</span>
          <span>电话：18500551104</span>
          <span>地址：嗯嗯</span>
          <span>预订数量：1</span>
          <span>状态：<b style="color:#FF0000;font-size:18px;">未处理</b></span>
          <span>提交时间：2017-11-01 17:01:44</span>
          <span class="an">
            <a href="javaScript:delBrandOrder(58)"><i>删除预定</i></a>
          </span>
        </li>
        </ul>
    </div>
     <pagination></pagination>
    </div>
</template>

<script>
export default {
  components:{
    'pagination':require('~components/pagination/index.vue')
  },
  data() {
    return {};
  }
};
</script>

<style>
.lytcorder_list {
  margin: 10px 10px 0;
  overflow: hidden;
  font-size: 14px;
}
.lytcorder_list ul {
  float: left;
  width: 100%;
}
.lytcorder_list ul li {
  padding: 0 10px;
  overflow: hidden;
  background: #fff;
  margin-top: 10px;
  border-top: 2px #fd6148 solid;
}
.lytcorder_list ul li span {
  float: left;
  width: 100%;
  text-align: left;
  padding: 5px 0;
  border-top: 1px #e8e8e8 solid;
}
.lytcorder_list ul li span:first-child {
  border: none;
}
.lytcorder_list ul li span:first-child a{
  display: inline-block
}
.lytcorder_list ul li span {
  float: left;
  width: 100%;
  text-align: left;
  padding: 5px 0;
  border-top: 1px #e8e8e8 solid;
}
.lytcorder_list ul li span.an {
  padding: 20px 0;
  text-align: center;
  background-color: #fff;
}
.lytcorder_list span.an i{
  background-color: #FD6148;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  font-style: normal;
  padding: 8px 10px;
  font-size: 14px;
}
</style>
