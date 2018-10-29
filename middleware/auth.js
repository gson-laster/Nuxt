// 登录校验中间件
function checkCookieSign (cookieStr) {
  if (!cookieStr) {
    return false
  }
  if (cookieStr != '' && cookieStr.indexOf('loginUser') != -1) return true
  else return false
}
import { getCookie, declassify } from '~static/js/util'
export default ({ isServer, req, redirect, store, query }) => {
  let cookieStr = ''
  if (isServer) {
    cookieStr = req.headers.cookie
  } else {
    cookieStr = document.cookie
		// console.log( 'client', cookieStr )
  }
	// console.log( 'cookieStr', cookieStr )
	// if ( !cookieStr || cookieStr == '' || !checkCookieSign( cookieStr ) || declassify( query.uid ) != getCookie( 'loginUser', cookieStr ) ) {
	// 	redirect( '/login' )
	// }
  if (!(cookieStr && checkCookieSign(cookieStr) && declassify(query.uid) == getCookie('loginUser', cookieStr))) {
		// 登录
    redirect('/login')
  }
}
