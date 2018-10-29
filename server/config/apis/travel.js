import config from '../index'
export default {
  // 旅行页;
  lytcclass: config.apiHost + '/lytcclass', // 旅游分类
  lytczt: config.apiHost + '/lytczt', //获取旅行主题分类;
  lytcopz: config.apiHost + '/lytcopz', //获取旅行列表;
  lytcone: config.apiHost + '/lytcone', //获取旅行详情;
  orderlytc: config.apiHost + '/orderlytc', //名片页注册成为会员;
  secLytcBylike:config.apiHost+'/secLytcBylike' //点赞
}
