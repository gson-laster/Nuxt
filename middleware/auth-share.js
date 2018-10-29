// 分享和登录区分中间件
import {
	userLoginOut
} from '~/apis/user'
import {
	setCookie
} from "~static/js/util"
import appConf from '~/app.config.js'
export default async ( { route, req, isServer, store } ) => {
	if ( route.query.hasOwnProperty( 'is_share' ) ) {
		// 是分享 loginout 登录状态
		await userLoginOut()
		store.dispatch( 'setLoginState', false )
		if ( isServer ) {
			req.headers.cookie = ''
		} else {
			//setCookie( 'loginUser', '', -1 )
			store.dispatch( 'setUserInfo', null )
			store.dispatch( 'setBrandInfo', null )
			store.dispatch( 'setUserMenu', null )
		}
	}
	if ( !isServer ) {
		// 处理jssdk签名,兼容history模式
		if ( !store.state.url ) {
			store.commit( 'SET_URL', document.URL )
		}

	} else {
		// if ( !store.state.url ) {
		//   console.log( req.url );
		//   store.commit( 'SET_URL', appConf.site_url + req.url )
		// }

	}
}
