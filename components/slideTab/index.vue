<template>
<div class="newmk_news2"
     style="margin-bottom:60px;">
  <div class="box-163css">
    <div class="newmk_newsclass2">
      <ul>
        <li v-for="(item,i) in tabList"
            v-bind:key="i"
            @click="tabChange(i)">
          <div>{{item.title}}</div>
        </li>
      </ul>
      <div class="slide_bottom_line"
           ref="slideBottomLine"
           :style="{width: 100 / tabList.length - 4 + '%'}"></div>
    </div>
    <swiper :auto="0"
            :show-indicators="false"
            :defaultIndex="0"
            @end="swiperChange"
            ref="swiper"
            :style="{height: warrpHeight + 'px'}">
      <swiper-item v-for="(item,d) in tabList"
                   :key="d"
                   :class="{'is-active': d == isIndex}"
                   ref="swiperItem">
        <article-item v-if="articleData[item.type].length > 0"
                      v-for="(artItem,i) in articleData[item.type]"
                      :article="artItem"
                      :query="query"
                      :key="i"></article-item>
        <div class="empty-item" v-if="articleData[item.type].length == 0">
          <span>暂时没有更多的信息</span>
        </div>
      </swiper-item>
    </swiper>
     <nuxt-link tag="em"
                 :to="{path: tabList[isIndex] ? tabList[isIndex].path : '', query: setQuery(tabList[isIndex] ? tabList[isIndex].query : {})}"
                 class="">
    <div class="go_btn"
         v-if="!isPreview">
      进入
      <em class="emtitle">{{tabList[isIndex] ? tabList[isIndex].title : ''}}</em>
    </div>
    </nuxt-link>
  </div>
</div>
</template>
<script>
import articleItem from "~components/article/articleItem";
import swiper from "~components/swiper";
import swiperItem from "~components/swiper/swiper-item";
import setQuery from '~static/mixins/setQuery'
import {hasClass, removeClass, addClass, once} from "~static/js/util";
export default {
  data() {
    return {
      isIndex: 0,
      warrpHeight: 0
    };
  },
  props: ["tabList", "articleData", "isPreview", "query"],
  mixins: [setQuery],
  mounted() {
    this.computeWarrpHeight();
  },
  methods: {

    tabChange(index) {
      this.isIndex = index;
      var element = this.$refs.swiperItem[index];
      this.$refs.swiper.doChange(index);
      this.swiperChange(index);
    },
    swiperChange(index) {
      this.isIndex = index;
      this.$refs.slideBottomLine.style.left =
        index / this.tabList.length * 100 + 2 + "%";

      this.warrpHeight = this.$refs.swiperItem[index].$el.offsetHeight
    },
    computeWarrpHeight() {
      let itemEle = this.$refs.swiperItem;
      let heightArr = [];
      itemEle.map((v, k) => {
        heightArr.push(v.$el.offsetHeight + 12);
      });

      this.warrpHeight = Math.max.apply(Math, heightArr);
    }
  },
  components: {
    articleItem,
    swiper,
    swiperItem
  }
};
</script>

<style>
.newmk_newsclass2 {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.newmk_newsclass2 ul {
  display: block;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  background-color: #fff;
}

.newmk_newsclass2 li {
  width: 50%;
  overflow: hidden;
  height: 34px;
  line-height: 34px;
}

.newmk_newsclass2 div {
  text-align: center;
}

.newmk_newsclass2 div.active {
  /*border-bottom: 1px solid #E85565;*/
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}

.newmk_newsclass2 .slide_bottom_line {
  display: block;
  height: 2px;
  background-color: #e85565;
  position: absolute;
  bottom: 0;
  left: 2%;
  transition: left 0.2s ease-in-out;
}

.go_btn {
  margin: 10px 10px;
  height: 34px;
  border: 1px solid #b9b9b9;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
  background: -webkit-gradient( linear,0 0,0 100%,from(whiteSmoke),to(#e3e3e3));
  background: -moz-linear-gradient(top, whiteSmoke, #e3e3e3);
  -webkit-border-radius: 3px;
  border-radius: 3px;
  display: block;
  overflow: hidden;
}

.newmb_mk1 .swiper-slide img {
  width: 100%;
}
.empty-item {
  color: #333;
  height: 34px;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
}
</style>
