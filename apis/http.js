import axios from 'axios'
// const host = ( process.env.NODE_ENV !== 'production' || process.env !== 'production' ) ? process.env.baseUrl + '/api/' : '/api/'
//const host = 'http://localhost/api/'
// const host = 'http://wap.wvmp360.com/api/'
const host = 'http://wvmp.app/api/'
var http = axios.create( {
	baseURL: host
} );
export default http
