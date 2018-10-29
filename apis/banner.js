import http from './http'

export const getBannerList = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getBannerList', {
       params: data
    }).then(res => {
       if(res.data.code = 2000) {
         resolve(res.data.data)
       }else {
         let error = {code: res.data.code, msg: res.data.msg}
         resolve(error)
       }
     }).catch(e => {
       console.log(e);
      //  let error = {code: res.code, msg: e}
       resolve(e)
     })
  })
}

// 获取美文广场轮播图;
export const getuserbannerList = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getuserbannerList', {
      params:data
    }).then(res => { 
      if (res.status == 200) {
        if (res.data.code == 2000) {
          resolve(res.data.data)
        } else {
          let error = { code: 4000, msg: res.data.data }
        }
      } else { 
        let e = { code: 4000, msg: 'error' }
        reject(e)
      }
      }).catch(e => { 
        reject(e)
      })
  })
}