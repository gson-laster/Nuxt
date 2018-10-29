import {
	mapGetters
} from 'vuex'
export default {
	computed: { ...mapGetters( [ 'get_router_query', ] ) },
	methods: {
		setQuery( query ) {
			return Object.assign( {}, this.get_router_query, query )
		}
	}
}
