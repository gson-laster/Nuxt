import preview  from '../config/apis/preview'
import {
  ajaxReturn,
  wvHttpRequest,
  setFields,
  wvException
} from '../utils'


// 获取所有可以预览的品牌;
export const priviewbrandz = async (data) => { 
  return new Promise((resolve, reject) => { 
    wvHttpRequest(preview.priviewbrandz, data, 'GET', {}, false).then(res => { 
      resolve(ajaxReturn(2000,'success','',res))
    }).catch(e => { 
        reject(ajaxReturn(4000,'error'))  
    })
   })
}