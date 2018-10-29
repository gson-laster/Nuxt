import http from './http'

// 名片也旅游报名;
export const orderlytc = (data) => { 
  return new Promise((resolve, reject) => { 
    http.post('/orderlytc', data).then(res => { 
      if (res.data.code == 2000) {
        resolve(res)
      } else { 
        let error = { code: res.data.code, msg: res.data.msg }
        resolve(error)
      }
      }).catch(e => { 
        reject(e)
      })
  })
}

//获取旅游套餐分类;
export const getLytcClass = () => { 
  return new Promise((resolve, reject) => { 
    http.get('/getLytcClass').then(res => { 
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else { 
        let error = { code: res.data.code, msg: res.data.msg }
        resolve(error)
      }
    }).catch(e => { 
      reject(e)
    })
  })
}

// 获取旅游套餐列表;
export const getLytcList = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getLytcList',{
      params:data
    }).then(res => { 
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else { 
        let error = {code:res.data.code,msg:res.data.msg}
        resolve(error)
      }
    }).catch(e => { 
      reject(e)
    })
  })
}


// 获取旅游套餐详情信息;
export const getLytcDetail = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getLytcDetail', {
      params: {
        id:data
      }
    }).then(res => { 
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else { 
        let error = {code:res.data.code,msg:res.data.msg}
      }
      }).catch(e => { 
        console.log(e)
      })
  })
}

// 旅游点赞;

export const secLytcBylike = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/secLytcBylike', {
      params: {
        id:data
      }
    }).then(res => { 
      if (res.status == 200) {
          resolve(res.data)
      } else { 
        let error = { code: 4000, msg: res.data}
        resolve(res.data) 
      }  
      }).catch(e => {   
          reject(e)
      })
  })
}








