<template>
<div id="menuinfo"
     class="menuWarrp">
  <div class="new_brandlist_title"
       id="new_brandlist_title">
    <span>{{title}}</span>
    <ul class="menunav off"
        @click="showSubMenu">
      <li class="triger-button"
          :class="{up: btnUp}">
        <span class="g-overflow"></span>
      </li>
    </ul>
  </div>
  <div class="optionlists"
       v-show="subMenuStatus">
    <div id="areawrapper"
         class="selectregion">
      <div class="list regioncontroll"
           id="areacontroller">
        <ul>
          <li v-for="(item, index) in navData"
              :class="{focus: item.active}"
              :key="index"
              @click="selectCate(index)">
            <a href="javascript:;">
                  {{item.dreamNames}}
                </a>
          </li>
        </ul>
      </div>
      <div class="list submore"
           v-show="subMenuSubStatus">
        <ul>
          <li v-for="(item, n) in childCate"
              :key="n"><a href="javascript:;"
               class="g-overflow"
               @click="selectChildCate(n)">{{item.dreamNames}}</a></li>
        </ul>
      </div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    navData: {
      type: Array,
      default: []
    },
    childCate: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      subMenuStatus: false,
      subMenuSubStatus: false,
      btnUp: false,
      headerTitle: '',
    }
  },
  methods: {
    showSubMenu() {
      if (this.subMenuStatus) {
        this.subMenuStatus = false
        this.btnUp = false
      } else {
        this.subMenuStatus = true
        this.btnUp = true
      }
    },
    selectCate(index) {
      let _this = this
      this.navData.map((v, i) => {
        if (i == index) {
          this.$emit('hdChange', v.id, v.dreamNames)
          this.subMenuSubStatus = true
          v.active = true
        } else {
          v.active = false
        }
        return v
      })
    },
    selectChildCate(index) {
      let _this = this
      this.childCate.map((v, i) => {
        if (i == index) {
          this.$emit('hdChildChange', v.id, v.dreamNames)
          this.subMenuSubStatus = true
          v.active = true
        } else {
          v.active = false
        }
        return v
      })
    }
  }
}
</script>
<style>
@import '~static/css/product/productHeader.css';
.triger-button {
  transition: all 0.2s ease-in;
  transform: rotate(0deg);
}

.triger-button.up {
  transform: rotate(180deg);
}

.menuWarrp {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1338;
}
</style>
