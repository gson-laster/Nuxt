/**
 * File 处理类
 */

import {
	ajaxReturn
} from '../utils'
import fs from 'fs'

/**
 * base64上传
 * @return {[type]} [description]
 */
export const base64Upload = ( baseString ) => {
	if ( !baseString || baseString == '' ) return ajaxReturn( 4000, 'success', 'baseString not empty' )
	return new Promise( ( resolve, reject ) => {
		let base64Data = baseString.replace( /^data:image\/\w+;base64,/, "" );
		let dataBuffer = new Buffer( base64Data, 'base64' );
		let filePath = 'public/resources/' + Date.now() + '.png';
		fs.writeFile( filePath, dataBuffer, function ( err ) {
			if ( err ) {
				reject( err )
			} else {
				resolve( ajaxReturn( 2000, 'success', '成功', {
					path: filePath
				} ) )
			}
		} );
	} )
}

/**
 * file上传
 * @return {[type]} [description]
 */
export const fileUpload = () => {}

/**
 * 删除文件
 * @return {[type]} [description]
 */
export const deleteFile = ( filePath ) => {
	if ( !filePath || filePath == '' ) return ajaxReturn( 4000, 'success', 'filePath not empty' )
	return new Promise( ( resolve, reject ) => {
		fs.unlink( filePath, ( err ) => {
			if ( err ) reject( ajaxReturn( 4000, 'fail', err ) )
			else resolve( ajaxReturn( 2000, 'success', '成功' ) )
		} )
	} )
}
