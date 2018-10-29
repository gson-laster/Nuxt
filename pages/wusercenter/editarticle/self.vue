<template>
<div class="box userCenter">
  <section>
    <div class="user_top">
      <div class="bgImg">
        <img :src="setImgUrl({src:res.userpic.dreamUrl,w:'auto',h:'auto',q:0,address:topbg})"/>
      </div>
      <div class="user_img_box">
        <div class="user_img">
          <nuxt-link :to="{path:'/wusercenter', query: query}">
            <img :src="setImgUrl({src:userInfo.dreamImg})" />
          </nuxt-link>
        </div>
      </div>
      <div class="selfuserInfo">
        <p>{{userInfo.dreamFullname}}</p>
        <p>{{userInfo.dreamUsername}}</p>
      </div>
      <div class="user_list">
        <ul>
          <li @click="path('./selfopusmap')">文章 {{res.artcount || 0}}</li>
          <li @click="path('./follow')">关注 {{res.concerncount || 0}}</li>
          <li @click="path('./starch')">粉丝 {{res.reconcerncount || 0}}</li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="opusList"
           @click="path('./selfopusmap')">
        <div class="maps">
          作品集
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="itemlist">
      <div v-for="items in list"
           class="border_list">
        <div @click="path(item.path)"
             v-for="item in items"
             class="list_content_box">
          <div class="list_content">
            <i :class="item.icon"></i> {{item.name}}
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--{{asas}}-->
  </section>
  <articlefooter></articlefooter>
</div>
</template>
<script>
import arr from '~/static/js/outeditarticle.js'
import {mapGetters} from 'vuex'
import {myuserarticleacount,userpiceditor} from '~/apis/editarticle.js'
import articlefooter from '~/components/editarticle/articlefooter'
import {zimgdel} from '~/apis/user.js'
import wechat from '~static/mixins/wechat.js'
import setImgUrl from '~static/mixins/setImgUrl.js'
import keepUserOnline from '~static/js/keepUserOnline'
import appConf from '~/app.config'
export default {
  async asyncData({
    store,
    query
  }) {
//  let ress;
//  await myuserarticleacount(store.state.userInfo.dreamUsername)
//    .then(res => {
//      ress = res.data.data
//    })
//  if (!ress.userpic) {
//    ress.userpic = {
//      dreamUrl: '',
//      id: -1
//    }
//  }
    return {
      avatar:appConf.preview.search_avatar
    }
  },
  middleware: ["auth"],
  data() {
    return {
      res: {userpic: '', rewardcount: ''},
      asas: '',
      topbg: arr['a'],
      list: [],
      userInfo: {}
    }
  },
  head () {
    return {
      title: '我的'
    }
  },
  mixins: [wechat,setImgUrl],
  async created() {
    this.$store.dispatch('setFooterShow', false)
      await keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
      })
          let ress;
    await myuserarticleacount(this.userInfo.dreamUsername)
      .then(res => {
        ress = res.data.data
      })
      let arr = [
      
          [
          {
            icon: 'iconfont icon icon-box',
            name: '草稿箱',
            content: '',
            path: './draft'
          },
          {
            icon: 'iconfont icon icon-favorite-copy',
            name: '我的收藏',
            content: '',
            path: './collect'
          },
          ],
          [
          {
            icon: 'iconfont icon icon-navlist',
            name: '管理文章分类',
            content: '',
            path: './classify'
          },
          {
            icon: 'iconfont icon icon-pic',
            name: '更换作品集封面',
            content: '',
            path: 'changepic'
          },
          ],
          [
          {
            icon: 'iconfont icon icon-jifen',
            name: '赏金提现',
            content: '累计赏金' + (ress.rewardcount || 0) + 'v币',
            path: '../vbmanager'
          },
          {
            icon: 'iconfont icon icon-bussinesscard',
            name: '值享云名片',
            content: '移动互联网营销神器',
            path: '../'
          },
          ],
          [
          {
            icon: 'iconfont icon icon-help',
            name: '使用帮助',
            content: '',
            path: '../usinghelp'
          },
          {
            icon: 'iconfont icon icon-service',
            name: '联系客服',
            content: '',
            path: '../inlineservice'
          },
          ],
        ]
      this.list = arr;
    if (!ress.userpic) {
      ress.userpic = {
        dreamUrl: '',
        id: -1
      }
    }
    this.res = ress
  },
    mounted () {
    var url = ''
    // 判断是否是ios微信浏览器
    if (window.__wxjs_is_wkwebview === true) {
      url =  this.$store.state.url ? this.$store.state.url.split('#')[0] : document.URL
    } else {
      url = window.location.href.split('#')[0]
    }
     this.wechatInit(url)
    },
  methods: {
    path(path) {
      if (path == 'changepic') {

        this.choiceImg()
          .then(res => {
            //                      this.topbg = res.localId[0]
            var oldsrc = this.res.userpic.dreamUrl
            this.$set(this.res.userpic, 'dreamUrl', res.localId[0])
            this.wxuploads(res.localIdAndserverId)
              .then(data => {
                let src = ''
                for (let i in data) {
                  src = data[i]
                }
                let arr = {
                  dreamUserid: this.userInfo.dreamUsername,
                  dreamUrl: src
                }
                if (this.res.userpic.id != -1) {
                  arr.id = this.res.userpic.id
                } else if (this.asas != '') {
                  arr.id = this.res.userpic.id
                }
                //            console.error(this.res.userpic.id)
                userpiceditor(arr)
                  .then(res => {
                    if (res.data.code == 2000) {
                      if (this.res.userpic.id == -1) {
                        myuserarticleacount(this.userInfo.dreamUsername)
                          .then(res => {
                            //                  this.$set(this.res.userpic, 'id', res.data.data.userpic.id)
                            this.asas = this.res.userpic.id
                          })
                      } else {
                        zimgdel(oldsrc)
                      }
                      this.$msg('修改成功')
                    } else {
                      this.$msg('修改失败')
                    }
                  })
              })
          })
        return false
      }
      this.$router.push({
        path: path,
        query: this.query
      })
    },
    // 设置头像地址;
//  setAvatar(url){
//    if(url&&url!=="null"){
//        if(url.indexOf("http")!=-1){
//           return url+'?w=80&h=80' 
//        }else{
//          return '/'+url+'?w=80&h=80'
//        }
//    }else{
//        return this.avatar
//    }
//  },
    // 设置背景图片地址;
//  setBGImg(bgUrl){
//     let imgUrl
//     if(bgUrl&&bgUrl!=='null'){
//        if(bgUrl.indexOf('http')!=-1){
//          imgUrl = bgUrl+'?w=auto&h=auto'
//        }else{
//          if (bgUrl.indexOf('wxLocalResource') != -1) {
//          	imgUrl = bgUrl
//          } else {
//            imgUrl = '/'+bgUrl+'?w=auto&h=auto'
//          }
//        }
//     }else{
//       imgUrl = this.topbg
//     } 
//     return imgUrl
//  }
  },
  components: {
    articlefooter
  },
  computed: {
    ...mapGetters({
      query: 'get_router_query',
//    userInfo: 'getUserInfo'
    })
  }
}
</script>

<style scoped>
@import '~static/css/editarticle/index.css';
</style>
