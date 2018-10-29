import appconf from "~/app.config";
export default {
	routerQuery: {},
	articleList: {
		tyContent: [],
		tyTitle: '',
		tyTitilebg: '',
		tyMusic: '',
		ServerId: []
	}, //美文编辑所有内容的集合
	articleIndex: -1, //美文编辑点击的添加按钮索引
	footerShow: true, //底部导航栏的显隐
	userInfo: null, //用戶信息
	brandInfo: null, //用户品牌信息
	userMenu: appconf.card_nav, //用户菜单信息,
	isLogin: false, //是否登录状态
	oldImgList: [], //美文编辑历史图片上传
	authUser: null,
	url: null,
	musicAlbum: {
		localImages: [],
		titleText: '',
		musicData: null,
		isPreview: false,
		type: 1,
		localImagesSource: []
	},
	isDude: false,
	siteConfig: {},
	previewTitle: '',
	expiredStatus: false
}
