import Router from 'koa-router'
import * as article from '../controller/article'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	//===========文章===========//
	router.get( '/getArticleList', async ( ctx, next ) => {
		let query = ctx.query
		// console.log( 'params', query );
		let result = await article.getArticleList( query.dreamBrandid, query )
		ctx.body = result
	} )
	// 单篇文章信息
	router.get( '/getArticleById', async ( ctx, next ) => {
		let result, query
		result = await article.getArticleById( ctx.query.id, ctx.query.brand, ctx.query.brand.type )
		ctx.body = result
	} )
	// 转载文章列表
	router.get( '/getCollviewList', async ( ctx, next ) => {
		ctx.body = await article.getCollviewList( ctx.query )
	} )
	// 删除转载文章
	router.get( '/delCollview', async ( ctx, next ) => {
		ctx.body = await article.delCollview( ctx.query.id )
	} )
	// 添加转载文章
	router.post( '/editorCollview', async ( ctx, next ) => {
		ctx.body = await article.editorCollview( ctx.request.body )
	} )

	//===========文章分类===========//
	router.get( '/getNavList', async ( ctx, next ) => {
		let paramObj = ctx.query
		let result = await article.getNavList( paramObj )
		ctx.body = result
	} )
	// 推荐文章
	router.get( '/indextjlist', async ( ctx, next ) => {
		ctx.body = await article.indextjlist( ctx.query )
	} )

	app.use( router.routes() )
}
