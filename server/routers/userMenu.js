import Router from 'koa-router'
import * as usermenu from '../controller/usermenu'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	// =========用户图标========//
	//用户名片图标获取;
	router.get( '/getusermenu', async ( ctx, next ) => {
		ctx.body = await usermenu.getusermenu( ctx.request.query )
	} )
	// 用户图标修改;
	router.get( '/editorusermenu', async ( ctx, next ) => {
		ctx.body = await usermenu.editorusermenu( ctx.request.query )
	} )
	// 用户图标删除;
	router.get( '/delusermenu', async ( ctx, next ) => {
		ctx.body = await usermenu.delusermenu( ctx.request.query )
	} )

	app.use( router.routes() )
}
