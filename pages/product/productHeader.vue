<template>
<div id="menu">
  <div id="menuinfo">
    <div class="new_brandlist_title"
         id="new_brandlist_title">
      <span>这是标题内容</span>
      <ul class="menunav off"
          id="menunav"
          onclick="showMenu(this)">
        <li id="area"
            style="transition: all 0.2s ease-in; transform: rotate(0deg);">
          <span class="g-overflow"></span>
        </li>
      </ul>
    </div>

    <div class="optionlists"
         id="optionlists">
      <div id="areawrapper"
           class="selectregion">
        <div class="list regioncontroll"
             id="areacontroller">
          <ul>
            <li class="focusin2 focus"
                id="area0">
              <a href="javascript:;">
                  小分子肽
                </a>
            </li>
            <li class=""
                id="area0">
              <a href="javascript:;">
                  排毒产品
                </a>
            </li>
            <li class=""
                id="area0">
              <a href="javascript:;">
                  再生系列
                </a>
            </li>
            <li class=""
                id="area0">
              <a href="javascript:;">
                  健康产品
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {

}
</script>
<style>
@import '~/static/css/product/productHeader.css';
</style>
