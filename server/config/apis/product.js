import config from '../index'
export default {
  brandclasslist: config.apiHost + '/brandclasslist', //获取产品页产品分类;
  brandclassone: config.apiHost + '/brandclassone', //获取产品页产品分类下单个分类列表;
  seachBrandProduct3: config.apiHost + '/seachBrandProduct3', //获取品牌产品;
  scbrandproductone: config.apiHost + '/scbrandproductone', //获取单个产品信息;
  brandProductList: config.apiHost + '/brandProductList', //获取同类产品;
  brandorderlist: config.apiHost + '/brandorderlist', //获取订单列表;
  addbrandorder: config.apiHost + '/addbrandorder', //添加品牌订单;
  scBrandIdListnew: config.apiHost + '/scBrandIdListnew'
}
