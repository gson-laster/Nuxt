// 传入{};src=传入的值,w=宽,h=高,q=质量,address=默认图片地址;
export default {
	methods: {
		setImgUrl( options ) {
			options = options ? options : {}
			options.src = options.src ? options.src : ''
			options.w = options.w ? options.w : 80
			options.h = options.h ? options.h : 80
			options.address = options.address ? options.address : ''
			options.p = options.p ? options.p : 0
			options.f = options.f ? options.f : 'jpg'
			options.isAuto = options.isAuto ? options.isAuto : 1 //1或2
			if (options.src.indexOf('data:image/') != -1) {
				return options.src
			}
			if ( options.isAuto == 2 ) {
				if ( options.src && options.src !== 'null' ) {
					if ( options.src.indexOf( 'http' ) != -1 ) {
						return options.src
					} else if ( options.src.indexOf( '_nuxt' ) != -1 || options.src.indexOf( 'wxLocalResource' ) != -1 ) {
						return options.src
					} else {
						return '/' + options.src
					}
				} else {
					return options.address
				}
			}
			if ( options.src && options.src !== 'null' ) {
				if ( options.src.indexOf( 'http' ) != -1 ) {
					return options.src + '?w=' + Number( options.w * 2 ) + '&h=' + Number( options.h * 2 ) + '&p=' + options.p + "&f=" + options.f
				} else if ( options.src.indexOf( '_nuxt' ) != -1 || options.src.indexOf( 'wxLocalResource' ) != -1 ) {
					return options.src
				} else {
					return '/' + options.src + '?w=' + Number( options.w * 2 ) + '&h=' + Number( options.h * 2 ) + '&p=' + options.p
				}
			} else {
				return options.address
			}
		}
	}
}
