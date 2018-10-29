import http from './http'
// 获取网站配置;
export const getSiteConfig = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getSiteConfig', {
      params:data
    }).then(res => { 
      if (res.status == 200) {
        resolve(res.data)
      } else { 
        let error = {code:4000,data:res.data}
      }  
      }).catch(e => { 
        reject(e)
      })
  })
}





