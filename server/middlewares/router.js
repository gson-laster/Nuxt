import Router from 'koa-router'
import config from '../config'
import * as preview from '../controller/preview'
import { imageRequest } from '../utils'
import { httpRequest } from '../utils'
import { getimgs } from '../controller/siteConfig'
import { getSiteConfig } from '../controller/siteConfig'

// 载入router文件
import articleRouter from '../routers/article'
import productRouter from '../routers/product'
import travelRouter from '../routers/travel'
import agentRouter from '../routers/agent'
import userRouter from '../routers/user'
import userArticleRouter from '../routers/userArticle'
import userMenuRouter from '../routers/userMenu'
import vmallRouter from '../routers/vmall'
import vbRouter from '../routers/vb'
import wechatRouter from '../routers/wechat'
import brandRouter from '../routers/brand'
import bannerRouter from '../routers/banner'
// 导出router中间件
export const articleRouterHandler = articleRouter
export const productRouterHandler = productRouter
export const travelRouterHandler = travelRouter
export const agentRouterHandler = agentRouter
export const userRouterHandler = userRouter
export const userArticleRouterHandler = userArticleRouter
export const userMenuRouterHandler = userMenuRouter
export const vmallRouterHandler = vmallRouter
export const wechatRouterHandler = wechatRouter
export const vbRouterHandler = vbRouter
export const brandRouterHandler = brandRouter
export const bannerRouterHandler = bannerRouter

export const router = app => {
	const router = new Router( {
		prefix: '/api'
	} )
	//=========音乐=========//
	//获取编辑用户信息音乐列表;
	router.post( '/getUserMusicList', async ( ctx, next ) => {
		let result = await music.getUserMusicList();
		ctx.body = result;
	} )
	//=====配置相关======//
	//获取预览所有的品牌;
	router.get( '/priviewbrandz', async ( ctx, next ) => {
		let result = await preview.priviewbrandz( ctx.request.query )
		ctx.body = result
	} )
	// 获取单个品牌预览信息;
	router.get( '/priviewBrandNewsList', async ( ctx, next ) => {
		let result = await preview.priviewBrandNewsList( ctx.request.query )
		ctx.body = result
	} )

	//======网站配置======//
	router.get( '/getSiteConfig', async ( ctx, next ) => {
		ctx.body = await getSiteConfig( ctx.query )
	} )

	router.get( '/hostImg', imageRequest )

	app.use( router.routes() )
}
