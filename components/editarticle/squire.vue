<template>
<div class="uslist">
  <div class="users">
    <div @click="articleClick"
         class="usimgs">
      <span>{{title}}</span>
      <p><img :src="setbgUrl({src: img})"></p>
    </div>
    <div class="user">
      <div class="userleft">
        <span class="spanimg"><img :src="setImgUrl({src: userimg})"></span>
        <span class="names">{{name}}</span>
      </div>
      <div class="useright">
        <span class="esi icon iconfont icon-browse"><span>{{view}}</span></span>
        <span @click="addLikes"
              class="good icon iconfont icon-good"><span>{{praise}}</span></span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import setImgUrl from "~static/mixins/setImgUrl.js"
import imgarr from '~static/js/outgroompic.js'
export default {
  props: [
      'img',
      'title',
      'userimg',
      'view',
      'praise',
      'name',
      'id',
      'keys'
    ],
  mixins:[setImgUrl],
  methods: {
    articleClick() {
      this.$emit('articleClick', this.id)
    },
    addLikes() {
      this.$emit('addLikes', this.id, this.keys)
    },
    setbgUrl(option) {
      let src = option.src;
      if (src.indexOf('http://www.wvmp360.com') != -1 && src.indexOf('mingpianzxxt/userArticle/') == -1 && !/^\[.*\]$/.test(src)) {
        return src;
      }
      if (/^\[.*\]$/.test(src)) {
        let src1 = JSON.parse(src)[0].src;
        if (/^\.\/img\/\d\.jpg$/.test(src1)) {
          let arr = src1.match(/\d/)[0]
        	return imgarr.arr[Number(arr)]
        }
        if (src1.indexOf('_nuxt') != -1) {
        	return src1;
        }
        if (src1.indexOf('http') != -1) {
          return src1;
        }
        return '/' + src1 + '?w=auto&h=auto&q=1';
      } 
      if(src.indexOf('http://www.wvmp360.com/mingpianzxxt/userArticle/') != -1) {
        let arr = src.split('"src":"')[1]
       if (/^\.\/img\/\d\.jpg$/.test(arr)) {
          let arrs = arr.match(/\d/)[0]
          return imgarr.arr[Number(arrs)]
        }
        if(arr.indexOf('http') == -1) {
          return '/' + arr + '?w=auto&h=auto&q=1'
        } else {
          return arr
        }
      }
      return imgarr.arr[0]
    }
//  setImgSrc(srcStr) {
//    srcStr = this.img[0].src  
//    let url = null
//    // 以http或https开头
//    let  httpReg = /^http|^https/gi
//    // 以点或者斜杠开头
//    let spritReg = /^\/|^\./gi
//    if(srcStr){
//       if(spritReg.test(srcStr)||httpReg.test(srcStr)){
//          return srcStr+'?w=auto&h=auto&p=0'
//       }else{
//         return '/'+srcStr+'?w=auto&h=auto&p=0'
//       }
//    }
//    return ''
//  },
//  setUserImg(url){
//    let src = ''
//    let httpReg =/^http|^https/gi
//    if(url){
//       if(httpReg.test(url)){
//         return url+'?w=50&h=50&p=0'
//       }else{
//         return '/'+url+'?w=50&h=50&p=0'
//       }
//    }
//    return ''
//  }
  }
}
</script>
<style>
@import '~static/css/editarticle/squire.css'
</style>
