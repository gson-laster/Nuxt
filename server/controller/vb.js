import vb from '../config/apis/vb'
import { ajaxReturn, wvHttpRequest } from '../utils'
import { assign } from 'lodash.assign'
// 获取充值列表;
export const getUserVBczList = async( data ) => {
  let result = await wvHttpRequest( VB.getUserVBczList, data );
  return ajaxReturn( 2000, 'success', '', result );
}
// 获取付钱啦支付信息;
export const getVBorderInfo = async( data ) => {
  let result = await wvHttpRequest( VB.getVBorderInfo, data );
  return ajaxReturn( 2000, 'success', '', result );
}
// 获取VB提现列表;
export const getVBWithdrawList = async( data ) => {
  let { dreamSqtxuserid, index, pageSize } = data;
  index = index ? index : 1;
  pageSize = pageSize ? pageSize : 5;
  if ( !dreamSqtxuserid || dreamSqtxuserid == '' ) {
    return ajaxReturn( 4000, '参数错误', '', [] )
  }
  data = assign( { index: index, pageSize: pageSize }, data )
  let result = await wvHttpRequest( VB.getVBWithdrawList, data );
  return ajaxReturn( 2000, 'success', '', result );
}
// 获取VB转送列表;
export const getVBvbzsList = async( data ) => {
  let { dreamUserid } = data, { index } = data;
  index = index ? index : 1;
  if ( !dreamUserid || dreamUserid == '' ) {
    return ajaxReturn( 4000, '参数错误', [] );
  }
  data = assign( { index: index }, data );
  let result = await wvHttpRequest( VB.getVBvbzsList, data );
  return ajaxReturn( 2000, 'success', '', result );
}
export const getUserRenewInfo = () => {}
