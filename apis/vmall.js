import http from './http'
// 获取商品列表;
export const getVmallGoodsList = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getVmallGoodsList', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else {
        let error = { code: 4000, msg: res.data.msg }
      }
    }).catch(e => {
      reject(e)
    })
  })
}


// 获取商品详情;
export const getVmallGoodsInfo = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getVmallGoodsInfo', {
      params: {
        id: data
      }
    }).then(res => {
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


// 立即购买;
export const vmallorder = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/vmallorder', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else {
        let error = { code: 4000, msg: res.data.data }
        resolve(error)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

// 获取订单列表;
export const getvmalllist = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getvmalllist', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        if (res.data.data.hasOwnProperty('code')) {
          resolve(res.data.data.data)
        } else {
          resolve(res.data.data)
        }
      } else {
        resolve(res.data.data)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

// 获取订单数据;
export const getvmcount = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getvmcount', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else {
        let error = { code: 4000, data: res.data.data }
        resolve(error)
      }
    }).catch(e => {
      reject(e)
    })
  })
}
// 获取收藏列表;
export const getVmallListhyc = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/getVmallListhyc', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else {
        let error = { code: 4000, msg: res.data.data }
        resolve(error)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

// 删除收藏项;
export const changuserfavorite = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/changuserfavorite', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else {
        let error = { code: 4000, msg: res.data.data }
        resolve(error)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

// 获取购物车列表;
export const seachshopcar = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/seachshopcar', {
      params: data
    }).then(res => {
      if (res.data.code == 2000) {
        resolve(res.data.data)
      } else {
        let error = { code: res.data.code, msg: res.data.data }
        resolve(error)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

// 添加或减少购物车的数量;
export const editorshopcar = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/editorshopcar', {
      params: data
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}

// 删除购物车数量;
export const delshopcar = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/delshopcar', {
      params: data
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}

// 添加至购物车;
export const addVmallShopCar = (data) => {
  return new Promise((resolve, reject) => {
    http.get('/addVmallShopCar', {
      params: data
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else { 
        resolve(res.data)
      } 
    }).catch(e => {
       reject(e) 
    })
  })
}

