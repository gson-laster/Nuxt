// 申请成为代理的接口;
import config from '../index'
export default{
  editorPurpose: config.apiHost + '/editorPurpose', //选择预存额度
  addPurpose: config.apiHost + '/addPurpose', // 选择购买名额,
  getOpenpermit: config.apiHost + '/getOpenpermit', //用户开通码信息;
  getOpenuserrecode: config.apiHost + '/getOpenuserrecode', //已使用开通码&未使用开通码;
  getcdkeys: config.apiHost + '/getcdkeys', //生成开通码
  getUserList2new: config.apiHost + '/getUserList2new', //未认证会员和认证会员
  getCountByIsOkTime2new: config.apiHost + '/getCountByIsOkTime2new', //会员认证统计,
  addPurpose: config.apiHost + '/addPurpose',//购买名额,
  openuser:config.apiHost+'/openuser',//利用开通码开通账号  


}

