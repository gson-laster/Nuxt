import http from './http'
//  獲取一级分类
export const getClassify = ( dreamUserid, dreamClassid = 0, index = 1, pageSize = 1000 ) => {
  let data = { dreamUserid: dreamUserid, dreamClassid: dreamClassid, index: index, pageSize: pageSize };
  return new Promise( ( resolve, reject ) => {
      http.post( '/getClassifyList', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}

//二级文章分类
export const getartclassList = ( dreamUserid, dreamClassid = 0, index = 1, pageSize = 1000 ) => {
  let data = { dreamUserid: dreamUserid, dreamClassid: dreamClassid, index: index, pageSize: pageSize };
  return new Promise( ( resolve, reject ) => {
      http.post( '/getartclassList', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//添加二级分类
export const artclasseditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/artclasseditor', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//删除二级分类
export const delartclass = ( id ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/delartclass', { id: id } )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//获取文章列表tyState = 0, index = 1, pageSize = 10000
export const seachuserarticle = ( json ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/seachuserarticle', json )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//删除文章
export const delUserArticle = ( id ) => {
  let data = { id: id }
  return new Promise( ( resolve, reject ) => {
      http.post( '/delUserArticle', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//编辑文章
export const userarticleeditor = ( json ) => {
  return new Promise( ( resolve, reject ) => {
      http.get( '/fetchAccessToken' )
        .then( res => {
          json.access_token = res.data.access_token
          http.post( '/userarticleeditor', json )
            .then( res => {
              resolve( res )
            } )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//获取会员文章数量及粉丝数量myuserarticleacount
export const myuserarticleacount = ( dreamUsername ) => {
  let data = { dreamUsername: dreamUsername }
  return new Promise( ( resolve, reject ) => {
      http.post( '/myuserarticleacount', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}

//单篇文章详情
export const seachuserarticleone = ( data ) => {
  data.seachuserarticleone = data.id
  return new Promise( ( resolve, reject ) => {
      http.post( '/seachuserarticleone', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//关注作者
export const Concernditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/Concernditor', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//打赏
export const orderinforeward = ( ...res ) => {
  let data = { dreamUsername: res[ 0 ], dreamMoney: res[ 1 ], dreamTousername: res[ 2 ], dreamArticleid: res[ 3 ] }
  return new Promise( ( resolve, reject ) => {
      http.post( '/orderinforeward', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//点赞
export const addLikes = ( ...res ) => {
  let data = { dreamUserid: res[ 1 ], dreamArtid: res[ 0 ] }
  return new Promise( ( resolve, reject ) => {
      http.post( '/addLikes', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}
//微信图片上传
export const wxupload = ( serverId ) => {

  return new Promise( ( resolve, reject ) => {
      http.get( '/fetchAccessToken' )
        .then( res => {
          let access_token = res.data.access_token
          serverId = serverId + `&access_token=${access_token}`
          http.post( '/wxupload', serverId )
            .then( res => {
              resolve( res )
            } )
        } )
    } )
    .catch( e => {
      reject( e )
    } )
}

//获取access_token

export const fetchAccessToken = () => {
  return http.get( '/fetchAccessToken' )
    .then( res => {
      console.error( res )
    } )
}
//会员中心修改背景

export const userpiceditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
      http.post( '/userpiceditor', data )
        .then( res => {
          resolve( res )
        } )
    } )
    .catch( e => {
      resolve( e )
    } )
}

// 微信打赏
export const orderinforewardwx = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/orderinforewardwx', params )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//粉丝列表

export const getConcernList = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getConcernList', params )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}

//删除粉丝

export const delConcern = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/delConcern', params )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}
//粉丝列表
export const getfans = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/getfans', params )
      .then( res => {
        resolve( res )
      } )
      .catch( e => {
        resolve( e )
      } )
  } )
}