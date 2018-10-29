import bodyParser from 'koa-bodyparser'
import session from 'koa-session2'
import koaBody from 'koa-body'
const logger = require( './logger' )
export const addBody = app => {
	app.use( koaBody( {
		multipart: true,
		"formLimit": "5mb",
		"jsonLimit": "5mb",
		"textLimit": "5mb"
	} ) );
	app.use( bodyParser() )
}
// session
export const addSession = app => {
	app.keys = [ 'got' ]
	const CONFIG = {
		key: 'wvmp360',
		maxAge: 86400000,
		overwrite: true,
		signed: true,
		rolling: false,
	}
	app.use( session( CONFIG, app ) )
	logger( app ) // 记录日志
}
