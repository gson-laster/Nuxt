<template lang="pug">
.nicecard(ref="container")
  div(style="position: absolute;z-index: 0;")
    businessTwo(ref="warrp")
</template>

<script>
import classicalOne from '~components/nicecard/classical_1'
import classicalTwo from '~components/nicecard/classical_2'
import specificOne from '~components/nicecard/specific_1'
import specificTwo from '~components/nicecard/specific_2'
import conciseOne from '~components/nicecard/concise_1'
import conciseTwo from '~components/nicecard/concise_2'
import freshOne from '~components/nicecard/fresh_1'
import freshTwo from '~components/nicecard/fresh_2'
import businessOne from '~components/nicecard/business_1'
import businessTwo from '~components/nicecard/business_2'
import html2canvas from 'html2canvas'
import {drawPolygon} from '~static/js/canvas'
export default {
  asyncData({store}){
    store.dispatch('setFooterShow', false)
  },
	components: {
		classicalOne,
    classicalTwo,
    specificOne,
    specificTwo,
    conciseOne,
    conciseTwo,
    freshOne,
    freshTwo,
    businessOne,
    businessTwo
	},
  created(){

  },
  mounted(){
    var _this = this
    var element = this.$refs.warrp.$el
    var container = this.$refs.container
    var width = window.innerWidth;
    var height = window.innerHeight;
    var type = "png";
    var scaleBy = 6;  //缩放比例
    var canvas = document.createElement('canvas');
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    canvas.style.width = width * scaleBy + 'px';
    canvas.style.height = height * scaleBy + 'px';
    var context = canvas.getContext('2d');
    var canvas2Image = require('~static/js/canvas2image.js')()
    context.scale(scaleBy, scaleBy);
    html2canvas(element, {
        letterRendering: true,
        canvas,
        onrendered: function(canvas) {
            // element.style.display = 'none'

            // context = canvas.getContext('2d');
            // context.scale(scaleBy, scaleBy);
            //
            // var image = new Image()
            // image.onload = function() {
            //   context.save()
            //   // var pattern = context.createPattern(image, "no-repeat");
            //   drawPolygon(context, {
            //     x: canvas.width  * 0.02112,
            //     y: canvas.height * 0.00763,
            //     num: 6,
            //     r: 12,
            //     strokeStyle: "#7b5129",
            //     image: image
            //   })
            //   // context.rotate(20*Math.PI/180);
            // //   context.restore();
            //   // ctx.restore();
            //   //context.clearRect(0, 0, canvas.width, canvas.height);
            //   element.parentNode.appendChild(canvas2Image.convertToImage(canvas, width* scaleBy, height* scaleBy,'jpg'))
            //   // element.parentNode.appendChild(canvas)
            //   console.log(canvas);
            // };
            // image.src = '/api/hostImg?url='+encodeURIComponent('http://picture.weix360.cn/ab26c3b0e501e453ea383343f731cf23?w=720&h=720&p=1');
            // canvas is the final rendered <canvas> element
            // element.parentNode.appendChild(canvas2Image.convertToImage(canvas, width* scaleBy, height* scaleBy,'jpg'))
        }
    });
  }
}
</script>

<style lang="stylus" scoped>
.nicecard
  width 100%
  max-width 640px
  margin 0 auto
  overflow hidden
canvas
  transform translate3d(0,0,0)
</style>
