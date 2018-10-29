// 用户图标;
import usermenu  from '../config/apis/usermenu'
import {
  ajaxReturn,
  wvHttpRequest,
  setFields,
  wvException
} from '../utils'

// 获取;
export const getusermenu = async (data) => { 
  return new Promise((resolve, reject) => { 
    wvHttpRequest(usermenu.getusermenu, data, 'GET', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })
}

// 编辑;
export const editorusermenu = async (data) => { 
  return new Promise((resolve, reject) => { 
    wvHttpRequest(usermenu.editorusermenu, data, 'POST', {}, false).then(res => { 
      resolve(ajaxReturn(2000, 'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })
}

// 删除;
export const delusermenu = async (data) => { 
  return new Promise((resolve, reject) => { 
    wvHttpRequest(usermenu.delusermenu, data, 'GET', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
      reject(e)
    })
  })
}
