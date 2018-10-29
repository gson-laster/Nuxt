const tip = '欢迎关注！值享名片—让您的分享更有价值！是您宣传事业的好帮手！'
import { getUserInfo } from '../controller/user'
import config from '../config'
import { numToCharacter } from '../utils'
export default async ( ctx, next ) => {
	const message = ctx.weixin

	if ( message.MsgType === 'event' ) {
		if ( message.Event === 'subscribe' ) {
			if ( message.EventKey && message.Ticket ) {
				// 扫二维关注
				let phone = message.EventKey.split( '_' )
				let userInfo = await getUserInfo( phone[ 1 ] )
				if ( userInfo.code == 2000 ) {
					let user = userInfo.data.userInfo[ 0 ]
					let title = ( user.dreamFullname && user.dreamFullname != null && user.dreamFullname != 'null' ) ? user.dreamFullname + '的名片' : '名片推荐'
					let dreamServicename = user.dreamServicename && '职位:' + user.dreamServicename != null ? user.dreamServicename : ''
					let dreamAddress = user.dreamAddress && user.dreamAddress != null ? '地址:' + user.dreamAddress : ''
					let description = dreamServicename + '\n\r' + dreamAddress
					let url = config.site_daemon + '/newcard?uid=' + encodeURIComponent( numToCharacter( user.dreamUsername, 2 ) ) + '&brand=' + user.dreamBranddefault + '&is_share=1'
					console.log( 'title', title )
					console.log( 'user.dreamFullname', user.dreamFullname )
					ctx.body = [ {
						title: title,
						description: description,
						picUrl: 'http://cswz.wvmp360.com/img/wechat-report.jpg',
						url: url
          } ]
				}
			} else {
				ctx.body = tip
			}
		} else if ( message.Event === 'unsubscribe' ) {
			console.log( '取关了' )
		} else if ( message.Event === 'LOCATION' ) {
			ctx.body = message.Latitude + ' : ' + message.Longitude
		} else if ( message.Event === 'view' ) {
			ctx.body = message.EventKey + message.MenuId
		} else if ( message.Event === 'pic_sysphoto' ) {
			ctx.body = message.Count + ' photos sent'
		} else if ( message.Event === 'SCAN' ) {
			// 扫二维码
			let userInfo = await getUserInfo( message.EventKey )
			if ( userInfo.code == 2000 ) {
				let user = userInfo.data.userInfo[ 0 ]
				let title = ( user.dreamFullname && user.dreamFullname != null && user.dreamFullname != 'null' ) ? user.dreamFullname + '的名片' : '名片推荐'
				let dreamServicename = user.dreamServicename && '职位:' + user.dreamServicename != null ? user.dreamServicename : ''
				let dreamAddress = user.dreamAddress && user.dreamAddress != null ? '地址:' + user.dreamAddress : ''
				let description = dreamServicename + '\n\r' + dreamAddress
				let url = config.site_daemon + '/newcard?uid=' + encodeURIComponent( numToCharacter( user.dreamUsername, 2 ) ) + '&brand=' + user.dreamBranddefault + '&is_share=1'
				console.log( 'title', title )
				console.log( 'user.dreamFullname', user.dreamFullname )
				ctx.body = [ {
					title: title,
					description: description,
					picUrl: 'http://cswz.wvmp360.com/img/wechat-report.jpg',
					url: url
        } ]
			}
		}
	} else if ( message.MsgType === 'text' ) {
		ctx.body = '' // message.Content
	} else if ( message.MsgType === 'image' ) {
		ctx.body = ''
		/* {
		      type: 'image',
		      mediaId: message.MediaId
		    } */
	} else if ( message.MsgType === 'voice' ) {
		ctx.body = ''
		/* {
		      type: 'voice',
		      mediaId: message.MediaId
		    } */
	} else if ( message.MsgType === 'video' ) {
		ctx.body = ''
		/* {
		      type: 'video',
		      mediaId: message.MediaId
		    } */
	} else if ( message.MsgType === 'location' ) {
		ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
	} else if ( message.MsgType === 'link' ) {
		ctx.body = ''
		/* [ {
		      title: message.Title,
		      description: message.Description,
		      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/xAyPZaQZmH09wYBjskFEQSoM4te0SnXR9YgbJxlDPVPDZtgLCW5FacWUlxFiaZ7d8vgGY6mzmF9aRibn05VvdtTw/0',
		      url: message.Url
		    } ] */
	}
}
