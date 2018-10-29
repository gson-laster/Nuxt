import product from '../config/apis/product'
import {
  wvHttpRequest,
  ajaxReturn,
  getParams,
  setFields,
  pageData
} from '../utils'
/**
 * 获取产品分类
 * @param  {[type]} brandId [description]
 * @return {[type]}         [description]
 */
export const getProductClassList = ( brandId, cid, type ) => {
  let url, data
  if ( cid ) {
    url = product.scBrandIdListnew
    data = {
      dreamBrandid: brandId,
      dreamClassid: cid
    }
  } else {
    url = product.brandclasslist
    data = {
      dreamBrandid: brandId
    }
  }
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( url, data )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        console.log( e );
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
/**
 * 获取单个品牌的信息
 * @param  {[type]} cid [description]
 * @return {[type]}     [description]
 */
export const getProductClassInfo = ( cid ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( product.brandclassone, {
        id: cid
      }, 'get' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
/**
 * 产品列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getProductList = ( params ) => {
  let paramObj = getParams( params, {
      index: 1,
      pageSize: 10,
      dreamTitle: '',
      dreamClassid: 0,
      dreamBrandid: 0
    } ),
    fields = [ 'id', 'dreamTitle', 'dreamUpdatetime', 'dreamPrice', 'dreamDefaultpicurl', 'dreamKeyword', 'dreamDescription', 'dreamUser' ]
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( product.seachBrandProduct3, paramObj,'post')
      .then( res => {
        res.result = setFields( res.result, fields )
        resolve( ajaxReturn( 2000, 'success', '', pageData( res ) ) )
      } )
      .catch( e => {
        console.log( e );
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
/**
 * 获取单个产品详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export const getProductDetail = ( id ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( product.scbrandproductone, {
        id: id
      }, 'get' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
/**
 * 添加品牌订单
 * @param {[type]} params [description]
 */
export const addBrandOrder = ( params ) => {
  if ( !params.dreamNames || params.dreamNames == '' || !params.dreamPhone || params.dreamPhone == '' ) {
    return ajaxReturn( 4000, 'params error：姓名或者电话不能为空', '' )
  }
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( product.addbrandorder, params, 'post' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        console.log( e );
        resolve( ajaxReturn( 4000, 'faile', '', e ) )
      } )
  } )
}
