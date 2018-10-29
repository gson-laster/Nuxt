import http from './http'

// 获取用户名片图标;
export const getusermenu = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getusermenu', {
      params:data
    }).then(res => { 
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else { 
        resolve(res.data.data)
      } 
  
      }).catch(e => { 
        reject(e)
      })
  })
}

// 修改用户名片图标;
export const editorusermenu = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/editorusermenu', {
      params:data
    }).then(res => { 
      if (res.data.code = 2000) {
        resolve(res.data.data)
      } else { 
        let error = {
          code: res.data.code,
          msg:res.data.msg
        }
        resolve(error)
      }
      }).catch(e => { 
        reject(e)
      })
  })
}

// 删除用户名片图标;
export const delusermenu = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/delusermenu', {
      params:data
    }).then(res => { 
      if (res.data.code = 2000) {
        resolve(res.data)
      } else { 
        let error = {
          code: res.data.code,
          msg:res.data.msg
        }
        resolve(error)
      }
      }).catch(e => { 
        reject(e)
      })
  })
}




