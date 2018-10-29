import Router from 'koa-router'
import * as agents from '../controller/agents'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	// ========代理相关=======//
	router.get( '/editorPurpose', async ( ctx, next ) => {
		let result = await agents.editorPurpose( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/getOpenpermit', async ( ctx, next ) => {
		let result = await agents.getOpenpermit( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/getOpenuserrecode', async ( ctx, next ) => {
		let result = await agents.getOpenuserrecode( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/getcdkeys', async ( ctx, next ) => {
		let result = await agents.getcdkeys( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/getUserList2new', async ( ctx, next ) => {
		let result = await agents.getUserList2new( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/getCountByIsOkTime2new', async ( ctx, next ) => {
		let result = await agents.getCountByIsOkTime2new( ctx.request.query )
		ctx.body = result
	} )
	router.get( '/openuser', async ( ctx, next ) => {
		let result = await agents.openuser( ctx.request.query )
		ctx.body = result
	} )

	app.use( router.routes() )
}
