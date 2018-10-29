import { numToCharacter, localStore, setCookie, declassify } from "~static/js/util";
import { getusermenu } from "~/apis/usermenu.js";
import { getBrandList } from "~/apis/brand.js";
import { getSiteConfig } from "~/apis/siteConfig.js";
import querystring from 'querystring'

function stringifyUrl( url, uid, data, Vm, local ) {
	let query = {
		uid: uid,
		brand: data.dreamBranddefault
	}
	if ( local ) {
		//console.log( 'http://' + window.location.host + url + '?' + querystring.stringify( query ) );
		if ( url.indexOf( '?' ) != -1 && url.indexOf( 'brand' ) && query.hasOwnProperty( 'brand' ) ) {
			delete query.brand
		}
		let querystr = querystring.stringify( query )
		let newUrl = url.indexOf( '?' ) != -1 ? 'http://' + window.location.host + url + '&' + querystr : 'http://' + window.location.host + url + '?' + querystr
		// console.log( newUrl );
		window.location.href = newUrl
	} else {
		Vm.$router.push( {
			path: url,
			query: query
		} );
	}
}

/**
 * 做用户登录
 * @param  {[type]} userdata [description]
 * @return {[type]}          [description]
 */
export const doLogin = async ( userdata, Vm, local = false ) => {
	// 用户信息;
	let data = userdata
	let isDude = false
	let uid = numToCharacter( data.dreamUsername, 2 )
	Vm.$store.dispatch( 'setLoginState', true )
	Vm.$store.dispatch( "setUserInfo", data );
	// 判断用户是否过期;

	let nowTimeStamp = new Date().getTime()
	if ( data.dreamEndtime && data.dreamEndtime !== ' ' && Number( data.dreamEndtime ) < Number( nowTimeStamp ) ) {
		isDude = true
	} else {
		isDude = false
	}
	Vm.$store.dispatch( 'setUserDude', isDude )
	setCookie( "loginUser", "", -1 )
	setCookie( "loginUser", data.dreamUsername, 7 );
	let brandInfoResult = await getBrandList( {
		brandId: data.dreamBranddefault
	} );
	if ( brandInfoResult[ 0 ].id == 0 ) {
		brandInfoResult[ 0 ] = {
			dreamBranddescription: '世界那么大 我们应该去看看 体验不一样的旅行',
			dreamBrandlogo: "http://xzg168.weix360.cn/images/wv1.jpg",
			dreamBrandtitle: "Dreamtrips",
			dreamBrandtitlecon: "Worldventures世界环旅集团",
			dreamCardcontent: null,
			dreamSzm: "W",
			id: 0
		}
	}
	await Vm.$store.dispatch( "setBrandInfo", brandInfoResult[ 0 ] );
	// 保存数据
	localStore.set(
		"brandInfo",
		JSON.stringify( {
			brandInfo: brandInfoResult[ 0 ],
			expires_in: new Date() * 1,
			share: false
		} ),
		"wvmp360"
	);

	// 保存用户数据
	localStore.set(
		"userInfo",
		JSON.stringify( {
			userInfo: data,
			expires_in: new Date() * 1,
			share: false
		} ),
		"wvmp360"
	);

	// 判断用户是否有开通会员;
	if ( data.dreamEndtime && data.dreamEndtime != null && data.dreamEndtime != "null" ) {
		let nowTimeStamp = new Date().getTime();
		// 设置过期store
		let dreamEndTime = data.dreamEndtime
		if ( dreamEndTime && dreamEndTime !== ' ' && Number( dreamEndTime ) < Number( nowTimeStamp ) ) {
			await Vm.$store.dispatch( 'setUserDude', true )
		} else {
			await Vm.$store.dispatch( 'setUserDude', false )
		}
		// 用户过期
		if ( nowTimeStamp > data.dreamEndtime ) {
			stringifyUrl( "/wusercenter/vip/openNow", uid, data, Vm, local )

		} else {
			//用户正常
			let url = '',
				localState = false
			if ( Vm.$route.query.hasOwnProperty( 'redirect' ) ) {
				url = Vm.$route.query.redirect
				localState = true
			} else {
				url = '/wusercenter'
				localState = false
			}
			stringifyUrl( url, uid, data, Vm, localState )
		}
	} else {
		//用户非会员;
		stringifyUrl( "wusercenter/vip", uid, data, Vm, local )
	}


	// 保存微信配置;
	await getSiteConfig().then( res => {
		Vm.$store.dispatch( 'setSiteConfig', res )
	} ).catch( e => {
		this.$msg( '获取网站配置信息错误' )
	} )
}
