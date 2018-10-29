import {
	ajaxReturn,
	wvHttpRequest
} from '../utils'
import siteConfig from '../config/apis/siteConfig'
export const getSiteConfig = () => {
	return wvHttpRequest( siteConfig.websitinfo )
}
export const getimgs = ( params ) => {
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( siteConfig.getimgs, { URL: params.url }, 'POST' )
			.then( res => {
				resolve( ajaxReturn( 2000, 'success', '', res ) )
			} )
			.catch( e => {
				console.log( e );
			} )
	} )
}
