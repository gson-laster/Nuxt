<template lang="pug">
#container
	#bgbox
		img#lvxing_bg(src='~static/img/musicalbum/travel/bg.jpg')
		#lvxing_biaoqian
			img(src='~static/img/musicalbum/travel/biaoqian.png')
			#contentbox
				#titlecontent {{titleText}}
	#coverbox
		img#lvxing_cover(src='~static/img/musicalbum/travel/fovered.png')
	#page4
		#div41s
			img#img41s(style='position:absolute')
		#div41h
			img#img41h(style='position:absolute')
		#div42s
			img#img42s(style='position:absolute')
		#div42h
			img#img42h(style='position:absolute')
	#page1
		#div1s
			img#img1s(style='position:absolute')
		#div1h
			img#img1h(style='position:absolute')
		img#lvxing_hua1ying(src='~static/img/musicalbum/travel/huayingzi.png')
		img#lvxing_hua2ying(src='~static/img/musicalbum/travel/huayingzi.png')
		img#lvxing_hua3ying(src='~static/img/musicalbum/travel/huayingzi.png')
		img#lvxing_hua1(src='~static/img/musicalbum/travel/hua2.png')
		img#lvxing_hua2(src='~static/img/musicalbum/travel/hua3.png')
		img#lvxing_hua3(src='~static/img/musicalbum/travel/hua2.png')
	#page2(style='-webkit-transform-origin:50% 100%')
		#div21h
			img#img21h(style='position:absolute')
		#div21s
			img#img21s(style='position:absolute')
		#div22h
			img#img22h(style='position:absolute')
		#div22s
			img#img22s(style='position:absolute')
	#lvxing_jiaoyin
		div(style='position:absolute;top:-111px;left:-83px')
			img#jiaoya1(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(44px,0) scale(-1,1) rotate(-115deg);opacity:0')
			img#jiaoya3(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(227px,90px) scale(-1,1) rotate(-136deg);opacity:0')
			img#jiaoya2(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(109px,90px) scale(1,1) rotate(-248deg);opacity:0')
			img#jiaoyin8(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(-83px,19px) scale(1,1) rotate(-261deg);opacity:0')
		img#jiaoyin7(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(-187px,-200px) scale(-1,1) rotate(242deg);opacity:0')
		img#jiao1(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(-188px,-211px) scale(-1,1) rotate(-117deg);opacity:0')
		img#jiao2(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(-188px,-211px) scale(-1,1) rotate(-117deg);opacity:0')
		img#jiao3(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(-188px,-211px) scale(-1,1) rotate(-117deg);opacity:0')
		img#jiao4(src='~static/img/musicalbum/travel/jiaoya.png', style='position:absolute;width:47px;-webkit-transform:translate(-188px,-211px) scale(-1,1) rotate(-117deg);opacity:0')
	#page3
		#div3s
			img#img3s(style='position:absolute')
		#div3h
			img#img3h(style='position:absolute')
	#lvxing_zhinanzhen(style='display:block')
		img#lvxing_pan(src='~static/img/musicalbum/travel/n.png')
		img#lvxing_zhen(src='~static/img/musicalbum/travel/z.png')
	#lvxing_area
		img#lvxing_feiji(src='~static/img/musicalbum/travel/feiji.png')
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
    mounted () {
      document.ontouchmove = function(e) {
          e.preventDefault();
      };
      var module_inits = [];
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

      var image_size_width = [];
      var image_size_height = [];
      var Onload_imgs_url = []

      var image_url_index = 0;
      var have_num = 0;
      var error_num = 0;
      var canshow = true;
      var reshow = false;

      var delaytime = 4000;
      var begin_titletime = new Date().getTime()
      var slider_images_url = this.imageList
      function id(name) {
          return document.getElementById(name);
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
          canshow = true;
          showtitle();
          for (var i = 0; i < slider_images_url.length; i++) {
              var img = new Image();
              img.index = i;
              img.src = slider_images_url[i];
              Onload_imgs_url[i] = 'loading';
              img.onload = image_onload;
              img.onerror = image_onerror;
          }
      }

      function image_onerror(event) {
          var img = event.target;
          var index = img.index;
          if (index < 10)
              error_num++;
          Onload_imgs_url[index] = 'not find';
          // console.log(Onload_imgs_url[index]);
          // console.log(have_num + '-' + error_num);
          if ((have_num + error_num >= 10 || slider_images_url.length == (have_num + error_num)) && canshow == true) {
              reshow = false;
              canshow = false;
              if (have_num == 0)
                  return;
              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              if (dis_titletime > delaytime) {
                  show1();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.pageTimer['timeout0'] = setTimeout(function() {
                      show1();
                  }, dis_titletime);
              }
          }
      }

      function image_onload(event) {
          if (reshow == true)
              return;
          var img = event.target;
          var index = img.index;
          if (index < 10) {
              have_num++;
          }

          Onload_imgs_url[index] = img.src;
          image_size_height[index] = img.height;
          image_size_width[index] = img.width;

          if ((have_num + error_num >= 10 || slider_images_url.length == (have_num + error_num)) && canshow == true) {
              reshow = false;
              canshow = false;

              if (have_num == 0)
                  return;

              var end_titletime = new Date();
              end_titletime = end_titletime.getTime();
              var dis_titletime = Math.abs(end_titletime - begin_titletime);
              if (dis_titletime > delaytime) {
                  show1();
              } else {
                  dis_titletime = delaytime - dis_titletime;
                  _this.pageTimer['timeout0'] = setTimeout(function() {
                      show1();
                  }, dis_titletime);
              }
          }
      }

      function id(name) {
          return document.getElementById(name);
      }

      function show1() {
          if (reshow == true)
              return;
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('1');
          image_url_index++;

          id('page1').style.display = 'block';
          id('lvxing_hua1ying').style.display = 'block';
          id('lvxing_hua1').style.display = 'block';
          id('lvxing_hua2').style.display = 'block';
          id('lvxing_hua2ying').style.display = 'block';
          id('lvxing_hua3').style.display = 'block';
          id('lvxing_hua3ying').style.display = 'block';

          id('bgbox').style.webkitAnimation = 'bgmove1 1.8s ease-in-out both';
          id('page1').style.webkitAnimation = 'bgmove1 1.8s ease-in-out both';
          id('lvxing_hua1').style.webkitAnimation = 'hua1 2s linear both';
          id('lvxing_hua1ying').style.webkitAnimation = 'hua1ying 2s linear both';
          id('lvxing_hua2').style.webkitAnimation = 'hua2 1.5s ease-out 0.5s both';
          id('lvxing_hua2ying').style.webkitAnimation = 'hua2ying 1.5s ease-out 0.5s both';
          id('lvxing_hua3').style.webkitAnimation = 'hua1 2s linear 1.5s forwards';
          id('lvxing_hua3ying').style.webkitAnimation = 'hua1ying 2s linear 1.5s forwards';
          id('div1h').style.webkitAnimation = 'div1move 2s linear both';
          id('div1s').style.webkitAnimation = 'div1move 2s linear both';

          id('div41h').style.display = 'none';
          id('div41s').style.display = 'none';
          id('page4').style.webkitAnimation = 'page4out 1.8s ease-in-out both';

          cleanshow3();
          cleanjiaoyin();

          _this.pageTimer['timeout1'] = setTimeout(show2, 4000);
      }

      function cleanshow1() {
          if (reshow == true)
              return;
          id('page1').style.display = 'none';
          id('page1').style.webkitAnimation = '';
          id('lvxing_hua1').style.webkitAnimation = '';
          id('lvxing_hua1ying').style.webkitAnimation = '';
          id('lvxing_hua2').style.webkitAnimation = '';
          id('lvxing_hua2ying').style.webkitAnimation = '';
          id('lvxing_hua3').style.webkitAnimation = '';
          id('lvxing_hua3ying').style.webkitAnimation = '';
          id('div1h').style.webkitAnimation = '';
          id('div1s').style.webkitAnimation = '';
          id('lvxing_hua1').style.display = 'none';
          id('lvxing_hua1ying').style.display = 'none';
          id('lvxing_hua2').style.display = 'none';
          id('lvxing_hua2ying').style.display = 'none';
          id('lvxing_hua3').style.display = 'none';
          id('lvxing_hua3ying').style.display = 'none';
          id('div1h').style.display = 'none';
          id('div1s').style.display = 'none';
      }

      function show2() {
          if (reshow == true)
              return;
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('21');
          image_url_index++;
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('22');
          image_url_index++;

          id('lvxing_feiji').style.display = 'block';
          id('lvxing_area').style.display = 'block';

          id('page2').style.display = 'block';
          id('bgbox').style.webkitAnimation = 'bgmove2 2s ease-out both';
          id('page1').style.webkitAnimation = 'page1out 2s ease-out both';
          id('div21h').style.webkitAnimation = 'div21hmove 2s ease-in-out both';
          id('div21s').style.webkitAnimation = 'div21hmove 2s ease-in-out both';
          id('div22h').style.webkitAnimation = 'div22hmove 1.5s 1.5s ease-out both';
          id('div22s').style.webkitAnimation = 'div22hmove 1.5s 1.5s ease-out both';
          id('lvxing_area').style.webkitAnimation = 'feiji 3s linear both';
          id('lvxing_feiji').style.webkitAnimation = 'feijia 3s linear both';
          id('lvxing_zhen').style.webkitAnimation = 'zhinanzhen1 2s linear both';

          cleanshow4();
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('3');
          image_url_index++;

          _this.pageTimer['timeout2'] = setTimeout(show3, 4000);
      }

      function cleanshow2() {
          if (reshow == true)
              return;
          id('div21h').style.display = 'none';
          id('div22h').style.display = 'none';
          id('div21s').style.display = 'none';
          id('div22s').style.display = 'none';
          id('lvxing_area').style.display = 'none';
          id('lvxing_feiji').style.display = 'none';
          id('div21h').style.webkitAnimation = '';
          id('div22h').style.webkitAnimation = '';
          id('div21s').style.webkitAnimation = '';
          id('div22s').style.webkitAnimation = '';
          id('lvxing_area').style.webkitAnimation = '';
          id('lvxing_feiji').style.webkitAnimation = '';
          id('page2').style.display = 'none';
          id('page2').style.webkitAnimation = '';
      }

      function show3() {
          if (reshow == true)
              return;

          id('page2').style.display = 'block';
          id('page3').style.display = 'block';
          id('lvxing_biaoqian').style.display = 'none';
          id('lvxing_biaoqian').style.webkitAnimation = '';

          id('bgbox').style.webkitAnimation = 'bgmove3 3.5s ease-out both';
          id('page2').style.webkitAnimation = 'page2out 3.5s ease-out both';
          id('div3s').style.webkitAnimation = 'div3smove 3.5s ease-out both';
          id('div3h').style.webkitAnimation = 'div3smove 3.5s ease-out both';
          id('lvxing_zhen').style.webkitAnimation = 'zhinanzhen2 3.5s linear both';

          cleanshow1();
          showjiaoyin();
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('41');
          image_url_index++;
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('42');
          image_url_index++;
          _this.pageTimer['timeout3'] = setTimeout(show4, 5000)
      }

      function cleanshow3() {
          if (reshow == true)
              return;
          id('div3s').style.webkitAnimation = '';
          id('div3s').style.display = 'none';
          id('div3h').style.webkitAnimation = '';
          id('div3h').style.display = 'none';
      }

      function show4() {
          if (reshow == true)
              return;


          id('page3').style.display = 'block';
          id('page4').style.display = 'block';

          id('bgbox').style.webkitAnimation = 'bgmove4 8s linear both';
          id('page4').style.webkitAnimation = 'bgmove4 8s linear both';
          id('lvxing_jiaoyin').style.webkitAnimation = 'jiaoyinmove 8s linear both';
          id('page3').style.webkitAnimation = 'page3out 8s linear both';
          id('lvxing_zhen').style.webkitAnimation = 'zhinanzhen3 8s linear both';

          cleanshow2();
          if (image_url_index == Onload_imgs_url.length)
              image_url_index = 0;
          setImage('1');
          image_url_index++;
          _this.pageTimer['timeout4'] = setTimeout(show1, 9000);
      }

      function cleanshow4() {
          if (reshow == true)
              return;
          id('page3').style.display = 'none';
          id('page4').style.display = 'none';
          id('page3').style.webkitAnimation = '';
          id('page4').style.webkitAnimation = '';
      }

      function showtitle() {
          if (reshow == true)
              return;
          id('lvxing_biaoqian').style.webkitAnimation = 'fadein 1s linear both';
      }

      var divwidth = {
          '1h': 400,
          '1s': 373,
          '21h': 432,
          '21s': 280,
          '22h': 350,
          '22s': 230,
          '3h': 440,
          '3s': 400,
          '41h': 400,
          '41s': 400,
          '42h': 383,
          '42s': 380
      };
      var divheight = {
          '1h': 280,
          '1s': 548,
          '21h': 313,
          '21s': 400,
          '22h': 250,
          '22s': 320,
          '3h': 320,
          '3s': 600,
          '41h': 280,
          '41s': 600,
          '42h': 276,
          '42s': 580
      };

      function setImage(idname) {
          if (reshow == true)
              return;
          while (Onload_imgs_url[image_url_index] == 'not find' || Onload_imgs_url[image_url_index] == 'loading') {
              // console.log(Onload_imgs_url[image_url_index]);
              image_url_index++;
              if (image_url_index == Onload_imgs_url.length)
                  image_url_index = 0;
          }

          var img_bili = image_size_width[image_url_index] / image_size_height[image_url_index];
          var div;
          var div1;
          var divname;

          if (img_bili > 1) {
              divname = idname + 'h';
              div = id('div' + idname + 'h');
              div1 = id('div' + idname + 's');
          } else {
              divname = idname + 's';
              div = id('div' + idname + 's');
              div1 = id('div' + idname + 'h');
          }

          div.style.display = 'block';
          div1.style.display = 'none';


          var height = divheight[divname];
          var width = divwidth[divname];

          var img = id('img' + divname);
          img.src = Onload_imgs_url[image_url_index];
          // console.log(img.src);

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
          // console.log(width,height,img.style.left,img.style.top,img.width,img.height);
      }

      function showjiaoyin() {
          if (reshow == true)
              return;
          id('lvxing_jiaoyin').style.display = 'none';
          id('lvxing_jiaoyin').style.webkitAnimation = '';
          id('jiao1').style.webkitAnimation = 'jiao1 1s linear';
          id('jiao2').style.webkitAnimation = 'jiao2 1s 1s linear';
          id('jiao3').style.webkitAnimation = 'jiao1 1s 2s linear';
          id('jiao4').style.webkitAnimation = 'jiao4 0.8s 3s linear forwards';
          id('jiaoyin7').style.webkitAnimation = 'jiao5 1s 3.5s linear forwards';
          id('jiaoyin8').style.webkitAnimation = 'jiao5 1s 4s linear forwards';
          id('jiaoya1').style.webkitAnimation = 'jiao5 1s 4.5s linear forwards';
          id('jiaoya2').style.webkitAnimation = 'jiao5 1s 5s linear forwards';
          id('jiaoya3').style.webkitAnimation = 'jiao5 1s 5.5s linear forwards';
      }

      function cleanjiaoyin() {
          if (reshow == true)
              return;
          id('lvxing_jiaoyin').style.display = 'none';
          id('jiao1').style.webkitAnimation = '';
          id('jiao2').style.webkitAnimation = '';
          id('jiao3').style.webkitAnimation = '';
          id('jiao4').style.webkitAnimation = '';
          id('jiaoyin7').style.webkitAnimation = '';
          id('jiaoyin8').style.webkitAnimation = '';
          id('jiaoya1').style.webkitAnimation = '';
          id('jiaoya2').style.webkitAnimation = '';
          id('jiaoya3').style.webkitAnimation = '';
      }

      call_me(load_images);

      function reload_scene() {
          clearnode();
          reshow = true;
          load_images();

      }

      function clearnode() {
          for (var i = 0; i < _this.pageTimer.length; i++) {
            clearTimeout(_this.pageTimer[i])
          }

          cleanshow1();
          cleanshow2();
          cleanshow3();
          cleanshow4();
          cleanjiaoyin();
          // console.log('test');
          id('bgbox').style.webkitAnimation = '';
          id('page1').style.display = 'none';
          id('lvxing_biaoqian').style.display = 'block';
          id('lvxing_biaoqian').style.webkitAnimation = '';

      }
      function random(min, max) {
          return Math.floor(min + Math.random() * (max - min));
      }

      load_init_modules()
    },
    destroyed(){
      for (var i = 0; i < this.pageTimer.length; i++) {
        clearTimeout(this.pageTimer[i])
      }
    }
  }
</script>

<style scoped>
  @import '~static/css/musicalbum/animate6.css';
  @import '~static/css/musicalbum/travel.css';
</style>
