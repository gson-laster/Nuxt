import http from './http'

export const getBrandList = async ( data ) => {
	return new Promise( ( resolve, reject ) => {
		http.get( '/getBrand', {
			params: data
		} ).then( res => {
			if ( res.data.code == 2000 ) {
				resolve( res.data.data )
			} else {
				let error = { code: res.data.code, msg: res.data.msg }
				resolve( error )
			}
		} ).catch( e => {
			//    let error = {code: res.data.code, msg: e}
			console.log( e )
			resolve( e )
		} )
	} )
}

// 获取所有名片模板;
export const cradTemplateListz = async ( data ) => {
	return new Promise( ( resolve, reject ) => {
		http.get( '/cradTemplateListz', {
			params: data
		} ).then( res => {
			if ( res.data.code == 2000 ) {
				resolve( res.data.data )
			} else {
				let error = { code: res.data.code, msg: res.data.data }
				resolve( error )
			}
		} ).catch( e => {
			reject( e )
		} )
	} )
}
