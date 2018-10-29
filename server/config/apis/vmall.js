import config from '../index'
export default {
  getvmallList: config.apiHost + '/getvmallList', // 商品列表
  getvmallinfo: config.apiHost + '/getvmallinfo', // 商品详情
  addshopcar: config.apiHost + '/addshopcar', // 加入购物车
  seachshopcar: config.apiHost + '/seachshopcar', // 购物车列表
  vmallorder: config.apiHost + '/vmallorder', //立即购买,
  getvmalllist: config.apiHost + '/getvmalllist', //获取订单列表;
  getvmcount: config.apiHost + '/getvmcount', //获取订单数据 
  getVmallListhyc: config.apiHost + '/getVmallListhyc', //获取收藏列表;
  changuserfavorite: config.apiHost + '/changuserfavorite', //设置为收藏;
  editorshopcar: config.apiHost + '/editorshopcar', //编辑购物车的数量,
  delshopcar: config.apiHost + '/delshopcar',//删除购物车
  seachshopcars:config.apiHost+'/seachshopcars',//批量获取购物车信息;
}
