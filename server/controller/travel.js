import travel from '../config/apis/travel'
import {
  wvHttpRequest,
  ajaxReturn,
  getParams,
  setFields,
  pageData,
  dateformat,
  getMath
} from '../utils'
/**
 * 获取旅游套餐的分类
 * @return {[type]} [description]
 */
export const getLytcClass = () => {
  return new Promise( ( resolve, reject ) => {
    Promise.all( [ wvHttpRequest( travel.lytcclass ), wvHttpRequest( travel.lytczt ) ] )
      .then( response => {
        //console.log( '返回', response );
        let area = setFields( response[ 0 ], [ 'id', 'dreamNames' ] )
        let ztResult = setFields( response[ 1 ], [ 'id', 'dreamNames' ] )
        let result = {
          dreamClassid: area,
          dreamZtid: ztResult,
          dreamTime1: getMath( 1, 12, '月' )
        }
        resolve( ajaxReturn( 2000, 'success', '', result ) )
      } )
      .catch( e => {
        //  console.log( e );
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
/**
 * 获取旅游套餐列表
 * @return {[type]} [description]
 */
export const getLytcList = ( params ) => {
  let paramObj = getParams( params, {
    index: 1,
    pageSize: 10,
    dreamExamine: 1
  } )
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( travel.lytcopz, paramObj, 'get' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( e => {
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
/**
 * 获取旅游套餐详情
 * @return {[type]} [description]
 */
export const getLytcDetail = ( id ) => {
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( travel.lytcone, {
        id: id
      }, 'get' )
      .then( res => {
        resolve( ajaxReturn( 2000, 'success', '', res ) )
      } )
      .catch( error => {
        resolve( ajaxReturn( 4000, 'error' ) )
      } )
  } )
}
//----By Zzy----
//mail:917293906@qq.com
//description:旅游名片页报名
//           step 1:
//           step 2:
export const orderlytc = async( data ) => {
  let { dreamPhone, dreamWx, dreamTjid, dreamNames } = data
  if ( !dreamPhone || !dreamWx || !dreamTjid || dreamNames ) {
    ajaxReturn( 4000, '参数错误', '', [] )
  }
  let result = await wvHttpRequest( travel.orderlytc, data, 'post', {}, false )
  return ajaxReturn( 2000, 'success', '', result )
}

export const secLytcBylike = async (data) => { 
  let { id } = data
  if (!id) { 
      ajaxReturn(4000,'fail','','params error') 
  }
  let result = await wvHttpRequest(travel.secLytcBylike, data, 'GET', {}, false)
  return ajaxReturn(2000,'success','',result)
}


