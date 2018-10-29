//  文章编辑接口整理
import config from '../index'
//=================编辑文章相关================//
export default {
  //一级分类类表
  classifyList: config.apiHost + '/getartclassListclassid',
  //二级分类列表
  getartclassList: config.apiHost + '/getartclassList',
  //添加文章二级分类
  artclasseditor: config.apiHost + '/artclasseditor',
  //删除分类
  delartclass: config.apiHost + '/delartclass',
  //获取文章列表
  seachuserarticle: config.apiHost + '/seachuserarticle',
  //删除文章delUserArticle
  delUserArticle: config.apiHost + '/delUserArticle',
  //编辑文章
  userarticleeditor: config.apiHost + '/userarticleeditor',
  //获取会员文章数量及粉丝数量
  myuserarticleacount: config.apiHost + '/myuserarticleacount',
  //获取单篇文章
  seachuserarticleone: config.apiHost + '/seachuserarticleone',
  //关注作者
  Concernditor: config.apiHost + '/Concernditor',
  //打赏  orderinforeward
  orderinforeward: config.apiHost + '/orderinforeward',
  //微信图片上传
  wxupload: config.apiHost + '/wxupload',
  //点赞
  addLikes: config.apiHost + '/addLikes',

  //修改文章中心背景

  userpiceditor: config.apiHost + '/userpiceditor',
  // 微信打赏
  orderinforewardwx: config.apiHost + '/orderinforewardwx',
  //粉丝及关注
  getConcernList: config.apiHost + '/getConcernList',
  //删除关注
  delConcern: config.apiHost + '/delConcern',
  
  //获取粉丝列表
  getfans: config.apiHost + '/getfans',
}
