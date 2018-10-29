<template>
 	<div class="new_card">
    <Banner></Banner>
 	<div class="cleardiv">
 		<div class="new_userlogo">
 			<a href="javascript:void(0)" @click="showBg_itx">
 				<img src="../../static/img/h_img/touxiang.jpg"/>
 			</a>
 		</div>
 		<div class="new_userinfo1">
 			<div class="new_xmth">
 				<div class="new_name">
 					<h3>一个达布妞</h3>
 					<span></span>
 				</div>
 				<div class="new_phone">
 					<a href="tel:18679199741">
 						18679199741
 					</a>
 				</div>
 			</div>
 			<div class="new_urllink">
 				<li><a href="#" target="_blank"><div>公司介绍</div></a></li>
 				<li><a href="#" target="_blank"><div>我的原创</div></a></li>
 				<li><a href="#" target="_blank"><div>事业说明</div></a></li>
 				<li><a href="#" target="_blank"><div style="color: red;">申请网址</div></a></li>
 			</div>
 		</div>
 	</div>
 	<div class="new_userinfo2">
 		<ul>
 			<li><span>邮箱：</span><p></p></li>
 			<li><span>Q Q：</span><p>957547207</p></li>
 			<li><span>电话：</span><p>18679199741</p></li>
 			<li><span>地址：</span><p></p></li>
 			<li><span>个人说明：</span><p></p></li>
 		</ul>
 		<div class="new_wx"><a href="javascript:void(0)" @click="new_wx"><img src="../../static/img/h_img/wx.png"/></a></div>
 	</div>
 	<div class="new_userinfo3">
 		<div class="new_shoucang fxdpy">收藏</div>
 	</div>
 </div>
</template>
<script>
import Banner from '~/components/Banner/Banner'
 export default {
        components : {
			Banner
		},
		methods: {
			showBg_itx () {								
 				this.$emit('changeisdialog')
			},
			new_wx () {
				this.$emit('changedialog')
			}
		}
    }
</script>
<style scoped> 
.new_card {
    margin: 0 auto;
    width: 100%;
    max-width: 640px;  
    background: #F7F7F7; 
    overflow: hidden;
    padding-bottom: 60px;
}
.cleardiv {
    width: 100%;
    position: relative;
}
.new_userinfo2 {
    margin: 10px;
    padding: 10px;
    overflow: hidden;
    position: relative;
    font-size: 14px;
}
.new_userinfo3 {
    margin: 10px;
    border: 1px solid #DBDBDB;
    border-radius: 5px;
    padding: 10px 10px 40px;
    overflow: hidden;
    position: relative;
    font-size: 14px;
}
.new_userlogo {
    position: absolute;
    width: 156px;
    left: 15px;
    top: 50%;
    margin-top: -75px;
    z-index: 2;
}
.new_userlogo img {
    overflow: hidden;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 0 0 0 3px #B3B3B3;
    float: left;
}
.new_userinfo1 {
    margin-left: 190px;
    padding: 10px 0;
    overflow: hidden;
}
.new_xmth {
    max-width: 180px;
    position: relative;
    left: 50%;
    margin-left: -90px;
}
.new_name,.new_phone {
    margin-top: 5px;
}
.new_name h3 {
    float: left;
    font-size: 20px;
    margin-right: 10px;
    font-weight: 800;
}
.new_name span {
    float: left;
    margin: 2px 0 0;
    font-size: 14px;
}
.new_phone a {
    float: left;
    padding: 10px 10px 10px 35px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yMy8xNeuW+jMAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAACiUlEQVRIia3XTYhVVRwA8N+ZMU+NaeDCGHJh4SoSKSWiRdBi+toos2jVTqhNlIsuQSDaF4inqI0GZUGhQtDKrbhQJCjaBEEtIiIoWqSFOuUx9bg4Z5znY8Z547v/zYN7zrm/+z8f/3tfWP2amyKnsgnP4MvYhb/1FBNDyAwO4w3szalM9g7lVGbxIabxl5rV471COZXt2Iur+A8FAc/3BYVSyhQ+xxbMDbRN4gpeiF34aVxoArN4eAihZncPdoyLzEPP4f8l2i9hJqeyvg9oCteWaL+M+/BoH9BZdT1u1efJPqAzt4DuwJ3qWo0NncK5RbC78Cf2Yc+40KrYhV9yKt/gaVxs1yN+xsuxC7+Ni7BQGY5bOKShXXu/L2QQOo3v1fWYj9V9ITeg2IXL+MLCOgW8lFOZ6hVqcQLfqefqErbqsdbdgFpWB9XSM6EW1105lY29Qg37Gl9hrVoV7sXrOZWwyNjbh1p8gB/VKbyAp7Crdyh24R+8rWa0Sp3CV3MqT/QKNexbvKdu92ut376cygO9Qg07gqNYp2Y1jYOLYTmVzTmVLqeybcVQiwM4qRbVOdzfsM0DyFrsxys4nFN5M6eyYfhGYfhza5GnXY9DeATnsQZ/4B2tHmKnunEmcTd+xf7YhZMjQw2bVs/YQw2L6trNqVObh4bE9vsRDsUulJGghm1QN8hj7emDOvVXlxgyqWZ/FG+NDDVsHd7Fs2pmZZkhQT38x5bbDDdF7MJ5dDiiHujlvmQL/sXsijIajJzKi9itTl228B4bjAk1owMrymgwYhc+VrO70G42DEV1jT7DJ7ed0XzkVB5U/xRsH8AKfsensQvHGHF7j4BFzGBbQ37AqdiFs/N9rgPzA8HidlocTAAAAABJRU5ErkJggg==) 10px 50% no-repeat #F1852A;
    background-size: 20px;
    border-radius: 5px;
    font-size: 18px;
    color: #FFF;
}
.new_urllink {
    float: left;
    width: 95%;
    padding-right: 5%;
    overflow: hidden;
    margin-top: 10px;
}
.new_urllink li {
    float: left;
    width: 50%;
    padding: 6px 0 0;
    list-style: none;
    text-align: center;
}
.new_urllink li div {
    margin: 0 6px 0 0;
    border: 1px solid #CCC;
    background: #FFF;
    border-radius: 5px;
    font-size: 20px;
    line-height: 48px;
    color: #333;
    overflow: hidden;
}
.new_name, .new_phone, .new_userinfo2 ul, .new_userinfo2 ul li, .new_xmth {
    width: 100%;
    float: left;
}
.new_userinfo2 ul li {
    padding: 6px 0;
    font-size: 14px;
}
.new_userinfo2 ul li span {
    float: left;
    width: 75px;
    text-align: right;
}
.new_wx {
    position: absolute;
}
.new_shoucang, .new_wx {
    right: 10px;
    bottom: 10px;
}
.new_wx img {
    float: left;
    width: 40px;
}
.new_shoucang {
    position: absolute;
    background: #176069;
    padding: 0 20px;
    line-height: 180%;
    color: #FFF;
    font-size: 14px;
    border-radius: 5px;
}
@media screen and (max-width: 380px) {
	.new_userlogo {
    width: 140px;
    left: 10px;
    margin-top: -65px;
}
.new_userlogo img {
    width: 130px;
    height: 130px;
}
.new_userinfo1 {
    margin-left: 160px;
}
.new_name h3 {
    float: left;
    font-size: 18px;
}
.new_urllink li div {
    font-size: 14px;
    line-height: 34px;
}
.new_phone a {
    font-size: 14px;
    padding: 10px 10px 10px 30px;
    background-size: 15px;
}
}
@media screen and (max-width: 320px) {
	.new_userlogo {
    width: 120px;
    margin-top: -55px;
}
.new_userlogo img {
    width: 110px;
    height: 110px;
}
.new_userinfo1 {
    margin-left: 140px;
}
.new_xmth {
    left: 0;
    margin-left: 0;
}
.new_urllink li div {
    font-size: 14px;
    line-height: 34px;
}
.new_phone a {
    font-size: 14px;
    padding: 10px 10px 10px 30px;
    background-size: 15px;
}
}





</style>