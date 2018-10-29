export default {
  get_router_query: state => {
    if ( state.routerQuery.aid ) {
      delete state.routerQuery.aid
    }
    if ( state.routerQuery.cid ) {
      delete state.routerQuery.cid
    }
    return state.routerQuery
  },
  //文章编辑所有块的集合
  getArticleList: state => state.articleList,
  //当前激活文章编辑的块
  getArticleIndex: state => state.articleIndex,
  getFooterShow: state => state.footerShow,
  getUserInfo: state => state.userInfo,
  getBrandInfo: state => state.brandInfo,
  getUserMenu: state => state.userMenu,
  getLoginState: state => state.isLogin,
  getUserMenu: state => state.userMenu,
  getOldImgList: state => state.oldImgList,
  getAuthUser: state => state.authUser,
  getMusicAblum: state => state.musicAlbum,
  getMusicAblumLocalImage: state => state.musicAlbum.localImages,
  getMusicAblumTitleText: state => state.musicAlbum.titleText,
  getMusicAblumMusic: state => state.musicAlbum.musicData,
  getUserDude: state => state.isDude,
  getSiteConfig:state => state.siteConfig,
  getPreviewTitle:state => state.previewTitle,
}
