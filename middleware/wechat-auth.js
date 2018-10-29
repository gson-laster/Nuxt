import { getOAuthUrl } from '~/apis/wechat'
export default function ( { store, route, redirect } ) {
  if ( !store.state.authUser ) {
    let { fullPath } = route
    fullPath = encodeURIComponent( fullPath.substr( 1 ) )
    return redirect( '/api/wechat-redirect?target=' + fullPath )
  }
}
