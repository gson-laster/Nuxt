import agents from '../config/apis/agents'
import {
  ajaxReturn,
  wvHttpRequest,
  getParams,
  setFields,
  wvException,
  pageData,
}
  from '../utils'
import { resolve } from 'dns';

// 选额预存额度：
export const editorPurpose = (data) => { 
  let { dreamPurposename } = data, { type } = data
  let url = ''
  if (!dreamPurposename||dreamPurposename.length<=0) { 
     return ajaxReturn(4000,'fail','','params error')
  }
  if (type == 'buy') {
    url = agents.addPurpose
  } else { 
    url = agents.editorPurpose
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(url, data, 'POST', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })
}



// 代理用户开通码信息;
export const getOpenpermit = (params) => { 
  let { dreamUserid } = params
  if (!dreamUserid || dreamUserid.length <= 0) {
    return ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    return new Promise((resolve, reject) => {
      wvHttpRequest(agents.getOpenpermit, params, 'POST', {}, false).then(res => {
        resolve(ajaxReturn(2000,'success','',res))
       }).catch(e => { 
        reject(e)
      })
    })
  }
}
// 获取未使用和已使用的开通码;
export const getOpenuserrecode = (params) => { 
  let { dreamOwner } = params
  if (!dreamOwner || dreamOwner.length <= 0) {
    return ajaxReturn(4000, 'fail', '', 'params error')
  } else { 
    return new Promise((resolve, reject) => { 
      wvHttpRequest(agents.getOpenuserrecode, params, 'GET', {}, false).then(res => {
        resolve(ajaxReturn(2000,'success','',res))  
      }).catch(e => { 
        reject(e)
      })
    })
  }
}

// 生成开通码;
export const getcdkeys = (params) => { 
  let { dreamUserid } = params, { pagesize} = params
  if (!dreamUserid) { 
     return ajaxReturn(4000,'fail','','params error') 
  }
  if (!pagesize) { 
    pagesize = 1
  } 
  let data = {}
  data.dreamUserid = dreamUserid
  data.pagesize = pagesize
  return new Promise((resolve, reject) => { 
    wvHttpRequest(agents.getcdkeys, data, 'POST', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)  
    })
  })  
}

// 获取会员认证或者未认证的列表;
export const getUserList2new = (params) => { 
  let { id } = params
  if (!id) {
    return ajaxReturn(4000,'fail','','params error')
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(agents.getUserList2new, params, 'POST', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })  
}

// 会员认证统计;
export const getCountByIsOkTime2new = (params) => { 
  let { id } = params
  if (!id) { 
      return ajaxReturn(4000,'fail','','params error')
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(agents.getCountByIsOkTime2new, params, 'GET', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })
}

// 利用开通码开通账号;
export const openuser = (params) => { 
  let { dreamBranddefault } = params, { dreamOpencode } = params, { dreamUsername } = params
  if (!dreamOpencode||!dreamUsername) { 
      return ajaxReturn(4000,'fail','','params error')
  }
  if (!dreamBranddefault) { 
    dreamBranddefault = 0
    params.dreamBranddefault = dreamBranddefault
  }
  return new Promise((resolve, reject) => { 
    wvHttpRequest(agents.openuser, params, 'GET', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })
}