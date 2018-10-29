// 文章接口组织
import article from '../config/apis/article'
import {
	ajaxReturn,
	wvHttpRequest,
	getParams,
	setFields,
}
from '../utils'
/**
 * 获取文章列表，多个接口合并
 * @param  {[int]} brandId [当前品牌id  wv 为0]
 * @param  {[type]} params  [参数说明： index 当前页码
 *                                     pageSize 每页请求的条数
 *                                     dt 1代表最新 0代表正常
 *                                     dreamIsok 是否取显示文章
 *                                     dreamClassid 分类id 默认0 代表全部,
 *                                     dreamHits 1 代表点击排序
 *                                     fields 需要的字段，中间用逗号隔开
 *                                     (默认已经有的参数： 'id', 'dreamTitle', 'dreamHits', 'dreamUpdatetime', 'dreamDefaultpicurl')
 *                          ]
 * @return {[promise]}         [返回结果]
 */
export const getArticleList = ( brandId, params ) => {
	let url, result = {},
		_data, self_fields
	if ( params.type == 'wx' ) {
		url = article.ArtclesList
	} else {
		if ( brandId * 1 ) {
			url = article.BrandNewsList
		} else {
			url = article.ArtclesList
		}
	}
	self_fields = params.fields ? params.fields.split( ',' ) : []
	// 组织参数进行请求
	_data = getParams( params, {
		'index': 1,
		'pageSize': 15,
		'dreamBrandid': 0,
		'dt': 1,
		'dreamIsok': 1,
		'dreamClassid': 0
	} )
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( url, _data, 'POST' )
			.then( res => {
				logger.error( res );
				if ( res.code == 40001 ) {
					result = { result: [] }
				} else {
					if ( params.type == 'wx' || brandId == 0 ) {
						result = res.Articles
					} else {
						result = res.BrandNews
					}
				}
				logger.error( '===============================>' )
				logger.error( result );
				// 默认会有的参数
				let fields = [ 'id', 'dreamTitle', 'dreamHits', 'dreamUpdatetime', 'dreamDefaultpicurl', ]
				fields.push.apply( fields, self_fields )
				// console.log( '文章返回结果', result );
				let response = result && setFields( result.result, fields )
				// logger.error( result )

				// result = result ? result : {}
				result[ 'result' ] = response
				resolve( ajaxReturn( 2000, 'success', '', result ) )
			} )
			.catch( e => {
				e.code ? resolve( ajaxReturn( 4000, 'fail', '', [] ) ) : reject( e )
			} )
	} )
}
/**
 * 获取单篇文章 需要传入品牌id和文章id
 * @param  {[int]}      id       [文章id]
 * @param  {[int]}      brandId  [品牌id]
 * @return {[promise]}           [结果返回promise]
 */
export const getArticleById = ( id, brandId, type ) => {
	let url,
		fields = [ 'id', 'dreamTitle', 'dreamHits', 'dreamUpdatetime', 'dreamContent', 'dreamDefaultpicurl', 'dreamKeyword', 'dreamDescription', 'dreamUser', 'dreamIsok', 'dreamClassid', 'dreamBrandid' ]
	console.log( type );
	let isWvArticle = ( type && type == 'wx' ) ? true : false
	if ( brandId * 1 && !isWvArticle ) {
		url = article.BrandNewsone // 品牌文章
	} else {
		url = article.articlesone // wv
	}
	console.log( url );
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( url, {
				id: id
			}, 'GET' )
			.then( res => {
				let response = setFields( [ res ], fields )
				resolve( ajaxReturn( 2000, 'success', '', response[ 0 ] ) )
			} )
			.catch( e => {
				console.log( e );
				resolve( ajaxReturn( 4000, 'fail', '', e ) )
			} )
	} )
}
/**
 * 首页文章分类
 * @param  {[type]}  brandId [description]
 * @param  {[type]}  data    [description]
 * @return {Promise}         [description]
 */
export const getNavList = async ( params ) => {
	let url,
		recommondUrl,
		brandId = params.brand,
		_data = {},
		_data_re = {}
	if ( brandId && brandId != 0 ) {
		url = article.brandnewsclasslist // 品牌文章分类
		recommondUrl = article.ibrandindetj // 品牌文章推荐
		_data.dreamIsok = true
		_data.dreamBrandid = brandId
		_data_re = _data
	} else {
		url = article.classlist // wv 文章分类
		recommondUrl = article.indextjlist // wv 文章推荐
		_data.dreamIsshow = 1
		_data_re.dreamShow = 1
	}
	return new Promise( ( resolve, reject ) => {
		Promise.all( [
        wvHttpRequest( url, _data, 'get' ),
        wvHttpRequest( recommondUrl, _data_re ),
      ] )
			.then( res => {
				let classList = setFields( res[ 0 ], [ 'id', 'dreamNames', 'dreamZid', 'dreamDefaultpicurl', 'dreamIsshow' ] )
				let recommondList = setFields( res[ 1 ], [ 'id', 'dreamNames', 'dreamDefaultpicurl', 'dreamContent', 'dreamUrl' ] )
				let result = {
					category: classList,
					recommond: recommondList,
				}
				if ( params.type == 'recommond' ) result = result.recommond
				else if ( params.type == 'category' ) result = result.category
				else result = result
				resolve( ajaxReturn( 2000, 'success', '', result ) )
			} )
			.catch( e => {
				console.log( e );
				resolve( ajaxReturn( 4000, 'error', '', [] ) )
			} )
	} )
}

// 微信分享页导航;
export const indextjlist = async ( params ) => {
	let { dreamIsnew } = params
	let data = { dreamIsnew: dreamIsnew }
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( article.indextjlist, data, 'GET', {}, false )
			.then( res => {
				resolve( ajaxReturn( 2000, 'success', '', res ) )
			} )
			.catch( e => {
				reject( ajaxReturn( 4000, 'error', '', [] ) )
			} )
	} )
}

/**
 * 添加转载文章
 * @param  {[type]} parmas [description]
 * @return {[type]}        [description]
 */
export const editorCollview = ( params ) => {
	let { dreamUserid, dreamAid } = params
	if ( !dreamUserid || !dreamAid ) return ajaxReturn( 4000, 'params exit' )
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( article.editorCollview, params, 'post' )
			.then( res => {
				resolve( ajaxReturn( 2000, 'success', '', res ) )
			} )
			.catch( e => {
				e.code ? resolve( ajaxReturn( 4000, 'fail', '', e ) ) : reject( e )
			} )
	} )
}

/**
 * 删除转载
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export const delCollview = ( id ) => {
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( article.delCollview, { id: id }, 'get', {}, false )
			.then( res => {
				resolve( ajaxReturn( 2000, 'success', '', res ) )
			} )
			.catch( e => {
				console.log( e );
				e.code ? resolve( ajaxReturn( 4000, 'fail', '', e ) ) : reject( e )
			} )
	} )
}
/**
 * 获取转载文章
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getCollviewList = ( params ) => {
	return new Promise( ( resolve, reject ) => {
		wvHttpRequest( article.getCollviewList, params )
			.then( res => {
				resolve( ajaxReturn( 2000, 'success', '', res ) )
			} )
			.catch( e => {
				e.code ? resolve( ajaxReturn( 4000, 'fail', '', e ) ) : reject( e )
			} )
	} )
}
