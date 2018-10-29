<template>
  <div class="new_wvcon">
    <div class="new_wvcon_nr1">
      <div>
        <p v-for="(item,index) in wvData.wvCon" v-bind:key="index">
          {{item}}
        </p>
          <span>
          <a href="index.html?uid=%25D%25%25K%25%25H%25%25C%25%25C%25%25H%25%25H%25%25D%25%25D%25%25C%25%25G%25&amp;brand=0"><img src="images/blank.gif" data-echo="images/new_wvan_01.png" border="0"></a>
        </span>
      </div>
    </div>

    <div class="new_wvcon_ad"><img :src="wvData.wvConAdImg.q" data-echo="images/new_wvcon_02.jpg?324"></div>
    <div class="new_wvcon_ad"><img :src="wvData.wvConAdImg.n"></div>

    <div class="new_wvcon_video">
      <h3>Dreamtrips视频</h3>
      <div>
        <iframe frameborder="0" src="http://v.qq.com/iframe/player.html?vid=i0147jyxnt5&amp;tiny=0&amp;auto=0" allowfullscreen=""></iframe>
      </div>
    </div>

    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.b"></div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.r" data-echo="images/new_wvcon_04.jpg"></div>
    <div class="new_wvcon_hy16">
      <h3>会员16大尊享</h3>
      <ul>
       <li v-for="(item,index) in wvData.sixTeenEnjoys" v-bind:key="index">
         <div>{{item}}</div>
       </li>
      </ul>
    </div>
    <div class="new_wvcon_ad"><img :src="wvData.wvConAdImg.c"></div>
    <div class="new_wvcon_hy10">
      <h3>
        <i>加入Dreamtrips的</i>十大理由</h3>
      <ul>
         <li v-for="(item,index) in wvData.tenReasons" v-bind:key="index">
         <div>{{item}}</div>
       </li>
      </ul>
    </div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.o"></div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.d"></div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.e"></div>
    <div class="new_wvcon_ad"><img :src="wvData.wvConAdImg.p"></div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.f"></div>
    <div class="new_wvcon_area">
      <!-- <div class="new_wvcon_area_t">发展地区</div>
      <div class="new_wvcon_area_part">
        <h3>全世界第一大旅游国</h3>
        <span><img src="images/new_wvcon_10.png">2015年我国旅游业继续实现稳步增长,旅游总收入达4.13万亿元。2015年中国出境游消费达1045亿美元，同比增长16.6%，人均消费893美元（约合6000元人民币），成为世界第一大旅游国！</span>
      </div>
      <div class="new_wvcon_area_part">
        <h3>Dreamtrips正在布局亚洲和中国地区</h3>
        <span><img src="images/new_wvcon_13.png">Dreamtrips准备在全球再开6个分公司：包括中国大陆、中国台湾、泰国、越南、日本、印度尼西亚。 2017年公司将在全球推出25000个DREAMTRIPS套餐。中国市场即将全面爆发式的发展了！您做好准备了吗？</span>
      </div>
      <div class="new_wvcon_area_t">旅游产业</div>
      <div class="new_wvcon_area_part">
        <h3>全世界第一大行业</h3>
        <span><img src="images/new_wvcon_12.jpg">目前旅游产业收入10万亿美元，预计到2020年，旅游产业收入将增至16万亿美元，相当于全球GDP的10%；提供3亿个工作岗位，占全球就业总量的9.2%，从而进一步巩固其作为世界第一大产业的地位。</span>
      </div>
      <div class="new_wvcon_area_part">
        <h3>旅游产业具有广阔的发展前景</h3>
        <span><img src="images/new_wvcon_11.png">世界旅游组织和各国政府越来越重视发展旅游产业，全球有120多个国家和地区将旅游产业列为本国国民经济发展的支柱产业。旅游产业具有旺盛的社会消费需求，世界旅游发展历史表明，当人均GDP达到300美元时，开始有国内旅游需求；当人均GDP达到3000美元时，将迎来一个国内游、入境游与出境游全面繁荣，社会各阶层广泛参与的“全民旅游”时代。</span>
      </div> -->
      <div v-for="(item,index) in wvData.wvConArea" v-bind:key="index">
        <div class="new_wvcon_area_t" >{{item.name}}</div>
        <div class="new_wvcon_area_part" v-for="(data,i) in item.areaPart" v-bind:key="i">
        <h3>{{data.title}}</h3>
        <span>
          <img :src="data.img" alt="">
          {{data.content}}
        </span>
        </div>
      </div>
    </div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.k"></div>
    <div class="new_wvcon_ad m_t_40"><img :src="wvData.wvConAdImg.l"></div>

    <div class="new_wvcon_faq">
     <div v-for="(item,index) in wvData.howToBeVIP" v-bind:key="index">
       <h3>{{item.title}}</h3>
       <p v-html="item.content"></p>
     </div>
    </div>
    <div class="new_wvcon_ad"><img :src="wvData.wvConAdImg.m"></div>
  </div>
</template>
<script>
import wvData from '~static/js/outWVContent.js'
export default {
  data() {
    return {
      wvData:wvData
    }
  }
}
</script>

<style>
@import '~static/css/newcard/wvBrand.css';
</style>
