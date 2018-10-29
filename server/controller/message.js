/**
 * 全站消息处理类
 * 接收io和socket对象
 */
const findWhere = require( 'lodash.findwhere' );
class message {
	constructor( io, socket ) {
		// get client online action
		socket.emit( 'online', this.putOnline( socket ) );
		// create server online action
		socket.on( 'online', function ( data ) {
			socket.dreamUsername = data // 用于标识用户id和socket
		} )

		// get client message
		socket.on( 'message', ( data ) => {
			this.putMessage( data, io )
		} )
	}

	// get client online action
	getOnLine( data ) {
		console.log( 'online data', data );
		this.socket.dreamUsername = data
	}

	// put server online action
	putOnline( socket ) {
		return {
			code: 2000,
			msg: '链接服务器成功'
		}
	}

	// get client liststatus action
	getListStatus( data ) {}

	// put server liststatus action
	putListStatus() {}

	// get client message action
	getMessage( data ) {}

	/**
	 * 接收客户端的消息并转发给指定的客户端
	 * @param  {[type]} data [客户端数据]
	 * @param  {[type]} io   [服务端socket实例]
	 * @return {[type]}      [description]
	 */
	putMessage( data, io ) {
		let toName = data.to
		let content = data.content
		var toSocket;
		if ( toSocket = findWhere( io.sockets.sockets, {
				dreamUsername: toName + ''
			} ) ) {
			toSocket.emit( 'message', {
				code: 2000,
				msg: '消息发送成功',
				message: {
					content: content,
					from: toName,
					msgType: 'txt', // image, voice, redEnvelope(红包),tranAccount(转账)
					time: new Date() * 1
				}
			} )
		}
		//console.log( toSocket );
	}

	// 单独通知

	// 部分通知
	broadcastToSome( usernames ) {}

	// 全站广播
	broadcastToAll( io ) {
		io.sockets.emit( "msg", {
			data: "hello,all"
		} );
	}
}
module.exports = message