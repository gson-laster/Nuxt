/**
 * 应用配置
 * @type {Object}
 */
export default {
	site_url: 'http://wap.wvmp360.com', // 'http://wvmp.weix360.cn',
	index_tab_config: {
		'brand': [ {
			title: '最新文章',
			type: 'newArticleList',
			path: '/newslist',
			query: { dt: 1, flag: '最新文章' }
    }, {
			title: '推荐文章',
			type: 'recommondArticleList',
			path: '/newslist',
			query: { dreamHits: 1, flag: '推荐文章' }
    } ],
		'wv': [ {
			title: '最新',
			type: 'newArticleList',
			path: '/newslist',
			query: {
				dt: 1,
				flag: '最新'
			}
    }, {
			title: '推荐',
			type: 'recommondArticleList',
			path: '/newslist',
			query: {
				dt: 1,
				flag: '最新'
			}
    }, {
			title: '必看',
			type: 'thirdArticleList',
			path: '/newslist',
			query: {
				dt: 1,
				cid: 40,
				flag: '必看'
			}
    }, {
			title: '游记',
			type: 'forthArticleList',
			path: '/newslist',
			query: {
				dt: 1,
				cid: 91,
				flag: '游记'
			}
    }, {
			title: '分享',
			type: 'fivethArticleList',
			path: '/newslist',
			query: {
				dt: 1,
				cid: 127,
				flag: '分享'
			}
    } ]
	},
	index_default_img: {
		wechat_share: require( '~static/img/pageIndex/new_ico_2.jpg' ),
		register: require( '~static/img/pageIndex/new_ico_1.jpg' )
	},
	user_menu: [ {
			title: '会员功能',
			list: [ {
					classname: 'splitBrand img',
					path: '/wusercenter/brand',
					name: '切换品牌'
    }, {
					classname: 'myMoney img',
					path: '/wusercenter/vbmanager',
					name: '我的钱包'
    }, {
					classname: 'IntentionalCustomer img',
					path: '/wusercenter/intentclient',
					name: '意向客户'
    },
//  {
//      classname: 'myTeam img',
//      path: '/team',
//      name: '我的团队'
//  },
				{
					classname: 'inviteFriend img',
					path: '/wusercenter/leaflets',
					name: '邀请好友'
    },
//  {
//      classname: 'contentCommend img',
//      path: '',
//      name: '内容推荐',
//      iswv: ''
//
//  },
				{
					classname: 'goShoping img',
					path: '/vmall',
					name: '值享商城',
					iswv: ''
    }, {
					classname: 'agent img',
					path: '/wusercenter/recruit',
					name: '申请代理'
    },
//  {
//					classname: 'zhuanzai',
//					path: '/wusercenter/reprint',
//					name: '转载文章'
//  },
				{
					classname: 'clocklogo',
					path: '/clock',
					name: '早起打卡'
    }, ]
  },

		{
			title: '推广中心',
			list: [ {
					classname: 'articleEdit img',
					path: '/wusercenter/editarticle/self',
					name: '美文编辑'
    },
//  {
//    classname: 'poster img',
//    path: '',
//    name: '特色海报'
//  },
//      {
//        classname: 'musicAlbum img',
//        //      path: '/musicalbum',
//        path: '',
//        name: '音乐相册'
//  },
//      {
//        classname: 'interestPhoto img',
//        path: '/wusercenter/interestimg',
//        name: '趣味图片'
//  },
				{
					classname: 'protect img',
					path: '/wusercenter/paper',
					name: '手机屏保'
    }, {
					classname: 'card img',
					path: '/nicecard',
					name: '精美名片'
    }
//  {
//        classname: '',
//        path: '',
//        name: ''
//  },
    ]
  },
		{
			title: '代理中心',
			list: [ {
				classname: 'userCode img',
				path: '/wusercenter/createcode',
				name: '使用开通码'
    }, {
				classname: 'realname img',
				path: '/wusercenter/authenticated',
				name: '会员认证'
    }, {
				classname: 'notRealName img',
				path: '/wusercenter/noauthen',
				name: '未认证会员'
    }, {
				classname: 'realCount img',
				path: '/wusercenter/membercount',
				name: '认证统计'
    }, {
				classname: 'aplication img',
				path: '/wusercenter/buycode',
				name: '购买名额'
    }, {
				classname: '',
				path: '',
				name: ''
    }, {
				classname: '',
				path: '',
				name: '',
				isagent: ''
    } ],
			isagent: ''
  },
		{
			title: '系统',
			list: [ {
				classname: 'custom img',
				path: '/wusercenter/inlineservice',
				name: '联系客服'
    }, {
				classname: 'userHelp img',
				path: '/wusercenter/usinghelp',
				name: '使用帮助'
    }, {
				classname: 'weichatBand img',
				path: 'weixin',
				name: '微信绑定'
    }, {
				classname: 'changePassword img',
				path: '/wusercenter/changepassword',
				name: '修改密码'
    } ]
  }
  ],
	// 是否是代理;
	agentDetail: [
		{
			title: '代理中心',
			list: [ {
				classname: 'userCode img',
				path: '/wusercenter/createcode',
				name: '使用开通码'
      }, {
				classname: 'realname img',
				path: '/wusercenter/authenticated',
				name: '会员认证'
      }, {
				classname: 'notRealName img',
				path: '/wusercenter/noauthen',
				name: '未认证会员'
      }, {
				classname: 'realCount img',
				path: '/wusercenter/membercount',
				name: '认证统计'
      }, {
				classname: 'aplication img',
				path: '/wusercenter/buycode',
				name: '购买名额'
      }, {
				classname: '',
				path: '',
				name: ''
      }, {
				classname: '',
				path: '',
				name: ''
      } ]
    }
  ],
	// 名片模板样式;
	cardTemplate_color: [
		{ color: 'blue', name: '海洋蓝', img: require( '~static/img/newcard/blue.jpg' ), dreamCardtemplate: 1 },
		{ color: 'yellow', name: '活力黄', img: require( '~static/img/newcard/yellow.jpg' ), dreamCardtemplate: 3 },
		{ color: 'purple', name: '落日紫', img: require( '~static/img/newcard/purple.jpg' ), dreamCardtemplate: 5 }, { color: 'red', name: '西瓜红', img: require( '~static/img/newcard/red.jpg' ), dreamCardtemplate: 6 },
		{ color: 'pink', name: '桃花粉', img: require( '~static/img/newcard/pink.jpg' ), dreamCardtemplate: 9 },
		{ color: 'green', name: '清新绿', img: require( '~static/img/newcard/green.jpg' ), dreamCardtemplate: 10 }, { color: 'gray', name: '商务灰', img: require( '~static/img/newcard/gray.jpg' ), dreamCardtemplate: 11 },
		{ color: 'brown', name: '海洋蓝', img: require( '~static/img/newcard/brown.jpg' ), dreamCardtemplate: 12 } // 默认或者13
  ],

	// 名片页图标资源,后缀名数组;
	card_icons: [ 'headlines', 'homepage', 'integral', 'interactive', 'like', 'live', 'mail', 'order', 'picture', 'praise', 'service', 'share', 'stealth', 'tasklist', 'video', 'activity', 'addressbook', 'camera', 'collection', 'coupons', 'createtask', 'emoji', 'flag', 'flashlight', 'group' ],
	// 旅游;
	travel_tab: [ { name: '综合' }, { name: '地域' }, { name: '主题' }, { name: '月份' }, { name: '积分' } ],
	preview: {
		search_avatar: require( '~static/img/preview/avatar_icon.jpg' )
	},
	// 用户修改需要的字段;
	params: [ 'dreamQq', 'dreamAddress', 'dreamBanner', 'dreamCompanyname', 'dreamContent', 'dreamEmail', 'dreamFullname', 'dreamImg', 'dreamMobile', 'dreamMobile2', 'dreamServicename', 'dreamEmail' ],
	footer_nav: {
		brand: [ {
			title: '首页',
			path: '/',
			iconClass: 'home'
    }, {
			title: '名片',
			path: '/newcard',
			iconClass: 'card'
    }, {
			title: '产品',
			path: '/product',
			iconClass: 'product'
    }, {
			title: '会员',
			path: '/wusercenter',
			iconClass: 'user'
    } ],
		travel: [ {
			title: '首页',
			path: '/',
			iconClass: 'home'
    }, {
			title: '名片',
			path: '/newcard',
			iconClass: 'card'
    }, {
			title: '旅行',
			path: '/travel',
			iconClass: 'travel'
    }, {
			title: '会员',
			path: '/wusercenter',
			iconClass: 'user'
    } ]
	},
	// 旧名片模板图标;
	old_card_template: {
		wx_icon: require( '~static/img/card/wx.png' ),
		qr_code: require( '~static/img/card/wx_mb5.png' ),
		tel_icon: require( '~static/img/card/tel_mb5.png' )
	},
	book_mark: require( '~static/img/common/book_mark.png' ),
	test: require( '~static/img/test.jpg' )
}
