import Router from 'koa-router'
import * as vmall from '../controller/vmall'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	// ============vmall=========//
	// 获取vmall商品列表
	router.get( '/getVmallGoodsList', async ( ctx, next ) => {
		let result = await vmall.getVmallGoodsList( ctx.request.query )
		ctx.body = result
	} )
	// 获取商品详情;
	router.get( '/getVmallGoodsInfo', async ( ctx, next ) => {
		let result = await vmall.getVmallGoodsInfo( ctx.request.query )
		ctx.body = result
	} )
	//获取订单列表;
	router.get( '/getvmalllist', async ( ctx, next ) => {
		let result = await vmall.getvmalllist( ctx.request.query )
		ctx.body = result
	} )
	// 订单数据;
	router.get( '/getvmcount', async ( ctx, next ) => {
		let result = await vmall.getvmcount( ctx.request.query )
		ctx.body = result
	} )
	// 获取收藏列表;
	router.get( '/getVmallListhyc', async ( ctx, next ) => {
		let result = await vmall.getVmallListhyc( ctx.request.query )
		ctx.body = result
	} )
	// 删除收藏;
	router.get( '/changuserfavorite', async ( ctx, next ) => {
		let result = await vmall.changuserfavorite( ctx.request.query )
		ctx.body = result
	} )
	// 立即购买;
	router.get( '/vmallorder', async ( ctx, next ) => {
		let result = await vmall.vmallorder( ctx.request.query )
		ctx.body = result
	} )
	//获取购物车列表;
	router.get( '/seachshopcar', async ( ctx, next ) => {
		let result = await vmall.seachshopcar( ctx.request.query )
		ctx.body = result
	} )
	//编辑购物车的数量;
	router.get( '/editorshopcar', async ( ctx, next ) => {
		let result = await vmall.editorshopcar( ctx.request.query )
		ctx.body = result
	} )
	//删除购物车
	router.get( '/delshopcar', async ( ctx, next ) => {
		let result = await vmall.delshopcar( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/addVmallShopCar', async ( ctx, next ) => {
		let result = await vmall.addVmallShopCar( ctx.request.query )
		ctx.body = result
	} )

	app.use( router.routes() )
}
