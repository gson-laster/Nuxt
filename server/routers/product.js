import Router from 'koa-router'
import * as product from '../controller/product'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	//=============产品==================//
	// 获取产品分类信息, 包含cid则取单个，
	router.get( '/getProductClassList', async ( ctx, next ) => {
		if ( ctx.query.cid ) ctx.body = await product.getProductClassList( ctx.query.brandId, ctx.query.cid )
		else ctx.body = await product.getProductClassList( ctx.query.brandId )
	} )
	router.get( '/getProductList', async ( ctx, next ) => {
		ctx.body = await product.getProductList( ctx.query )
	} )
	router.get( '/getProductDetail', async ( ctx, next ) => {
		ctx.body = await product.getProductDetail( ctx.query.id )
	} )
	router.post( '/addBrandOrder', async ( ctx, next ) => {
		ctx.body = await product.addBrandOrder( ctx.request.body )
	} )
	app.use( router.routes() )
}
