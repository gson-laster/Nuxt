import { wxupload } from '~/apis/editarticle.js'

function isIOSWeChat() {
	const userAgent = global.navigator ? global.navigator.userAgent : ''
	let inWindowsWechat = /WindowsWechat/i.test( userAgent )
	let inIos = /iPhone|iPad|iPod/i.test( userAgent )
	return inWindowsWechat && inIos ? true : false
}
export default {

	methods: {
		async wechatInit( url, shareOpts, isShare = true ) {

			const wx = window.wx
			const _this = this
			if ( !wx ) return
			const res = await this.$store.dispatch( 'getWechatSignature', url )
			const { data, code } = res
			if ( code != 2000 ) throw new Error( '不能成功获取服务器签名！' )
			//alert( '微信返回：' + data.url )
			wx.config( {
				debug: false,
				appId: data.appid, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.noncestr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: [ 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'chooseImage', 'uploadImage' ]
			} )
			wx.ready( () => {
				// url = url + '&is_share=1'
				if ( isShare ) {
					this.wechatShare( shareOpts )
				}
			} )
			wx.error( ( res ) => {
				console.log( res );
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				if ( typeof window.entryUrl === 'undefined' || window.entryUrl === '' ) {
					window.entryUrl = location.href.split( '#' )[ 0 ]
				}
				let signLink = /(Android)/i.test( navigator.userAgent ) ? location.href.split( '#' )[ 0 ] : window.entryUrl;
				console.log( signLink );
				this.wechatInit( signLink, shareOpts, isShare );
			} )
		},
		wechatShare( { title = "", link, desc, imgUrl, type, dataUrl, success, cancel } ) {
			const wx = window.wx
			imgUrl = imgUrl.replace( '\\', '/' )
			imgUrl = imgUrl.replace( '\\\\', '/' )
			link = link.indexOf( 'is_share' ) == -1 ? link + '&is_share=1' : link
			wx.onMenuShareTimeline( {
				title: title, // 分享标题
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: imgUrl, // 分享图标
				success: success || ( () => {} ), // 用户确认分享后执行的回调函数,
				cancel: cancel || ( () => {} ) // 用户取消分享后执行的回调函数
			} )
			wx.onMenuShareAppMessage( {
				title: title, // 分享标题
				desc: desc || '', // 分享描述
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: imgUrl, // 分享图标
				type: type || 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
				success: success || ( () => {} ), // 用户确认分享后执行的回调函数,
				cancel: cancel || ( () => {} ) // 用户取消分享后执行的回调函数
			} )
		},
		showMenuItems() {
			wx.showAllNonBaseMenuItem();
		},
		//图片上传
		choiceImg( number = 1, option = { tranfer: true } ) {
			let _this = this

			return new Promise( ( resolve, reject ) => {
					wx.chooseImage( {
						count: number, // 默认1
						sizeType: [ 'original', 'compressed' ], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: [ 'album', 'camera' ], // 可以指定来源是相册还是相机，默认二者都有
						success: function ( res ) {

							var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							if ( option.tranfer ) {
								let ress = _this.uploadss( { localIds: localIds } )
								resolve( ress )
							} else {
								resolve( localIds )
							}
						}
					} );
				} )
				.catch( error => {
					reject( error )
				} )
		},
		uploadss( option = { isShowProgressTips: 1, localIds: [] } ) {
			return new Promise( ( resolve, reject ) => {
				var arr = []
				var loAndSer = []
				var localIdAndserverId = 'ServerId=[{' //ServerId=[{wxLocalResource://imageid987654321123456789:%20"1237378768e7q8e7r8qwesafdasdfasdfaxss111"}]
				var localIds = option.localIds
				selL( localIds.slice() )

				function selL( localIdsss ) {
					let i = localIdsss.pop()
					wx.uploadImage( {
						localId: i, // 需要上传的图片的本地ID，由chooseImage接口获得
						isShowProgressTips: option.isShowProgressTips, // 默认为1，显示进度提示
						success: function ( res ) {
							localIdAndserverId = localIdAndserverId + '"' + i + '":"' + res.serverId + '",';
							arr.push( res.serverId )
							let loca = i
							let json = {}
							json[ loca ] = res.serverId
							loAndSer.push( json )
							if ( localIdsss.length == 0 ) {
								localIdAndserverId = localIdAndserverId.slice( 0, localIdAndserverId.length - 1 )
								localIdAndserverId = localIdAndserverId + '}]'
								resolve( { serverId: arr, localIdAndserverId: localIdAndserverId, loAndSer: loAndSer, localId: localIds } )
							} else {
								selL( localIdsss )
							}
						},
						fail: function ( res ) {
							resolve( { code: 4000, msg: 'fail' } )
						}
					} );
				}

			} )
		},
		wxuploads( serverId ) {
			return new Promise( ( resolve, reject ) => {
				if ( serverId.length == 0 ) {
					resolve( [] )
				} else {
					if ( typeof serverId == 'string' ) {
						var str = serverId
					} else {
						var str = 'ServerId=[{'
						for ( let i in serverId ) {
							for ( let j in serverId[ i ] ) {
								str = str + '"' + j + '":"' + serverId[ i ][ j ] + '",';
							}
						}
						str = str.slice( 0, str.length - 1 )
						str = str + '}]'
					}
					wxupload( str )
						.then( res => {
							resolve( res.data.data )
						} )
						.catch( e => {
							console.log( e );
						} )
				}
			} )
		}
	},

}
