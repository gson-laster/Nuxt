import http from './http'
// 带整理，要作废
export const getArticle = ( flag, index, brand = 0, pageSize = 10 ) => {
  let data = { flag: flag, index: index, dreamBrandid: brand, pageSize: pageSize }
  return new Promise( ( resolve, reject ) => {
    http.post( '/getArticle', data )
      .then( res => {
        if ( res.data.code = 2000 ) {
          resolve( res.data.data )
        } else {
          let error = { code: res.data.code, msg: res.data.msg }
          resolve( error )
        }
      } )
      .catch( e => {
        let error = { code: res.code, msg: e }
        resolve( error )
      } )
  } )
}
// 获取文章列表
export const getArticleList = ( data ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getArticleList', {
        params: data
      } )
      .then( res => {
        // console.log( res );
        if ( res.data.code = 2000 ) {
          resolve( res.data.data )
        } else {
          let error = { code: res.code, msg: res.msg }
          resolve( error )
        }
      } )
      .catch( e => {
        let error = { code: 4000, msg: 'error', data: [] }
        resolve( error )
      } )
  } )
}
export const getArticleById = async( id, brand ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getArticleById', {
        params: {
          id: id,
          brand: brand
        }
      } )
      .then( res => {
        if ( res.data.code = 2000 ) {
          resolve( res.data.data )
        } else {
          let error = { code: res.data.code, msg: res.data.msg }
          resolve( error )
        }
      } )
      .catch( e => {
        console.log( e );
        let error = { code: res.code, msg: e }
        resolve( error )
      } )
  } )
}
export const getNavList = async( brand, params = {} ) => {
  return new Promise( ( resolve, reject ) => {
    params.brand = brand
    http.get( '/getNavList', {
        params: params
      } )
      .then( res => {
        if ( res.data.code = 2000 ) {
          resolve( res.data.data )
        } else {
          let error = { code: res.data.code, msg: res.data.msg }
          resolve( error )
        }
      } )
      .catch( e => {
        console.log( e );
        let error = { code: res.code, msg: e }
        resolve( error )
      } )
  } )
}

// 微信页面导航;
export const indextjlist = async( param ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/indextjlist', {
        params: {
          dreamIsnew: param
        }
      } )
      .then( res => {
        if ( res.data.code == 2000 ) {
          resolve( res.data.data )
        } else {
          let error = { code: res.data.code, msg: res.data.msg }
          resolve( error )
        }
      } )
      .catch( e => {
        let error = { code: res.code, msg: res.data.msg }
      } )
  } )
}

/**
 * 添加转载文章
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const editorCollview = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/editorCollview', params )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => { console.log( e ); } )
  } )
}
/**
 * 获取转载文章
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getCollviewList = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getCollviewList', { params: params } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
      } )
  } )
}
/**
 * 删除转载
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export const delCollview = ( id ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/delCollview', { params: { id: id } } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
      } )
  } )
}
