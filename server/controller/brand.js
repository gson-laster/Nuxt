import {
	ajaxReturn,
	wvHttpRequest,
	setFields
} from '../utils';
import brand from '../config/apis/brand'
import siteConfig from '../config/apis/siteConfig'
export const getBrand = ( data ) => {
	let brandId = data.brandId;
	let Brandtitle = data.dreamBrandtitle;
	let dreamIsshow = data.dreamIsshow ? data.dreamIsshow : true;
	let url, _data = {},
		fields = []
	if ( brandId !== undefined ) {
		if ( brandId == 0 ) {
			return ajaxReturn( 2000, 'success', '', [ {
				dreamBranddescription: '世界那么大 我们应该去看看 体验不一样的旅行',
				dreamBrandlogo: "http://xzg168.weix360.cn/images/wv1.jpg",
				dreamBrandtitle: "Dreamtrips",
				dreamBrandtitlecon: "Worldventures世界环旅集团",
				dreamCardcontent: null,
				dreamSzm: "W",
				id: 0
      } ] )
		} else {
			url = brand.getBrandOne
			_data = { id: brandId, dreamIsshow: dreamIsshow }
		}
	} else if ( Brandtitle ) {
		url = brand.secBrandcondition
		_data = { dreamBrandtitle: Brandtitle, dreamIsshow: dreamIsshow }
	} else {
		url = brand.getBrandList
		_data = { dreamIsshow: dreamIsshow }
	}
	fields = [ 'id', 'dreamBrandtitle', 'dreamBrandlogo', 'dreamBrandtitlecon', 'dreamSzm', 'dreamCardcontent', 'dreamBranddescription' ]
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( url, _data, 'POST' )
			.then( res => {
				res = res instanceof Array ? res : [ res ]
				let result = setFields( res, fields )
				resolve( ajaxReturn( 2000, 'success', '', result ) )
			} )
			.catch( e => {
				resolve( ajaxReturn( 4000, 'error', '', [] ) )
			} )
	} )
}

// 获取所有名片模板信息;
export const cradTemplateListz = ( data ) => {
	let url, params = {}
	console.log( data );
	if ( data.id ) {
		url = brand.getCradTemplates
		params = { id: data.id }
	} else {
		url = brand.cradTemplateListz
	}
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( url, data, 'GET', params, false ).then( res => {
			resolve( ajaxReturn( 2000, 'success', '', res ) )
		} ).catch( e => {
			reject( ajaxReturn( 4000, 'error', '', [] ) )
		} )
	} )
}
