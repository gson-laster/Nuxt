import { fecthUserInfo } from '~/apis/user'
import { getBrandList } from '~/apis/brand'
import { getusermenu } from '~/apis/usermenu'
import { getSiteConfig } from '~/apis/siteConfig'
import { declassify, getCookie, getRealPath } from '~static/js/util'
import url from 'url'

export default async function ( { route, query, store, redirect, isServer, isClient, req } ) {
	// 1、检测参数
	let imgExp = /(login)|.(jpg|png|jpeg|bmp)/ig
	if ( !getRealPath( route.path ) && !getRealPath( isServer ? req.url : '' ) ) { // 不是图片
		let checkParms = false,
			storeIsEmpty = false,
			username = '',
			queryUsername = '',
			brand = 0

		if ( isClient ) {
			if ( query.hasOwnProperty( 'uid' ) && query.hasOwnProperty( 'brand' ) && query.uid != '' ) {
				checkParms = true
				username = declassify( encodeURIComponent( query.uid ), 2 )
				console.log( username );
				queryUsername = username
				brand = query.brand
			}
		} else {
			let urlObj = url.parse( req.url, true )
			if ( urlObj.query.uid && urlObj.query.brand != '' ) {
				username = declassify( urlObj.query.uid )
				queryUsername = username
				brand = urlObj.query.brand
				checkParms = true
			}
		}
		if ( store.state.userInfo ) {
			if ( username != store.state.userInfo.dreamUsername ) {
				store.dispatch( 'setUserInfo', null )
				store.dispatch( 'setBrandInfo', null )
				storeIsEmpty = true
			}
		} else {
			storeIsEmpty = true
		}

		if ( route.name == 'oauth' && username == '' ) {
			let context = ''
			if ( isServer ) {
				context = req.headers.cookie
			} else {
				context = document.cookie
			}
			checkParms = true
			username = store.state.userInfo ? store.state.userInfo.dreamUsername : getCookie( 'loginUser', context )
		};
		// 检测是否登录
		if ( checkParms && username && username != '' ) {
			if ( isClient ) {
				try {
					// 登录了有用户信息，同步store
					let userNameForApi = queryUsername && queryUsername != '' ? queryUsername : username;
					let userData = await fecthUserInfo( { dreamUsername: userNameForApi } )
					if ( userData.length != 0 ) {
						await store.dispatch( 'setUserInfo', userData.userInfo[ 0 ] )
						let brandInfo = await getBrandList( { brandId: brand } )
						await store.dispatch( 'setBrandInfo', brandInfo[ 0 ] )

						// 设置过期store
						let dreamEndTime = userData.userInfo[ 0 ].dreamEndtime
						let nowTimeStamp = new Date().getTime()
						if ( dreamEndTime && dreamEndTime !== ' ' && Number( dreamEndTime ) < Number( nowTimeStamp ) ) {
							await store.dispatch( 'setUserDude', true )
						} else {
							await store.dispatch( 'setUserDude', false )
						}
						let siteConfig = await getSiteConfig()
						await store.dispatch( 'setSiteConfig', siteConfig )
					}
				} catch ( e ) {
					console.log( '=================>', e );
				};
			}
		} else {
			if ( route.name != 'login' && route.name != 'wechat-redirect' && route.name != "login-bindwx" && route.name != 'auth' && route.name != 'register' && route.name != "login-loginbindwxhid" && route.name != "wusercenter-inlineservice" ) {
				redirect( 200, '/login' )
			}
		}
	}
}
