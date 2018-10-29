import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
const loading = require( '~static/img/loading.gif' );
Vue.use( VueLazyload, {
  preLoad: 1.3,
  error: 'https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b3119313b07eca80e351d076942397dda04483cf.jpg',
  loading: loading,
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
} )
