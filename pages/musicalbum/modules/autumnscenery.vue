<template lang="pug">
#container
  img#change_bg(:src='currentBgSrc', style="top: 600px")
  img(src='~static/img/musicalbum/autumnscenery/countain.png', style='height:914px;position:absolute;left:0')
  img#sky_rotate(src='~static/img/musicalbum/autumnscenery/xing.png', alt='')
  #lake_rotate
    img#lake_in(src='~static/img/musicalbum/autumnscenery/xing.png')
  #div1
    #div1h
      img.kuangh(src='~static/img/musicalbum/autumnscenery/1kuang.png')
      .divh
        img#img1h(style='position:absolute')
        span#word1h.showwords
    #div1v
      img.kuangv(src='~static/img/musicalbum/autumnscenery/kuang2.png')
      .divv
        img#img1v(style='position:absolute')
        span#word1v.showwords
  #div2
    #div2h
      img.kuangh(src='~static/img/musicalbum/autumnscenery/1kuang.png')
      .divh
        img#img2h(style='position:absolute')
        span#word2h.showwords
    #div2v
      img.kuangv(src='~static/img/musicalbum/autumnscenery/kuang2.png')
      .divv
        img#img2v(style='position:absolute')
        span#word2v.showwords
  #pagetitle.page-title(:class="{'title-in': titleStatus, 'title-out': !titleStatus}")
    div(style="position:absolute;width:410px;height:200px;top:0;left:0;overflow:hidden")
      div(style="position:absolute;width:410px;height:200px;display:table;overflow:hidden")
        .title-content {{titleText}}
</template>

<script>
  export default {
    data () {
      return {
        change_list: [
            require('~static/img/musicalbum/autumnscenery/shanshui/01.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/02.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/03.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/04.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/05.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/06.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/07.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/08.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/09.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/10.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/11.jpg'),
            require('~static/img/musicalbum/autumnscenery/shanshui/12.jpg'),
        ],
        currentBgSrc: require('~static/img/musicalbum/autumnscenery/shanshui/01.jpg'), // 当前山水背景
        change_index: 0,
        titleStatus: -1,
        module_inits: [], //初始化方法容器
        pageTimer: []
      }
    },
    methods: {
      // 改变背景
      changeBg(){
        this.currentBgSrc = this.change_list[this.change_index];
        this.change_index++;
        if (this.change_index == this.change_list.length)
            this.change_index = 0;
      },

      load_init_modules() {
          for (var i = 0; i < this.module_inits.length; i++) {
              this.module_inits[i]();
          }
      },
      call_me(fun) {
          this.module_inits.push(fun);
      }
    },
    components:{ },
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
      let _this = this
      _this.pageTimer['interval'] = setInterval(function (){
        _this.changeBg()
      }, 100)

      var Onload_imgs_url = []
      var begin_titletime = new Date().getTime()
      var slider_images_url = this.imageList
      var e_music_url = ''

      var ua = navigator.userAgent.toLowerCase();

      var image_size_width = [];
      var image_size_height = [];
      var image_url_index = 0;
      var have_num = 0;
      var error_num = 0;
      var canshow = true;
      var reshow = false;

      var delaytime = 4000;

      function id(name) {
          return document.getElementById(name);
      }

      function load_images() {
          load_imagesbegin();
      }

      function load_imagesbegin() {
          reshow = false;
          image_size_width = [];
          image_size_height = [];
          Onload_imgs_url = [];
          image_url_index = 0;
          have_num = 0;
          error_num = 0;
          begin_titletime = new Date();
          begin_titletime = begin_titletime.getTime();
          // _this.titleStatus = true
          showtitle()
          canshow = true;

          bl_keepload = 'first';
          step_load();
      }

      //每次执行加载后5张图片
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

      function image_onerror(event) {
          var img = event.target;
          var index = img.index;
          if (index < step_loadnum)
              error_num++;
          Onload_imgs_url[index] = 'not find';
          // console.log(Onload_imgs_url[index]);
          // console.log(have_num + '-' + error_num);
          if ((have_num + error_num >= step_loadnum || slider_images_url.length == (have_num + error_num)) && canshow == true) {
              reshow = false;
              canshow = false;
              if (have_num == 0)
                  return;
              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              if (dis_titletime > delaytime) {
                  liangziyun_fromkawa();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                _this.pageTimer['timeout0'] = setTimeout(function() {
                      liangziyun_fromkawa();
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

          console.log(have_num + '-' + error_num);

          if ((have_num + error_num >= step_loadnum || slider_images_url.length == (have_num + error_num)) && canshow == true) {
              reshow = false;
              canshow = false;
              if (have_num == 0)
                  return;
              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              if (dis_titletime > delaytime) {
                  liangziyun_fromkawa();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.pageTimer['timeout0'] = setTimeout(function() {
                      liangziyun_fromkawa();
                  }, dis_titletime);
              }

          }
      }

      function showtitle() {
          id('pagetitle').style.webkitAnimation = 'fadein_left 1.5s cubic-bezier(.27,.4,.83,1) both';
      }
      function liangziyun_fromkawa() {
          id('pagetitle').style.webkitAnimation = 'fadeout_left 2s ease-in both';
          showkawa1();
      }

      function showkawa1() {
          setImage('1');
          id('div1').style.webkitAnimation = 'fadein_left 2s ease-out both';
          _this.pageTimer['timeout1'] = setTimeout(showkawa2, 5000)
      }

      function showkawa2() {
          setImage('2');
          id('div1').style.webkitAnimation = 'fadeout_left 1.5s ease-in both';
          id('div2').style.webkitAnimation = 'fadein_left 2s ease-out both';
          _this.pageTimer['timeout2'] = setTimeout(showkawa3, 5000)
      }

      function showkawa3() {
          setImage('1');
          id('div2').style.webkitAnimation = 'fadeout_left 1.5s ease-in both';
          id('div1').style.webkitAnimation = 'fadein_left 2s ease-out both';
          _this.pageTimer['timeout3'] = setTimeout(showkawa4, 5000)
      }

      function showkawa4() {
          setImage('2');
          id('div1').style.webkitAnimation = 'fadeout_down 1.5s ease-in both';
          id('div2').style.webkitAnimation = 'fadein_down 2s ease-out both';
          _this.pageTimer['timeout4'] = setTimeout(showkawa5, 5000)
      }

      function showkawa5() {
          setImage('1');
          id('div2').style.webkitAnimation = 'fadeout_up 1.5s ease-in both';
          id('div1').style.webkitAnimation = 'fadein_up 2s ease-out both';
          _this.pageTimer['timeout5'] = setTimeout(showkawa6, 5000)
      }

      function showkawa6() {
          setImage('2');
          id('div1').style.webkitAnimation = 'fadeout_center 1.5s ease-in both';
          id('div2').style.webkitAnimation = 'fadein_left 2s ease-out both';
          _this.pageTimer['timeout6'] = setTimeout(showkawa3, 5000);
      }

      function setImage(idname) {
          if (reshow == true)
              return;

          while (Onload_imgs_url[image_url_index] == 'not find' || Onload_imgs_url[image_url_index] == 'loading') {
              image_url_index++;
              if (image_url_index == Onload_imgs_url.length)
                  image_url_index = 0;
          }

          if (image_url_index % step_loadnum == 0) {
              step_load();
          }
          // console.log('setimg:' + Onload_imgs_url[image_url_index]);

          var img_bili = image_size_width[image_url_index] / image_size_height[image_url_index];
          var div;
          var div1;
          var divname;
          var width, height

          if (img_bili > 1) { //横着
              divname = idname + 'h';
              div = id('div' + idname + 'h');
              div1 = id('div' + idname + 'v');
              width = 467;
              height = 300;
          } else { //竖着
              divname = idname + 'v';
              div = id('div' + idname + 'v');
              div1 = id('div' + idname + 'h');
              width = 375;
              height = 520;
          }

          div.style.display = 'block';
          div1.style.display = 'none';

          var img = id('img' + divname);
          img.src = Onload_imgs_url[image_url_index];

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

      this.call_me(load_images);

      function reload_scene() {
          clearnode();
          reshow = true;
          setTimeout(load_imagesbegin, 100);
      }

      function clearnode() {
          id('div1').style.webkitAnimation = '';
          id('div2').style.webkitAnimation = '';
          id('pagetitle').style.webkitAnimation = '';
          clearTimeout(_this.pageTimer['timeout0']);
          clearTimeout(_this.pageTimer['timeout1']);
          clearTimeout(_this.pageTimer['timeout2']);
          clearTimeout(_this.pageTimer['timeout3']);
          clearTimeout(_this.pageTimer['timeout4']);
          clearTimeout(_this.pageTimer['timeout5']);
          clearTimeout(_this.pageTimer['timeout6']);
      }
      this.load_init_modules()
    },
    destroyed(){
      clearTimeout(this.pageTimer['timeout0']);
      clearTimeout(this.pageTimer['timeout1']);
      clearTimeout(this.pageTimer['timeout2']);
      clearTimeout(this.pageTimer['timeout3']);
      clearTimeout(this.pageTimer['timeout4']);
      clearTimeout(this.pageTimer['timeout5']);
      clearTimeout(this.pageTimer['timeout6']);
      clearInterval(this.pageTimer['interval'])
    }
  }
</script>
<style lang="css" scoped="">
  @import '~static/css/musicalbum/animate1.css';
  @import '~static/css/musicalbum/autumnscenery.css';
  body {
    background-color: black;
  }
  img{
    width: auto
  }
</style>
