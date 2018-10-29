<template lang="pug">
#container
  img(src='~static/img/musicalbum/beautyfield/bg.jpg')
  #fengchediv
    img#fengche(src='~static/img/musicalbum/beautyfield/chib.png')
  img.cloud(src='~static/img/musicalbum/beautyfield/yun.png')
  img.cloud1(src='~static/img/musicalbum/beautyfield/yun.png')
  #diandiv1
    img#dian1(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv2
    img#dian2(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv3
    img#dian3(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv4
    img#dian4(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv5
    img#dian5(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv6
    img#dian6(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv7
    img#dian7(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv8
    img#dian8(src='~static/img/musicalbum/beautyfield/zidian.png')
  #diandiv9
    img#dian9(src='~static/img/musicalbum/beautyfield/zidian.png')
  #hudie1
    #hudiein1.hudie
      img.chibang1(src='~static/img/musicalbum/beautyfield/chibang.png')
      img.chibang2(src='~static/img/musicalbum/beautyfield/chibang.png')
      img.chibang3(src='~static/img/musicalbum/beautyfield/chibang2.png')
      img.chibang4(src='~static/img/musicalbum/beautyfield/chibang2.png')
  #hudieout2
    #hudie2
      #hudiein2.hudie
        img.chibang1(src='~static/img/musicalbum/beautyfield/chibang.png')
        img.chibang2(src='~static/img/musicalbum/beautyfield/chibang.png')
        img.chibang3(src='~static/img/musicalbum/beautyfield/chibang2.png')
        img.chibang4(src='~static/img/musicalbum/beautyfield/chibang2.png')
  #hudie3.hudie
    img.chibang1(src='~static/img/musicalbum/beautyfield/chibang.png')
    img.chibang2(src='~static/img/musicalbum/beautyfield/chibang.png')
    img.chibang3(src='~static/img/musicalbum/beautyfield/chibang2.png')
    img.chibang4(src='~static/img/musicalbum/beautyfield/chibang2.png')
  #divv.divv(style='display:none')
    #boxv.imgconv
      #conv.conv
        img#imgv(style='position:absolute')
        span#wordv.showwords
  #divh.divh(style='display:none')
    #boxh.imgconh
      #conh.conh
        img#imgh(style='position:absolute')
        span#wordh.showwords
  img#shang(src='~static/img/musicalbum/beautyfield/shang.png')
  img#zhalan(src='~static/img/musicalbum/beautyfield/zhalan.png')
  #pagetitle.page-title
    div(style="position:absolute;width:410px;height:200px;top:0;left:0;overflow:hidden")
      div(style="position:absolute;width:410px;height:200px;display:table;overflow:hidden")
        .title-content {{titleText}}

</template>

<script>
  export default {
    data () {
      return {
        pageTimer: []
      }
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
      document.ontouchmove = function(e) {
      e.preventDefault();
      };
      var module_inits = [];

      function load_init_modules() {
          for (var i = 0; i < module_inits.length; i++) {
              module_inits[i]();
          }
      }

      function call_me(fun) {
          module_inits.push(fun);
      }
      var ua = navigator.userAgent.toLowerCase();

      // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //     wx.ready(load_init_modules);
      // } else {
      //     onload = load_init_modules;
      // }
      //onload = load_init_modules;

      var image_size_width = [];
      var image_size_height = [];
      var image_url_index = 0;
      var Onload_imgs_url = [];
      var have_num = 0;
      var error_num = 0;
      var canshow = true;
      var reshow = false;
      var delaytime = 4000;
      var begin_titletime = new Date().getTime()
      var slider_images_url = this.imageList
      var timeout0;
      var timeout1;
      var timeout2;
      var timeout3;
      var _this = this

      function id(name) {
          return document.getElementById(name);
      }

      var get_pid = function(url) {
          var index1 = url.indexOf("?");
          if (index1 != -1) {
              url = url.substr(0, index1);
          }
          return url.toString().substr(url.lastIndexOf("/") + 1);
      }

      //每次执行加载后10张图片
      var bl_keepload = 'first';
      var step_loadnum = 5;

      function step_load() {
          var load_num = 0
          //初步加载X张
          if (image_url_index == 0 && bl_keepload == 'first') {
              console.log('loading continue');
              if (slider_images_url.length > step_loadnum) {
                  load_num = step_loadnum;
                  bl_keepload = 'next';
              } else {
                  load_num = slider_images_url.length;
                  bl_keepload = 'end';
              }
              for (var i = 0; i < load_num; i++) {
                  var img = new Image();
                  img.index = i;
                  img.src = slider_images_url[i];
                  img.onload = image_onload;
                  img.onerror = image_onerror;
                  Onload_imgs_url[i] = 'loading';
              }
          } else if (bl_keepload == 'end') {
              return;
          } else {
              console.log('loading continue');
              if (slider_images_url.length - image_url_index > step_loadnum * 2) {
                  load_num = step_loadnum;
              } else {
                  load_num = slider_images_url.length - image_url_index - step_loadnum;
                  bl_keepload = 'end';
              }
              for (var i = image_url_index + step_loadnum; i < image_url_index + step_loadnum + load_num; i++) {
                  var img = new Image();
                  img.index = i;
                  img.src = slider_images_url[i];
                  img.onload = image_onload;
                  img.onerror = image_onerror;
                  Onload_imgs_url[i] = 'loading';
              }
          }

      }

      function showtitle() {
          id('pagetitle').style.webkitAnimation = 'title_in 2s ease-out both';
      }

      function liangziyun_kawa() {
          id('pagetitle').style.webkitAnimation = 'title_out 1s ease-in both';
          _this.pageTimer['timeout1'] = setTimeout(show1, 1000);
      }

      var arr_ani = ['right', 'left', 'up'];
      var ani_index = 0;

      function show1() {
          id('divh').style.webkitAnimation = 'divh_out_' + arr_ani[ani_index % 3] + ' 6s linear both';
          id('conh').style.webkitAnimation = 'divh_in_' + arr_ani[ani_index % 3] + ' 6s linear both';
          id('boxh').style.webkitAnimation = 'divh_mid_' + arr_ani[ani_index % 3] + ' 6s linear both';
          setImage();
          id('divv').style.webkitAnimation = 'divv_out_right 6s linear both';
          id('conv').style.webkitAnimation = 'divv_in_right 6s linear both';
          id('boxv').style.webkitAnimation = 'divv_mid_right 6s linear both';

          ani_index++;
          if (ani_index == 4)
              ani_index = 0;

          _this.pageTimer['timeout2'] = setTimeout(show2, 6500);
      }

      function show2() {
          id('divh').style.webkitAnimation = 'divh_out_' + arr_ani[ani_index % 3] + ' 6s linear both';
          id('conh').style.webkitAnimation = 'divh_in_' + arr_ani[ani_index % 3] + ' 6s linear both';
          id('boxh').style.webkitAnimation = 'divh_mid_' + arr_ani[ani_index % 3] + ' 6s linear both';
          setImage();
          id('divv').style.webkitAnimation = 'divv_out_left 6s linear both';
          id('conv').style.webkitAnimation = 'divv_in_left 6s linear both';
          id('boxv').style.webkitAnimation = 'divv_mid_left 6s linear both';

          ani_index++;
          if (ani_index == 3)
              ani_index = 0;

          _this.pageTimer['timeout3'] = setTimeout(show1, 6500)
      }

      function setImage() {
          if (reshow == true)
              return;

          // console.log(image_url_index)
          while (Onload_imgs_url[image_url_index] == 'not find' || Onload_imgs_url[image_url_index] == 'loading') {
              // console.log(Onload_imgs_url[image_url_index]);
              if (image_url_index % step_loadnum == 0) {
                  // alert()
                  step_load();
              }
              image_url_index++;
              if (image_url_index == Onload_imgs_url.length)
                  image_url_index = 0;
          }
          var img_bili = image_size_width[image_url_index] / image_size_height[image_url_index];
          if (image_url_index % step_loadnum == 0) {
              step_load();
          }
          var div;
          var div1;
          var img;
          var word;
          var width, height

          if (img_bili > 1) {
              div = id('divh');
              div1 = id('divv');
              width = 492;
              height = 335;
              img = id('imgh');
          } else {
              div = id('divv');
              div1 = id('divh');
              width = 280;
              height = 400;
              img = id('imgv');
          }

          div.style.display = 'block';
          div1.style.display = 'none';

          img.src = Onload_imgs_url[image_url_index];
          // console.log('setimg:' + img.src);

          if (img_bili > (width / height)) {
              img.style.top = '0px';
              img.style.height = height + 'px';
              img.style.width = height * img_bili + 'px';
              img.style.left = -((height * img_bili - width) / 2) + 'px';
          } else {
              img.style.left = '0px';
              img.style.width = width + 'px';
              img.style.height = width / img_bili + 'px';
              img.style.top = -((width / img_bili - height) / 2) + 'px';
          }

          image_url_index++;
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
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
      call_me(load_images);

      function load_images() {
          reshow = false;
          image_size_width = [];
          image_size_height = [];
          Onload_imgs_url = [];
          image_url_index = 0;
          have_num = 0;
          error_num = 0;
          begin_titletime = new Date();
          begin_titletime = begin_titletime.getTime();
          canshow = true;
          showtitle();
          bl_keepload = 'first';
          // loading_first();
          step_load();
      }

      function image_onerror(event) {
          var img = event.target;
          var index = img.index;
          if (index < step_loadnum)
              error_num++;
          Onload_imgs_url[index] = 'not find';
          if ((have_num + error_num >= step_loadnum || slider_images_url.length == (have_num + error_num)) && canshow == true) {
              // loading_others();
              reshow = false;
              canshow = false;
              if (have_num == 0)
                  return;
              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              if (dis_titletime > delaytime) {
                  liangziyun_kawa();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.pageTimer['timeout0'] = setTimeout(function() {
                      liangziyun_kawa();
                  }, dis_titletime);
              }
          }
      }

      function image_onload(event) {
          if (reshow == true)
              return;

          var img = event.target;
          var index = img.index;

          if (index < step_loadnum) {
              have_num++;
          }
          Onload_imgs_url[index] = img.src;
          image_size_height[index] = img.height;
          image_size_width[index] = img.width;

          // console.log(Onload_imgs_url[index]);

          if ((have_num + error_num >= step_loadnum || slider_images_url.length == (have_num + error_num)) && canshow == true) {
              reshow = false;
              canshow = false;
              if (have_num == 0)
                  return;
              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              if (dis_titletime > delaytime) {
                  liangziyun_kawa();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.pageTimer['timeout0'] = setTimeout(function() {
                      liangziyun_kawa();
                  }, dis_titletime);
              }

          }
      }

      load_init_modules ()  // 初始化所有的方法


      function reload_scene() {
          clearnode();
          reshow = true;
          setTimeout(load_images, 100);
      }

      function clearnode() {
          id('divv').style.webkitAnimation = '';
          id('divh').style.webkitAnimation = '';
          id('divv').style.display = 'none';
          id('divh').style.display = 'none';
          id('conv').style.webkitAnimation = '';
          id('conh').style.webkitAnimation = '';
          id('boxv').style.webkitAnimation = '';
          id('boxh').style.webkitAnimation = '';
          id('pagetitle').style.webkitAnimation = '';
          clearTimeout(timeout0);
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          clearTimeout(timeout3);
      }

    },
    destroyed(){
      for (var i = 0; i < this.pageTimer.length; i++) {
        clearTimeout(this.pageTimer[i])
      }
    }
  }
</script>

<style scoped>
  @import '~static/css/musicalbum/animate4.css';
  @import '~static/css/musicalbum/beautyfield.css';
  img{
    width: auto;
  }
</style>
