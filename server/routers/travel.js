import Router from 'koa-router'
import * as travel from '../controller/travel'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	//=============旅游==================//
	// 获取套餐分类
	router.get( '/getLytcClass', async ( ctx, next ) => {
		ctx.body = await travel.getLytcClass()
	} )
	// 获取套餐列表
	router.get( '/getLytcList', async ( ctx, next ) => {
		ctx.body = await travel.getLytcList( ctx.query )
	} )
	// 获取套餐详情
	router.get( '/getLytcDetail', async ( ctx, next ) => {
		ctx.body = await travel.getLytcDetail( ctx.query.id )
	} )
	// 名片页注册报名;
	router.post( '/orderlytc', async ( ctx, next ) => {
		ctx.body = await travel.orderlytc( ctx.request.body )
	} )
	//旅游点赞;
	router.get( '/secLytcBylike', async ( ctx, next ) => {
		ctx.body = await travel.secLytcBylike( ctx.query )
	} )

	app.use( router.routes() )
}
