# wv-midserver

> Nuxt.js project

## 更新记录
### 20180420
- 完成服务端日志服务记录
- 完成早起打卡重新写
- 完成文章页面旧的wv跳转新的wv品牌
- 完成文章页面/产品页面/名片页面 setQuery bug 此BUG待进一步观察
- 修复名片页面申请名片不显示问题
## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

*Note: Due to a bug in yarn's engine version detection code if you are using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:

1. Use `npm install`
2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

--------------------------------------------------------------------------------

目录说明
```
  -pages 页面组件
  -components 公共组件
  -static 静态资源
  -layout 公共布局组件
  -build 构建代码
  -server 服务端处理代理
  --config 服务端配置代码
  --middlewares 中间件
  ---router.js 服务端路由中间价
  --index.js
  server 启动文件，挂载中间件
```
--------------------------------------------------------------------------------

## 状态码说明
---------------------
|code | 说明        |
|:---:|:-----------:|
|2000 | 操作成功    |
|2001 | 缺少参数    |
|4000 | 操作失败    |
|4001 | 权限认证错误|
|401 | 登录认证错误|
