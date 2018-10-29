import http from './http'
import axios from 'axios'
//用户信息
export const fecthUserInfo = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getUserInfo', {
        params: data
      } )
      .then( res => {
        resolve( res.data.data )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//修改用户信息
export const change = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/change', data )
      .then( res => {
        //    if(res.data.code = 2000) {
        resolve( res.data )
        //    } else {
        //      let error = {code: res.data.code, msg: res.data.msg}
        //let error = new Error()
        //error.msg = res.data.msg
        //      error.code = res.data.code * 1
        //reject(error)
        //      resolve(res.data)
        //    }
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}
//v币转送列表
export const vbzsList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/vbzsList', {
        params: data
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        let error = { code: res.code, msg: e }
        reject( error )
      } )
  } )
}
//用户实名信息
export const realNameInfo = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getAuthenticateInfo', {
        params: data
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}
//保存用户实名信息
export const userSmrz = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/userSmrz', data )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//v币转送
export const vbzsns = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/vbzsns', data )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}
//获取意向客户
export const lytcOrder = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/lytcOrder', {
        params: data
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}
//获取我的团队
export const getfriend = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getfriend', {
        params: data
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//获取编辑用户信息音乐列表
export const getUserMusicList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getfriend', {
        params: data
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}
// 用户登录;
export const userLogin = ( data ) => {
  return http.post( '/login', data );
}
// 用户退出登录;
export const userLoginOut = () => {
  return http.post( '/loginOut' )
}
//export const getfriend = (data) => {
//return http.get( '/getfriend' ,{params: data})
//}
export const register = ( data ) => {
  return http.post( '/register', data )
}
//名片列表
export const cardTemplateListz = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/cardTemplateListz', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//充值
export const orderinfo = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/orderinfo', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//充值列表
export const getUserVbczList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getUserVbczList', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//修改用户密码
export const changePassword = ( data ) => {
  return http.post( 'changePassword', data )
}
//提现列表
export const usersqtxjl = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/usersqtxjl', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//用户提现
export const sqtx = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/sqtx', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
// 获取新微信绑定信息;
export const getwxbdinfosns = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getwxbdinfosns', {
        params: {
          dreamUserid: data
        }
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}
// 获取用户绑定信息;
export const getwxbdinfos = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getwxbdinfos', {
        params: {
          dreamUserid: data
        }
      } )
      .then( res => {
        if ( res.data.code == 2000 ) {
          resolve( res.data.data )
        } else {
          reject( res )
        }
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}



//  恢复默认链接
export const changCardeditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/changCardeditor', { dreamUsername: data } )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//使用帮助
export const helpList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/helpList', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
// 删除微信绑定;
export const delwxbd = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/delwxbd', {
        params: {
          username: data
        }
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}

//品牌列表
export const brandListz = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/brandListz', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//音乐列表
export const seachmusic = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/seachmusic', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
export const setrenewcode = ( dreamUsername ) => {
  return http.get( '/setrenewcode', {
    params: {
      dreamUsername: dreamUsername
    }
  } )
}



export const zimgdel = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    let str = `[`
    for ( let j in data ) {
      let src = data[ j ].split( 'cn/' )[ 1 ]
      if ( src.indexOf( '?' ) != -1 ) {
        src = src.split( '?' )[ 0 ]
      }
      str = str + `{"md5":"${src}"}`
    }
    str = str + `]`
    http.get( '/zimgdel', {
        params: {
          md5: str
        }
      } )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        reject( e )
      } )
  } )
}

// 趣味图片列表 listfunny
export const listfunny = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/listfunny', { dreamUsername: data } )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//默认背景图
export const changBanner = ( data ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/changBanner', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      resolve( e )
    } )
}

//趣味图片 Logo 列表

export const listGj = ( data ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/listGj', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      resolve( e )
    } )
}

//生成趣味图片

export const Thum = ( data ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/Thum', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      resolve( e )
    } )
}
/**
 * 通过微信openid获取用户信息
 * @param  {[type]} openid [description]
 * @return {[type]}        [description]
 */
export const newgetwxuser = ( openid ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/newgetwxuser', { params: { openid: openid } } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

/**
 * 微信绑定
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const newbd = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/newbd', data )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

/**
 * 音乐相册
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const getUserablumedit = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getUserablumedit', data )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
      } )
  } )
}


//添加趣味图片

export const addfunny = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/addfunny', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//删除趣味图片

export const delfunny = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/delfunny', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
/**
 * 音乐相册列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const getUserablumLists = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getUserablumLists', { params: data } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
      } )
  } )
}
/**
 * 删除音乐相册
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export const delUserablume = ( id ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/delUserablume', { params: { id: id } } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
      } )
  } )
}
// dellytc 删除预定
export const dellytc = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/dellytc', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

// 收藏列表
export const getuserartcollerList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getuserartcollerList', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//删除收藏
export const artcollectordel = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/artcollectordel', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//打卡

export const editorpunchcard = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/editorpunchcard', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//打卡里的点赞

export const punchcardlike = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/punchcardlike', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//打卡列表
export const punchcardlist = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/punchcardlist', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//单条打卡信息
export const getpunchacard = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getpunchacard', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//单条打卡信息
export const getpunchacardone = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getpunchacardone', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//单条打卡信息
export const sendwxmsg = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/sendwxmsg', data )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//壁纸微信二维码
//export const wxQrcode = (  ) => {
//return new Promise( ( resolve, reject ) => {
//  http.post( '/wxQrcode' )
//    .then( res => {
//      resolve( res )
//    } )
//    .catch( e => {
//      resolve( e )
//    } )
//} )
//}
export const wxQrcode = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/wxQrcode' , {
        params: data
      })
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        resolve(e)
      } )
  } )
}
