import Router from 'koa-router'
import * as brand from '../controller/brand'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	//========品牌==============//
	//获取所有品牌信息;
	router.post( '/getBrandList', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await brand.getBrandList( paramObj );
		ctx.body = result;
	} )
	// 获取品牌
	router.get( '/getBrand', async ( ctx, next ) => {
		ctx.body = await brand.getBrand( ctx.query )
	} )
	// ============名片=========//
	//获取所有名片模板;
	router.get( '/cradTemplateListz', async ( ctx, next ) => {
		let result = await brand.cradTemplateListz( ctx.request.query );
		ctx.body = result;
	} )

	app.use( router.routes() )
}
