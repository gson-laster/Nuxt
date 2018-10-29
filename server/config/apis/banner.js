import config from '../index'
export default {
  // 非WV品牌首页、名片、产品轮播图;
  scbrandbanner: config.apiHost + '/scbrandbanner', //获取产品轮播图;

  // WV品牌首页、名片轮播图;
  ibannerlist: config.apiHost + '/ibannerlist', //获取名片页轮播图;
  // WV品牌旅游轮播图;
  secListBanners: config.apiHost + '/secListBanners', //获取旅行轮播图;
  // WV品牌VB商城轮播图;
  getvmallBanner: config.apiHost + '/getvmallBanner', //获取VB商城轮播图,
  //获取美文广场轮播图;
  getuserartbannerList:config.apiHost +'/getuserartbannerList',//获取美文广场轮播图列表  
}
