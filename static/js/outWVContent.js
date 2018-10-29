// 图片;
let a = require('~static/img/card/new_wvcon_01.jpg')
let b = require('~static/img/card/new_wvcon_03.png')
let c = require('~static/img/card/new_wvcon_05.jpg')
let d = require('~static/img/card/new_wvcon_06.jpg')
let e = require('~static/img/card/new_wvcon_07.png')
let f = require('~static/img/card/new_wvcon_09.png')
let g = require('~static/img/card/new_wvcon_10.png')
let h = require('~static/img/card/new_wvcon_11.png')
let i = require('~static/img/card/new_wvcon_12.jpg')
let j = require('~static/img/card/new_wvcon_13.png')
let k = require('~static/img/card/new_wvcon_14.png')
let l = require('~static/img/card/new_wvcon_15.png')
let m = require('~static/img/card/new_wvcon_16.jpg')
let n = require('~static/img/card/new_wvcon_17.jpg')
let o = require('~static/img/card/new_wvcon_18.jpg')
let p = require('~static/img/card/new_wvcon_19.jpg')
let q = require('~static/img/card/new_wvcon_02.jpg')
let r = require('~static/img/card/new_wvcon_04.jpg')
let wvConAdImg = {
  a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r
}


// WV头部内容;
let wvConHeader = "Worldventures世界环旅集团"
let wvConHeader1 = "2005年创立于美国德克萨斯州，拥有10万平方英尺的办公楼，是一家大型的电子商务旅游直销公司，也是美国5000家超速成长企业的领导者，世界100强直销公司第25名，全球成长最快的公司排名第6名，2016年全年营业额突破10亿美元!"
let wvConHeader2 = "Worldventures世界环旅集团，是一家世界级旅游020电商平台，整合全世界优质旅游资源，向全球会员提供Dreamtrips配套服务，共享全球193个国家旅游套餐。Dreamtrips是全球最大旅游俱乐部，网上旅行社，在机票、酒店、游艇、度假、租车、旅游路线消费上省钱，24小时保姆式管家，私人旅游管家订制等一站式个性化贴心服务。"
let wvConHeader3 = "旗下罗维亚（Rovia）旅游公司在美国已经超过30年的历史，连续5年荣获“麦哲伦国际旅游大奖”，也是IATA国际航空ASTA美国旅游协会和CLIA国际旅游协会认证公司，整合全球优质旅游资源，为所有客户提供优质、价廉的机票、酒店、豪华游轮、租车、旅游线路套餐等配套服务。美誉度和会员保留率，综合评比全球第一（参加过Dreamtrips体验的会员，近5年的平均保留率89%）"
let wvCon =[wvConHeader,wvConHeader1,wvConHeader2,wvConHeader3]

let sixTeenEnjoys = ["机票省钱","酒店省钱","自助游省钱","租车省钱","游轮省钱","景点免费","旅游巴士免费","餐饮免费","专车免费接送","保姆管家免费","娱乐表演免费","免费坐直升机","免费乘热气球","免费坐缆车","免费乘游艇","无强制购物",]

let tenReasons = ["全球范围，三个唯一","成本低、风险小","收益可观，传承至少三代","真正的不销而销","底价保证、差价赔偿","兼容性强大","完美的商业模式","亚洲先机，老公司新市场","公司稳定性强、成长快","注重口碑、美誉度非常高"]

let wvConArea = [
  {
    name: '发展地区', areaPart: [
      { title: '全世界第一大旅游国', img:g, content: '2015年我国旅游业继续实现稳步增长,旅游总收入达4.13万亿元。2015年中国出境游消费达1045亿美元，同比增长16.6%，人均消费893美元（约合6000元人民币），成为世界第一大旅游国！' },
      { title: 'Dreamtrips正在布局亚洲和中国地区', img: j, content: 'Dreamtrips准备在全球再开6个分公司：包括中国大陆、中国台湾、泰国、越南、日本、印度尼西亚。'}
      
    ]
  },
  {
    name: '旅游产业',
    areaPart: [
      {title:'全世界第一大行业',img:i,content:'目前旅游产业收入10万亿美元，预计到2020年，旅游产业收入将增至16万亿美元，相当于全球GDP的10'},
      {title:'旅游产业具有广阔的发展前景',img:h,content:'世界旅游组织和各国政府越来越重视发展旅游产业，全球有120多个国家和地区将旅游产业列为本国国民经济发展的支柱产业。旅游产业具有旺盛的社会消费需求，世界旅游发展历史表明，当人均GDP达到300美元时，开始有国内旅游需求；当人均GDP达到3000美元时，将迎来一个国内游、入境游与出境游全面繁荣，社会各阶层广泛参与的“全民旅游”时代。'}
    ]
  }

]

let howToBeVIP = [
  {
    title: '1.如何成为DreamtripsVIP会员',
    content:'（1）注册需提供以下个人资料：姓名、性别、出生日期、常住地址、手机号码、QQ邮箱（你的个人电子钱包，由QQ邮箱激活链接和登录）<br>（2）注册需支付方式：第一是（国际）有Visa或MasterCard标志双币信用卡；第二是（国内）中国银联卡或支付宝；第三是把现金交给推荐人，再帮你后台转支付注册会员后，你将有一个ID号（个人管理后台）还有一个电子钱包。'
  },
  {
    title: '2.成为VIP会员的好处',
    content:'（1）你和你的家人或者朋友均可享受全球范围机票、旅游、酒店、游轮、租车等超值特价的高品质服务并承诺全球最低价；<br>（2）拥有Dreamtrips为你授权的合法网上旅游公司的代理权。'
  },
  {
    title: '3.注册会员需要多少费用',
    content:'注册成为Dreamtrips白金会员只需缴纳525美元；其中：100美元是注册费（代理权）300美元返还你的会员账户，（下次旅游可抵用）；还有100美元是为自己预存的旅游基金（满12个月后可抵用），25美元是网络建设费，实际只需125美元，就可成为Dreamtrips的VIP会员。<br>'
  },
  {
    title: '4.如何免缴和获取奖励积分',
    content:'累积推荐4位朋友成为白金会员，你就无需为自己去预存每月100美元的旅游基金，推荐1人为白金会员可获50美元现金和200美元旅游积分。'
  },
  {
    title: '5.做代理可以赚取哪些佣金',
    content:'凡通过你的ID号为家人或者朋友订购公司以下服务的均可赚取佣金：<br>（1）订购机票：获得1美金/次的佣金；（2）订购酒店：获得5%的佣金，特价房除外（直接汇入你的会员账户内）'
  },
  {
    title: '6.投资最少的旅游理财产品',
    content:'（1）四周内或累计邀请6位朋友成为白金会员：<br>（2）这6位朋友就是你的合作伙伴，要么是喜欢旅游的（愿意预存旅游基金和缴纳20美元网络维护费），要么是来投资的（愿为理财事业积极行动的）<br>那么你的最少回报可达750美元（直推奖300美金+对碰奖200美金+快速奖250美金）。如果后面进来的朋友都说推荐朋友倍增下去将是非常可怕的生意。'
  }
]

module.exports = {
wvCon,
wvConAdImg,
howToBeVIP,
wvConArea,
sixTeenEnjoys,
tenReasons
}












