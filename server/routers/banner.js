import Router from 'koa-router'
import * as banner from '../controller/banner'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	//========轮播图========//
	//轮播图;
	router.post( '/getBanner', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await banner.getBannerList( paramObj );
		ctx.body = result;
	} )
	router.get( '/getuserbannerList', async ( ctx, next ) => {
		let result = await banner.getuserbannerList( ctx.request.query )
		ctx.body = result
	} )
	// 获取banner list
	router.get( '/getBannerList', async ( ctx, next ) => {
		let result = await banner.getBannerList( ctx.query )
		ctx.body = result
	} )


	app.use( router.routes() )
}
