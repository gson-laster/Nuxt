import http from './http'
export const priviewbrandz = async (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/priviewbrandz', {
      params:data
    }).then(res => { 
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else { 
        let error = { code: res.data.code, msg: res.data.msg }
        resolve(error)
      } 
      }).catch(e => { 
         resolve(e)   
      })  
  }).catch(e => { 
      reject(e)
  })
}

// 获取当个名片详情;
export const priviewBrandNewsList = async (data) => { 
  return Promise((resolve, reject) => { 
    http.get('/priviewBrandNewsList', {
      params:data
    })
  })
}





