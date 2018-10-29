import { hide_footer_router } from '../config/hideFooterRouter'
export default function ( { query, store, route } ) {
	if ( query && !store.getters.routerQuery ) {
		let queryObj = {}
		for ( let i in query ) {
			if ( i == 'aid' ) continue
			if ( i == 'cid' ) continue
			if ( i == 'dt' ) continue
			if ( i == 'dreamHits' ) continue
			if ( i == 'flag' ) continue
			if ( i == 'dreamSmrzuserid' ) continue
			if ( i == 'id' ) continue
			if ( i == 'dreamTitle' ) continue
			if ( i == "type" ) continue
			if ( i == "num" ) continue
			if ( i == "price" ) continue
			if ( i == "title" ) continue
			if ( i == "defpic" ) continue
			if ( i == "timestamp" ) continue
			queryObj[ i ] = query[ i ]
		}
		store.commit( 'SET_ROUTER_QUERY', queryObj )
	}
	// 设置部分footer不显示
	// store.commit( 'SET_FOOTER_SHOW', true );
	// console.log( route.name )
	for ( let v of hide_footer_router ) {
		if ( route.name == v || route.path == v ) {
			store.commit( 'SET_FOOTER_SHOW', false );
		}
	}
}
