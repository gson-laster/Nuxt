import http from './http'
export const getProductCateList = async( brand, cid ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getProductClassList', {
        params: { brandId: brand, cid: cid ? cid : 0 }
      } )
      .then( res => {
        if ( res.data.code == 2000 ) {
          resolve( res.data )
        } else {
          let error = { code: res.data.code, msg: res.data.msg }
          resolve( error )
        }
      } )
      .catch( e => {
        console.log( e );
        let error = { code: res.data.code, msg: e }
        resolve( error )
      } )
  } )
}
export const getProductList = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getProductList', {
        params: params
      } )
      .then( res => {
        resolve( res.data.data )
      } )
      .catch( e => {
        console.error( e );
      } )
  } )
}
export const getProductDetail = ( id ) => {
  return new Promise( ( resolve, reject ) => {
    http.get( '/getProductDetail', {
        params: {
          id: id
        }
      } )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
        resolve( { code: 4000, msg: e.msg } )
      } )
  } )
}
export const addBrandOrder = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    http.post( '/addBrandOrder', params )
      .then( res => {
        resolve( res.data )
      } )
      .catch( e => {
        console.log( e );
      } )
  } )
}
