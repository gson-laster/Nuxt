<template>
  <div class="travel tab_content" style="display: block;">
    <div class="lytc_con_t">温馨提示</div>
    <div class="lytc_con_nr">
      <div v-html="content.dreamContent4"></div>
      <p><span style="font-size:16px;"><span style="font-size:12px;color:#337FE5;" v-html="content.dreamDownurl"></span><span style="font-size:12px;color:#337FE5;"></span><br></span></p>
    </div>
    <div class="lytc_con_line"></div>
    <div class="lytc_con_t">关于您的旅行</div>
    <div class="lytc_con_nr">
     <div v-html="content.dreamContent"></div>
    </div>
    <div class="lytc_con_line"></div>
    <div class="lytc_con_t">包含内容</div>
    <div class="lytc_con_nr">
      <div v-html="content.dreamContent2"></div>
    </div>
    <div class="lytc_con_line"></div>
    <div class="lytc_con_t">
      <span>酒店介绍</span>
      <i class="star7"></i>
    </div>
    <div class="lytc_con_nr">
    <div v-html="content.dreamContent3"></div>  
    <div class="lytc_con_t2">白金会员专享</div>
    </div>
    <div class="lytc_con_nr">
      <div v-html="content.dreamContent5"></div>
    </div>
    <div class="lytc_con_t2">补充说明</div>
    <div class="lytc_con_nr">
      <div v-html="content.dreamContent6"></div>  
    </div>
    <div class="lytc_con_line"></div>
    <div class="lytc_con_t">行程安排</div>
    <div class="lytc_con_nr">
     <div v-html="content.dreamContent7"></div>     
    </div>
    <div class="lytc_con_line"></div>
    <div class="lytc_con_t">政策与免责声明</div>
    <div class="lytc_con_nr">
      <div v-html="content.dreamContent8"></div>
    </div>
    <div class="lytc_ad">
      <span>你喜欢旅游吗？<br>你喜欢免费旅游吗？<br>你喜欢边旅游边赚钱吗？</span><img src="~static/img/travel/new_ad.jpg"></div>
    <div style="margin:0 auto; width:100%; text-align:left; font-size:12px; color:#999999;">阅读{{content.dreamHits}}</div>
    <div class="lytc_con_line"></div>
  </div>
</template>
<script>
export default {
  props:{
    content:{
      default:''
    }
  }
};
</script>
<style>
@import "~static/css/travel/tabContent.css";
</style>
