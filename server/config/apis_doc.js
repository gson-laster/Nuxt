/**
 * api接口合集
 * @type {Object}
 */
const hostUrl = 'http://xzg168.weix360.cn'

// ===========用户相关==========//
export const users = {
  // 用户注册,登录,改密,校验;
  userLogin: hostUrl + '/user_login', //用户登录
  userRegister: hostUrl + '/reg',//用户注册
  userCheck: hostUrl + '/checkuser',//用户校验,是否已经注册过了
  userPasswordChange: hostUrl + '/pwdcg', //用户修改密码
  userInfoModify: hostUrl + '/changu', //修改用户信息(dreamUsername必须);
  userLoginOut: hostUrl + '/userLoginout', //用户退出;
  // 用户中心相关接口
  getUserArtBannerList: hostUrl + '/getuserartbannerList',
  userInfo: hostUrl + '/getuser',  //获取用户信息(dreamUsername=13970704506)
  getWXBindInfo: hostUrl + '/wxlogin/getwxbdinfosns', //获取单个用户微信绑定信息;
  getVBGiftReconds: hostUrl + '/vbzsList',         //获取VB转送记录(dreamUserid,index)
  userVBPresent: hostUrl + '/vbzsns',               //VB转送给其他用户;
  getMyFriends: hostUrl + '/getfriend', //获取我的团队信息(dreamTjrid);
  getTargetClient: hostUrl + '/lytcOrder', //获取意向客户;

  getAuthenticateInfo: hostUrl + '/getSmrzInfo',//获取实名认证信息(dreamSmrzuserid);
   // 实名认证;
  applyAuthenticatition: hostUrl + '/userSmrz',  //申请实名认证;


  // 申请代理和购买名额接口;
  userBuyOpenCodeNumber: hostUrl + '/addPurpose', //购买名额;
  userJoinAgent: hostUrl + '/addPurpose/editorPurpose', //用户申请代理报名;



  // 用户中心相册列表,趣味图片,帮助;
  userAddMusicAlbum: hostUrl + '/getUserablumedit', //添加音乐相册;
  getMusicAlbum: hostUrl + '/getUserablumLists?username=18720918730&index=1&pageSize=15', //获取相册列表;
  getFunnyPic: hostUrl + '/listfunny?dreamUsername=18720918730',//获取趣味图片列表;
  userAddFunnyPic: hostUrl + '/addfunny?dreamUsername=18720918730&dreamImgurl=UploadFiles%2F907420354.png&dreamWtoh=1.8482142857142858',//添加趣味图片
  getHelpList: hostUrl + '/helpList', //获取帮助列表;
  getHelpDetail: hostUrl + '/helpOnez', //获取帮助详情;

  // 删除图片;
  userDeleteImg: hostUrl + '/delfile?URL=UploadFiles%5C1491746774265.jpg',//用户删除服务器图片;
  userDeleteSQLImg: hostUrl + '/delsqlfile',//用户删除数据库图片信息;


  // 会员操作相关;
  userRenew: hostUrl + '/configinfo',//会员续费;

  // 用户上传头像;
  imgUpload: hostUrl + '/imgUpload', //用户上传头像;

  // 用户修改数据库某项内容;
  change: hostUrl + '/changu'
}


// =============文章相关=============//
export const articles = {

  // 微信分享页最新文章和推荐文章
  getWXShareNewestList: hostUrl + '/ArtclesList',//微信分享页最新文章;
  getWXShareRecommend: hostUrl + '/ArtclesList?pageSize=12&index=2&dreamClassid=128&dreamHits=1&dreamBrandid=34',//微信分享页推荐文章列表;

  // 品牌导航文章分类列表;
  getBrandNavArticleClassList: hostUrl + '/BrandNewsList',//品牌导航分类文章;


  // 文章详情;
  getArticleOneDetail: hostUrl + '/articlesone',//获取文章详情;
  searchOneArticle: hostUrl + '/BrandNewsone',//查询单篇文章信息;
  

}

//============= 产品相关===============//
export const product = {

  getProductClass: hostUrl + '/brandclasslist', //获取产品页产品分类;
  getProductClassList: hostUrl + '/brandclassone?id=399?id=1',//获取产品页产品分类下单个分类列表;
  getProductByBrand: hostUrl + '/seachBrandProduct3?dreamBrandid=34&dreamClassid=399&index=1&dreamTitle=&pageSize=8',//获取品牌产品;
  getProductDetail: hostUrl + '/scbrandproductone',//获取单个产品信息;
  getProductSameClass: hostUrl + '/brandProductList',//获取同类产品;
  getProductOrderList: hostUrl + '/brandorderlist',//获取订单列表;
  addProductOrder: hostUrl + '/addbrandorder' //添加品牌订单;
}

// ==============名片相关============//
export const card = {
  getCardMusic: hostUrl + '/seachmusiconez?id=', //查询名片页音乐;
  getCardTemplate: hostUrl + '/getCradTemplates?id=6', //查询名片页模板信息;
  getCardTemplateList: hostUrl + '/cradTemplateListz',//获取名片模板列表;
}

// ================旅游相关=============//
export const travel = {
  // 旅游首页;
  getWVArticleList: hostUrl + '/ArtclesList', //获取旅游文章列表;
  getWVArticleBanner: hostUrl + '/ibannerlist',//旅游文章轮播图;
  getWVArticleNav: hostUrl + '/classlist',//获取文章导航;
  getWVArticleMiddleNav: hostUrl + '/indextjlist',//获取旅游中部导航;
  getWVArticleDetail: hostUrl + '/articlesone',//获取旅游单篇文章;

  // 旅行页;
  getWVTravelClass: hostUrl + '/lytczt',   //获取旅行主题分类;
  getWVTravelList: hostUrl + '/lytcopz?index=1&pageSize=10', //获取旅行列表;
  getWVTravelDetail: hostUrl + '/lytcone', //获取旅行详情;

}

// ================品牌相关===============;
export const brand = {
  getBrandClass: hostUrl + '/brandnewsclasslist',//获取品牌首页分类;
  getBrandArticle: hostUrl + '/BrandNewsList',//获取品牌文章列表;
  getBrandOne: hostUrl + '/brandone?id=34',//获取品牌信息;
  getBrandRecommendNav: hostUrl + '/ibrandindetj', //获取品牌首页推荐导航;

  // 品牌微信分享页;
  getWXShareNav: hostUrl + '/indextjlist?dreamIsnew=1',

  // 获取所有品牌列表;
  getBrandList: hostUrl + '/brandListz'

}
// ==================轮播图相关===============;
export const banner = {
  // 非WV品牌首页、名片、产品轮播图;
  getBrandBanner: hostUrl + '/scbrandbanner', //获取品牌轮播图;

  // WV品牌首页、名片轮播图;
  getWVBanner: hostUrl + '/ibannerlist', //获取名片页轮播图;
  // WV品牌旅游轮播图;
  getWVTravelBanner: hostUrl + '/secListBanners?dreamElite=1', //获取旅行轮播图;
  // WV品牌VB商城轮播图;
  getVBMallBanner:hostUrl+'/getvmallBanner', //获取VB商城轮播图


}

// ===============微信相关==========//;
export const weChat = {
  //获取微信配置;
  getWXConfig: '/getwxconfig/?url=' + hostUrl,
}


// ===========音乐相关==============//
export const music = {
  // 编辑用户信息音乐列表;
  getUserMusicList: hostUrl + '/seachmusic',
}


//=============VB相关============//;
export const VB = {
  // 获取vb充值列表;
  getUserVBczList: hostUrl + '/getUserVbczList',
  // vb充值信息调用;
  getVBorderInfo:hostUrl+'/orderinfo',

  // vb提现列表;
  getVBWithdrawList: hostUrl + '/usersqtxjl',

  //VB转送列表;
  getVBvbzsList: hostUrl + '/vbzsList',
  //VB转送;
  VBSendTo: hostUrl + '/vbzsns?dreamPrice=1&dreamUseridxx=13970704506&dreamVcurrency=100',
}
//==============配置相关=============//;
export const configinfo = {
  // 后台设置配置;
  getConfigInfo: hostUrl + '/configinfo',

  // 网站配置;
  getWebsiteInfo:hostUrl+'/websitinfo',
}
