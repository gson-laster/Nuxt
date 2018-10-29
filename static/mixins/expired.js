/**
 * 过期用户弹窗提示
 */
export default {

	methods: {
		async expired( dreamEndTime ) {
			// 设置过期store
			let nowTimeStamp = new Date().getTime()
			if ( dreamEndTime && dreamEndTime !== '' && Number( dreamEndTime ) < Number( nowTimeStamp ) ) {
				await this.$store.dispatch( 'setUserDude', true )
				this.$dialog( {
					title: '过期提醒',
					content: '您的值享名片已过期，名片299/年，是否立即续费使用？',
					cancel: ( status ) => {},
					confirm: () => {
						this.$store.dispatch( 'setExpiredStatus', false )
						this.$router.push( {
							path: '/wusercenter/vip/openNow',
							query: this.$route.query
						} )
					}
				} )
			} else {
				await this.$store.dispatch( 'setUserDude', false )
			}
		}
	}
}
