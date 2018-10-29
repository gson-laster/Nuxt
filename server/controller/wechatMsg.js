/**
 * 处理微信公众号认证，消息推送
 */
import sha1 from 'sha1'
import config from '../config'
import { parseXMLAsync, formatMessage, tpl } from '../utils'
import reply from '../utils/wechatReply'
const getRawBody = require('raw-body')
export const wechatAuth = async (ctx, next) => {
  let { signature, timestamp, nonce, echostr } = ctx.query

  let str = [ config.wechat.token, timestamp, nonce ].sort().join('')

  let sha1Str = sha1(str)
  if (ctx.method === 'GET') {
    if (sha1Str === signature) {
      ctx.body = echostr
    } else {
      ctx.body = 'fail'
    }
  } else if (ctx.method == 'POST') {
		// 微信公众号的消息
    let xmlData = await getRawBody(ctx.req)

    let content = await parseXMLAsync(xmlData)

    let message = formatMessage(content.xml)

    ctx.weixin = message

    await reply.apply(ctx, [ ctx, next ])

    const replyBody = ctx.body
    const msg = ctx.weixin
    const xml = tpl(replyBody, msg)

    if (xml) {
      ctx.status = 200
  		ctx.type = 'application/xml'
  		ctx.body = xml
    }
  }
}

/**
 * 事件消息处理函数
 * @param {[type]} message [description]
 */
const MsgEventHandel = (message) => {
  if (message.Event == 'subscribe') {
		// 订阅事件
  } else if (message.Event == 'unsubscribe') {
		// 取消订阅事件
  } else if (message.Event == 'SCAN') {
		// 扫码事件
  }
}
