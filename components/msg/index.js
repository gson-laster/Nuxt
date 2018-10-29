import Vue from 'vue'
import Msg from './msg'
let instance;
// toast 是否存在的标记位
let showing = false;
// init constructor
let ToastConstructor = Vue.extend( Msg );
// init toast instance
let initInstance = ( bottom ) => {
  instance = new ToastConstructor( {
    el: document.createElement( 'div' )
  } );
  document.body.appendChild( instance.$el );
}
// 显示
let msg = ( content, timer = 1500, sty = true ) => {
  // 如果没有显示, 则不显示
  if ( !showing ) {
    showing = true;
    initInstance();
    instance.show = true;
    instance.msg = content;
    instance.timer = timer;
    instance.sty = sty;
    // 在指定 duration 之后干掉 toast
    setTimeout( () => {
      showing = false;
      instance.show = false;
      instance.sty = false;
    }, instance.timer );
  }
}

function random( min, max ) {
  return Math.floor( min + Math.random() * ( max - min ) );
}
export default {
  install( Vue ) {
    Vue.prototype.$msg = msg;
    Vue.prototype.$random = random
  }
};
