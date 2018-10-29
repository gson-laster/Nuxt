<template>
  <div class="dialog5-container">
  <div id="dialog5">
    <p class="close">
      <a href="javascript:void(0)" onclick="closeBg5();">X</a>
    </p>
    <div class="new_userinfo2">
      <ul>
        <li>
          <h3></h3>
        </li>
        <li>
          <span>邮箱：</span>
          <p></p>
        </li>
        <li>
          <span>Q Q：</span>
          <p>18500551104</p>
        </li>
        <li>
          <span>电话：</span>
          <p>
            <a href="tel:110">110</a>
            <a href="tel:110"></a>
          </p>
        </li>
        <li>
          <span>地址：</span>
          <p></p>
        </li>
        <li>
          <span>个人说明：</span>
          <p>嗯嗯吼吼哈哈哈啦啦啦拉累死了都是垃圾都是垃圾费</p>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.dialog5-container{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color:rgba(0, 0, 0, 0.5);
}
#dialog5 {
  background: #fff;
  left: 50%;
  border-radius: 5px;
  margin: -200px 0 0 -150px;
  position: fixed !important;
  /* 浮动对话框 */
  position: absolute;
  top: 50%;
  width: 300px;
  z-index: 10000;
  font-family: "微软雅黑";
}
#dialog5 p {
  float: right;
  position: relative;
  right: -10px;
  top: -10px;
}
#dialog5 p.close a {
  float: left;
  color: #fff;
  text-align: center;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: #CCCCCC;
}
#dialog5 div p {
  float: none;
  right: auto;
  top: auto;
}
.new_userinfo2 ul, .new_userinfo2 ul li{
      width: 100%;
    float: left;
}
.new_userinfo2 {
  margin: 20px 0 20px 20px;
  overflow: hidden;
  position: relative;
  font-size: 14px;
}
.new_userinfo2 ul {
  float: left;
  width: 100%;
}
.new_userinfo2 ul li {
  float: left;
  width: 100%;
  padding: 0;
  font-size: 14px;
}
.new_userinfo2 ul li h3 {
  float: left;
  font-size: 18px;
  font-weight: normal;
}
.new_userinfo2 ul li span {
  float: left;
  width: 45px;
  text-align: left;
  color: #FFAA00;
}
@media screen and (max-width: 380px) {
   .new_userinfo2 ul li h3 {
      font-size: 16px
  }
}
</style>
