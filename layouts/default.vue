<template>
<div>
	<nuxt/>
	<my-footer class="footer" v-show="getFooterShow" />
</div>
</template>

<script>
import MyFooter from '~components/Footer.vue'
import { declassify, getCookie } from '~static/js/util'
import {mapGetters} from 'vuex'

export default {
  // 'saveUserInfo',
	middleware: ['routerQuery', 'auth-share','saveUserInfo', 'login'],
  mounted(){},
	components: {
		MyFooter
	},
	transition: (to, from) => {
		if (!from) return 'slide-left'
		return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
	},
	computed: {
		...mapGetters([
      'getFooterShow'
    ]),
	},

}
</script>

<style>

</style>
