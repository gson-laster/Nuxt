import { localStore } from '../js/util'

/**
 * 获取本地localstore userInfo
 * @return {[type]} [description]
 */
export const getLocalUser = () => {
	let userData = localStore.get( 'userInfo', 'wvmp360' );
	return userData ? userData.userInfo : NULL;
}
