<template>
 	<div class="new_card">
    <Banner></Banner> 		
 		<div class="new_userinfo1">
 			<div class="new_userlogo">
 				<a href="javascript:void(0)" @click="showBg_itx">
	 			<img src="../../static/img/h_img/touxiang.jpg"/>
	 			</a>
 		    </div>
 			<div class="new_shoucang fxdpy" id="fxdpy2">收藏</div>	
			<div class="new_name">
				<h3>一个达布妞</h3>
				<span></span>
			</div>
			<div class="new_phone">
				<a href="tel:18679199741">
					18679199741
				</a>
			</div>
			<div class="new_wx"><a href="javascript:void(0)" @click="new_wx"><img src="../../static/img/h_img/wx.png"/></a></div> 			
 		</div>
 		<div class="new_urllink">
			<li><a href="/h_index/index2" target="_blank"><div>公司介绍</div></a></li>
			<li><a href="#" target="_blank"><div>我的原创</div></a></li>
			<li><a href="#" target="_blank"><div>事业说明</div></a></li>
			<li><a href="/h_card/register" target="_blank"><div style="color: red;">申请网址</div></a></li>
 		</div>
	 	<div class="new_userinfo2">
	 		<ul>
	 			<li><span>邮箱：</span><p></p></li>
	 			<li><span>QQ：</span><p>957547207</p></li>
	 			<li><span>电话：</span><p>18679199741</p></li>
	 			<li><span>地址：</span><p></p></li>
	 			<li><span>个人说明：</span><p></p></li>
	 		</ul>	 		
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
    background: #C3C6CF;
    overflow: hidden;
    padding-bottom: 60px;
}
.new_userinfo1 {
    margin: 10px 10px 0;
    background: #F7F7F7;
    padding: 10px;
    overflow: hidden;
    position: relative;
}
.new_shoucang {
    top: 10px;
    background: #F1852A;
    padding: 0 20px;
    line-height: 180%;
    font-size: 14px;
}
.new_phone a, .new_shoucang {
    border-radius: 5px;
    color: #FFF;
}
.new_shoucang, .new_wx {
    position: absolute;
    right: 10px;
}
.new_userlogo img {
    height: 100px;
    overflow: hidden;
    width: 100px;
    border-radius: 50px;
    box-shadow: 0 0 0 3px #B3B3B3;
    float: left;
    margin: 10px 20px;
}
.new_name {
    margin-left: 130px;
    overflow: hidden;
    margin-top: 30px;
}
.new_name h3 {
    float: left;
    font-size: 20px;
}
.new_name span {
    float: left;
    margin: 2px 0 0 10px;
    font-size: 14px;
}
.new_phone {
    margin-left: 130px;
    margin-top: 10px;
}
.new_wx {
    bottom: 10px;
}
.new_urllink {
    padding: 5px;
    border-bottom: 1px #DBDBDB solid;
    border-top: 1px #DBDBDB solid;
    background: #F7F7F7;
}
.new_urllink, .new_userinfo2 {
    margin: 0 10px;
    overflow: hidden;
}
.new_urllink li {
    float: left;
    width: 25%;
    padding: 5px 0;
    list-style: none;
    text-align: center;
}
.new_urllink li div {
    margin: 0 5px;
    border: 1px solid #CCC;
    background: #FFF;
    border-radius: 5px;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    color: #333;
    overflow: hidden;
}
.new_userinfo2 {
    background: #F7F7F7;
    padding: 16px 10px;
    position: relative;
}
.new_userinfo2 ul {
    float: left;
    width: 100%;
}
.new_userinfo2 ul li {
    float: left;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px #DBDBDB solid;
    font-size: 14px;
}
.new_userinfo2 ul li:nth-of-type(1) {
    border-top: 1px #DBDBDB solid;
}
.new_userinfo2 ul li span {
    width: 75px;
    text-align: right;
    padding-left: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yMy8xNeuW+jMAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAwUlEQVQokZ2TwRGCMBBFX1IB171ZglSgJWAFUBpWACVgBVACXrJH0wEeSCTjjMLkHTP/ZZOdXbMsCymq2gAVcAEKwAMPoBeRNs2aKKvqCeiAM7+ZgJuIzB85iGOotIcHShGZbTjoDoqEXAdgnHM10B4UUxrL2pwcKuOce3H8ySneZooAhWXtXg7eAkOmPFigz5T7OCQj/yfrm0lEyjgkFcf/7kMeCyAiz1B52qsInEN+W4yIqtbh5ivbVg2sW3VPs2+PQkSRyAIb5QAAAABJRU5ErkJggg==) left 50% no-repeat;
    float: left;
}
.new_wx img {
    float: left;
    width: 40px;
}
.new_phone a {
    float: left;
    padding: 5px 10px 5px 35px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yMy8xNeuW+jMAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAACiUlEQVRIia3XTYhVVRwA8N+ZMU+NaeDCGHJh4SoSKSWiRdBi+toos2jVTqhNlIsuQSDaF4inqI0GZUGhQtDKrbhQJCjaBEEtIiIoWqSFOuUx9bg4Z5znY8Z547v/zYN7zrm/+z8f/3tfWP2amyKnsgnP4MvYhb/1FBNDyAwO4w3szalM9g7lVGbxIabxl5rV471COZXt2Iur+A8FAc/3BYVSyhQ+xxbMDbRN4gpeiF34aVxoArN4eAihZncPdoyLzEPP4f8l2i9hJqeyvg9oCteWaL+M+/BoH9BZdT1u1efJPqAzt4DuwJ3qWo0NncK5RbC78Cf2Yc+40KrYhV9yKt/gaVxs1yN+xsuxC7+Ni7BQGY5bOKShXXu/L2QQOo3v1fWYj9V9ITeg2IXL+MLCOgW8lFOZ6hVqcQLfqefqErbqsdbdgFpWB9XSM6EW1105lY29Qg37Gl9hrVoV7sXrOZWwyNjbh1p8gB/VKbyAp7Crdyh24R+8rWa0Sp3CV3MqT/QKNexbvKdu92ut376cygO9Qg07gqNYp2Y1jYOLYTmVzTmVLqeybcVQiwM4qRbVOdzfsM0DyFrsxys4nFN5M6eyYfhGYfhza5GnXY9DeATnsQZ/4B2tHmKnunEmcTd+xf7YhZMjQw2bVs/YQw2L6trNqVObh4bE9vsRDsUulJGghm1QN8hj7emDOvVXlxgyqWZ/FG+NDDVsHd7Fs2pmZZkhQT38x5bbDDdF7MJ5dDiiHujlvmQL/sXsijIajJzKi9itTl228B4bjAk1owMrymgwYhc+VrO70G42DEV1jT7DJ7ed0XzkVB5U/xRsH8AKfsensQvHGHF7j4BFzGBbQ37AqdiFs/N9rgPzA8HidlocTAAAAABJRU5ErkJggg==) 10px 50% no-repeat #F1852A;
    background-size: 20px;
    font-size: 18px;
}

@media screen and (max-width: 420px) {
	.new_userlogo img {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    box-shadow: 0 0 0 2px #B3B3B3;
    margin: 10px 0;
}
.new_name, .new_phone {
    margin-left: 120px;
}
.new_urllink li div {
    font-size: 16px;
    line-height: 40px;
}
.new_phone a {
    font-size: 18px;
    padding: 10px 10px 10px 30px;
    background-size: 15px;
}
}
@media screen and (max-width: 380px) {
	.new_userlogo img {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    box-shadow: 0 0 0 2px #B3B3B3;
    margin: 10px 0;
}
.new_name {
    margin-left: 90px;
    overflow: hidden;
    margin-top: 10px;
}
.new_name h3 {
    float: left;
    font-size: 18px;
    font-weight: 800;
}
.new_name span {
    float: left;
    margin: 2px 0 0 10px;
    font-size: 12px;
}
.new_phone {
    margin-left: 90px;
}
.new_urllink li {
    float: left;
    width: 50%;
    padding: 5px 0;
    list-style: none;
    text-align: center;
}
.new_phone a {
    font-size: 14px;
    padding: 10px 10px 10px 30px;
    background-size: 15px;
}
}
@media screen and (max-width: 320px) {

}



</style>