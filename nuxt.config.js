const path = require( 'path' )
module.exports = {
	/*
	 ** Headers of the page
	 */
	head: {
		title: ' ',
		// titleTemplate: '%s',
		meta: [ {
			charset: 'utf-8'
    }, {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }, {
			name: 'apple-mobile-web-app-capable',
			content: 'yes'
    }, {
			name: 'apple-mobile-web-app-status-bar-style',
			cotent: 'black-translucent'
    }, {
			'http-equiv': 'X-UA-Compatible',
			content: 'IE=edge'
    }, {
			name: 'description',
			content: '值享名片服务平台'
    }, {
			name: 'keywords',
			content: '值享名片服务平台'
    } ],
		script: [
			{
				src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
      },
			{
				src: 'https://cdn.bootcss.com/socket.io/2.0.4/socket.io.js'
      },
      // {
      //   innerHTML: 'const socket = io.connect( "http://127.0.0.1:3000/" );',
      //   type: 'text/javascript',
      //   body: true
      // }
			// { src: 'http://xzg168.weix360.cn/js/vconsole.js' }
    ],
		__dangerouslyDisableSanitizers: [ 'script' ], // 定义不转义的标签
		link: [
			{
				href: 'http://cswz.wvmp360.com/css/iconfont/iconfont.css',
				type: 'text/css',
				rel: 'stylesheet'
      },
			{
				href: 'http://cswz.wvmp360.com/css/main.css',
				type: 'text/css',
				rel: 'stylesheet'
      }
    ]
	},

	/*
	 ** Global CSS
	 */
	// css: [ '~static/css/main.css', '~static/css/iconfont/iconfont.css' ],
	vender: [ 'axios' ],
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: '#1AAD19'
	},
	// loading: true,

	// build: {
	//   babel: {
	//     presets: [ "es2015", 'stage-3', 'latest-node' ],
	//     plugins: [ 'transform-async-to-generator', 'transform-runtime' ],
	//     comments: true
	//   }
	// },
	plugins: [ {
			src: '~plugins/lazyload',
			ssr: false
  }, {
			src: '~plugins/msg',
			ssr: false
  }, {
			src: '~plugins/dialog',
			ssr: false
  },
	// 	{
	// 		src: '~plugins/raven',
	// 		ssr: false
  // }
],
	// loading: {
	//   color: '#F44336'
	// },
	performance: {
		prefetch: true
	},
	env: {
		baseUrl: process.env.BASE_URL || 'http://127.0.0.1:3000'
	},
	router: {}
	// cache: {
	//   max: 1000,
	//   maxAge: 900000
	// },
}
