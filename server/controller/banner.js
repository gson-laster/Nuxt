import banner from '../config/apis/banner'
import {
  ajaxReturn,
  wvHttpRequest,
  getParams,
  setFields
}
from '../utils'
export const getBannerList = ( params ) => {
  let result, url, _data = {}
  let type = params.type
  let brandId = params.dreamBrandid
  if ( type ) {
    if (type == 'travel') {
      url = banner.secListBanners
    } else if (type == 'vmall') {
      url = banner.getvmallBanner
    } 
  } else {
    if ( brandId * 1 ) {
      url = banner.scbrandbanner
      _data.dreamBrandid = brandId
    } else {
      url = banner.ibannerlist
    }
  }
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest( url, _data )
      .then(res => {
        let fields = setFields( res, [ 'id', 'dreamTitle', 'dreamUpdatetime', 'dreamDefaultpicurl' ] )
        resolve( ajaxReturn( 2000, 'success', '', fields ) )
      } )
      .catch( e => {
        console.log( e );
        resolve( ajaxReturn( 4000, e ) )
      } )
  } )
}

// 获取美文广场轮播图列表;
export const getuserbannerList = (params) => { 
  return new Promise((resolve, reject) => { 
    wvHttpRequest(banner.getuserartbannerList, params).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(ajaxReturn(4000,'fail','',[]))
    })
  })
}