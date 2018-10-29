import wechatCtrl from '../utils/wechat'
import config from '../config/index.js'
import wxuploads from '../config/apis/wxupload.js'
import sha1 from 'sha1'
import { ajaxReturn, createNonce, createTimestamp } from '../utils'
import { getSiteConfig } from './siteConfig'
import * as weChatPayment from '../utils/wechatPayment'
import getClintIp from 'ipware'
const getIp = getClintIp().get_ip
import WechatOAuth from '../utils/wechatOauth'
import { parse as urlParse } from 'url'
import querystring from 'querystring'
import { newbd, getwxbdinfos } from './user'
import { base64Upload, deleteFile } from './file'
/**
 * 获取微信config
 * @type {[type]}
 */
const wechat = new wechatCtrl( config.wechat )

const oauth = new WechatOAuth( config.wechat )

/**
 * 获取微信配置
 * @param  {[type]}  url [description]
 * @return {Promise}     [description]
 */
export const getWechatConfig = async ( url ) => {
	if ( !url ) { return ajaxReturn( 4000, 'params error: url exits' ) }
	let accessToken = await wechat.fetchAccessToken()
	let ticket = await wechat.fetchTicket( accessToken.access_token )
	let data = {
		noncestr: createNonce(),
		jsapi_ticket: ticket.ticket,
		timestamp: createTimestamp(),
		url: url
	}
	let dataKeys = Object.keys( data )
	dataKeys = dataKeys.sort()
	let sign_string = ''
	for ( let i = 0; i < dataKeys.length; i++ ) {
		sign_string += dataKeys[ i ] + '=' + data[ dataKeys[ i ] ] + '&'
	}
	sign_string = sign_string.substr( 0, sign_string.length - 1 )
	let sign = sha1( sign_string )
	data[ 'signature' ] = sign
	delete data.jsapi_ticket
	data[ 'appid' ] = config.wechat.appid
	return ajaxReturn( 2000, 'success', '', data )
}

/**
 * 创建订单
 * @return {[type]} [description]
 */
export const createVipOrder = async ( ctx, next ) => {
	const ipInfo = getIp( ctx.request.req )
	let {
		openId,
		username,
		type,
		wecahtFree
	} = ctx.request.body
	let date = new Date()
	let siteConfig = await getSiteConfig()
	let ip = ipInfo.clientIp
	ip = ip.replace( '::ffff:', '' )

	let text = ''
	switch ( type ) {
	case 'CloudCardOpen':
		text = '开通'
		wecahtFree = siteConfig.dreamPrice5
		break
	case 'CloudCardRenew':
		text = '续费'
		break
	case 'CloudCard':
		text = '充值'
		break
	}
	console.log( 'wecahtFree', wecahtFree )
	let order = {
		body: `值享云名片网站${text}`,
		out_trade_no: `E${date.getFullYear()}${date.getMonth()}${date.getDate()}_${Date.now()}`,
		total_fee: wecahtFree * 100, // 1,
		attach: `${username}-${type}`,
		spbill_create_ip: ip,
		openid: openId,
		trade_type: 'JSAPI'
	}
	let wxParams
	try {
		wxParams = await weChatPayment.getParamsAsync( order )
		ctx.body = {
			success: 1,
			args: wxParams
		}
	} catch ( e ) {
		console.log( e )
		ctx.body = {
			success: 0
		}
	}
	console.log( '微信支付日志', `type: ${type}, attach: ${username}-${type}`, wxParams );

}

/**
 * 获取拉取授权地址
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
export const getAuthorizeURL = ( query ) => {
	let url = config.site_daemon + query.target
	let urlResult = oauth.getAuthorizeURL( url, 'STATE' )
	// console.log( 'oauth', urlResult ); query.target, 'STATE'
	return urlResult
}

// 网页上点某按钮，直接跳转到 http://x.o/wechat-redirect?visit=a&id=b
// 用户被重定向到 Wechat Redirect URL 授权验证
// 验证后，自动二跳进入 http://x.o/oauth?code=xxxxxx&state=a_b
export async function wechatBindHide( ctx, next ) {
	let code = ctx.query.code
	let wechatUser = await getUserByCode( code )
	let state = ctx.query.state
	let params = {}
	let state_key_val = state.split( '__' )

	for ( var i = 0; i < state_key_val.length; i++ ) {
		let tmp = state_key_val[ i ].split( '_' )
		params[ tmp[ 0 ] ] = tmp[ 1 ]
	}

	let bindData = await newbd( {
		dreamUsername: params.uid,
		wx: JSON.stringify( wechatUser )
	} )
	params.bindData = bindData
	ctx.redirect( config.site_daemon + '/login/login_bindwx?' + querystring.stringify( params ) )
}

/**
 * 微信跳转
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export async function wechatRedirect( ctx, next ) {
	let redirect = '',
		params = '',
		scope = 'snsapi_userinfo'

	if ( ctx.query.bindewx ) {
		let {
			uid,
			brand
		} = ctx.query
		let bindwx = ctx.query.bindewx.split( '_' ).join( '/' )
		redirect = config.site_daemon + '/' + bindwx
		params = 'uid_' + uid + '__' + 'brand_' + brand
	} else {
		const {
			target,
			type,
			wechatFree,
			rowid
		} = ctx.query
		redirect = config.site_daemon + '/oauth/'
		let target_str = ''
		let targetArr = querystring.parse( target )
		for ( let k in targetArr ) {
			target_str += k + '_' + targetArr[ k ] + '__'
		}
		target_str += 'type_' + type + '__'
		params = wechatFree ?
			target_str + 'free_' + wechatFree :
			target_str
		params = rowid ?
			params + '__rowid_' + rowid :
			params
	}
	const url = oauth.getAuthorizeURL( redirect, params, scope )
	// console.log( 'url', url );
	ctx.redirect( url )
}

/**
 * 获取用户code
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
export async function getUserByCode( code ) {
	const data = await oauth.fetchAccessToken( code )
	const openid = data.openid
	const user = await oauth.getUserInfo( data.access_token, openid )
	return user
}

/**
 * 微信授权
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export async function wechatOauth( ctx, next ) {
	const url = ctx.query.url
	const urlObj = urlParse( decodeURIComponent( url ) )
	const params = querystring.parse( urlObj.query )
	const code = params.code
	try {
		let user = await getUserByCode( code )

		ctx.body = {
			success: true,
			user: user
		}
	} catch ( e ) {
		console.log( '拉取微信信息失败', e );
		ctx.body = {
			success: false,
			user: {},
			msg: '拉取微信授权失败！'
		}
	}
}

/**
 * 获取accesstoken
 * @return {[type]} [description]
 */
export async function fetchAccessToken() {
	return wechat.fetchAccessToken()
}

/**
 * 微信上传
 * @param  {[type]}  type            [图片（image）、视频（video）、语音 （voice）、图文（news）]
 * @param  {[type]}  file            [base64的文件]
 * @param  {Boolean} [forever=false] [是否永久素材]
 * @return {[type]}                  [description]
 */
export const wxUploadFile = async ( dreamUsername, type, file, forever ) => {
	return new Promise( async ( resolve, reject ) => {
		try {
			// 1 接收string存文件
			let uploadRes = await base64Upload( file )
			// console.log( 'uploadRes', uploadRes );
			// 2 上传文件得到mediaId
			let accessToken = await wechat.fetchAccessToken()
			console.log( 'accessToken', accessToken )

			let wechatUploadOptions = await wechat.uploadMaterial( accessToken.access_token, 'image', uploadRes.data.path )
			console.log( 'wechatUploadOptions', wechatUploadOptions )

			let wechatUploadRes = await wechat.request( wechatUploadOptions )
			console.log( 'wechatUploadRes', wechatUploadRes )

			// 3 推送公众号
			let userWechatInfo = await getwxbdinfos( {
				dreamUserid: dreamUsername
			} )
			console.log( 'userWechatInfo', userWechatInfo )

			let wechatSendData = await wechat.customMsgSend( accessToken.access_token, {
				'touser': userWechatInfo.data.dreamOpenid,
				'image': {
					'media_id': wechatUploadRes.media_id
				},
				'msgtype': 'image'
			} )
			console.log( 'wechatSendData', wechatSendData )

			let wechatSendRes = await wechat.request( wechatSendData )
			console.log( 'wechatSendRes', wechatSendRes )

			// 4 删除临时文件
			let deleteFileRes = await deleteFile( uploadRes.data.path )

			resolve( ajaxReturn( 2000, 'success', '成功' ) )
		} catch ( e ) {
			console.log( e )
			resolve( ajaxReturn( 4000, e, '失败' ) )
		}
	} )
}

/**
 * 生成二维码
 * @param  {[type]}  content   [description]
 * @param  {Boolean} isForever [description]
 * @return {Promise}           [description]
 */
export const wxQrcode = async ( content, isForever ) => {
	let result = await wechat.fetchQrcode( content, isForever )

	return result
}

/**
 * 创建菜单
 * @type {[type]}
 */
export const createMenu = async () => {
	let menuData = {
		'button': [
			{
				'type': 'view',
				'name': '名片介绍',
				'key': 'V1001_TODAY_MUSIC',
				'url': 'http://mp.weixin.qq.com/mp/homepage?__biz=MzI5MTA3NjY1MA==&hid=2&sn=75df90e4adb0bbf51e7fe1e83a92d7b6#wechat_redirect'
      }, {
				'type': 'view',
				'name': '会员登录',
				'key': 'V1001_TODAY_MUSIC',
				'url': 'http://wap.wvmp360.com/api/wechat-redirect?target=uid%3D&bindewx=login_bindwx'
      }, {
				'type': 'view',
				'name': '联系客服',
				'key': 'V1001_TODAY_MUSIC',
				'url': 'http://wap.wvmp360.com/wusercenter/inlineservice'
      } ]
	}

	let res = await wechat.handle( 'createMenu', menuData )
	console.log( res )
	return ajaxReturn( 2000, 'success', '创建成功' )
}
