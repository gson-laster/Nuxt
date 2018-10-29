import vmall from '../config/apis/vmall'
import {
  ajaxReturn,
  wvHttpRequest,
  getParams,
  setFields
}
from '../utils'
/**
 * [获取vmall商品列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
// a:待发货b:已发货c：已完成d:购物车
export const getVmallGoodsList =( params ) => {
  let _params = getParams( params, {
    index: 1,
    pageSize: 12,
    dreamIsok: 1
  })
  return new  Promise( ( resolve, reject ) => {
    wvHttpRequest(vmall.getvmallList, _params,'POST', {},false )
      .then(response => {
        resolve( ajaxReturn( 2000, 'success', '', response ) )
      } )
      .catch( e => {
        resolve( ajaxReturn( 4000, 'fail', '', e ) )
      } )
  } );
}
/**
 * 获取vmall商品详情
 * @return {[type]} [description]
 */
export const getVmallGoodsInfo = (data) => {
  return new  Promise( ( resolve, reject ) => {
    wvHttpRequest(vmall.getvmallinfo,data, 'GET', {},false)
      .then( response => {
        resolve( ajaxReturn( 2000, 'success', '', response ) )
      } )
      .catch( e => {
        console.log( e );
        resolve( ajaxReturn( 4000, 'fail', '', e ) )
      } )
  } );
}
/**
 * 添加购物车
 */
export const addVmallShopCar = ( params ) => {
  if ( !params.dreamGoodsid || params.dreamGoodsid == '' ) {
    return ajaxReturn( 4000, 'params error: dreamGoodsid exits' )
  }
  console.log('add',params)
  return new Promise( ( resolve, reject ) => {
    wvHttpRequest(vmall.addshopcar, params, 'POST', {},false)
      .then( response => {
        resolve( ajaxReturn( 2000, 'success', '', response ) )
      } )
      .catch( e => {
        resolve( ajaxReturn( 4000, 'fail', '', e ) )
      } )
  } );
}
// 立即购买;
export const vmallorder = (params) => { 
  let { dreamOrderzt } = params, { dreamOrdernumber } = params, { dreamUserid } = params, { dreamTotal } = params
  if (!dreamOrderzt||!dreamOrdernumber||!dreamUserid||!dreamTotal){ 
    return ajaxReturn(4000,'fail','','params error')
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(vmall.vmallorder, params, 'POST', {},false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      resolve(ajaxReturn(4000,'fail','',e))
    })
  })
}


// 根据不同的type获取订单列表;
export const getvmalllist = (params) => { 
  let { dreamUserid } = params, { dreamOrderzt } = params
  if (!dreamUserid||!dreamOrderzt){ 
     return ajaxReturn(4000,'fail','','params error') 
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(vmall.getvmalllist, params, 'POST', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(ajaxReturn(4000,'fail','',e))
    })
  })
}

//获取订单数据详情;
export const getvmcount = (params) => { 
  let { dreamUserid } = params
  if (!dreamUserid||dreamUserid.length<=0){ 
    return ajaxReturn(4000,'fail','','params error')
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(vmall.getvmcount, params, 'GET', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(ajaxReturn(4000,'fail','',e))
    })
  })
}

// 获取收藏列表;
export const getVmallListhyc = (params) => { 
  if (params.length <= 0) {
    return ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    return new Promise((resolve, reject) => { 
      wvHttpRequest(vmall.getVmallListhyc, params,'GET', {}, false).then(res => { 
        resolve(ajaxReturn(2000,'success','',res))
      }).catch(e => { 
        reject(e)
      })
    })
  } 
}


// 删除收藏;
export const changuserfavorite = (params) => { 
  let { dreamVmallid } = params, { dreamUsername}=params
  if (!dreamVmallid || dreamVmallid.length <= 0||dreamUsername.length<=0||!dreamUsername) {
    ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    return new Promise((resolve, reject) => { 
      wvHttpRequest(vmall.changuserfavorite, params, 'GET', {}, false).then(res => {
        resolve(ajaxReturn(2000,'success','',res))
       }).catch(e => { 
        reject(e)
      })
    })
  }
}

// 获取购物车列表;
export const seachshopcar = (params) => { 
  let { dreamShopper } = params, { str} = params,url=''
  if ((!dreamShopper || dreamShopper.length <= 0)&&(!str||str.length<=0)) {
    ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    if (dreamShopper&&dreamShopper.length > 0) {
      url = vmall.seachshopcar
    } else if (str && str.length >0) {
      url = vmall.seachshopcars
    }
    return new Promise((resolve, reject) => { 
      wvHttpRequest(url, params, 'POST', {}, false).then(res => { 
        resolve(ajaxReturn(2000,'success','',res))
      }).catch(e => { 
        reject(e)
      })
    })
  }
}

// 添加或减少购物车商品的数量;
export const editorshopcar = (params) => { 
  let { id } = params, { dreamGoodsnum } = params
  if (!id || !dreamGoodsnum || dreamGoodsnum.length < 0) {
    ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    return new Promise((resolve, reject) => { 
      wvHttpRequest(vmall.editorshopcar, params, 'GET', {}, false).then(res => { 
        resolve(ajaxReturn(2000,'success','',res))
      }).catch(e => { 
        reject(e)
      })
    })
  }  
}

// 删除购物车;
export const delshopcar = (params) => { 
  let { id } = params
  if (!id) {
    ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    return new Promise((resolve, reject) => { 
      wvHttpRequest(vmall.delshopcar, params, 'GET', {}, false).then(res => {
        resolve(ajaxReturn(2000,'success','',res))
       }).catch(e => { 
        reject(e)
      })
    })
  }
}
