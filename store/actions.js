import axios from 'axios'
import { getWxConfig } from '~/apis/wechat'
import url from 'url'
import { declassify, getCookie } from '~static/js/util'
import { fecthUserInfo } from '~/apis/user'
import { getBrandList } from '~/apis/brand'
import { getSiteConfig } from '~/apis/siteConfig'

export default {
	async nuxtServerInit( { commit }, { res, req, store, isClient, route } ) {
		// return new Promise( async function ( resolve, reject ) {
		// 	let imgExp = /(login)|.(jpg|png|jpeg|bmp)$/ig
		// 	if ( !imgExp.test( req._parsedUrl.pathname ) && /uid=/ig.test( route.fullPath ) && !isClient ) {
		// 		console.log( route );
		// 		console.log( req.url );
		// 		console.log( req.headers.cookie );
		//
		// 		let urlObj = url.parse( req.url, true )
		// 		let uid = '',
		// 			brand = 0
		// 		if ( urlObj.query.uid && urlObj.query.brand != '' ) {
		// 			uid = declassify( urlObj.query.uid )
		// 			brand = urlObj.query.brand
		// 			let userData = await fecthUserInfo( { dreamUsername: uid } )
		// 			store.commit( 'SET_USER_INFO', userData.userInfo[ 0 ] )
		// 			let brandInfo = await getBrandList( {
		// 				brandId: brand
		// 			} )
		// 			store.commit( 'SET_BRAND_INFO', brandInfo[ 0 ] )
		//
		// 			// 设置过期store
		// 			let dreamEndTime = userData.userInfo[ 0 ].dreamEndtime
		// 			let nowTimeStamp = new Date().getTime()
		// 			if ( dreamEndTime && dreamEndTime !== ' ' && Number( dreamEndTime ) < Number( nowTimeStamp ) ) {
		// 				store.dispatch( 'setUserDude', true )
		// 			} else {
		// 				store.dispatch( 'setUserDude', false )
		// 			}
		// 			let siteConfig = await getSiteConfig()
		// 			store.dispatch( 'setSiteConfig', siteConfig )
		// 			resolve()
		// 		}
		// 	}
		// } );
	},
	setRouterQuery( { commit }, query ) {
		commit( 'SET_ROUTER_QUERY', query )
	},
	setArticleList( { commit }, articleList ) {
		commit( 'SET_ARTICLE_LIST', articleList )
	},
	setArtIndex( { commit }, articleIndex ) {
		commit( 'SET_ART_INDEX', articleIndex )
	},
	setFooterShow( { commit }, footerShow ) {
		commit( 'SET_FOOTER_SHOW', footerShow )
	},
	setUserInfo( { commit }, userInfo ) {
		commit( 'SET_USER_INFO', userInfo )
	},
	getWechatSignature( { commit }, url ) {
		return getWxConfig( url )
	},
	LoginOut: ( { commit } ) => {
		commit( 'LOGIN_OUT', {} )
	},
	setBrandInfo( { commit }, brandInfo ) {
		commit( 'SET_BRAND_INFO', brandInfo )
	},
	setUserMenu( { commit }, userMenu ) {
		commit( 'SET_USER_MENU', userMenu )
	},
	setAuthUser( { commit }, authUser ) {
		commit( 'SET_AUTH_USER', authUser )
	},
	setLoginState( { commit }, isLogin ) {
		commit( 'SET_LOGIN_STATE', isLogin )
	},
	setOldImgList( { commit }, oldImgList ) {
		commit( 'SET_OLD_IMG_LIST', oldImgList )
	},
	setMusicAlbumLocalImages( { commit }, images ) {
		commit( 'SET_MUSIC_ALBUM_LOCAL_IMAGES', images )
	},
	setMusicAlbumTitleText( { commit }, titleText ) {
		commit( 'SET_MUSIC_ALBUM_TITLE_TEXT', titleText )
	},
	setMusicAlbumMusic( { commit }, music ) {
		commit( 'SET_MUSIC_ALBUM_Music', music )
	},
	setMusicAlbumPreview( { commit }, preview ) {
		commit( 'SET_MUSIC_ALBUM_PREVIEW', preview )
	},
	setMusicAlbumType( { commit }, type ) {
		commit( 'SET_MUSIC_ALBUM_TYPE', type )
	},
	setLocalImagesSource( { commit }, images ) {
		commit( 'SET_LOCAL_IMAGE', images )
	},
	setUserDude( { commit }, dude ) {
		commit( 'SET_USER_DUDE', dude )
	},
	setSiteConfig( { commit }, siteConfig ) {
		commit( 'SET_SITE_CONFIG', siteConfig )
	},
	setPrevierTitle( { commit }, previewTitle ) {
		commit( 'SET_PREVIEW_TITLE', previewTitle )
	}
}
