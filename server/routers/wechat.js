import Router from 'koa-router'
import { getWechatConfig, createVipOrder, getAuthorizeURL, wechatRedirect, wechatOauth, fetchAccessToken, wechatBindHide, wxUploadFile, wxQrcode, createMenu } from '../controller/wechat'
import * as wechatMsg from '../controller/wechatMsg'

export default function (app) {
  const router = new Router({
    prefix: '/api'
  })
	// =====VB相关=======//
	// 获取微信配置信息;
  router.post('/getWechatConfig', async (ctx, next) => {
    let result = await getWechatConfig(ctx.request.body.url)
    ctx.body = result
  })
	// 创建vip开通订单
  router.post('/createVipOrder', async (ctx, next) => {
    await createVipOrder(ctx, next)
  })
	// 微信授权地址
  router.get('/getWechatOAuthUrl', (ctx, next) => {
    ctx.body = getAuthorizeURL(ctx.query)
  })
  router.get('/wechat-redirect', async (ctx, next) => {
    await wechatRedirect(ctx, next)
  })
  router.get('/wechat-oauth', async (ctx, next) => {
    await wechatOauth(ctx, next)
  })
  router.get('/fetchAccessToken', async (ctx, next) => {
    ctx.body = await fetchAccessToken()
  })
	// 发送微信消息
  router.post('/sendwxmsg', async (ctx, next) => {
    let {
			dreamUsername,
			type,
			file,
			forever
		} = ctx.request.body
    ctx.body = await wxUploadFile(dreamUsername, type, file, forever)
  })
	// 微信二维码地址
  router.get('/wxQrcode', async (ctx, next) => {
    let { content, isForever } = ctx.query
    ctx.body = await wxQrcode(content, isForever)
  })

  router.all('/wechat-auth', wechatMsg.wechatAuth)
  router.get('/createMenu', async (ctx, next) => {
    ctx.body = await createMenu()
  })
  app.use(router.routes())
}
