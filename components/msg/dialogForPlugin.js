import Vue from 'vue'
import Dialog from './dialogplugin'
let instance;
// toast 是否存在的标记位
let showing = false;
// init constructor
let ToastConstructor = Vue.extend( Dialog );
// init toast instance
let initInstance = ( bottom ) => {
	instance = new ToastConstructor( {
		el: document.createElement( 'div' )
	} );
	document.body.appendChild( instance.$el );
}
// 显示
let dialog = ( options ) => {
	let defaultOptions = {
		show: true,
		content: '',
		title: '操作提示',
		cancelText: '取消',
		confirmText: '确认',
		cancelStatus: true,
		cancel: () => {},
		confirm: () => {}
	}
	options = options instanceof Object ? Object.assign( {}, defaultOptions, options ) : Object.assign( {}, defaultOptions, { content: options } )
	// 如果没有显示, 则不显示
	if ( !showing ) {
		showing = true;
		initInstance();
		let cancelHandel = instance.cancel
		let confirmHandel = instance.confirm
		for ( var k in options ) {
			instance[ k ] = options[ k ]
		}

		instance.cancel = function () {
			cancelHandel()
			showing = false
			options.cancel.call();
		}
		instance.confirm = function () {
			confirmHandel()
			showing = false
			options.confirm.call();
		}

	}

}

export default {
	install( Vue ) {
		Vue.prototype.$dialog = dialog;
	}
};
