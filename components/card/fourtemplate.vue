<template>
 	<div class="new_card">
    <Banner></Banner> 	
        <div class="new_userlogo">
			<a href="javascript:void(0)" @click="showBg_itx">
 			<img src="../../static/img/h_img/touxiang.jpg"/>
 			</a>
 		</div>
 			<div class="new_userinfo1">
			<div class="new_name">
				<h3>一个达布妞</h3>
				<span></span>
			</div>
			<div class="new_canshu">
				<a href="tel:18679199741">
					18679199741
				</a>
				<div class="new_wx">
					<a href="tel:18679199741">
					  <img src="../../static/img/h_img/tel_mb5.png"/>
				    </a>
				   <a href="javascript:void(0)" @click="new_wx"><img src="../../static/img/h_img/wx_mb5.png"/></a>
				</div>
			</div>
 	    </div>
 		<div class="new_urllink">
 			<ul>
 				<li><a href="/h_index/index2" target="_blank"><i class="icon_1"></i><div>公司介绍</div></a></li>
 				<li><a href="/h_index/article" target="_blank"><i class="icon_2"></i><div>事业说明</div></a></li>
 				<li><a href=""><i class="icon_7" target="_blank"></i><div>我的原创</div></a></li>
 			</ul>
 			<ul>
 				<li><a href="javascript:void(0)" target="_blank"><i class="icon_4"></i><div>个人信息</div></a></li>
 				<li><a href="/h_index/index2" target="_blank"><i class="icon_5"></i><div>分享论坛</div></a></li>
 				<li><a href="/h_card/register" target="_blank"><i class="icon_6"></i><div>申请网址</div></a></li>
 			</ul>
			<div class="new_shoucang fxdpy" id="fxdpy2">收藏这张名片</div>
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
	font-family: "΢���ź�"
}
.new_userlogo {
	float: left;
	width: 126px;
	overflow: hidden;
	padding: 4% 20px 4% 6%
}

.new_userlogo img {
	overflow: hidden;
	width: 120px;
	height: 120px;
	border-radius: 60px;
	box-shadow: 0 0 0 3px #FA0;
	float: left
}

.new_canshu,
.new_name,
.new_name h3 {
	width: 100%;
	float: left;
	font-weight: 800;
}

.new_userinfo1 {
	padding: 10px 0 30px;
	overflow: hidden;
	position: relative
}

.new_name {
	margin-top: 35px
}

.new_name h3 {
	font-size: 24px;
	line-height: 160%
}

.new_canshu {
	font-size: 18px;
	line-height: 150%;
	position: relative
}

.new_phone,
.new_wx {
	position: absolute;
	bottom: 0
}

.new_phone {
	right: 60px
}

.new_phone img {
	float: left;
	width: 40px
}

.new_shoucang {
	margin: 20px auto 0;
	width: 100px;
	overflow: hidden;
	text-align: center;
	background: #FFF;
	border: 1px solid #FA0;
	padding: 0 20px;
	line-height: 200%;
	color: #FA0;
	font-size: 16px;
	border-radius: 5px
}

.new_wx {
	right: 10px
}


.new_wx img {
	float: left;
	width: 40px
}

.new_userinfo2 ul,
.new_userinfo2 ul li {
	width: 100%;
	float: left
}

.new_userinfo2 {
	margin: 20px 0 20px 20px;
	overflow: hidden;
	position: relative;
	font-size: 14px
}

.new_userinfo2 ul li {
	padding: 0;
	font-size: 14px
}

.new_userinfo2 ul li h3 {
	float: left;
	font-size: 18px;
	font-weight: 400
}

.new_userinfo2 ul li span {
	float: left;
	width: 45px;
	text-align: left;
	color: #FA0
}

.new_urllink {
	float: left;
	width: 98%;
	padding: 1%;
	overflow: hidden;
	margin-top: 10px
}

.new_urllink ul {
	margin: 0 auto;
	overflow: hidden;
	width: 100%;
	border-bottom: 1px #CCC solid
}


.new_urllink li {
	float: left;
	width: 23.3%;
	padding: 15px 5%;
	list-style: none;
	text-align: center
}

.new_urllink li i {
	float: left;
	width: 100%;
	height: 64px
}

.new_urllink li i.icon_1 {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAbvAAAG7wBureguwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8wMy8xNTchoucAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAEj0lEQVR4nO3bSYgcVRgH8F9HjRsiBhG8uKAiuEFwCUjcYqIEo4IaPLjNjIkHTeIueFAvOQgGjUlmxH0HMSKoSFyiXjITlwjqQVFBURO8uItoZpxpD+9VqjuZnu6u7qoaTP8v71XVW77vX9/76ntLVarVqt0ZM8oWoGz0CChbgLKxZ9MS6yt59X06LsG3GMyrE4un9nHNCcgH/Xii5nohFpUhSBlD4Dqp8m/gN1yAjSXIUjgBS/FwzK8W3vzZ2I5z8VbB8hRKwAAeifkHcXPMf4p5GMUCvFmgTIUR0IfHY34tbtrp+QjOwb84T4EkFEHAUjwZ82uwokG5EczFmEBCIT4hbwKWSM1+DW5sUv4DwSeMKsgn5EnAAB6N+VaUTzCiQJ+QFwF90jG/TuvKJxgWSBgXhkNulpAHAUukY34dlmdsZ1jqExbgnc5F2xXdJuBa9WafVfkE7+MsYTjMw9sdtrcLuklAHx6L+bXaN/tG2CwoP4b5QvTYNXSLgKulZj+o8acuK4aFOGEc5+uiY+wGAQN4OuYHsawLbU6GYZwhDZa6Mhw6JWBAvbfPS/kEm6U+Yb4ukNAJAX3qle/U4bWKJE5IfEJHwyErAVdJx/yQ4pRPsHOckJmELAT045mYH8INWTvvEJvU+4RMcUK7BPRJFzMGlad8gsQnjMkYJ7RDwDXqP3V5O7xW0ZFPaJWAK/FUzA+ZPson2CSQMCEMh5aDpVYIuALPxvxDyjf7Rkh8QhIsbcQezSpNTcD6ykI8F6+GcH1HIuaPEZyJ34X1hJXNKjSzgP6Yvmv6vvmdMYLLYr5/qoI0J2BrTI/BrTgpu1yFYCYuF5bh4JdmFZptjNyPOcIuzqp4b5k8d3KyYxbeU/+Sbm9WaWoLWFzdKixKLMfL8e5qHJBJxHxxh6D8NtyL0/B6s0qtfAWqQqx/Kf4SrOaIrFLmiBNjeg/uxEetVGo3EtyesV4RmIjp3+1UakeRmTXlJ6YqWBLGY7pPO5Wm45ssFD0CyhagbPQIKFuAstEjoGwBysZuT0BZp8QqwgzzaPyKL4TDUoWjDAtYga/xpTBZGRGm3feVIEvhBNwiHJA6Cn/iQ3yH/XEbXilYnkIJmCV9yytxmLDWcCQuFgi5SDgzWBiKJOD42N823CUd81W8KlgG4TBEYSiSgL1j2miZ6puYHlqALDtQJAHJFLrRl2dmTMcbPM8F0ykOSI6lF/oLy3QioBT0CGijbEW61fRPhr6Stbq9GjxPfEOWtgmnRmhhO6wW7RAwUVM+y28k+8Z0tMHzsZgekqFtODCmbVl1O3OBMXyOU/EivpJ67qlQFQ4xzI7XWxqUS+4vEra4/8BP+D72uwk/15Q/HHcLhM0QdoXh4xZk2oFK0/8G6/8ZmoMNOKidTmrwmaDgDw2erxK24CbDBF4QoslPTH405gEh3E7R5J+hdgkgBCrzsJ/Wl8crwht9qYU6p+A4IXA6GMfiZJxQU2aucE7owijPqDDBGt6ltRx+mvoRz2eo1yq2mHyYzBEmTLOlfuS1TjtrbgH/c/TigLIFKBs9AsoWoGz8BxDO5j1PDbRdAAAAAElFTkSuQmCC) center 50% no-repeat
}

.new_urllink li i.icon_2 {
	background: url(data:image/png;base64,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) center 50% no-repeat
}

.new_urllink li i.icon_3 {
	background: url(data:image/png;base64,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) center 50% no-repeat
}

.new_urllink li i.icon_4 {
	background: url(data:image/png;base64,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) center 50% no-repeat
}

.new_urllink li i.icon_5 {
	background: url(data:image/png;base64,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) center 50% no-repeat
}

.new_urllink li i.icon_6 {
	background: url(data:image/png;base64,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) center 50% no-repeat
}

.new_urllink li i.icon_7 {
	background: url() center 50% no-repeat
}

.new_urllink li div {
	float: left;
	width: 100%;
	text-align: center;
	font-size: 20px;
	line-height: 40px;
	color: #333;
	overflow: hidden
}

.new_canshu a {
	display: inline-block;
}

@media screen and (max-width:420px) {
	.new_userlogo {
		width: 106px
	}
	.new_userlogo img {
		width: 100px;
		height: 100px;
		border-radius: 50px
	}
	.new_userinfo1 {
		padding: 10px 0
	}
	.new_name {
		margin-top: 10px
	}
}

@media screen and (max-width:380px) {
	.new_userlogo {
		width: 86px
	}
	.new_userlogo img {
		width: 80px;
		height: 80px;
		border-radius: 50px
	}
	.new_userinfo1 {
		padding: 10px 0
	}
	.new_name h3 {
		float: left;
		font-size: 20px
	}
	.new_userinfo2 ul li h3 {
		font-size: 16px
	}
	.new_urllink li div {
		font-size: 14px;
		line-height: 30px
	}
	.new_canshu {
		font-size: 16px
	}
}

@media screen and (max-width:320px) {
	.new_userlogo {
		width: 86px;
		margin-top: 5px;
		padding-right: 5px;
		padding-left: 15px
	}
	.new_userlogo img {
		width: 80px;
		height: 80px;
		border-radius: 40px
	}
	.new_userinfo1 {
		margin-left: 110px
	}
	.new_urllink li i.icon_1,
	.new_urllink li i.icon_2,
	.new_urllink li i.icon_3,
	.new_urllink li i.icon_4,
	.new_urllink li i.icon_5,
	.new_urllink li i.icon_6 {
		background-size: 60px;
		height: 60px
	}
}

@media screen and (max-width:240px) {
	.new_userlogo {
		left: 0;
		width: 200px;
		padding: 10px;
		position: relative;
		top: 10px
	}
	.new_userlogo img {
		width: 194px;
		height: auto
	}
	.new_userinfo1 {
		float: left;
		margin: 0 auto;
		width: 95%;
		padding-left: 5%
	}
}
</style>