import http from '~/apis/http'
const baseUrl = ''
const axios = http
class Services {
  // ================文章============//
  // 获取首页最新文章
  getArticleNew( data ) {
    return axios.post( '/getArticle', data )
  }
  // =================用户================//
  // 用户登录;
  userLogin( data ) {
    return axios.post( '/login', data );
  }
  // 用户退出登录;
  userLoginOut() {
    return axios.post( '/loginOut' )
  }
  // 修改用户信息一项或者多项;
  change( data ) {
    return axios.post( '/change', data )
  }

  // 用户进行实名认证;
  applyAuthenticatition( data ) {
    return axios.post( '/applyAuthenticatition', data );
  }

  // 获取用户实名信息;
  getAuthenticateInfo( user ) {
    return axios.get( '/getAuthenticateInfo', {
      params: {
        dreamSmrzuserid: user
      }
    } )
  }

  //=====================品牌==================//
  // 获取所有的品牌列表;
  getBrandList( data ) {
    return axios.post( '/getBrandList', data );
  }


  //==============名片=============//
  //获取所有名片模板;
  getCardTemplateList( data ) {
    return axios.post( '/getCardTemplateList', data )
  }


  //=====================微信==================//
  // 获取微信配置信息;
  getWechatSignature( url ) {
    return axios.post( '/getWechatConfig', url );
  }

  //==============音乐==============//
  //获取编辑用户信息音乐列表;
  getUserMusicList() {
    return axios.post( '/getUserMusicList' );
  }


  // ==========VB相关=======//
  // 获取VB充值列表;
  getUserVBczList( data ) {
    return axios.post( '/getUserVBczList', data );
  }
  //获取付钱啦信息;
  getVBorderInfo( data ) {
    return axios.post( '/getVBorderInfo', data );
  }
  //获取VB提现列表;
  getVBWithdrawList( data ) {
    return axios.post( '/getVBWithdrawList', data );
  }

  // 获取VB转送列表;
  getVBvbzsList( user, index ) {
    return axios.get( '/getVBvbzsList', {
      params: {
        dreamUserid: user,
        index: index
      }
    } );
  }
  // VB转送;



  // =====配置相关=====//
  //获取网站配置;
  getConfigInfo( data ) {
    return axios.post( '/getConfigInfo', data );
  }
}
export default new Services()
