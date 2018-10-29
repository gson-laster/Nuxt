import md5 from 'md5'
import Vue from 'vue'
const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number( document.documentMode );
//操作兄弟元素,参数(当前元素，及回调方法)
export function siblings( elem, fn ) {
	//var r = []
	var n = elem.parentNode.firstChild
	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			//  r.push( n )
			fn && fn( n )
		}
	}
	//return r
}
//返回1-31位任意字符串//用于调用api接口
export function nonce() {
	var chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
	var num = '';
	var strLength = Math.floor( Math.random() * 31 + 1 );
	for ( var i = 0; i < strLength; i++ ) {
		num += chars[ Math.floor( Math.random() * 61 + 1 ) ];
	}
	return num;
}
/**
 * 传入公共参数;返回公共参数+签名sign;
 * @param  {[object]} data [排序对象]
 * @return {[type]}      [description]
 */
export function createajaxData( data ) {
	var str = '';
	var arr = [];
	var returnData = {};
	for ( var k in data ) {
		if ( k == 'app_secret' ) {
			continue;
		}
		arr.push( k );
	}
	arr.sort( function ( a, b ) {
		if ( a < b ) {
			return -1;
		} else if ( a > b ) {
			return 1;
		} else {
			return 0;
		}
	} );
	for ( var m in arr ) {
		returnData[ arr[ m ] ] = data[ arr[ m ] ];
		str += arr[ m ] + data[ arr[ m ] ];
	}
	returnData[ 'sign' ] = md5( data.app_secret + str + data.app_secret )
		.toUpperCase();
	return returnData;
}
//获取用户信息
export function getUserInfo( wx ) {
	if ( process.BROWSER_BUILD ) {
		let userInfo = JSON.parse( localStorage.getItem( 'userInfo' ) ) || {}
		let data = {
			dreamUsername: userInfo.dreamUsername
		}
		if ( wx ) {
			assign( data, wx )
		}
		if ( data.hasOwnProperty( 'dreamUsername' ) && data.dreamUsername != '' ) {
			return data
		}
	}
}
// 根据获取到的list信息拼装成两条一组;
export function listTo2( data ) {
	let result = []
	for ( let i = 0, len = data.length; i < len; i += 2 ) {
		result.push( data.slice( i, i + 2 ) )
	}
	return result
}
export function terDateTime() {
	let date = new Date()
	let month = date.getMonth() + 1
	let datetime = '' + date.getFullYear() + ( month >= 10 ? month : '0' + month ) + ( date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ) + '' + ( date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ) + ( date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ) + ( date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )
	return datetime
}
/**
 * 时间戳转时间
 * @param  {[type]} format    [description]
 * @param  {[type]} timestamp [description]
 * @return {[type]}           [description]
 */
export const dateFormat = ( format, timestamp ) => {
	var dateTime = timestamp ? new Date( timestamp ) : new Date(),
		fullYears = dateTime.getFullYear(),
		month = dateTime.getMonth() + 1,
		day = dateTime.getDate(),
		hours = dateTime.getHours(),
		minute = dateTime.getMinutes(),
		seconds = dateTime.getSeconds(),
		week = dateTime.getDay();
	var o = {
		"M+": addFix( month ),
		"d+": addFix( day ),
		"H+": addFix( hours ),
		"m+": addFix( minute ),
		"s+": addFix( seconds ),
		"w+": weekTozh( week ),
		"q+": Math.floor( ( month + 3 ) / 3 ),
		"S": dateTime.getMilliseconds(),
	};
	if ( /(y+)/.test( format ) ) format = format.replace( RegExp.$1, ( fullYears + "" ) );
	for ( var k in o )
		if ( new RegExp( "(" + k + ")" ).test( format ) ) format = format.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[ k ] ) : ( ( "00" + o[ k ] ).substr( ( "" + o[ k ] ).length ) ) );
	return format;
}

/**
 * 添加零前缀
 * @param {[type]} number [description]
 */
export function addFix( number ) {
	return number >= 10 ? number : '0' + number;
}
/**
 * 星期转中文
 * @return {[type]} [description]
 */
export function weekTozh( week ) {
	const arr = [ '日', '一', '二', '三', '四', '五', '六' ];
	return arr[ week ];
}
//uid加密 e: uid , a:
export function numToCharacter( e, a = 2 ) {
	var o = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
		r = [];
	for ( let i = 0; i < e.length; i++ ) r.push( e.charAt( i ) );
	var m = "";
	for ( var d in r ) m += "%" + o[ parseInt( r[ d ] ) + a ] + "%";
	return m
}
// 把混淆的字符串解密成需要的字符串
export function declassify( str, sum = 2 ) {
	let string
	try {
		string = String( decodeURI( str ) )
	} catch ( e ) {
		string = str
	}
	var character = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
	var number = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ];
	var myStr = string.substring( 1, string.length - 1 );
	let myArr = myStr.split( "%%" );
	var num = "";
	for ( var k in myArr ) {
		for ( var i = 0; i < character.length; i++ ) {
			if ( myArr[ k ] == character[ i + sum ] ) {
				num += String( i );
			}
		}
	}
	return num
}
//返回时间 默认格式例如：2017-09-29 16:56:52  不传参则返回当前时间
export function returnTime( time, format = '-', whether = true ) {
	let date = ''
	if ( time ) {
		date = new Date( time )
	} else {
		date = new Date()
	}
	let month = ( date.getMonth() + 1 ) > 9 ? date.getMonth() + 1 : '0' + Number( date.getMonth() + 1 );
	let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
	let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
	let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
	let seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
	if ( whether ) {
		return `${date.getFullYear()}${format}${month}${format}${day} ${hours}:${minutes}:${seconds}`
	} else {
		return `${date.getFullYear()}${format}${month}${format}${day}`
	}
}
export const localStore = {
	//存数据
	set: ( key, value, pre ) => {
		let prefix = pre ? pre : 'wvmp360';
		return window.localStorage.setItem( prefix + key, value );
	},
	//取数据
	get: ( key, pre ) => {
		let prefix = pre ? pre : 'wvmp360';
		return window.localStorage.getItem( prefix + key ) ? window.localStorage.getItem( prefix + key ) : false;
	},
	delete: ( key, pre ) => {
		let prefix = pre ? pre : 'wvmp360';
		// console.log( 111, window.localStorage.removeItem( prefix + key ) );
		return window.localStorage.removeItem( prefix + key )
	}
}
export const selectorFunction = ( selector, context ) => {
	// 已实现：
	// $('#div1') ID选择器 （直接返回对象）
	// $('.aCur') 类选择器
	// $('div') 元素选择器
	// $('#div1 li') 组合选择器
	// $('input[type=text]:checked') 属性值选择器
	// $('a', myDiv) 选择myDiv下的所有a元素
	//查询表达式必须为字符串，并且不能为空。
	if ( typeof ( selector ) !== 'string' || selector == '' ) return [];
	//使用空格分割，只处理第一个表达式
	var arg = selector.split( ' ' );
	//获取属性
	var attr = '';
	var s = arg[ 0 ].split( ':' )[ 0 ];
	if ( s != arg[ 0 ] ) attr = arg[ 0 ].split( ':' )[ 1 ];
	var val = s.split( '[' )[ 0 ];
	if ( val != s ) val = s.split( '[' )[ 1 ].replace( /[",\]]/g, '' );
	else val = '';
	s = s.split( '[' )[ 0 ];
	var obj = [];
	var sObj = null;
	//当父对象不存在时，使用document;
	context = context || document;
	switch ( s.charAt( 0 ) ) {
	case '#':
		//ID选择器
		sObj = document.getElementById( s.substr( 1 ) );
		if ( sObj ) {
			obj.push( sObj );
		}
		break;
	case '.':
		//类选择器
		var l = context.getElementsByTagName( '*' );
		var c = s.substr( 1 );
		for ( var i = 0; i < l.length; i++ )
			if ( l[ i ].className.search( '\\b' + c + '\\b' ) != -1 ) {
				obj.push( l[ i ] );
			}
		break;
	default:
		//根据tag获取元素
		obj = context.getElementsByTagName( s );
		break;
	}
	// console.log(obj)
	if ( val ) {
		//[t=val]筛选属性匹配
		var l = [];
		var a = val.split( '=' );
		for ( var i = 0; i < obj.length; i++ ) {
			if ( a.length == 2 && obj[ i ][ a[ 0 ] ] == a[ 1 ] ) {
				l.push( obj[ i ] );
			}
		}
		obj = l;
	}
	// console.log(obj)
	if ( attr ) {
		//: 筛选属性匹配
		var l = [];
		for ( var i = 0; i < obj.length; i++ ) {
			if ( obj[ i ][ attr ] ) {
				l.push( obj[ i ] );
			}
		}
		obj = l;
	}
	// console.log(obj)
	if ( arg.length > 1 ) {
		//递归处理表达式后续内容
		//父元素为已获取的所有元素
		var l = [];
		for ( var i = 0; i < obj.length; i++ ) {
			var ll = arguments.callee( selector.substr( arg[ 0 ].length + 1 ), obj[ i ] );
			if ( ll.tagName ) l.push( ll );
			else
				for ( var j = 0; j < ll.length; j++ ) l.push( ll[ j ] );
		}
		obj = l;
	}
	// console.log(obj)
	//去除数组中重复元素
	var l = [];
	for ( var i = 0; i < obj.length; i++ ) obj[ i ].$isAdd = false;
	for ( var i = 0; i < obj.length; i++ ) {
		if ( !obj[ i ].$isAdd ) {
			obj[ i ].$isAdd = true;
			l.push( obj[ i ] );
		}
	}
	obj = l;
	// console.log(obj)
	return obj;
}
/* istanbul ignore next */
export const on = ( function () {
	if ( !isServer && document.addEventListener ) {
		return function ( element, event, handler ) {
			if ( element && event && handler ) {
				element.addEventListener( event, handler, false );
			}
		};
	} else {
		return function ( element, event, handler ) {
			if ( element && event && handler ) {
				element.attachEvent( 'on' + event, handler );
			}
		};
	}
} )();
/* istanbul ignore next */
export const off = ( function () {
	if ( !isServer && document.removeEventListener ) {
		return function ( element, event, handler ) {
			if ( element && event ) {
				element.removeEventListener( event, handler, false );
			}
		};
	} else {
		return function ( element, event, handler ) {
			if ( element && event ) {
				element.detachEvent( 'on' + event, handler );
			}
		};
	}
} )();
/* istanbul ignore next */
export const once = function ( el, event, fn ) {
	var listener = function () {
		if ( fn ) {
			fn.apply( this, arguments );
		}
		off( el, event, listener );
	};
	on( el, event, listener );
}
/* istanbul ignore next */
export function hasClass( el, cls ) {
	if ( !el || !cls ) return false;
	if ( cls.indexOf( ' ' ) !== -1 ) throw new Error( 'className should not contain space.' );
	if ( el.classList ) {
		return el.classList.contains( cls );
	} else {
		return ( ' ' + el.className + ' ' )
			.indexOf( ' ' + cls + ' ' ) > -1;
	}
}
/* istanbul ignore next */
export function addClass( el, cls ) {
	if ( !el ) return;
	var curClass = el.className;
	var classes = ( cls || '' ).split( ' ' );
	for ( var i = 0, j = classes.length; i < j; i++ ) {
		var clsName = classes[ i ];
		if ( !clsName ) continue;
		if ( el.classList ) {
			el.classList.add( clsName );
		} else {
			if ( !hasClass( el, clsName ) ) {
				curClass += ' ' + clsName;
			}
		}
	}
	if ( !el.classList ) {
		el.className = curClass;
	}
}
/* istanbul ignore next */
export function removeClass( el, cls ) {
	if ( !el || !cls ) return;
	var classes = cls.split( ' ' );
	var curClass = ' ' + el.className + ' ';
	for ( var i = 0, j = classes.length; i < j; i++ ) {
		var clsName = classes[ i ];
		if ( !clsName ) continue;
		if ( el.classList ) {
			el.classList.remove( clsName );
		} else {
			if ( hasClass( el, clsName ) ) {
				curClass = curClass.replace( ' ' + clsName + ' ', ' ' );
			}
		}
	}
	if ( !el.classList ) {
		el.className = trim( curClass );
	}
}
/* istanbul ignore next */
export const getStyle = ieVersion < 9 ? function ( element, styleName ) {
	if ( isServer ) return;
	if ( !element || !styleName ) return null;
	styleName = camelCase( styleName );
	if ( styleName === 'float' ) {
		styleName = 'styleFloat';
	}
	try {
		switch ( styleName ) {
		case 'opacity':
			try {
				return element.filters.item( 'alpha' )
					.opacity / 100;
			} catch ( e ) {
				return 1.0;
			}
		default:
			return ( element.style[ styleName ] || element.currentStyle ? element.currentStyle[ styleName ] : null );
		}
	} catch ( e ) {
		return element.style[ styleName ];
	}
} : function ( element, styleName ) {
	if ( isServer ) return;
	if ( !element || !styleName ) return null;
	styleName = camelCase( styleName );
	if ( styleName === 'float' ) {
		styleName = 'cssFloat';
	}
	try {
		var computed = document.defaultView.getComputedStyle( element, '' );
		return element.style[ styleName ] || computed ? computed[ styleName ] : null;
	} catch ( e ) {
		return element.style[ styleName ];
	}
}
/* istanbul ignore next */
export function setStyle( element, styleName, value ) {
	if ( !element || !styleName ) return;
	if ( typeof styleName === 'object' ) {
		for ( var prop in styleName ) {
			if ( styleName.hasOwnProperty( prop ) ) {
				setStyle( element, prop, styleName[ prop ] );
			}
		}
	} else {
		styleName = camelCase( styleName );
		if ( styleName === 'opacity' && ieVersion < 9 ) {
			element.style.filter = isNaN( value ) ? '' : 'alpha(opacity=' + value * 100 + ')';
		} else {
			element.style[ styleName ] = value;
		}
	}
}
export const getArrayFillWith = ( item, count ) => {
	let getter = ( typeof item === 'function' ) ? () => item() : () => item
	let arr = []
	for ( let i = 0; i < count; i++ ) {
		arr[ i ] = getter()
	}
	return arr
}
export const attr = ( elem, name, value ) => {
	if ( typeof value !== 'undefined' ) {
		elem.setAttribute( name, value )
	} else {
		return elem.getAttribute( name ) || ''
	}
}
export const setBanner = ( imgString ) => {
	if ( imgString == "" ) return [];
	var str = imgString;
	// 匹配图片（g表示匹配所有结果i表示区分大小写）
	var imgReg = /<img.*?(?:>|\/>)/gi;
	// 匹配src属性
	var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
	var arr = str.match( imgReg );
	if ( !( arr instanceof Array ) ) return [ imgString ];
	var srcArr = [];
	for ( var i = 0; i < arr.length; i++ ) {
		var src = arr[ i ].match( srcReg );
		//获取图片地址
		if ( src[ 1 ] ) {
			srcArr.push( src[ 1 ] );
		}
		//也可以替换src属性
		if ( src[ 0 ] ) {
			var t = src[ 0 ].replace( /src/i, "href" );
		}
	}
	return srcArr
}
export const inArray = ( arr, key ) => {
	for ( let i = 0; i < arr.length; i++ ) {
		if ( arr[ i ] == key ) {
			return true
		}
	}
	return false
}
export const setFields = ( data = [], fields = [] ) => {
	if ( fields.length == 0 ) return data
	let result = []
	for ( let i = 0; i < data.length; i++ ) {
		let tmp = {}
		for ( let k in data[ i ] ) {
			if ( inArray( fields, k ) ) {
				tmp[ k ] = data[ i ][ k ]
			}
		}
		result.push( tmp )
	}
	return result
}
//匹配cookie
export function getCookie( name, cookie ) {
	if ( !cookie ) return null
	let arr, reg = new RegExp( "(^| )" + name + "=([^;]*)(;|$)" );
	if ( arr = cookie.match( reg ) ) return ( arr[ 2 ] );
	else return null;
}
export function setCookie( c_name, value, expiredays ) {
	var exdate = new Date()
	exdate.setDate( exdate.getDate() + expiredays )
	document.cookie = c_name + "=" + escape( value ) + ( ( expiredays == null ) ? "" : ";expires=" + exdate.toGMTString() + ";path=/" )
}

// 是否是闰年还是平年;
export const isLeapYear = ( year ) => {
	let cond1 = year % 4 == 0;
	let cond2 = year % 100 != 0;
	let cond3 = year % 400 == 0;
	return isLeap = cond1 && cond2 || cond3;
}
export const isIOSWeChat = () => {
	const userAgent = global.navigator.userAgent
	let inWindowsWechat = /WindowsWechat/i.test( userAgent )
	let inIos = /iPhone|iPad|iPod/i.test( userAgent )
	return inWindowsWechat && inIos ? true : false
}


export function dataVideo( Url ) {
	//腾讯视频PC端网址
	var QQVideo_Pc_Tx = '//v.qq.com';
	//腾讯视频移动端端网址
	var QQVideo_Mobile_Tx = '//m.v.qq.com';
	//腾讯视频网址
	var YoukuVideo_Tx = '.youku.com';

	//腾讯视频PC端网址
	//点击事件
	//获取输入框中的值
	var video_Url = Url;
	var video_Url_Id = "";

	if ( video_Url.indexOf( QQVideo_Pc_Tx ) != -1 ) {
		//截取Pc端视频ID
		var Pc_Tx_Id_w = video_Url.substr( 0, video_Url.lastIndexOf( '.' ) );
		video_Url_Id = Pc_Tx_Id_w.substr( Pc_Tx_Id_w.lastIndexOf( '/' ) + 1, Pc_Tx_Id_w.length );
	}
	if ( video_Url.indexOf( QQVideo_Mobile_Tx ) != -1 ) {
		//此时有可能是移动端腾讯视频或优酷视频
		if ( video_Url.indexOf( QQVideo_Mobile_Tx ) != -1 ) {
			/*** 这里是判断移动端视频链接* GetQueryString() // 调用函数获取视频ID*/
			function GetQueryString( name ) {
				var reg = new RegExp( "(^|)" + name + "=([^&]*)(&|$)" );
				var r = video_Url.substr( 1 )
					.match( reg );
				if ( r != null )
					return unescape( r[ 2 ] );
				return null;
			} //截取Pc端视频ID
			video_Url_Id = GetQueryString( "vid" );
		}
	}
	if ( video_Url.indexOf( YoukuVideo_Tx ) != -1 ) {
		if ( video_Url.indexOf( YoukuVideo_Tx ) != -1 ) {
			startIndex = video_Url.indexOf( '/id' ); //获取字符串"id"中i的index
			startIndex += 4; //因为"id_"并不是我们想要的，所以这个index要再加上3
			endIndex = video_Url.indexOf( '==.html' ); //获取字符串"==.html"中第一个等号的index
			video_Url_Id = video_Url.substring( startIndex, endIndex ); //用substring获取子字符串；
		}
	}
	if ( video_Url_Id == "" ) {
		video_Url_Id = video_Url;
	}
	return video_Url_Id;
}
// 获取元素的rect
export function getRect( el ) {
	return {
		top: el.offsetTop,
		left: el.offsetLeft,
		width: el.offsetWidth,
		height: el.offsetHeight
	}
}
/**
 * 频繁操作节流
 * @param  {[function]} func    [触发函数]
 * @param  {[type]} wait    [等待时间]
 * @param  {[type]} mustRun [多长时间必须执行一次]
 * @return {[type]}         [description]
 */
export function throttle( func, wait, mustRun ) {
	var timeout,
		startTime = new Date();

	return function () {
		var context = this,
			args = arguments,
			curTime = new Date();

		clearTimeout( timeout );
		// 如果达到了规定的触发时间间隔，触发 handler
		if ( curTime - startTime >= mustRun ) {
			func.apply( context, args );
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout( func, wait );
		}
	};
};
/**
 * 判断是否是正常的页面url
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export const getRealPath = ( url ) => {
	let imgExp = /(login)|.(jpg|png|jpeg|bmp)/ig
	let otherExp = /w=|p=1|h=/ig

	return imgExp.test( url ) || otherExp.test( url )
}
/**
 * 取两个数中间的随机数
 * @param  {[type]} min [description]
 * @param  {[type]} max [description]
 * @return {[type]}     [description]
 */
export const random = ( min, max ) => {
	return Math.floor( ( max - min ) * Math.random() + min )
}
