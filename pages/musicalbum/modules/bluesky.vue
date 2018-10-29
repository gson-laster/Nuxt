<template lang="pug">
#container
	img#bg(src='~static/img/musicalbum/bluesky/bg.jpg')
	#backdiv1.backdiv(style='-webkit-filter:blur(30px)')
		#div11h.divh
			img#img11h.img1
			span#word11h.showwords
		#div11v.divv
			img#img11v.img1
			span#word11v.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/01.png')
	#backdiv2.backdiv(style='-webkit-filter:blur(15px)')
		#div22h.divh
			img#img22h.img1
			span#word22h.showwords
		#div22v.divv
			img#img22v.img1
			span#word22v.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/02.png')
	#backdiv3.backdiv(style='-webkit-filter:blur(10px)')
		#div33v.divv
			img#img33v.img1
			span#word33v.showwords
		#div33h.divh
			img#img33h.img1
			span#word33h.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/03.png')
	#backdiv4.backdiv(style='-webkit-filter:blur(40px)')
		#div44h.divh
			img#img44h.img1
			span#word44h.showwords
		#div44v.divv
			img#img44v.img1
			span#word44v.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/04.png')
	#titlediv.backdiv
		img.title(src='~static/img/musicalbum/bluesky/title.png')
		div(style='position:absolute;width:250px;height:316px;top:720px;left:200px;overflow:hidden;display:table')
			#titlecontent(style='width:250px;height:316px;vertical-align:middle;display:table-cell;text-align:center;font-size:32px;line-height:50px;color:#fff;text-shadow:2px 2px 2px rgba(0,0,0,.6);font-weight:700') {{titleText}}
		img.bloon(src='~static/img/musicalbum/bluesky/02.png')
	#div2.divbox
		#div2h.divimgh
			img#img2h.img
			span#word2h.showwords
		#div2v.divimgv
			img#img2v.img
			span#word2v.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/04.png')
	#div1.divbox
		#div1v.divimgv
			img#img1v.img
			span#word1v.showwords
		#div1h.divimgh
			img#img1h.img
			span#word1h.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/01.png')
	#div4.divbox
		#div4h.divimgh
			img#img4h.img
			span#word4h.showwords
		#div4v.divimgv
			img#img4v.img
			span#word4v.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/02.png')
	#div3.divbox
		#div3h.divimgh
			img#img3h.img
			span#word3h.showwords
		#div3v.divimgv
			img#img3v.img
			span#word3v.showwords
		img.bloon(src='~static/img/musicalbum/bluesky/03.png')
</template>

<script>
  export default {
    data () {
      return {
        timeout: []
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
    mounted () {
      var module_inits = [];
      var Onload_imgs_url = []
      var begin_titletime = new Date().getTime()
      var slider_images_url = this.imageList
      var _this = this

      function load_init_modules() {
          for (var i = 0; i < module_inits.length; i++) {
              module_inits[i]();
          }
      }

      function call_me(fun) {
          module_inits.push(fun);
      }

      var ua = navigator.userAgent.toLowerCase();

      // onload = load_init_modules;

      var get_pid = function(url) {
          var index1 = url.indexOf("?");
          if (index1 != -1) {
              url = url.substr(0, index1);
          }
          return url.toString().substr(url.lastIndexOf("/") + 1);
      }

      function id(name) {
          return document.getElementById(name);
      }

      var userAgent = '';

      function check_agent() {
          var u = navigator.userAgent;
          if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
              userAgent = 'ar';
              id('backdiv1').style.webkitFilter = 'blur(2px)';
              id('backdiv2').style.webkitFilter = 'blur(2px)';
              id('backdiv3').style.webkitFilter = 'blur(1px)';
              id('backdiv4').style.webkitFilter = 'blur(2px)';
          } else {
              userAgent = 'ios';
              id('backdiv1').style.webkitFilter = 'blur(30px)';
              id('backdiv2').style.webkitFilter = 'blur(15px)';
              id('backdiv3').style.webkitFilter = 'blur(10px)';
              id('backdiv4').style.webkitFilter = 'blur(40px)';
          }

      }

      function showtitle() {
          check_agent();
          if (userAgent == 'ar') {
              id('titlediv').style.webkitAnimation = 'title_in_ar 10s linear both';
          } else {
              id('titlediv').style.webkitAnimation = 'title_in 10s linear both';
          }

          _this.timeout[1] = setTimeout(show1, 8000)
      }

      function show1() {
          setImage('1');
          id('div1').style.display = 'block';
          id('div2').style.display = 'none';
          id('div3').style.display = 'none';
          id('div4').style.display = 'block';
          if (userAgent == 'ar') {
              id('div1').style.webkitAnimation = 'balloon1h_in_ar 12s linear both,balloon1fade 12s linear both';
          } else {
              id('div1').style.webkitAnimation = 'balloon1h_in 12s linear both,balloon1fade 12s linear both';
          }

          id('div2').style.webkitAnimation = '';

          _this.timeout[2] = setTimeout(show2, 8000)
      }

      function show2() {
          setImage('2');
          id('titlediv').style.display = 'none';
          id('div1').style.display = 'block';
          id('div2').style.display = 'block';
          id('div3').style.display = 'none';
          id('div4').style.display = 'none';
          if (userAgent == 'ar') {
              id('div2').style.webkitAnimation = 'balloon2h_in_ar 11s linear both,balloon1fade 11s linear both';
          } else {
              id('div2').style.webkitAnimation = 'balloon2h_in 11s linear both,balloon1fade 11s linear both';
          }

          id('div3').style.webkitAnimation = '';

          _this.timeout[3] = setTimeout(show3, 8000)
      }

      function show3() {
          setImage('3');
          id('div1').style.display = 'none';
          id('div2').style.display = 'block';
          id('div3').style.display = 'block';
          id('div4').style.display = 'none';
          if (userAgent == 'ar') {
              id('div3').style.webkitAnimation = 'balloon3h_in_ar 11s linear both,balloon1fade 11s linear both';
          } else
              id('div3').style.webkitAnimation = 'balloon3h_in 11s linear both,balloon1fade 11s linear both';
          id('div4').style.webkitAnimation = '';

          _this.timeout[4] = setTimeout(show4, 7000)
      }

      function show4() {
          setImage('4');
          id('div1').style.display = 'none';
          id('div2').style.display = 'none';
          id('div3').style.display = 'block';
          id('div4').style.display = 'block';
          if (userAgent == 'ar')
              id('div4').style.webkitAnimation = 'title_in_ar 14s linear both';
          else
              id('div4').style.webkitAnimation = 'title_in 14s linear both';
          id('div1').style.webkitAnimation = '';

          _this.timeout[5] = setTimeout(show1, 11000)
      }

      function showbackimg() {
          setImage('11');
          setImage('22');
          setImage('33');
          setImage('44');
          id('img11h').style.webkitAnimation = 'fadein 1s linear both';
          id('img11v').style.webkitAnimation = 'fadein 1s linear both';
          id('img22h').style.webkitAnimation = 'fadein 1s linear both';
          id('img22v').style.webkitAnimation = 'fadein 1s linear both';
          id('img33h').style.webkitAnimation = 'fadein 1s linear both';
          id('img33v').style.webkitAnimation = 'fadein 1s linear both';
          id('img44h').style.webkitAnimation = 'fadein 1s linear both';
          id('img44v').style.webkitAnimation = 'fadein 1s linear both';
          // id('backdiv1').style.webkitAnimation = 'balloon1 35s 5s linear infinite';
          // id('backdiv2').style.webkitAnimation = 'balloon2 35s linear infinite';
          // id('backdiv3').style.webkitAnimation = 'balloon3 25s 1s linear infinite';
          // id('backdiv4').style.webkitAnimation = 'balloon1 40s 10s linear infinite';
          image_url_index = 0;
      }

      var image_size_width = [];
      var image_size_height = [];
      var image_url_index = 0;
      var have_num = 0;
      var error_num = 0;
      var canshow = true;
      var reshow = false;
      var timeout = [];


      var delaytime = 3000;

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
                  Onload_imgs_url[i] = 'loading';
                  img.onload = image_onload;
                  img.onerror = image_onerror;

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
                  Onload_imgs_url[i] = 'loading';
                  img.onload = image_onload;
                  img.onerror = image_onerror;

              }
          }
      }

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
          showtitle();
          canshow = true;

          bl_keepload = 'first';
          step_load();
      }

      function image_onerror(event) {
          var img = event.target;
          var index = img.index;
          if (index < step_loadnum)
              error_num++;
          Onload_imgs_url[index] = 'not find';
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
                  showbackimg();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.timeout[0] = setTimeout(function() {
                      showbackimg();
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
                  showbackimg();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.timeout[0] = setTimeout(function() {
                      showbackimg();
                  }, dis_titletime);
              }

          }
      }

      function setImage(idname) {
          if (reshow == true)
              return;

          while (Onload_imgs_url[image_url_index] == 'not find' || Onload_imgs_url[image_url_index] == 'loading') {
              if (image_url_index % step_loadnum == 0) {
                  step_load();
              }
              image_url_index++;
              if (image_url_index == Onload_imgs_url.length)
                  image_url_index = 0;
          }

          if (image_url_index % step_loadnum == 0) {
              step_load();
          }

          var img_bili = image_size_width[image_url_index] / image_size_height[image_url_index];
          var div;
          var div1;
          var divname;
          var width, height

          if (img_bili > 1) {
              divname = idname + 'h';
              div = id('div' + idname + 'h');
              div1 = id('div' + idname + 'v');
              width = 500;
              height = 360;

          } else {
              divname = idname + 'v';
              div = id('div' + idname + 'v');
              div1 = id('div' + idname + 'h');
              width = 400;
              height = 580;

          }


          div.style.display = 'block';
          div1.style.display = 'none';
          var gotoArr = ['rotateYForimg4', 'rotateYForimg3', 'rotateYForimg2', 'rotateYForimg4'];

          id('div' + idname + 'h').style.webkitAnimation = gotoArr[random(0, gotoArr.length)] + " 35s 5s linear infinite";
          var img = id('img' + divname);
          img.src = Onload_imgs_url[image_url_index];
          // console.log(img);

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
      function random(min, max) {
          return Math.floor(min + Math.random() * (max - min));
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

      function reload_scene() {
          clearnode()
          reshow = true;
          setTimeout(load_images, 100)
      }

      load_init_modules()

      function clearnode() {
          id('titlediv').style.webkitAnimation = '';
          id('div1').style.webkitAnimation = '';
          id('div2').style.webkitAnimation = '';
          id('div3').style.webkitAnimation = '';
          id('div4').style.webkitAnimation = '';
          id('titlediv').style.display = 'block';
          for (var i = 0; i < _this.timeout.length; i++) {
              clearTimeout(_this.timeout[i])
          }
      }
    },
    destroyed(){
      for (var i = 0; i < this.timeout.length; i++) {
          clearTimeout(this.timeout[i])
      }
    }
  }
</script>

<style scoped>
@import '~static/css/musicalbum/animate5.css';
  @import '~static/css/musicalbum/bluesky.css';
</style>
