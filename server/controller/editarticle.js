import {
  ajaxReturn,
  wvHttpRequest,
  getParams,
  setFields,
}
from '../utils'
import editarticle from '../config/apis/editarticle'
//一级分类
export const getClassifyList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.classifyList, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//二级分类
export const getartclassList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.getartclassList, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//添加分类
export const artclasseditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.artclasseditor, data, 'POST' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//删除分类
export const delartclass = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.delartclass, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//获取文章列表
export const seachuserarticle = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.seachuserarticle, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//删除文章
export const delUserArticle = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.delUserArticle, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//编辑文章
export const userarticleeditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.userarticleeditor, data, 'post' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//获取会员文章数量及粉丝数量myuserarticleacount
export const myuserarticleacount = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.myuserarticleacount, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//获取单篇文章
export const seachuserarticleone = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.seachuserarticleone, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//关注作者
export const Concernditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.Concernditor, data, 'GET' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//打赏
export const orderinforeward = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.orderinforeward, data, 'post' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 2000, 'success', '', e ) ) : resolve( e )
      } )
  } )
}
//serverId 替换
export const wxupload = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.wxupload, data, 'post' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}
//点赞
export const addLikes = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.addLikes, data, 'post' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}

//文章用户中心背景

export const userpiceditor = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.userpiceditor, data, 'post' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}

/**
 * 结合微信支付的打赏接口
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const orderinforewardwx = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.orderinforewardwx, params, 'post', {}, false )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        console.log( e );
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}

//关注类表

export const getConcernList = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.getConcernList, params, 'post', {},false )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        console.log( e );
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}

//删除关注

export const delConcern = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.delConcern, params, 'post', {}, false )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}

//粉丝列表

export const getfans = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( editarticle.getfans, params, 'post', {}, false )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
      } )
  } )
}