<template>
	<div class="new_wvcon_brand">
			<img v-for="str in listImg" :src="str.url"/>
			<div class="new_wvcon_form">
		<h3>马上注册成为Saivi.World会员</h3>
		<div class="new_wvcon_form_nr">
			<ul>
				<li>
					<label>您的姓名：</label>
					<input type="text" v-model="lytcxm" name="lytcxm" id="lytcxm" />
				</li>
				<li>
					<label>联系电话：</label>
					<input type="number" v-model="lytclxfs" name="lytclxfs" id="lytclxfs" />
				</li>
				<li>
					<label>联系微信：</label>
					<input type="text" v-model="lytcwxh" name="lytcwxh" id="lytcwxh" />
				</li>
			</ul>
		</div>
		<div class="new_wvcon_form_sm">
			检查确认无误后，提交申请
			<br />
			我们会及时与您沟通
		</div>
		<div class="new_wvcon_form_an">
			<input type="button" @click="new_wvcon" name="button" id="button" />
		</div>
	</div>
	<userinfo></userinfo>
	</div>
</template>
<script>
import userinfo from '~/components/card/userinfo'
import { a, b, c, d, e } from 'static/outImg' //导入图片
 export default {
        data() {
            return {
                listImg: [
                    {url: a}, {url: b}, {url: c}, {url: d}, {url: e}
                ],
                lytcxm: '',
                lytclxfs: '',
                lytcwxh: ''
            }
        },
         components : {
			userinfo
		},
		methods: {
			new_wvcon(){
				if (this.lytcxm == '') {
					alert('请输入姓名！')
					return false
				}
				if (this.lytclxfs == '') {
					alert('请输入联系方式！')
					return false
				}
				if (this.lytcwxh == '') {
					alert('请输入微信号！')
					return false
				}
			}
		}
    }
</script>
<style scoped> 
.new_wvcon_brand {
	margin: 0 auto;
    width: 100%;
    max-width: 640px;
    padding-bottom: 70px;
    overflow: hidden;
    font-family: "微软雅黑";
}
.new_wvcon_brand img {
	width: 100%;
	height: auto;
	float: left;
}
.new_wvcon_form {
    float: left;
    width: 100%;
    background: #FAFAFA;
    padding: 30px 0;
}
.new_wvcon_form h3 {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #fa0;
    font-weight: 400;
    overflow: hidden;
}
.new_wvcon_form_nr {
    margin: 20px auto;
    width: 290px;
    border: 2px #DFE8EE dotted;
    padding: 10px;
    background: #FFF;
    overflow: hidden;
}
.new_wvcon_form_nr ul li {
    float: left;
    width: 100%;
    padding: 5px 0;
    box-sizing: border-box;
}
.new_wvcon_form_nr label {
    float: left;
    width: 90px;
    text-align: right;
    font-size: 14px;
    line-height: 30px;
}
.new_wvcon_form_nr ul li input {
    float: left;
    width: 186px;
    border: 1px #E5E4E1 solid;
    background: #FAFAFA;
    height: 28px;
    line-height: 28px;
    padding-left: 10px;
    margin: 0;
    outline: none;
}
.new_wvcon_form_sm {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    overflow: hidden;
    font-size: 14px;
}
.new_wvcon_form_an {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    overflow: hidden;
    margin-top: 10px;
}
.new_wvcon_form_an #button {
	width: 200px;
	height: 60px;
	border: none;
	outline: none;
	background: url(../../static/img/h_img/new_wvan_02.png);
}
</style>