const app_id = 'TY4165710472'
const app_secret = 'GZADPUMGFKMW7VKU6UD6TRVH6WPWHT7KEXYMM6TJBQ2RXQG1QPAYM3PSI5CCSJ84'
import { createajaxData, nonce } from '~static/js/util'
import querystring from 'querystring'

function sign( params ) {
  params.app_id = app_id
  params.app_secret = app_secret
  params.nonce = nonce()
  let signData = createajaxData( params )
  if ( signData.content ) {
    signData.content = signData.content.replace( '&', '%26' );
  }
  return signData
}

export const getTyApi = ( params ) => {
  return "http://api.tywebs.cn/api/router?" + querystring.stringify( sign( params ) )
}
