import Koa from 'koa'
import Nuxt from 'nuxt'
import R from 'ramda'
import { resolve } from 'path'
const message = require( './controller/message' );
// Import and Set Nuxt.js options
let config = require( '../nuxt.config.js' )
config.dev = !( process.env.NODE_ENV === 'production' )
const r = path => resolve( __dirname, path )
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const MIDDLEWARE = [ 'general', 'router' ]
class Server {
	constructor() {
		this.app = new Koa()
		// middlewares
		this.useMiddleWare( this.app )( MIDDLEWARE )
		// support socket.io
		// this.server = require( 'http' )
		// 	.Server( this.app.callback() );
		// const io = require( 'socket.io' )( this.server );
		//
		// io.set( 'heartbeat interval', 60000 );
		// io.set( 'heartbeat timeout', 5000 );
		//
		// // socket handle
		// io.on( 'connection', function ( socket ) {
		// 	new message( io, socket )
		// } );
	}
	useMiddleWare( app ) {
		return R.map( R.compose( R.map( i => i( app ) ), require, i => `${r('./middlewares')}/${i}` ) )
	}
	async start() {
		// Instanciate nuxt.js
		const nuxt = await new Nuxt( config )
		// Build in development
		if ( config.dev ) {
			try {
				await nuxt.build()
			} catch ( e ) {
				console.error( e ) // eslint-disable-line no-console
				process.exit( 1 )
			}
		}
		this.app.use( async ( ctx, next ) => {
			ctx.status = 200 // koa defaults to 404 when it sees that status is unset
			await nuxt.render( ctx.req, ctx.res )
		} )
		this.app.listen( port, host )
		console.log( 'Server listening on ' + host + ':' + port ) // eslint-disable-line no-console
	}
}
const app = new Server()
app.start()
