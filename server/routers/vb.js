import Router from 'koa-router'
import * as VB from '../controller/vb'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	// =====VB相关=======//
	//获取付钱啦信息;
	router.post( '/getVBorderInfo', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let {
			uid
		} = paramObj, {
			brand
		} = paramObj, {
			type
		} = paramObj, {
			money
		} = paramObj;
		let result = await VB.getVBorderInfo( paramObj );
		ctx.body = result;
	} )
	// 获取VB提现列表;
	router.post( '/getVBWithdrawList', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await VB.getVBWithdrawList( paramObj );
		ctx.body = result;
	} );
	// 获取VB转送列表;
	router.get( '/getVBvbzsList', async ( ctx, next ) => {
		let paramObj = ctx.query;
		let result = await VB.getVBvbzsList( paramObj.dreamUserid, paramObj.index );
		ctx.body = result;
	} )


	app.use( router.routes() )
}
