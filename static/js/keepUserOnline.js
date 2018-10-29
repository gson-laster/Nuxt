import url from 'url'
import { fecthUserInfo } from '~/apis/user'
import { getBrandList } from '~/apis/brand'
import { declassify, getCookie } from '~static/js/util'
/**
 * 保持用户信息
 * @type {[type]}
 */
export default async function ( route, type = 'user' ) {
	return new Promise( async function ( resolve, reject ) {
		try {
			let username = route.query.uid
			let brand = route.query.brand
			let data = {}

			// fetch user info
			if ( type.indexOf( 'user' ) != -1 ) {
				let userData = await fecthUserInfo( { dreamUsername: declassify( username, 2 ) } )
				data[ 'user' ] = userData.userInfo ? userData.userInfo[ 0 ] : {}
			}
			// fetch brand info
			if ( type.indexOf( 'brand' ) != -1 ) {
				let brandInfo = await getBrandList( { brandId: brand } )
				data[ 'brand' ] = brandInfo[ 0 ]
			}

			resolve( data )
		} catch ( e ) {
			console.log( '获取用户基本信息失败', e );
			reject( e )
		}
	} );

}
