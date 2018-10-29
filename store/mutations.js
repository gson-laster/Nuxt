export default {
	SET_ROUTER_QUERY: ( state, queryData ) => {
		let queryObj = {}
		for ( let k in queryData ) {
			if ( k == 'aid' || k == 'cid' ) continue
			queryObj[ k ] = queryData[ k ]
		}
		state.routerQuery = queryObj
	},
	//编辑文章的各块
	SET_ARTICLE_LIST( state, articleList ) {
		state.articleList = articleList
	},
	//编辑文章当前块
	SET_ART_INDEX( state, articleIndex ) {
		state.articleIndex = articleIndex
	},
	SET_FOOTER_SHOW( state, footerShow ) {
		state.footerShow = footerShow
	},
	SET_USER_INFO( state, userInfo ) {
		if ( typeof ( userInfo ) == 'Object' && userInfo.update ) state.userInfo = Object.assign( state.userInfo, userInfo )
		else state.userInfo = userInfo
	},
	LOGIN_OUT: ( state, userInfo ) => {
		state.userInfo = userInfo
		state.brandInfo = {}
		state.userMenu = {}
		state.isLogin = false
	},
	SET_BRAND_INFO( state, brandInfo ) {
		state.brandInfo = brandInfo
	},
	SET_USER_MENU( state, userMenu ) {
		state.userMenu = userMenu
	},
	SET_LOGIN_STATE( state, isLogin ) {
		state.isLogin = isLogin
	},
	SET_OLD_IMG_LIST( state, oldImgList ) {
		state.oldImgList = oldImgList
	},
	SET_AUTH_USER( state, authUser ) {
		state.authUser = authUser
	},
	SET_URL( state, url ) {
		state.url = url
	},
	SET_MUSIC_ALBUM_LOCAL_IMAGES( state, images ) {
		state.musicAlbum.localImages = images
	},
	SET_MUSIC_ALBUM_TITLE_TEXT( state, text ) {
		state.musicAlbum.titleText = text
	},
	SET_MUSIC_ALBUM_Music( state, music ) {
		state.musicAlbum.musicData = music
	},
	SET_MUSIC_ALBUM_PREVIEW( state, preview ) {
		state.musicAlbum.isPreview = preview
	},
	SET_MUSIC_ALBUM_TYPE( state, type ) {
		state.musicAlbum.type = type
	},
	SET_LOCAL_IMAGE( state, images ) {
		state.musicAlbum.localImagesSource = images
	},
	SET_USER_DUDE( state, isDude ) {
		state.isDude = isDude
	},
	SET_SITE_CONFIG( state, siteConfig ) {
		state.siteConfig = siteConfig
	},
	SET_PREVIEW_TITLE( state, previewTitle ) {
		state.previewTitle = previewTitle
	},
	SET_EXPIRED_STATUS( state, status ) {
		state.expiredStatus = status
	}
}
