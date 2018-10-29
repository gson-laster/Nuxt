import config from '../index'
export default {
  // 获取图标;
  getusermenu: config.apiHost + '/getusermenu', //获取图标

  // 添加图标或修改图标;
  editorusermenu: config.apiHost + '/editorusermenu',
  
  // 删除图标
  delusermenu:config.apiHost+'/delusermenu'
}