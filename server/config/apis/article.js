/**
 *  文章接口整理
 */
import config from '../index'
export default {
  // wv接口
  ArtclesList: config.apiHost + '/ArtclesList', // wv article api
  articlesone: config.apiHost + '/articlesone', // wv article detail
  classlist: config.apiHost + '/classlist', // wv category
  indextjlist: config.apiHost + '/indextjlist', // wv index page recommond
  // 品牌文章接口
  BrandNewsList: config.apiHost + '/BrandNewsList', // brand article api
  brandnewsclasslist: config.apiHost + '/brandnewsclasslist', // brand article category
  ibrandindetj: config.apiHost + '/ibrandindetj', // brand index recommond
  BrandNewsone: config.apiHost + '/BrandNewsone', // brand article detail
  editorCollview: config.apiHost + '/editorCollview', // 转载添加
  getCollviewList: config.apiHost + '/getCollviewList', // 转载文章获取
  delCollview: config.apiHost + '/delCollview', // 转载文章删除
}
