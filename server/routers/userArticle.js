import Router from 'koa-router'
import * as editarticle from '../controller/editarticle'

export default function ( app ) {
	const router = new Router( {
		prefix: '/api'
	} )
	//获取文章一级分类
	router.post( '/getClassifyList', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.getClassifyList( paramObj );
		ctx.body = result;
	} )
	//获取文章二级分类
	router.post( '/getartclassList', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.getartclassList( paramObj );
		ctx.body = result;
	} )
	//添加文章二级分类
	router.post( '/artclasseditor', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.artclasseditor( paramObj );
		ctx.body = result;
	} )
	//删除文章分类
	router.post( '/delartclass', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.delartclass( paramObj );
		ctx.body = result;
	} )
	//获取文章列表
	router.post( '/seachuserarticle', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.seachuserarticle( paramObj );
		ctx.body = result;
	} )
	//关注文章作者
	router.post( '/Concernditor', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.Concernditor( paramObj );
		ctx.body = result;
	} )
	//打赏
	router.post( '/orderinforeward', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.orderinforeward( paramObj );
		ctx.body = result;
	} )
	//删除文章
	router.post( '/delUserArticle', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.delUserArticle( paramObj );
		ctx.body = result;
	} )
	//编辑文章
	router.post( '/userarticleeditor', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.userarticleeditor( paramObj );
		ctx.body = result;
	} )
	//获取会员文章数量及粉丝数量myuserarticleacount
	router.post( '/myuserarticleacount', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.myuserarticleacount( paramObj );
		ctx.body = result;
	} )
	router.post( '/seachuserarticleone', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.seachuserarticleone( paramObj );
		ctx.body = result;
	} )
	//替换微信serverId
	router.post( '/wxupload', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.wxupload( paramObj );
		ctx.body = result;
	} )
	//点赞
	router.post( '/addLikes', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.addLikes( paramObj );
		ctx.body = result;
	} )

	//文章修改背景
	router.post( '/userpiceditor', async ( ctx, next ) => {
		let paramObj = ctx.request.body;
		let result = await editarticle.userpiceditor( paramObj );
		ctx.body = result;
	} )
// 关注
  router.post( '/getConcernList', async ( ctx, next ) => {
    let paramObj = ctx.request.body;
    let result = await editarticle.getConcernList( paramObj );
    ctx.body = result;
  } )
//粉丝
  router.post( '/getfans', async ( ctx, next ) => {
    let paramObj = ctx.request.body;
    let result = await editarticle.getfans( paramObj );
    ctx.body = result;
  } )
  //打赏
  router.post( '/orderinforewardwx', async ( ctx, next ) => {
    let paramObj = ctx.request.body;
    let result = await editarticle.orderinforewardwx( paramObj );
    ctx.body = result;
  } )
	app.use( router.routes() )
}
