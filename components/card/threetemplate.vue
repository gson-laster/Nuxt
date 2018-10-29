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
 				<li><a href="/h_index/index2" target="_blank"><div>公司介绍</div></a></li>
 				<li><a href="#" target="_blank"><div>我的原创</div></a></li>
 				<li><a href="#" target="_blank"><div>事业说明</div></a></li>
 				<li><a href="/h_card/register" target="_blank"><div style="color: red;">申请网址</div></a></li>
 			</div>
 		</div>
 	</div>
 	<div class="new_userinfo2">
 		<ul>
 			<li><span class="ico1"><i>公司：</i></span></li>
 			<li><span class="ico2"><i>微信：</i>
 				<div class="new_wx"><a href="javascript:void(0)" @click="new_wx"><img src="../../static/img/h_img/wx_mb5.png"/></a></div>
 			</span></li>
 			<li><span class="ico3"><i>Q Q：</i></span>957547207</li>
 			<li><span class="ico4"><i>邮箱：</i></span></li>	
 			<li><span class="ico5"><i>地址：</i></span></li>
 			<li><span><i>个人说明：</i></span>asdas</li>
 		</ul>
 		
 	</div>
 	<div class="new_userinfo3">
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
	background: #FFF;
	overflow: hidden;
	padding-bottom: 60px;
	font-family: "΢���ź�"
}

.new_card .banner,
.new_login .banner {
	margin: 0;
	padding: 0
}

.cleardiv {
	width: 100%;
	padding: 0 0 20px;
	margin: 0;
	position: relative
}

.new_userlogo {
	position: absolute;
	width: 156px;
	left: 15px;
	top: 20px;
	z-index: 2
}

.new_userinfo2,
.new_xmth {
	position: relative
}

.new_userlogo img {
	overflow: hidden;
	width: 150px;
	height: 150px;
	border-radius: 80px;
	box-shadow: 0 0 0 3px #FA0;
	float: left
}

.new_name,
.new_phone,
.new_userinfo2 ul,
.new_userinfo2 ul li,
.new_xmth {
	width: 100%;
	float: left
}

.new_userinfo1 {
	margin-left: 190px;
	padding: 10px 0;
	overflow: hidden
}

.new_name {
	margin-top: 5px
}

.new_name h3 {
	float: left;
	font-size: 24px;
	margin-right: 10px;
	font-weight: 800;
}

.new_name span {
	float: left;
	margin: 2px 0 0;
	font-size: 16px
}

.new_phone {
	margin-top: 5px
}

.new_phone a {
	float: left;
	padding: 5px 10px 5px 40px;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yMy8xNeuW+jMAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAF0UlEQVRoge3ZbaycRRUH8N8WEqruKiC0XiNGLSjFN7SQUGMjhhaoolGBaKIIGMtdWzUEJWqjxRhfimJ8iTXPFRWxECMEDSoiBZtajK0alWhrAVGiKC8qLfJspLearh9m1p3d+7zs3mtsmvD/MmfOzJn5n31mzsyZbXS7XQcz5h1oAnPF4w4caBz0DhxapGw0GmMNkmeW4AycghNxFJ6QdHkMf8cd2I5b8IuisVrt4jnKgk2jqGFUB/LMhbgoEh8X2/ElXJUq/y8O5JmV+Ljwa6fYj1/iATyIh7AQT8MEXmrmsr0Da3HzbBwoXEI15L+ANUPq7+G7uBX3Vpg/GyvwGpwVdSfi+9iAd47LZ+QvkGeawq/08kR9Ez7aatue9BsVp+CDeHWi+zFWtto6w53ntIQi+Z/j+KiaxnmttuuHbcdwoIdzsRGHxfqdOHnYiTIHRg2jW/TJ/w4vLiJfg9PwZpyOZqK/Hi+K44rzbBl10FoH8szXsCRW78WSVttdo06Ac/Bb3IZrhBB6Dy5J+twtbPA/xPqSOG8tKh3IM2fh/FidxqmttnxU5nib8AsvHtIvxKfx+UTXwanYG+vnx/krUboH8sw8IRwuiOoVrbbb6gZM9sDT8Zek6Wr8CM/Ch9DbaMvxw6TfciGawV8x0WrbP5s9sDohf+Mo5IewKpE/hguEQ+sy4dTu4b2pUZznxlhdEHmUosqBtYn8rmquhTgplnsF0iluxU+jvAzzh9rT+daqQKEDeeY04eSEja22++rYFg0Ty4biA/P2WD5JP8KBON/GWJ2IfApR9gXOTuRra6kW4yexPAzrC9r/lsiHF7Sn855d0I5yB5bFcrcxYvIQrsE/o3wx3jfU/sRE3msmtsT5Uz4zUOZAL+xtbbVNV9IsxyMGf7n1OCGpH5vI9w8bx3m3DvGZgTIHDonln2tpVuMHwnW7hwsSuXcF/yP+VGLfm/+Qkvbak/iBmvZR8JVEPiaWJ2BRlLcrR+38dQ48VDfACDg5kXsHW/pVvllh+2Dd4HUODMfn2eDyRL4ylr20JRfyiDI8pW7wOgeOrBugBhfjFVH+Ge7Ch/Wvzpfj3xX2z6iboCwj6woH0HFlhnnmtXgDno892IxMiD498p9JTM7A0fqn8j58qobfgpr2UgfuxvOUJOt55mq8dUi9ApcKm3ICL0nazhEc+3WiWy04UYWlsSyLUqVL6FexPC7PPDdtyDMbDJK/U//AORKvMkh+FW7A5/DCqLvdYHSagfhUUxupyhz4TiK/JRn0eP3b4W6c2WpbLCTrH8BO/EOINtdGwl/GO/DuaPcvFVeDBK9P5NKNXraEbhCO9/lCyFsX9ecmfda02m6BVtujwkm7Ps8cIUSX3ua8EF9M7FYavAfNQJ45VD9STeNbZX0Lv0CrbZ/wy8HCPHNplCeSbptLxtyjT/79+GrStsZg8lKGy/DUKF/Zav/3TjUDVWF0XSJ/Mpa7Et0rK2wXCZ/9E4nuEoNfohB5ZoHBHOAjVf1LHWi17cF7YrX3WHVT0mVDnlmRTDw/zywVNusuBvLZVQZDahU2JbzWtdrVy60wJ07RmWosw47mZHdPrF9ncC/cIzzcPlPIg1PswNv1s686fANvivLO5mT3BXUGtQ4MozPVmCc8jSyv6Haf8OJwxRhDX6V/W92HRc3Jbu1teGwHeuhMNVbjdcJdfRq/Fw6czULUGDWPmMB1Bp8sX9ac7G4bxXjWDpShMzXyfwsNYY+txRFR9xjObE52t5ZaDWHs1+kUnanG4cLB9ghubk52q16me1gsbPCLDGZlv8Ebm5PdXYVWJZiTA/is/sudzlRjG7YJy2k3Hhbi+VF4jnC3KbpfXSHkzPvHJTBXBzbhPP2wt1T/AlaHLr4ukN8xWwJz3gOdqcaxwrX6dCH7enJF90eFvGATvi2E4AE0J8fj8z/dxJ2pxtFCfnCMsHTmCxvzYSFB36nmHnRAHTgQOOj/J37cgQONg96B/wC7l4ntMabFTgAAAABJRU5ErkJggg==) left 50% no-repeat;
	border-radius: 5px;
	background-size: 35px;
	font-size: 20px;
	color: #888
}

.new_userinfo2 {
	margin: 0 auto;
	padding: 0;
	overflow: hidden;
	border-top: 1px #CCC solid
}

.new_userinfo2 ul li {
	padding: 12px 0;
	font-size: 16px;
	position: relative;
	border-bottom: 1px #CCC solid
}
.new_userinfo2 ul li:last-of-type span {
	padding-left: 18px;
}

.new_userinfo2 ul li span {
	padding-left: 50px
}

.new_userinfo2 ul li span i {
	font-style: normal;
	color: #FA0
}

.new_userinfo2 ul li span.ico1 {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yMC8xNT6DP6kAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAABnElEQVRIieXXv2oVQRTH8c9NrojYWImChZWCWqSxsZIrItikFATfQW3mCRRPoT6BjSAKotgIIqYQRMRCCaZJkTyAlRpS+AevxRqY3DvXu7tukiI/2OY3M+c7Z3Z2zmxvOBzaCc3sCHVXgvslMyLqjB3gKB5jLW9IKU0d3Dbj21jAPSzjfNMATcFH8B7XM+8wXuLqVoEHWMXpCe138bxr8DXV0u6Z0u8iPkXEyf8F78UD3Kk1vUqnsBgRV9qCD+EjLjeAbmgW9yPi5qQOvdKRGRHzeIh9LaCjWsB8Smk9N8cyjohbeNYRFM5hNSIGubnpAImIF7jQETDXQVXmvQ1jNOMZLOFXx+AveJUbY+84IubwIZ9dB1pMKc3lRmlXH+gYSvVZblIJPNsxtKhidaqpJ/iG4zizHeCfOIu3mfcIl5oEaVMWV0agVAWikdqAfxe8sc2zFeDSmGlVq5Mgpfvwj6acEvhrC3Bp+XPtrwN+h9f/CHLiLzx/3kwBPx01JpXFvupedawwub7qnpXrOz5PgK6klG7UAm+Hdt+fxB8C0VvvvTt9FAAAAABJRU5ErkJggg==) 20px 50% no-repeat;
	background-size: 25px
}

.new_userinfo2 ul li span.ico2 {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yMC8xNT6DP6kAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAACQklEQVRIie3WS6jNURTH8c+5SR4JYeAxuCkiJY/kcQcyMDFT8kieKSNFZE/URSl7II9IHhlgcHVjhJlIRBJmYuSdR24SEXWPwf7f+vv7n3vOuYXJ/dXpnLXW3vv7X3uv/zq7Uq1W/Q+1/BdqP/hfakDREWMsuuZgLiagipe4j3tlC4YQ+gbOaQN2YkqN+AMcx+mGSAWVbfUMXMeZXqAwC6dwC5OaBf+WcYxxcAYd0cQabXiIaXje6KRixldy0C6sw/LCgl+xBauk84ahuIFhTYNjjMuwKBf7iLPoxJOc/zuOogNvcv7W7EGbA2N1ITYJl3AOi3P+UbiNO1K1X8PVbGwlxjiwEXClp1fHGB/rvZiKeoxtmI8FGIKxGIRn0o6cCCH8KJvcUuN3PR3HJmxHu7QjbZiIcdmDHMGTGOOceuC7DUJP4qK0vYvrjG3F3ax+aoIPNgB9gQtSwQ3PfJ3YJxVdjw7gWI7RGWMcWwoOITzC3jrge1iDkTnfYezCl8yuhhB2SOef1/5ScAZvzzKqpYFS787rMl5hdGZXYozv8bYwbl7eKOvVK/EN60tiP9Fd8I3wZ6cbUzK3kjdqVfL77Pu19Nr0aCg+15hTT115oyzjUdgoNY7NUvaTMR7vpBba1gfwoXrgKmZLFdyjp9mHVMFLMb0J6OEQQkfeUbbVXQVoUT+xUDqGeurG+RDC1mKgr1efT5iJPVJF11IL1pYFeruB1NMH7JbezyWYKv0tfsRNqS4OYYXUt39Tpf9C3w/+W/oFZvqGlUGRdZ4AAAAASUVORK5CYII=) 20px 50% no-repeat;
	background-size: 25px
}

.new_userinfo2 ul li span.ico3 {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yMC8xNT6DP6kAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAABoklEQVRIieXXO2sVQRQA4C8+QhCsRRADEXwjsRAUxBQGxEoMKBbaKYhFKnEUtLI6pBVEkiqNhWIVCxvBTisDouRP2FgowsVrsQphc/e9eAtPszAzzDeHPTM7OzEcDo0jto1FHSe8I98QEWXjj2MRF7B/U/sG3mI5pbReB26S8Qo+4VYOhcO4g48R8aLOZBP54irI+DmuNVjkO8ynlAZFA+pkfLshCnN4XDagCt6Hpw3Rv7EYEVtqqC680BKFXbjaFj7SASar/lbwuY7wiTbwLI52hGcjYiReBhe+n4Zxvil8qCf4cxP4IS71BD+KiMk68GXZ5t/eE3wWV0rhiJjGq57AzfGgFDZiZT3FsSq4674tim9V8ME/z+89w5XFtRs/cQo/egA/YAlTVfCC7Hz+gic9wM9SSvdwPd9RdRFYxY2W6PuU0pmizrKT6yYOtERhOiKWImLkeVD0oZ7CcgcU9uIufiHlO4syHuBlxcSruI/XJWM2sDaqoyjjgewwuYjT2IOdGOIr3siusxCYwUlZYU7KdsZ6SqlwUVuK61/F//cL8xs08FYc3wU96AAAAABJRU5ErkJggg==) 20px 50% no-repeat;
	background-size: 25px
}

.new_userinfo2 ul li span.ico4 {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yMC8xNT6DP6kAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAB40lEQVRIie3Wv2sUURDA8c/paacI2igiKv4GEaJgKRYRLBSsDP7ASgyIKJLwKv+AQbBIEyNaiCm0FgNCEPxRBEQUBfEHxCZaRRSRQ4t4FrsnyyV3SbzEgMnAsu/NzO533ps3s1uqVqvmQhbNCXUBPC/A5dogIpajF/tQxVjBr9rCuIyP6EopDY0D4ziOTTfyKcp6XEBHTVHc6pd4NUvgb7hbVJTqG0hEXEI3ls0Q9E5KqaNe+QccEduxIaU0EBFwCydaAD7H4ZTSSETswoqU0sOasbjVh3AvIu5jNU5iBwanCRzBkZRSWw69ihc4XXQqHq4v+f0APuEMrqEdF9GJzU2AP3ED3SmlSkTsRz/W5PbhonOzOu7DO2zCFWxBD35M4DuItTiLSkT04UEBCounCiZb4brC/HwO6M/nb2V1347Rgt/OSd47KfiJLPLL+IBz+CzL/0ZswyNsxdM8EDjVCnhMVvBH0SVrAj0YQFseyNI8qDfYI0vHUErpPW7+LbiWt9t1+oN4Jms4o3lQRdkbEZ15kA2l3MS2G0NN7M3y2CtLSUMprrg+iFXNHpyCrKyblxqBf7UImkyWNAI/nmXw1wnBKaXXsoMzjIqsE83E9V1WkteL4HFfp38l8++fawH8/4N/A+H3jrYJCkpJAAAAAElFTkSuQmCC) 20px 50% no-repeat;
	background-size: 25px
}

.new_userinfo2 ul li span.ico5 {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yMC8xNT6DP6kAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAACa0lEQVRIieXXT4hXVRTA8c+Ii5FJMVsYAy4UkXBtVsgMRCI6LhxCB3RaRQvJRf+ghxvBguTOIlEjQRCFAUUJZh2EKDjTRkFm4SIjDPxTUEPNpKZG4+LeHz5v7/ev+Q2z8MDj3HvfuefLu/eec+7rmp2dtRCyaEGoWFw1GEJoNm8Qe7AJ3fgBZ3AMiqL4f+AG8iJOYGc2/np63sduXGvmqN2lPl8BLcsrmAgh9HYSPIzN2djXGMHt0tgSnO0k+ECp/QhbsQ8F1uJq6X1/CGFpJ8C9WFfqH8W3pf7f+Cybs7ET4O6s/3uFzYOs/0Ijh41O9UviYRnHz5jCivTuAxzJYO9l869DCGEVhvBaURRDleAQwjviEq3Gm+gRQ+gPfI/tyfRlTOIkHuIN7Cq5miqK4kZqT2J5sy8ezQ0wICaH0RKYeKAOVdgTE4oQwoYSdKZskO/xdIWTvUmfwy91QLmMJN1fzyAH/1th0+fpiT7dAvRaURRjqb27VXA9+Tjpz1WvSlmGIYQwgA1zBQ+KIXVf3PN6cko6zfiqkcNWwSuxLLXH8WWFzQTehRDCp2JkzBl8T8xONftPMvikmEJhB5rW1XZy9TS24XgJfgW/iXtZC5e3WnHWbln8UwyvWsF4VVzSx1ifxu7MB3gq6YP4IrX/wof4JvX/acVRuzeQsv1+8aTfwOGkoWs+wLl8VGrfamdiJ2+ZbX3Egl1vWwX3JL1kDqxnrkI5+D91E3c9LZc3MSbW51xqmS2/rdTkcrmT78sdzCbAZXyHS2Kcwq94O0H6sEWM5TViIiFmuRn8JObtC7hYFMWPZVDXc/fv9ASGp4CBRFlFBQAAAABJRU5ErkJggg==) 20px 50% no-repeat;
	background-size: 25px
}

.new_shoucang,
.new_urllink li div {
	background: #FFF;
	text-align: center;
	font-size: 16px;
	overflow: hidden
}

.new_wx {
	position: absolute;
	right: 0;
	bottom: 1px
}

.new_wx img {
	float: left;
	width: 40px
}

.new_userinfo3 {
	margin: 0 10px;
	padding: 5px 10px;
	overflow: hidden;
	position: relative;
	font-size: 16px;
	color: #8F8F8F
}

.new_userinfo3 .con {
	float: left;
	width: 100%
}

.new_shoucang {
	margin: 20px auto 30px;
	width: 100px;
	border: 1px solid #FA0;
	padding: 0 20px;
	line-height: 200%;
	color: #FA0;
	border-radius: 5px
}

.new_urllink {
	float: left;
	width: 95%;
	padding-right: 5%;
	overflow: hidden;
	margin-top: 5px
}

.new_urllink li {
	float: left;
	width: 50%;
	padding: 6px 0 0;
	list-style: none;
	text-align: center
}

.new_urllink li div {
	margin: 0 6px 0 0;
	border: 1px solid #CCC;
	border-radius: 5px;
	line-height: 35px;
	color: #333
}

.new_urllink li:last-child div {
	color: #FA0;
	border: 1px solid #FA0
}

@media screen and (max-width:420px) {
	.new_phone a {
		font-size: 18px
	}
	.new_urllink li div {
		font-size: 16px
	}
}

@media screen and (max-width:380px) {
	.new_name h3,
	.new_userinfo2 ul li h3 {
		font-size: 22px
	}
	.new_userlogo {
		width: 140px;
		left: 10px
	}
	.new_userlogo img {
		width: 130px;
		height: 130px
	}
	.new_userinfo1 {
		margin-left: 160px
	}
	.new_name h3 {
		float: left
	}
	.new_urllink li div {
		font-size: 14px;
		line-height: 34px
	}
}

@media screen and (max-width:320px) {
	.new_userlogo {
		width: 120px;
		position: relative;
		top: -30px
	}
	.new_userlogo img {
		width: 110px;
		height: 110px
	}
	.new_xmth {
		left: 0;
		margin-left: 0
	}
	.new_userinfo1 {
		margin-left: 140px
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