const request = require( 'request' )
const query = require( 'qs' )
const fs = require( 'fs' )
const xml2js = require( 'xml2js' )
import template from './wechatTpl'

/**
 *  工具类函数集合
 */
/**
 * http 请求封装
 * @param    {[string]}                     type   [请求类型]
 * @param    {[string]}                     url    [请求地址]
 * @param    {[json/array]}                 data   [请求数据]
 * @param    {[object]}                     header [请求header]
 * @param    {[bool]}                       debug  [是否打印请求信息]
 * @return   {[promise]}                            [promise]
 * @Author:  slade
 * @DateTime :2017-09-15T10:30:42+080
 */
export const httpRequest = ( url, data = {}, type = 'GET', header = {}, debug = false ) => {
	// 数据
	let options = {
		url: url,
		headers: header,
		method: type
	}
	if ( type.toLowerCase() === 'post' ) {
		options = Object.assign( options, {
			form: data
		} )
	} else if ( type.toLowerCase() === 'get' ) {
		options.url = url + '?' + query.stringify( data )
	}
	// console.log('请求参数',options)
	// 调用
	return new Promise( ( resolve, reject ) => {
		request( options, ( error, response, body ) => {
			if ( debug ) {
				console.log( '请求返回\n', response )
				console.log( '请求返回内容\n', body )
				console.error( '请求错误\n', error )
			}
			if ( !error && response.statusCode == 200 ) {
				try {
					var info = typeof body === 'Object' ? body : JSON.parse( body )
					resolve( info )
				} catch ( e ) {
					console.log( '请求返回内容\n', body )
					reject( e )
				}
			} else {
				console.log( '请求返回内容\n', body )
				reject( error )
			}
		} )
	} )
}
/**
 * 外链图片转成本域
 * @type {[type]}
 */
export const imageRequest = async ( ctx, next ) => {
	await new Promise( function ( resolve, reject ) {
			let url = ctx.query.url
			// console.log( url );
			var req = request( {
				method: 'GET',
				encoding: null,
				uri: url
			}, function ( err, response, body ) {
				if ( err ) {
					return reject( err )
				}
				resolve( body )
			} )
		} )
		.then( ( body ) => {
			ctx.status = 200
			ctx.type = 'jpg'
			ctx.length = Buffer.byteLength( body )
			ctx.body = body
		} )
		.catch( ( err ) => {
			console.error( err )
		} )
}
/**
 * wv api 请求处理
 * @param    {[type]}                 url           [请求地址]
 * @param    {Array}                  [data=[]]     [post时的数据]
 * @param    {String}                 [type='GET']  [请求类型]
 * @param    {Object}                 [header={}]   [请求时的附带的header参数]
 * @param    {Boolean}                [debug=false] [是否开启debug]
 * @return   {Promise}                [Promise]
 * @Author:  slade
 * @DateTime :2017-09-15T11:40:53+080
 */
export const wvHttpRequest = ( url, data = '', type = 'GET', header = {}, debug = false ) => {
	// 返回Promise
	return new Promise( ( resolve, reject ) => {
		httpRequest( url, data, type, header, debug )
			.then( response => {
				if ( response.code == 20001 || response.code == 20000 || response.code == 20002 ) {
					resolve( response.data )
				} else {
					let error = {
						code: response.code,
						data: response.data,
						'msg': '不合法'
					}
					// reject( response )
					resolve( error )
				}
			} )
			.catch( error => {
				console.log( 'wv http request error', error )
				console.log( 'wv http request error url', url )
				let dataStr = typeof data == 'Object' ? JSON.stringify( data ) : data
				console.log( 'wv http request error 参数', dataStr )
				// reject( error )
				resolve( { code: 40000, data: '接口返回错误' } )
			} )
	} )
}
/**
 * 统一返回数据结构
 * @param    {Number}                 [code=2000] [状态码]
 * @param    {String}                 [msg='']    [状态说明]
 * @param    {String}                 [url='']    [返回url]
 * @param    {Object}                 [data={}]   [返回数据]
 * @return   {[type]}                 [description]
 * @Author:  slade
 * @DateTime :2017-09-15T15:37:18+080
 */
export const ajaxReturn = ( code = 2000, msg = 'success', url = '', data = {} ) => {
	return {
		code: code,
		msg: msg,
		url: url,
		data: data
	}
}
// code msg
export const inArray = ( arr, key ) => {
	for ( let i = 0; i < arr.length; i++ ) {
		if ( arr[ i ] == key ) {
			return true
		}
	}
	return false
}
/**
 * 获取参数并且根据传进来的默认参数进行组装成一次完整的请求
 * @param  {[Object]} params [此次传进来的参数]
 * @param  {[Object]} needle [需要进行筛选的参数，形式如下： {参数: 默认值}]
 * @return {[Object]}        [description]
 */
export const getParams = ( params, needle ) => {
	if ( JSON.stringify( params ) == '{}' ) return {}
	if ( JSON.stringify( needle ) == '{}' ) return params
	// console.log( 'user params', params )
	// console.log( 'system params', needle )
	let result = {}
	for ( let k in params ) {
		for ( let m in needle ) {
			if ( k == m ) { // 如果需要并且已经传了则取传进来的
				result[ k ] = params[ k ]
				// console.log( result );
				continue
			} else { // 否则取默认值
				if ( result[ k ] ) continue
				result[ k ] = params[ k ]
			}
		}
	}
	// console.log( 'params', result );
	return result
}
export const setFields = ( data = [], fields = [] ) => {
	if ( fields.length == 0 ) return data
	let result = []
	for ( let i = 0; i < data.length; i++ ) {
		let tmp = {}
		for ( let k in data[ i ] ) {
			if ( inArray( fields, k ) ) {
				tmp[ k ] = data[ i ][ k ]
			}
		}
		result.push( tmp )
	}
	return result
}
/**
 * wv 错误自定义
 * @param  {[type]} message [description]
 * @param  {[type]} code    [description]
 * @return {[type]}         [description]
 */
export const wvException = ( code, message, data ) => {
	let error = new Error( message )
	error.code = code
	error.data = data
	return error
}
export const pageData = ( pageData ) => {
	// 去除不需要的page参数
	delete pageData.leftCount
	delete pageData.rigthCount
	delete pageData.forwordName
	delete pageData.orderBySetted
	delete pageData.order
	return pageData
}

function fix2number( n ) {
	return [ 0, n ].join( '' )
		.slice( -2 )
}
export const dateformat = ( curDate, format ) => {
	if ( format == undefined ) return curDate
	format = format.replace( /Y/i, curdate.getFullYear() )
	format = format.replace( /m/i, fix2number( curdate.getMonth() + 1 ) )
	format = format.replace( /d/i, fix2number( curdate.getDate() ) )
	format = format.replace( /H/i, fix2number( curdate.getHours() ) )
	format = format.replace( /i/i, fix2number( curdate.getMinutes() ) )
	format = format.replace( /s/i, fix2number( curdate.getSeconds() ) )
	format = format.replace( /ms/i, curdate.getMilliseconds() )
	return format
}
export const getMath = ( start, end, fix = '' ) => {
	let start_num = start || 1,
		end_num = end || 12
	let result = []
	for ( let i = start; i <= end; i++ ) {
		result.push( {
			id: i,
			dreamNames: i + fix
		} )
	}
	return result
}
export const createNonce = () => {
	return Math.random()
		.toString( 36 )
		.substr( 2, 15 )
}
export const createTimestamp = () => {
	let date = new Date()
	return parseInt( date.getTime() / 1000, 0 ) + ''
}
/**
 * 判断是否是整形
 * @type {[type]}
 */
export const isInteger = ( obj ) => {
	return typeof obj === 'number' && obj % 1 === 0
}

/**
 * xml转js
 * @param  {[type]} xml [description]
 * @return {[type]}     [description]
 */
export const parseXMLAsync = ( xml ) => {
	return new Promise( ( resolve, reject ) => {
		xml2js.parseString( xml, { trim: true }, function ( err, content ) {
			if ( err ) reject( err )
			else resolve( content )
		} )
	} )
}

/**
 * 格式化消息
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
export const formatMessage = ( result ) => {
	let message = {}

	if ( typeof result === 'object' ) {
		const keys = Object.keys( result )

		for ( let i = 0; i < keys.length; i++ ) {
			let item = result[ keys[ i ] ]
			let key = keys[ i ]

			if ( !( item instanceof Array ) || item.length === 0 ) {
				continue
			}

			if ( item.length === 1 ) {
				let val = item[ 0 ]

				if ( typeof val === 'object' ) {
					message[ key ] = formatMessage( val )
				} else {
					message[ key ] = ( val || '' ).trim()
				}
			} else {
				message[ key ] = []

				for ( let j = 0; j < item.length; j++ ) {
					message[ key ].push( formatMessage( item[ j ] ) )
				}
			}
		}
	}

	return message
}

/**
 * 组合数据和xml
 * @param  {[type]} content [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export const tpl = ( content, message ) => {
	let type = 'text'

	if ( Array.isArray( content ) ) {
		type = 'news'
	}

	if ( !content ) {
		return false
	}

	if ( content && content.type ) {
		type = content.type
	}

	let info = Object.assign( {}, {
		content: content,
		createTime: new Date().getTime(),
		msgType: type,
		toUserName: message.FromUserName,
		fromUserName: message.ToUserName
	} )

	return template( info )
}

// uid加密 e: uid , a:
export function numToCharacter( e, a = 2 ) {
	var o = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ],
		r = []
	for ( let i = 0; i < e.length; i++ ) r.push( e.charAt( i ) )
	var m = ''
	for ( var d in r ) m += '%' + o[ parseInt( r[ d ] ) + a ] + '%'
	return m
}
