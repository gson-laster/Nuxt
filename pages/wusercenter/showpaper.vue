<template>
  <div>
    <img :src="base"/>
    <!--<canvas id="canvas" width="" height=""></canvas>-->
  </div>
</template>

<script>
//import {wxQrcode} from '~apis/user.js'
import {wxQrcode} from "~/apis/user"
import {img2base64} from '~static/js/canvas'
import keepUserOnline from '~static/js/keepUserOnline'
import {mapGetters} from 'vuex'
  export default {
     asyncData ({query, store}){
      return {
        produce: query,
        userInfo: {}
      }
    },
    data(){
      return {
        positionX: {
          1: {qrcode_y: 1030, qrcode_color: '693D0A', qrcode_opcity: 1, w: 370},
          2: {qrcode_y:800, qrcode_opcity: 1, w: 310},
          3: {qrcode_y:120, qrcode_x:120,qrcode_size:'250,250', qrcode_color: 'DE0101', qrcode_opcity: 1, w: 336},
          4: {qrcode_y:1100, qrcode_x:376, qrcode_size:'345, 345', qrcode_opcity: 1, w: 342},
          5: {qrcode_y : 1220,  qrcode_color: '867973', qrcode_opcity: 1, w: 342},
          6: {qrcode_y:1120, qrcode_color: '010101', w: 340},
          7: {qrcode_y:910, qrcode_size:'350, 350', qrcode_x:405, qrcode_color: '060406', qrcode_opcity: 1, w: 360},
          8: {qrcode_y:1140, qrcode_color: '7F5A4A', qrcode_opcity: 1, w: 350},
          9: {qrcode_y:680, qrcode_color: '040404', w: 360},
          10: {qrcode_y:1200,qrcode_x:550, w: 400},
          12: {qrcode_y:400, qrcode_color: '49455B', w: 410},
          13: {qrcode_y:1300,qrcode_x:390,qrcode_size:'300, 300', qrcode_color: '6C3C00', qrcode_opcity: 1, w: 300},
          14: {qrcode_y:1310, qrcode_color: '000000', w: 420},
          15: {qrcode_y:1330, qrcode_color: 'D20607', w: 310},
          16: {qrcode_y:1255, qrcode_color: '410B67', w: 300},
          17: {qrcode_y : 1360,qrcode_x:550, qrcode_color: '0F57C2', qrcode_opcity: 1, w: 300},
          18: {qrcode_y:940, qrcode_x:390, qrcode_size:'300, 300', qrcode_color: '61B6D2', qrcode_opcity: 1, w: 290},
          19: {qrcode_y:830, qrcode_x:415, qrcode_size:'250,250', qrcode_color: '010006', qrcode_opcity: 1, w: 290},
          20: {qrcode_y:1100, qrcode_x:390, qrcode_size:'300,300', qrcode_color: '68B1DF', qrcode_opcity: 1, w: 290},
          21: {qrcode_y:1200, qrcode_color: '020202', w: 418}
        },
        base: ''
      }
    },
    fetch({store}){
      store.state.footerShow = false
    },
    created() {
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
      if (process.BROWSER_BUILD) {
        var userInfo = this.userInfo;
      var con = this.positionX[this.produce.i]
      var img = new Image()
      img.src = this.produce.path
      var _t = this;
      img.onload = function (){
          let canvas = document.createElement('canvas');
          canvas.width = img.width
          canvas.height = img.height
          let ct = canvas.getContext('2d')
          ct.drawImage(img, 0, 0, img.width, img.height)
        wxQrcode({content: userInfo.dreamUsername}).then(res => {
         img2base64('/api/hostImg?url='+encodeURIComponent(res.picurl)).then(res => {
                    var pic = new Image();
          pic.src = res;
          pic.onload = function() {
            if(!con.hasOwnProperty('qrcode_x')){
              con.qrcode_x = (img.width - con.w) / 2
            }
          ct.drawImage(pic,con.qrcode_x, con.qrcode_y, con.w, con.w)
            _t.base = canvas.toDataURL('image/jpeg', 1.0)
          }
         })
      })
      }
      }
    },
//  computed: {
//    ...mapGetters({
//      userInfo: 'getUserInfo'
//      
//    })
//  },
  }
</script>

<style>
</style>