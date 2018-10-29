import { declassify, getCookie } from '~static/js/util'

// 设置登录状态中间件;
function CheckCookieSign( cookieStr ) {
	if ( cookieStr !== '' && cookieStr.indexOf( 'loginUser' ) != -1 ) {
		return true
	} else {
		return false
	}
}
export default ( { req, store, query, isServer, isClient } ) => {
	let cookieStr
	if ( isServer ) {
		cookieStr = req.headers.cookie
	} else {
		cookieStr = document.cookie
		console.log( 'client', cookieStr )
	}
	if ( ( cookieStr && CheckCookieSign( cookieStr ) && declassify( query.uid ) == getCookie( 'loginUser', cookieStr ) ) ) {
		// 登录
		store.dispatch( 'setLoginState', true )
	} else {
		store.dispatch( 'setLoginState', false )
	}
}
