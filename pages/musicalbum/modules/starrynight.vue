<template lang="pug">
  #container
    img(src='~static/img/musicalbum/starrynight/sky.jpg', style='height:815px;position:absolute;left:0')
    img(src='~static/img/musicalbum/starrynight/2000.png', alt='', style='top:100px;left:500px;-webkit-animation:liuxing 5s ease-in 1s infinite')
    img(src='~static/img/musicalbum/starrynight/2000.png', alt='', style='top:200px;left:500px;-webkit-animation:liuxing 5s ease-in 2s infinite')
    img(src='~static/img/musicalbum/starrynight/2000.png', alt='', style='top:300px;left:500px;-webkit-animation:liuxing 5s ease-in infinite')
    img(src='~static/img/musicalbum/starrynight/2000.png', alt='', style='top:0;left:500px;-webkit-animation:liuxing 5s ease-in 1.5s infinite')
    img(src='~static/img/musicalbum/starrynight/2000.png', alt='', style='top:400px;left:500px;-webkit-animation:liuxing 5s ease-in 3s infinite')
    img(src='~static/img/musicalbum/starrynight/2000.png', alt='', style='top:500px;left:500px;-webkit-animation:liuxing 5s ease-in 4s infinite')
    #ipresenter
      #xuandiv1.step(data-x='0', data-y='0', data-pausetime='3000')
        img#xuanimg1
        span#word1.showwords
      #xuandiv2.step(data-x='1500', data-y='0', data-rotatex='180', data-easing='easeInOutQuint', data-pausetime='3000')
        img#xuanimg2
        span#word2.showwords
      #xuandiv3.step(data-x='3000', data-y='0', data-rotatey='180', data-pausetime='3000')
        img#xuanimg3
        span#word3.showwords
      #xuandiv4.step(data-x='4500', data-y='0', data-rotatex='180', data-pausetime='3000')
        img#xuanimg4
        span#word4.showwords
      #xuandiv5.step(data-x='6000', data-y='0', data-rotate='180', data-pausetime='3000')
        img#xuanimg5
        span#word5.showwords
      #xuandiv6.step(data-x='7500', data-y='0', data-rotatey='180', data-pausetime='3000')
        img#xuanimg6
        span#word6.showwords
      #xuandiv7.step(data-x='9000', data-y='0', data-pausetime='3000')
        img#xuanimg7
        span#word7.showwords
      #xuandiv8.step(data-x='10500', data-y='0', data-rotate='80', data-pausetime='3000')
        img#xuanimg8
        span#word8.showwords
      #xuandiv9.step(data-x='12000', data-y='0', data-rotatex='180', data-pausetime='3000')
        img#xuanimg9
        span#word9.showwords
      #xuandiv10.step(data-x='13500', data-y='0', data-rotatey='180', data-pausetime='3000')
        img#xuanimg10(width='400')
        span#word10.showwords
      #xuandiv11.step(data-x='13000', data-y='0', data-rotatey='-180', data-pausetime='3000')
        img#xuanimg11(width='400')
        span#word11.showwords
      #xuandiv12.step(data-x='16500', data-y='0', data-rotatey='180', data-pausetime='3000')
        img#xuanimg12(width='400')
        span#word12.showwords
    #pagetitle.page-title
      div(style="position:absolute;width:410px;height:200px;top:0;left:0;overflow:hidden")
        div(style="position:absolute;width:410px;height:200px;display:table;overflow:hidden")
          .title-content {{titleText}}
</template>

<script>
import jquery from '~static/js/jquery.min'
  export default {
    data () {
      return {
        inter1: null,
        timeout1: null,
        timeout2: null
      }
    },
    methods: {

    },
    props: {
      titleText: {
        default: '测试标题',
        type: String
      },
      imageList: {
        type: Array,
        default: []
      }
    },
    mounted(){

      var jQuery = null
      window.$ = window.jQuery = jQuery = jquery
      require('~static/js/ipresenter.packed.js')
      document.ontouchmove = function(e) {
          e.preventDefault();
      };
      var module_inits = [];
      var _this = this

      var upload_permission = false;

      function load_init_modules() {
          for (var i = 0; i < module_inits.length; i++) {
              module_inits[i]();
          }
      }

      function call_me(fun) {
          module_inits.push(fun);
      }

      //var ua = navigator.userAgent.toLowerCase();

      // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //     wx.ready(load_init_modules);
      // } else {
      //     onload = load_init_modules;
      // }
      var image_size_width = [];
      var image_size_height = [];
      var Onload_imgs_url = [];
      var begin_titletime = new Date().getTime()
      var image_ready_num = 0;
      var image_url_index = 0;
      var have_num = 0;
      var canshow = true;
      var reshow = false;
      var pageindex = 1;
      var slider_images_url = this.imageList
      var delaytime = 500

      var get_pid = function(url) {
          var index1 = url.indexOf("?");
          if (index1 != -1) {
              url = url.substr(0, index1);
          }
          return url.toString().substr(url.lastIndexOf("/") + 1);
      };

      function id(name) {
          return document.getElementById(name);
      }

      function load_images() {
          reshow = false;
          image_size_width = [];
          image_size_height = [];
          Onload_imgs_url = [];
          image_ready_num = 18;
          image_url_index = 0;
          have_num = 0;
          // id('page1').style.webkitAnimation = '';
          // id('page2').style.webkitAnimation = '';
          // id('page1').style.display = 'none';
          // id('page2').style.display = 'none';
          // clearTimeout(timeout1);
          // clearTimeout(timeout2);
          begin_titletime = new Date();
          begin_titletime = begin_titletime.getTime();
          showtitle();
          clearTimeout(_this.timeout1);
          clearInterval(_this.inter1);
          canshow = true;

          for (var i = 0; i < slider_images_url.length; i++) {
              var img = new Image();
              img.index = i;
              img.src = slider_images_url[i];
              img.onload = image_onload;
          }
          console.log(1);
      }

      function showtitle() {
          if (reshow == true)
              return;
          var content = id('titlecontent');
          id('pagetitle').style.webkitAnimation = 'fadein .5s linear both';
      }

      function distitle() {
          if (reshow == true)
              return;
          id('pagetitle').style.webkitAnimation = 'fadeout 1s linear both';
      }

      function image_onload(event) {
          if (reshow == true)
              return;

          var img = event.target;
          var index = img.index;

          if (index < 18) {
              Onload_imgs_url[index] = img.src;
              image_size_height[index] = img.height;
              image_size_width[index] = img.width;
              have_num++;
          } else {
              Onload_imgs_url[image_ready_num] = img.src;
              image_size_width[image_ready_num] = img.width;
              image_size_height[image_ready_num] = img.height;
              image_ready_num++;
          }
          if ((have_num >= 18 || slider_images_url.length == have_num) && canshow == true) {
              reshow = false;
              canshow = false;
              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              delaytime = 3000;
              if (dis_titletime > delaytime) {
                  distitle();
                  setTimeout(begin_show, 500);
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  setTimeout(function() {
                      distitle();
                      setTimeout(begin_show, 500);
                  }, dis_titletime);
              }

          }
      }

      function begin_show() {
          images_init();
          get_ready();
          setTimeout(function() {
              set_next_img();
              _this.inter1 = setInterval(set_next_img, 5000);
          }, 1000);
      }

      function insertEnter(str, n) {
          var len = str.length;
          var strTemp = '';
          if (len > n) {
              strTemp = str.substring(0, n);
              str = str.substring(n, len);
              return strTemp + '\n' + str;
          } else {
              return str;
          }
      }

      function set_next_img() {
          if (pageindex == 13)
              pageindex = 1;
          if (image_url_index == Onload_imgs_url.length) {
              image_url_index = 0;
          }
          id('xuanimg' + pageindex).src = Onload_imgs_url[image_url_index];


          pageindex++;
          image_url_index++;
      }

      function reload_scene() {
          reshow = true;
          Onload_imgs_url = [];
          for (var i = 0; i < slider_images_url.length; i++) {
              Onload_imgs_url[i] = slider_images_url[i];
          }
          image_url_index = 0;
          images_init();
      }

      function get_ready() {
        $('#ipresenter').iPresenter({
            easing: 'ease-in-out', // 动画效果 (custom cubic-bezier function is acceptable)
            autoPlay: true, // 自动播放
            replay: true, // 循环播放
            animSpeed: 2000, // 动画时间 (Microsecond)
            pauseTime: 5000, // 展示时间 (Microsecond)
            //directionNav: true, // 方向导航按钮
            //directionNavHoverOpacity: 0.6, // 鼠标悬浮时透明度
            //controlNav: true, // 1,2,3,4... 数字导航
            //controlNavNextPrev: true, // 上下滑块导航
            //controlNavHoverOpacity: 0.6, // 鼠标悬浮时透明度
            //controlNavThumbs: true, // 显示缩略图
            //controlNavTooltip: true, // 缩略图提示
            keyboardNav: true, // 激活键盘导航
            //pauseOnHover: true, // 当鼠标滑过启用或禁用幻灯片
            itemsOpacity: 0.6, // 设置item的不透明度
            randomStart: true, // 随机显示
            startStep: 0, // 从第一滑块开始
            timer: 'Pie', // 计时器主题: "Pie", "360Bar" or "Bar"
            timerBg: '#000', // 计时器背景色
            timerColor: '#EEE', // 计时器颜色
            timerOpacity: 0.5, // T计时器透明透
            timerDiameter: 30, // 计时器直径
            timerPadding: 4, // 计时器内边距
            timerStroke: 3, // 计时器扫笔宽度
            timerBarStroke: 1, // 计时条宽度Timer Bar stroke width
            timerBarStrokeColor: '#EEE', // 计时条颜色
            timerBarStrokeStyle: 'solid', // 计时条风格Timer Bar stroke style
            timerPosition: 'top-right', // 计时器位置  (top,middle,bottom)-(left-center-right) set like: 'middle-center'
            nextLabel: "Next", // “下一个”按钮文字 (Multilanguage use)
            previousLabel: "Previous", // “上一个”按钮文字 (Multilanguage use)
            playLabel: "Play", // 播放按钮文字 (Multilanguage use)
            pauseLabel: "Pause", // 暂停按钮文字 (Multilanguage use)
            onBeforeChange: function() {}, // Triggers before a step change
            onAfterChange: function() {}, // Triggers after a step change
            onLastStep: function() {}, // Triggers when last step is shown
            onAfterLoad: function() {}, // Triggers when slider has loaded
            onPause: function() {}, // Triggers when slider has paused
            onPlay: function() {} // Triggers when slider has played
        });
          id('ipresenter').style.webkitAnimation = 'fadein 2s ease-in both';
      }

      function images_init() {
          for (var i = 1; i < 13; i++) {
              var img = id('xuanimg' + i);
              if (image_url_index == Onload_imgs_url.length)
                  image_url_index = 0;
              img.src = Onload_imgs_url[image_url_index];

              image_url_index++;
          }
          image_url_index = 0;
      }

      call_me(load_images);

      load_init_modules()
    },
    destroyed(){
      clearInterval(this.inter1);
      clearTimeout(this.timeout1);
      this.imageList = []
    }
  }
</script>

<style scoped>
  @import '~static/css/musicalbum/animate3.css';
  @import '~static/css/musicalbum/starrynight.css';
  #ipresenter img{
    width: 400px;
  }
</style>
