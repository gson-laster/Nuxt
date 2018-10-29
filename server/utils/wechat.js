import request from 'request-promise'
import {
	wechat
} from '../config'
import fs from 'fs'
import * as _ from 'lodash'
import {
	resolve
} from 'path'
import { isInteger } from './index'
import WechatOAuth from './wechatOauth'
const r = path => resolve(__dirname, path)
const wechat_base = 'https://api.weixin.qq.com/cgi-bin/'
const wechat_apis = {
  accessToken: wechat_base + 'token?grant_type=client_credential',
  ticket: {
    get: wechat_base + 'ticket/getticket?'
  },
  temporary: {
    upload: wechat_base + 'media/upload?',
    fetch: wechat_base + 'media/get?'
  },
  permanent: {
    upload: wechat_base + 'material/add_material?',
    uploadNews: wechat_base + 'material/add_news?',
    uploadNewsPic: wechat_base + 'media/uploadimg?',
    fetch: wechat_base + 'material/get_material?',
    del: wechat_base + 'material/del_material?',
    update: wechat_base + 'material/update_news?',
    count: wechat_base + 'material/get_materialcount?',
    batch: wechat_base + 'material/batchget_material?'
  },
  send: {
    toUser: wechat_base + 'message/mass/send?'
  },
  qrcode: {
    create: wechat_base + 'qrcode/create?'
  },
  message: {
    customSend: wechat_base + 'message/custom/send?'
  },
  menu: {
    create: wechat_base + 'menu/create?',
    get: wechat_base + 'menu/get?',
    del: wechat_base + 'menu/delete?',
    addCondition: wechat_base + 'menu/addconditional?',
    delCondition: wechat_base + 'menu/delconditional?',
    getInfo: wechat_base + 'get_current_selfmenu_info?'
  }
}
const accessTokenPath = r('../data') + '/wechat_accesstoken.txt'
const ticketPath = r('../data') + '/wechat_ticket.txt'
export default class Wechat {
  constructor (opts) {
    this.opts = Object.assign({}, opts)
    this.appid = opts.appid
    this.appsecret = opts.appsecret
		// this.fetchAccessToken()
  }
	/**
	 * 请求方法封装
	 * @param  {[type]}  options [description]
	 * @return {Promise}         [description]
	 */
  async request (options) {
    options = Object.assign({}, options, {
      json: true
    })
    try {
      const response = await request(options)
      return response
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * 调用方法
   * @param  {[type]}  operation [description]
   * @param  {[type]}  args      [description]
   * @return {Promise}           [description]
   */
  async handle (operation, ...args) {
    const tokenData = await this.fetchAccessToken()
    const options = this[operation](tokenData.access_token, ...args)
    const data = await this.request(options)

    return data
  }
	/**
	 * 对外提供accesstoken
	 * @return {Promise} [description]
	 */
  async fetchAccessToken () {
    let data = await this.getAccessToken()
    let dataObj
    try {
      dataObj = JSON.parse(data)
    } catch (e) {
      dataObj = {}
    }
    if (!this.isValidToken(dataObj, 'access_token')) {
      dataObj = await this.updateAccessToken()
      await this.saveAccessToken(dataObj)
    }
    return dataObj
  }
	/**
	 * 内部获取或者存储accesstoken
	 * @return {Promise} [description]
	 */
  async getAccessToken () {
    return new Promise((resolve, reject) => {
      fs.readFile(accessTokenPath, {
        flag: 'r+',
        encoding: 'utf8'
      }, function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
	/**
	 * 保存accesstoken
	 * @param  {[type]}  data [description]
	 * @return {Promise}      [description]
	 */
  async saveAccessToken (data) {
    fs.unlink(accessTokenPath, (err) => {
      if (err) {
        console.log(err)
      }
      fs.appendFile(accessTokenPath, JSON.stringify(data), {
        flag: 'a'
      }, function (err) {
        if (err) {
          console.error(err)
        } else {
          console.log('写入成功')
        }
        return false
      })
      return true
    })
  }
	/**
	 * 内部更新accesstoken
	 * @return {Promise} [description]
	 */
  async updateAccessToken () {
    const url = wechat_apis.accessToken + '&appid=' + this.appid + '&secret=' + this.appsecret
    const data = await this.request({
      url: url
    })
    const now = (new Date()
			.getTime())
    const expiresIn = now + (data.expires_in - 20) * 1000
    data.expires_in = expiresIn
    return data
  }
	/**
	 * 对外提供ticket
	 * @param  {[type]}  token [description]
	 * @return {Promise}       [description]
	 */
  async fetchTicket (token) {
    let data = await this.getTicket()
    let dataObj
    try {
      dataObj = JSON.parse(data)
    } catch (e) {
      dataObj = {}
    }
    if (!this.isValidToken(dataObj, 'ticket')) {
      dataObj = await this.updateTicket(token)
      await this.saveTicket(dataObj)
    }
    return dataObj
  }
	/**
	 * 获取ticket
	 * @return {Promise} [description]
	 */
  async getTicket () {
    return new Promise((resolve, reject) => {
      fs.readFile(ticketPath, {
        flag: 'r+',
        encoding: 'utf8'
      }, function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
	/**
	 * 保存ticket
	 * @param  {[type]}  data [description]
	 * @return {Promise}      [description]
	 */
  async saveTicket (data) {
    fs.unlink(ticketPath, (err) => {
      if (err) {
        console.log(err)
      }
      console.log('data', data)
      fs.appendFile(ticketPath, JSON.stringify(data), {
        flag: 'a'
      }, function (err) {
        if (err) {
          console.error(err)
        } else {
          console.log('写入成功')
        }
        return false
      })
      return true
    })
  }
	/**
	 * 更新ticket
	 * @param  {[type]}  token [description]
	 * @return {Promise}       [description]
	 */
  async updateTicket (token) {
    const url = wechat_apis.ticket.get + '&access_token=' + token + '&type=jsapi'
    let data = await this.request({
      url: url
    })
    let date = new Date()
    const now = date.getTime()
    const expiresIn = now + (data.expires_in - 100) * 1000
    data.expires_in = expiresIn
    return data
  }
	/**
	 * 统一检验过期
	 * @param  {[type]}  data [description]
	 * @param  {[type]}  name [description]
	 * @return {Boolean}      [description]
	 */
  isValidToken (data, name) {
    if (!data || !data[ name ] || !data.expires_in) {
      return false
    }
    const expiresIn = data.expires_in
    const date = new Date()
    const now = date.getTime()
    if (now < expiresIn) {
      return true
    } else {
      return false
    }
  }
	/**
	 * 拉取授权
	 * @return {[type]} [description]
	 */
  getOAuth () {
    const oauth = new WechatOAuth({
      appid: this.appid,
      appsecret: this.appsecret
    })
    return oauth
  }

	/**
	 * 上传素材
	 * @param  {[type]} token     [accesstoken]
	 * @param  {[type]} type      [上传素材的类型 图片（image）、语音（voice）、视频（video）和缩略图（thumb）]
	 * @param  {[type]} material  [素材路径]
	 * @param  {[type]} permanent [是否永久素材]
	 * @return {[type]}           [description]
	 */
  uploadMaterial (token, type, material, permanent) {
    let form = {}
    let url = wechat_apis.temporary.upload

    if (permanent) {
      url = wechat_apis.permanent.upload

      _.extend(form, permanent)
    }

    if (type === 'pic') {
      url = wechat_apis.permanent.uploadNewsPic
    }

    if (type === 'news') {
      url = wechat_apis.permanent.uploadNews
      form = material
    } else {
      form.media = fs.createReadStream(material)
    }

    let uploadUrl = url + 'access_token=' + token

    if (!permanent) {
      uploadUrl += '&type=' + type
    } else {
      if (type !== 'news') {
        form.access_token = token
      }
    }

    const options = {
      method: 'POST',
      url: uploadUrl,
      json: true
    }

    if (type === 'news') {
      options.body = form
    } else {
      options.formData = form
    }

    return options
  }

  fetchMaterial (token, mediaId, type, permanent) {
    let form = {}
    let fetchUrl = wechat_apis.temporary.fetch

    if (permanent) {
      fetchUrl = wechat_apis.permanent.fetch
    }

    let url = fetchUrl + 'access_token=' + token
    let options = {
      method: 'POST',
      url: url
    }

    if (permanent) {
      form.media_id = mediaId
      form.access_token = token
      options.body = form
    } else {
      if (type === 'video') {
        url = url.replace('https://', 'http://')
      }

      url += '&media_id=' + mediaId
    }

    return options
  }

	/**
	 * 更新永久素材
	 * @param  {[type]} token   [description]
	 * @param  {[type]} mediaId [description]
	 * @param  {[type]} news    [description]
	 * @return {[type]}         [description]
	 */
  updateMaterial (token, mediaId, news) {
    const form = {
      media_id: mediaId
    }

    _.extend(form, news)
    const url = wechat_apis.permanent.update + 'access_token=' + token + '&media_id=' + mediaId

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

	/**
	 * 统计永久素材
	 * @param  {[type]} token [description]
	 * @return {[type]}       [description]
	 */
  countMaterial (token) {
    const url = wechat_apis.permanent.count + 'access_token=' + token

    return {
      method: 'POST',
      url: url
    }
  }
	/**
	 * 永久素材列表
	 * @param  {[type]} token   [description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
  batchMaterial (token, options) {
    options.type = options.type || 'image'
    options.offset = options.offset || 0
    options.count = options.count || 10

    const url = wechat_apis.permanent.batch + 'access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: options
    }
  }

	/**
	 * 群发接口
	 * @param  {[String]} token   [accesstoken]
	 * @param  {[Array]} options [openId]
	 * @return {[Object]}         [description]
	 */
  priviewMedia (token, options) {
    if (!token || !options.touser) throw 'token or optons not null'
    options.msgtype = options.msgtype || 'image'

    const url = wechat_apis.send.toUser + 'access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: options
    }
  }

  /**
   * 客服消息发送
   * @param  {[type]} token   [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  customMsgSend (token, options) {
    if (!token || !options.touser) throw 'token or optons not null'
    options.msgtype = options.msgtype || 'image'

    const url = wechat_apis.message.customSend + 'access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: options
    }
  }

	/**
	 * 创建二维码接口
	 * @param  {[type]}  token             [description]
	 * @param  {[type]}  content           [description]
	 * @param  {Boolean} [isForever=false] [description]
	 * @return {[type]}                    [description]
	 */
  createQrcode (token, content, isForever = false) {
    let data = {}
    let url = wechat_apis.qrcode.create + 'access_token=' + token
    if (isForever) {
      data[ 'action_name' ] = isInteger(content) ? 'QR_LIMIT_SCENE' : 'QR_LIMIT_STR_SCENE'
    } else {
      data[ 'expire_seconds' ] = 24 * 60 * 60 * 25
      data[ 'action_name' ] = isInteger(content) ? 'QR_SCENE' : 'QR_STR_SCENE'
    }

    let sendContent = {}
    if (isInteger(content)) {
      sendContent[ 'scene_id' ] = content
    } else {
      sendContent[ 'scene_str' ] = content
    }

    data[ 'action_info' ] = {
      'scene': sendContent
    }

    return {
      method: 'POST',
      url: url,
      body: data
    }
  }

	/**
	 * 获取二维码地址
	 * @param  {[type]}  content           [description]
	 * @param  {Boolean} [isForever=false] [description]
	 * @return {[type]}                    [description]
	 */
  async fetchQrcode (content, isForever = false) {
    let accessToken = await this.fetchAccessToken()
    let options = this.createQrcode(accessToken.access_token, content, isForever)
    console.log(options)
    let result = await this.request(options)

    if (result.hasOwnProperty('errorcode')) {
      throw new Error(result.errmsg)
    } else {
      result[ 'picurl' ] = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + result[ 'ticket' ]
      return result
    }
  }
  /**
   * 创建按钮
   * @param  {[type]} token [description]
   * @param  {[type]} menu  [description]
   * @return {[type]}       [description]
   */
  createMenu (token, menu) {
    const url = wechat_apis.menu.create + 'access_token=' + token

    return {method: 'POST', url: url, body: menu}
  }

  /**
   * 获取现有按钮
   * @param  {[type]} token [description]
   * @return {[type]}       [description]
   */
  getMenu (token) {
    const url = wechat_apis.menu.get + 'access_token=' + token

    return {url: url}
  }

  /**
   * 删除按钮
   * @param  {[type]} token [description]
   * @return {[type]}       [description]
   */
  delMenu (token) {
    const url = wechat_apis.menu.del + 'access_token=' + token

    return {url: url}
  }

  /**
   * 创建个性化菜单
   * @param {[type]} token [description]
   * @param {[type]} menu  [description]
   * @param {[type]} rule  [description]
   */
  addConditionMenu (token, menu, rule) {
    const url = wechat_apis.menu.addCondition + 'access_token=' + token
    const form = {
      button: menu,
      matchrule: rule
    }

    return {method: 'POST', url: url, body: form}
  }

  /**
   * 删除个性化菜单
   * @param  {[type]} token  [description]
   * @param  {[type]} menuId [description]
   * @return {[type]}        [description]
   */
  delConditionMenu (token, menuId) {
    const url = wechat_apis.menu.delCondition + 'access_token=' + token
    const form = {
      menuid: menuId
    }

    return {method: 'POST', url: url, body: form}
  }

  /**
   * 获取当前菜单信息
   * @param  {[type]} token [description]
   * @return {[type]}       [description]
   */
  getCurrentMenuInfo (token) {
    const url = wechat_apis.menu.getInfo + 'access_token=' + token

    return {url: url}
  }
}
