/**
 * 会员接口整理
 */
import config from '../index'
export default {
	// 用户注册,登录,改密,校验;
	user_login: config.apiHost + '/user_login', //用户登录
	reg: config.apiHost + '/reg', //用户注册
	checkuser: config.apiHost + '/checkuser', //用户校验,是否已经注册过了
	pwdcg: config.apiHost + '/pwdcg', //用户修改密码
	change: config.apiHost + '/changu', //修改用户信息(dreamUsername必须);
	userLoginout: config.apiHost + '/userLoginout', //用户退出;
	// 用户中心相关接口
	getuserartbannerList: config.apiHost + '/getuserartbannerList', // 美文编辑轮播图
	getUser: config.apiHost + '/getuser', //获取用户信息(dreamUsername=13970704506)
	getwxbdinfosns: config.apiHost + '/wxlogin/getwxbdinfosns', //获取新用户微信绑定信息;
	getwxbdinfos: config.apiHost + '/wxlogin/getwxbdinfos', //用户进行绑定解绑;
	vbzsList: config.apiHost + '/vbzsList', //获取VB转送记录(dreamUserid,index)
	vbzsns: config.apiHost + '/vbzsns', //VB转送给其他用户;
	getfriend: config.apiHost + '/getfriend', //获取我的团队信息(dreamTjrid);
	lytcOrder: config.apiHost + '/lytcOrder', //获取意向客户;
	getSmrzInfo: config.apiHost + '/getSmrzInfo', //获取实名认证信息(dreamSmrzuserid);
	delwxbd: config.apiHost + '/delwxbd', //解绑微信
	// 实名认证;
	userSmrz: config.apiHost + '/userSmrz', //申请实名认证;
	// 申请代理和购买名额接口;
	addPurpose: config.apiHost + '/addPurpose', //购买名额;
	editorPurpose: config.apiHost + '/addPurpose/editorPurpose', //用户申请代理报名;
	// 用户中心相册列表,趣味图片,帮助;
	getUserablumedit: config.apiHost + '/getUserablumedit', //添加音乐相册;
	getUserablumLists: config.apiHost + '/getUserablumLists', //获取相册列表;
	getUserablumList: config.apiHost + '/getUserablumList', //获取相册列表;
	delUserablume: config.apiHost + '/delUserablume', // 删除音乐相册
	getFunnyPic: config.apiHost + '/listfunny', //获取趣味图片列表;
	addfunny: config.apiHost + '/addfunny', //添加趣味图片
	helpList: config.apiHost + '/helpList', //获取帮助列表;
	helpOnez: config.apiHost + '/helpOnez', //获取帮助详情;
	// 删除图片;
	delfile: config.apiHost + '/delfile', //用户删除服务器图片;
	delsqlfile: config.apiHost + '/delsqlfile', //用户删除数据库图片信息;
	// 会员操作相关;
	configinfo: config.apiHost + '/configinfo', //会员续费;
	// 用户上传头像;
	imgUpload: config.apiHost + '/imgUpload', //用户上传头像;
	//名片模板
	cardTemplateListz: config.apiHost + '/cradTemplateListz', //用户上传头像;
	//充值
	orderinfo: config.apiHost + '/orderinfo',
	//  用户充值列表
	getUserVbczList: config.apiHost + '/getUserVbczList',
	//用户提现列表
	usersqtxjl: config.apiHost + '/usersqtxjl',
	//用户提现
	sqtx: config.apiHost + '/sqtx',
	//恢复默认链接
	changCardeditor: config.apiHost + '/changCardeditor',
	//使用帮助
	helpList: config.apiHost + '/helpList',
	//一篇使用帮助
	helpOnez: config.apiHost + '/helpOnez',
	//品牌列表
	brandListz: config.apiHost + '/brandListz',
	//音乐列表
	seachmusic: config.apiHost + '/seachmusic',

	//删除图片
	zimgdel: config.apiHost + '/zimgdel',

	// 会员续费的信息
	setrenewcode: config.apiHost + '/setrenewcode',

	//会员趣味图片
	listfunny: config.apiHost + '/listfunny',

	//恢复默认轮播图
	changBanner: config.apiHost + '/changBanner',

	//趣味图片 Logo列表
	listGj: config.apiHost + '/listGj',

	//生成趣味图片
	Thum: config.apiHost + '/Thum',

	// 获取微信信息
	newgetwxuser: config.apiHost + '/wxlogin/newgetwxuser',
	// wechat bind
	newbd: config.apiHost + '/newbd',

	// 解绑微信
	delwxbd: config.apiHost + '/delwxbd',

	// 添加趣味图片;
	addfunny: config.apiHost + '/addfunny',

	// 删除趣味图片
	delfunny: config.apiHost + '/delfunny',

	// 创音乐相册建
	getUserablumedit: config.apiHost + '/getUserablumedit',
	//刪除預定
	dellytc: config.apiHost + '/dellytc',

	//收藏列表
	getuserartcollerList: config.apiHost + '/getuserartcollerList',
	//删除收藏
	artcollectordel: config.apiHost + '/artcollectordel',
	//打卡
	editorpunchcard: config.apiHost + '/editorpunchcard',
	//打卡里的点赞
	punchcardlike: config.apiHost + '/punchcardlike',
	//打卡列表
	punchcardlist: config.apiHost + '/punchcardlist',
	//单条打卡信息
	getpunchacard: config.apiHost + '/getpunchacard', // 是否打卡
	getpunchacardone: config.apiHost + '/getpunchacardone',
}
