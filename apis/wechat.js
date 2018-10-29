import http from './http'
export const getWxConfig = async( url ) => {
  let result = await http.post( '/getWechatConfig', {
    url: url
  } )
  return result.data
}
/**
 * CloudCardOpen   开通
 * CloudCardRenew  续费
 * CloudCard 充值
 * @type {[type]}
 */
export const createVipOrder = async( params ) => {
  return http.post( '/createVipOrder', params )
}
export const getOAuthUrl = async( url ) => {
  return http.get( '/getWechatOAuthUrl', {
    params: {
      target: url
    }
  } )
}
export const getWechatOAuth = async( url ) => {
  return http.get( `/wechat-oauth?url=${encodeURIComponent(url)}` )
}
