import Router from 'koa-router'
import * as user from '../controller/user'
import { wechatBindHide } from '../controller/wechat'
export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	// ============用户===============//
	// 获取用户信息
	router.get( '/getUserInfo', async ( ctx, next ) => {
		let result
		let dreamUsername = ctx.query.dreamUsername;
		result = await user.getUserInfo( dreamUsername )
		ctx.body = result
	} )
	// 用户登录
	router.post( '/login', async ( ctx, next ) => {
		let result, paramObj;
		let {
			username,
			password
		} = ctx.request.body
		result = await user.login( username, password );
		ctx.body = result;
	} )
	// 用户退出登录
	router.post( '/loginOut', async ( ctx, next ) => {
		let result = await user.loginOut();
		ctx.req.headers.cookie = ''
		ctx.body = result;
	} )
	router.get( '/newgetwxuser', async ( ctx, next ) => {
		ctx.body = await user.newgetwxuser( ctx.query.openid )
	} )
	router.get( '/wechatBindHide', async ( ctx, next ) => {
		await wechatBindHide( ctx, next )
	} )
	router.post( '/newbd', async ( ctx, next ) => {
		ctx.body = await user.newbd( ctx.request.body )
	} )
	//获取用户实名信息
	router.get( '/getAuthenticateInfo', async ( ctx, next ) => {
		let paramObj = ctx.query;
		let result = await user.getAuthenticateInfo( paramObj );
		ctx.body = result;
	} )
	// 用户修改信息;
	router.post( '/change', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.change( paramObj );
		ctx.body = result;
	} )
	//申请实名认证;
	router.post( '/userSmrz', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.userSmrz( paramObj );
		ctx.body = result;
	} )
	// 获取用户实名认证信息;
	router.get( '/vbzsList', async ( ctx, next ) => {
		let paramObj = ctx.request.query;
		let result = await user.vbzsList( paramObj );
		ctx.body = result;
	} )
	// vb 转送
	router.post( '/vbzsns', async ( ctx, next ) => {
		ctx.body = await user.vbzsns( ctx.request.body )
	} )
	//获取团队信息
	router.get( '/getfriend', async ( ctx, next ) => {
		ctx.body = await user.getfriend( ctx.request.query )
	} )
	// 获取意向客户
	router.get( '/lytcOrder', async ( ctx, next ) => {
		ctx.body = await user.lytcOrder( ctx.request.query )
	} )
	//获取新用户微信绑定信息;
	router.get( '/getwxbdinfosns', async ( ctx, next ) => {
		ctx.body = await user.getwxbdinfosns( ctx.request.query )
	} )
	//获取用户微信绑定信息;
	router.get( '/getwxbdinfos', async ( ctx, next ) => {
		ctx.body = await user.getwxbdinfos( ctx.request.query )
	} )
	// 微信解绑;
	router.get( '/delwxbd', async ( ctx, next ) => {
		ctx.body = await user.delwxbd( ctx.request.query )
	} )

	//注册
	router.post( '/register', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.register( paramObj );
		ctx.body = result;
	} );
	//  更改密码
	router.post( '/changePassword', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.changePassword( paramObj );
		ctx.body = result;
	} );

	//名片列表
	router.post( '/cardTemplateListz', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.cardTemplateListz( paramObj );
		ctx.body = result;
	} )

	//充值
	router.post( '/orderinfo', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.orderinfo( paramObj );
		ctx.body = result;
	} )
	//充值列表
	router.post( '/getUserVbczList', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.getUserVbczList( paramObj );
		ctx.body = result;
	} )
	//提现列表
	router.post( '/usersqtxjl', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.usersqtxjl( paramObj );
		ctx.body = result;
	} )
	//  用户充值
	router.post( '/sqtx', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.sqtx( paramObj );
		ctx.body = result;
	} )
	//  恢复默认链接
	router.post( '/changCardeditor', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.changCardeditor( paramObj );
		ctx.body = result;
	} )
	//使用帮助
	router.post( '/helpList', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.helpList( paramObj );
		ctx.body = result;
	} )

	//品牌列表
	router.post( '/brandListz', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.brandListz( paramObj );
		ctx.body = result;
	} )
	//删除图片
	//router.post( '/zimgdel', async( ctx, next ) => {
	//  let paramObj = ctx.request.body;
	//  let result = await user.zimgdel( paramObj );
	//  ctx.body = result;
	//} )
	router.get( '/zimgdel', async ( ctx, next ) => {
		let result = await user.zimgdel( ctx.request.query )
		ctx.body = result
	} )
	// 远程图片转成本地
	router.get( '/getimgs', async ( ctx, next ) => {
		ctx.body = await getimgs( ctx.query )
	} )
	router.get( '/setrenewcode', async ( ctx, next ) => {
		ctx.body = await user.setrenewcode( ctx.query.dreamUsername )
	} )
	router.post( '/seachmusic', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.seachmusic( paramObj );
		ctx.body = result;
	} )

	//  趣味图片
	router.post( '/listfunny', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.listfunny( paramObj );
		ctx.body = result;
	} )
	//默认轮播图
	router.post( '/changBanner', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.changBanner( paramObj );
		ctx.body = result;
	} )
	//趣味图片Logo列表
	router.post( '/listGj', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.listGj( paramObj );
		ctx.body = result;
	} )

	//生成趣味图片
	router.post( '/Thum', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await user.Thum( paramObj );
		ctx.body = result;
	} )

	//添加 趣味图片
	router.post( '/addfunny', async ( ctx, next ) => {
		let paramsObj = ctx.request.body
		ctx.body = await user.addfunny( paramsObj )
	} )

	//删除趣味图片
	router.post( '/delfunny', async ( ctx, next ) => {
		let paramsObj = ctx.request.body
		ctx.body = await user.delfunny( paramsObj )
	} )

	// 音乐相册
	router.post( '/getUserablumedit', async ( ctx, next ) => {
		ctx.body = await user.getUserablumedit( ctx.request.body )
	} )
	// 音乐相册列表
	router.get( '/getUserablumLists', async ( ctx, next ) => {
		ctx.body = await user.getUserablumLists( ctx.query )
	} )
	router.get( '/delUserablume', async ( ctx, next ) => {
		ctx.body = await user.delUserablume( ctx.query.id )
	} )
	// dellytc删除预定
	router.post( '/dellytc', async ( ctx, next ) => {
		ctx.body = await user.dellytc( ctx.request.body )
	} )
	//收藏列表
	router.post( '/getuserartcollerList', async ( ctx, next ) => {
		ctx.body = await user.getuserartcollerList( ctx.request.body )
	} )

	//删除收藏
	router.post( '/artcollectordel', async ( ctx, next ) => {
		ctx.body = await user.artcollectordel( ctx.request.body )
	} )

	//打卡
	router.post( '/editorpunchcard', async ( ctx, next ) => {
		ctx.body = await user.editorpunchcard( ctx.request.body )
	} )
	//打卡里的点赞
	router.post( '/punchcardlike', async ( ctx, next ) => {
		ctx.body = await user.punchcardlike( ctx.request.body )
	} )

	//打卡列表
	router.post( '/punchcardlist', async ( ctx, next ) => {
		ctx.body = await user.punchcardlist( ctx.request.body )
	} )
	//单条打卡信息
	router.post( '/getpunchacard', async ( ctx, next ) => {
		ctx.body = await user.getpunchacard( ctx.request.body )
	} )
	router.post( '/getpunchacardone', async ( ctx, next ) => {
		ctx.body = await user.getpunchacardone( ctx.request.body )
	} )

	app.use( router.routes() )
}
