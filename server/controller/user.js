/**
 * 用户接口组织
 */
import userInfo from '../config/apis/userInfo'
import {
	ajaxReturn,
	wvHttpRequest,
	setFields,
	wvException
} from '../utils'
/**
 * 获取用户文章轮播图
 */
export const getUserArtBannerList = async () => {
	// get
  let result = await wvHttpRequest(users.getUserArtBannerList)
	// return
  return ajaxReturn(2000, 'success', '', result)
}
/**
 * 获取单个用户的信息
 * @param  {[type]} dreamUsername [用户标识]
 * @param  {[type]} type          [默认去用户信息, wx 取微信绑定信息]
 * @return {[type]}               [description]
 */
export const getUserInfo = (dreamUsername, type) => {
  if (!dreamUsername || dreamUsername == '') {
    return ajaxReturn(4000, 'error', 'user id exits')
  }
	// 组合用户信息和微信绑定信息
  return new Promise(async (resolve, reject) => {
		// 用户信息
		// console.log( dreamUsername );
    let result = {},
      userWechatInfo = {}
		// 获取远程数据
    wvHttpRequest(userInfo.getUser, {
      dreamUsername: dreamUsername
    }, 'GET')
			.then(userInfoResult => {
				// 返回前端数据
  let userInfoResultEnd = setFields([ userInfoResult ], [ 'id', 'dreamBanner', 'dreamBranddefault', 'dreamFullname', 'dreamAddress', 'dreamAgent', 'dreamCardimg', 'dreamCompanyname', 'dreamCardtemplate', 'dreamContent', 'dreamEndtime', 'dreamEwm', 'dreamFullname', 'dreamImg', 'dreamIsok', 'dreamIsoktime', 'dreamLastlogintime', 'dreamLastloginip', 'dreamLogintimes', 'dreamMobile', 'dreamMobile2', 'dreamMusic', 'dreamPhotourl', 'dreamProurl', 'dreamQq', 'dreamServicename', 'dreamTjrid', 'dreamUpdatetime', 'dreamUsername', 'dreamVcurrency', 'dreamVmallid', 'dreamWeburl', 'dreamWx', 'dreamYxtgurl', 'dreamShadd1', 'dreamShadd2', 'dreamShadd3', 'dreamShcode', 'dreamShname', 'dreamShphone', 'dreamEmail', 'dreamFkewm', 'dreamIsnewcard' ])
				// userWechatInfo = await wvHttpRequest( userInfo.getwxbdinfosns, {
				//   dreamUserid: dreamUsername
				// }, 'GET' )
				// 组合数据
  result = {
    userInfo: userInfoResultEnd
					// userWechatInfo: userWechatInfo
  }
  resolve(ajaxReturn(2000, 'success', '', result))
})
			.catch(e => {
				// console.log( e );
  resolve(ajaxReturn(4000, 'fail', '', []))
})
  })
}
// 用户登录;
export const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.user_login, {
      dreamUsername: username,
      dreamPassword: password
    })
			.then(res => {
				// 过滤字段
				//    let userInfoResultEnd = setFields( [ res ], [
				//      'dreamAddress', 'dreamAgent', 'dreamCardimg', 'dreamCompanyname', 'dreamCardtemplate', 'dreamContent', 'dreamEndtime', 'dreamEwm', 'dreamFullname', 'dreamImg', 'dreamIsok', 'dreamIsoktime', 'dreamLastlogintime', 'dreamLastloginip', 'dreamLogintimes', 'dreamMobile', 'dreamMobile2', 'dreamMusic', 'dreamPhotourl', 'dreamProurl', 'dreamQq', 'dreamServicename', 'dreamTjrid', 'dreamUpdatetime', 'dreamUsername', 'dreamVcurrency', 'dreamVmallid', 'dreamWeburl', 'dreamWx', 'dreamYxtgurl'
				//    ] )
				//    console.log(userInfoResultEnd)
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(error => {
  resolve(ajaxReturn(4000, 'error', '', error.data))
})
  })
}
// 用户退出登录;
export const loginOut = async () => {
  let result = await wvHttpRequest(userInfo.userLoginout)
  return ajaxReturn(2000, 'success', '', result)
}
// 修改数据库某项或者多项的值;
export const change = async (data) => {
  let result = await wvHttpRequest(userInfo.change, data, 'post')
  return ajaxReturn(2000, 'success', '', result)
}
// 用户进行实名认证;
export const userSmrz = async (data) => {
  let {
		dreamSmrzname,
		dreamSmrzyhkh,
		dreamSmrzkhyh,
		dreamSmrzphone
	} = data
  if (!dreamSmrzname || dreamSmrzname.length <= 0 || !dreamSmrzyhkh || !dreamSmrzkhyh || !dreamSmrzphone) {
    return ajaxReturn(4000, '参数错误', '', [])
  }
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.userSmrz, data)
			.then(res => {
  console.log(res)
  resolve(ajaxReturn(2000, 'success', '', result))
})
			.catch(e => {
  console.log(e)
  resolve(ajaxReturn(4000, 'fail', '', []))
})
  })
}
// 获取用户实名认证信息;
export const getAuthenticateInfo = async (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getSmrzInfo, data, 'GET', {}, false)
			.then(response => {
  resolve(ajaxReturn(2000, 'success', '', response))
})
			.catch(e => {
  resolve(e)
})
  })
}
/**
 * 用户vb转送列表
 * @param  {[type]} params [参数： dreamUserid 必须， 分页相关：index， pagesSize]
 * @return {[type]}        [description]
 */
export const vbzsList = (params) => {
  let {
		dreamUserid
	} = params
  if (!dreamUserid) return ajaxReturn(4000, 'params error: dreamUserid exits')
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.vbzsList, params, 'get')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res.vbzsList))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'error', '', e))
})
  })
}
/**
 * 用户vb转送
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const vbzsns = (params) => {
  let {
		dreamPrice,
		dreamUseridxx,
		id,
		dreamUsername
	} = params
  if (!dreamUseridxx || dreamUseridxx == '' || !dreamPrice) {
    return ajaxReturn(4000, 'params error: dreamUseridxx or dreamPrice exits')
  }
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.vbzsns, {
      dreamPrice: dreamPrice,
      dreamUseridxx: dreamUseridxx,
      dreamUsername: dreamUsername,
      id: id
    }, 'get', {}, false)
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'error', '', e))
})
  })
}
/**
 * 获取团队成员
 * @param  {[type]} params [参数集合： dreamTjrid（必须）]
 * @return {[type]}        [description]
 */
export const getfriend = (params) => {
  let {
		dreamTjrid
	} = params
  if (!dreamTjrid || dreamTjrid == '') {
    return ajaxReturn(4000, 'param error: dreamTjrid exits')
  }
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getfriend, {
      dreamTjrid: dreamTjrid
    }, 'get')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'error', '', e || []))
})
  })
}
/**
 * 获取意向客户
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const lytcOrder = (params) => {
  let {
		dreamTjid
	} = params
  if (!dreamTjid || dreamTjid == '') {
    return ajaxReturn(4000, 'params error: dreamTjid exits')
  }
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.lytcOrder, params, 'get')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'error', '', e))
})
  })
}
/**
 * 注册
 * @param username
 * @param password
 * @param password_confirm
 * @param dreamTjrid
 * @return {[type]} [description]
 */
export const register = async (params) => {
  let {
		username,
		password,
		password_confirm,
		dreamTjrid
	} = params
  if (!username || username == '' || !password || password == '' || !password_confirm || password_confirm == '') {
    return ajaxReturn(4000, 'username or password error')
  }
  if (password != password_confirm) return ajaxReturn(4000, '两次密码不一致')
  if (!dreamTjrid || dreamTjrid == '') {
    return ajaxReturn(4000, '您还没有推荐人哦')
  }
  let checkUser = await wvHttpRequest(userInfo.checkuser, {
    dreamUsername: username
  }, 'get', {}, false) // code:20001;没有注册checkUser的值为null,
  if (checkUser !== null && checkUser.code == 40001) {
    return ajaxReturn(4000, checkUser.data)
  }
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.reg, {
      dreamUsername: username,
      dreamPassword: password,
      dreamTjrid: dreamTjrid
    }, 'get', {}, false)
			.then(response => {
  resolve(ajaxReturn(2000, 'success', '', response))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'fail:' + e.data))
})
  })
}
// 修改密码
export const changePassword = async (parmas) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.pwdcg, parmas, 'get')
			.then(response => {
  resolve(ajaxReturn(2000, 'success', '', response))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'fail:' + e))
})
  })
}
/// cardTemplateListz名片模板列表
export const cardTemplateListz = async (parmas) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.cardTemplateListz, parmas, 'get')
			.then(response => {
  resolve(ajaxReturn(2000, 'success', '', response))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'fail:' + e))
})
  })
}
// 充值
export const orderinfo = async (parmas) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.orderinfo, parmas, 'post')
			.then(response => {
  resolve(ajaxReturn(2000, 'success', '', response))
})
			.catch(e => {
  resolve(ajaxReturn(4000, 'fail:' + e))
})
  })
}
//  充值列表
export const getUserVbczList = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getUserVbczList, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}
// 提现  列表
export const usersqtxjl = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.usersqtxjl, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}
// 用户提现
export const sqtx = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.sqtx, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(e)
})
  })
}
// 获取新用户绑定信息;
export const getwxbdinfosns = (data) => {
  let {
		dreamUserid
	} = data
  if (!dreamUserid || dreamUserid.length <= 0) {
    return ajaxReturn(4000, 'fail', '', 'params:dreamUserid  not exits')
  } else {
    return new Promise((resolve, reject) => {
      wvHttpRequest(userInfo.getwxbdinfosns, data, 'GET', {}, false)
				.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
				.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail')) : reject(e)
})
    })
  }
}
// 获取用户绑定信息;
export const getwxbdinfos = (data) => {
  let {
		dreamUserid
	} = data
  if (!dreamUserid || dreamUserid.length <= 0) {
    return ajaxReturn(4000, 'fail', '', 'params:dreamUserid not exits')
  } else {
    return new Promise((resolve, reject) => {
      wvHttpRequest(userInfo.getwxbdinfos, data, 'GET', {}, false)
				.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
				.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail')) : reject(e)
})
    })
  }
}

// 解绑微信;
export const delwxbd = (data) => {
  let {
		username
	} = data
  if (!username) {
    return ajaxReturn(4000, 'fail', '', 'params error')
  } else {
    return new Promise((resolve, reject) => {
      wvHttpRequest(userInfo.delwxbd, data, 'GET')
				.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
				.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail')) : reject(e)
})
    })
  }
}
// 恢复默认链接
export const changCardeditor = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.changCardeditor, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(e)
})
  })
}
// 使用帮助  helpOnez  及使用帮助内容
export const helpList = (data) => {
  let path = userInfo.helpList
  if (data.hasOwnProperty('id')) {
    path = userInfo.helpOnez
  }
  return new Promise((resolve, reject) => {
    wvHttpRequest(path, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(e)
})
  })
}
// 品牌列表
export const brandListz = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.brandListz, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(e)
})
  })
}
// 音乐列表
export const seachmusic = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.seachmusic, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(e)
})
  })
}

// 删除图片

export const zimgdel = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.zimgdel, data, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  resolve(e)
})
  })
}
/**
 * 获取会员续费的信息
 * @param  {[type]} dreamUsername [用户名]
 * @return {[type]}               [description]
 */
export const setrenewcode = (dreamUsername) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.setrenewcode, {
      dreamUsername: dreamUsername
    })
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}

// 趣味图片列表
export const listfunny = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.listfunny, data)
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}

// 默认轮播图
export const changBanner = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.changBanner, data)
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}

// 趣味图片Logo列表

export const listGj = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.listGj, data)
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}

// 生成趣味图片
export const Thum = (data) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.Thum, data)
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', [])) : reject(e)
})
  })
}
/**
 * 通过微信ipenid获取用户信息
 * @param  {[type]} openid [description]
 * @return {[type]}        [description]
 */
export const newgetwxuser = (openid) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.newgetwxuser, {
      dreamOpenid: openid
    }, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  console.log(e)
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

/**
 * 绑定微信
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const newbd = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.newbd, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

// 添加趣味图片

export const addfunny = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.addfunny, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

// 删除趣味图片

export const delfunny = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.delfunny, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

/**
 * 创建音乐相册
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getUserablumedit = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getUserablumedit, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
/**
 * 获取音乐相册
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getUserablumLists = (params) => {
  return new Promise((resolve, reject) => {
    let url = ''
    if (params.id) {
      url = userInfo.getUserablumList
    } else {
      url = userInfo.getUserablumLists
    }
    wvHttpRequest(url, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
/**
 * 删除音乐相册
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export const delUserablume = (id) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.delUserablume, {
      id: id
    }, 'get', {}, false)
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
// 删除预定 dellytc
export const dellytc = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.dellytc, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

// 收藏列表

export const getuserartcollerList = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getuserartcollerList, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

// 删除收藏
export const artcollectordel = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.artcollectordel, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
// 打卡
export const editorpunchcard = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.editorpunchcard, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
// 打卡里的点赞
export const punchcardlike = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.punchcardlike, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
// 打卡列表

export const punchcardlist = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.punchcardlist, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
// 单条打卡信息

export const getpunchacard = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getpunchacard, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}

// 单条打卡信息

export const getpunchacardone = (params) => {
  return new Promise((resolve, reject) => {
    wvHttpRequest(userInfo.getpunchacardone, params, 'post')
			.then(res => {
  resolve(ajaxReturn(2000, 'success', '', res))
})
			.catch(e => {
  e.code ? resolve(ajaxReturn(4000, 'fail', '', e)) : reject(e)
})
  })
}
