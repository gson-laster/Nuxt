import http from './http'


// 选择预存额度报名;
export const editorPurpose = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/editorPurpose', {
      params: data
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else {
        let error = { code: 4000, msg: res.data.msg }
        resolve(error)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

// 获取代理用户开通吗信息;
export const getOpenpermit = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getOpenpermit', {
      params: data
    }).then(res => {
      if (res.status == 200) {
        if (res.data.code == 2000) {
          resolve(res.data.data)
        } else {
          let e = { code: 4000, msg: res.data.data }
          resolve(e)
        }
      } else {
        let error = { code: 4000, msg: res.data.msg }
        resolve(error)
      }
    }).catch(e => {
      resolve(e)
    })
  })
}

// 获取已使用未使用的开通码信息;
export const getOpenuserrecode = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getOpenuserrecode', {
      params: data
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data.data)
      } else {
        let error = { code: 4000, msg: res.data.data }
        resolve(error)
      }
    }).catch(e => {
      resolve(e)
    })
  })
}

// 生成开通码
export const getcdkeys = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getcdkeys', {
      params: data
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else { 
        let error = {code:4000,data:res.data}
      } 
    }).catch(e => {
      resolve(e)
    })
  })
}
// 获取认证和未认证会员数据;
export const getUserList2new = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getUserList2new', {
      params:data
    }).then(res => { 
      if (res.status == 200) {
        if (res.data.code == 2000) {
          resolve(res.data.data)
        } else {
          let error = { code: 4000, msg: res.data.data }
          resolve(error)
        }
      } else { 
        let e = { code: 4000, msg: res.data.data }
        resolve(e)
      }    
      }).catch(e => { 
        reject(e)  
      })
  })
}
// 获取统计信息;
export const getCountByIsOkTime2new = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/getCountByIsOkTime2new', {
      params:data
    }).then(res => { 
      // console.log(res)
      if (res.status == 200) {
        if (res.data.code == 2000) {
          resolve(res.data.data)
        } else {
          resolve(res.data)
        }
      } else { 
        let error = { code: 4000, msg: res.data }
        resolve(error)
      } 
      }).catch(e => { 
        console.log(e)
      })
  })
}
// 利用开通码开通账户;
export const openuser = (data) => { 
  return new Promise((resolve, reject) => { 
    http.get('/openuser', {
      params:data
    }).then(res => { 
      if (res.status == 200) {
        if (res.data.code == 2000) {
          resolve(res.data)
        } else {
          let error = { code: 4000, msg: res.data.data }
        }
      } else { 
        let e = { code: 4000, msg: res.data.data }
        resolve(e)
      } 
      }).catch(e => { 
      reject(e)
      })
  })
}
