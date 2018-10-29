<template>
  <div class="box uploadbanner">
    <div class="ub">
      更换滚动图片
      <p>为保证滚动图片显示效果美观,建议上传的图片<span>长宽比例为2:1</span></p>
      <div v-for="(i, index) in imgList" class="imgList">
        <div>
          <div >
            <img :src="i.dreamDefaultpicurl" alt="">
          </div>
          <div @click="shanchu(index, true)" class="shanchu">
            删除
          </div>
        </div>
      </div>
      <div v-for="(i, index) in localId" class="imgList">
        <div>
          <div v-html="i">

          </div>
          <div @click="shanchu(index, false)" class="shanchu">
            删除
          </div>
        </div>
      </div>
      <div @click="addone" class="addone">
        增加一张图片
      </div>
    </div>
    <div class="btns">
      <button @click="moren">恢复默认图片</button>
      <button @click="save">保存</button>
    </div>
    <confirm v-if="show" @cancel="cancel" @confirm="confirm"></confirm>
  </div>
</template>

<script>
import wechat from '~static/mixins/wechat.js'
import {mapGetters} from 'vuex'
import {change, zimgdel, changBanner} from '~/apis/user.js'
import keepUserOnline from '~static/js/keepUserOnline'
import {ServerId, setBanner} from '~static/js/util.js'
  export default {
    data () {
      return {
        str: '',
        serverId: [],
        show: false,
        index: -1,
        bo: true,
        del: [],
        userInfo: {},
        localId: [],
        imgList: ''
      }
    },
    head () {
      return {
          title: '更换滚动图片'
        }
      },
    middleware: ["auth"],
    mixins: [wechat],
    created(){
      keepUserOnline(this.$route, 'user').then(res => {
        this.userInfo = res.user
          let imgList = '', bannerList = [];
          if (this.userInfo.dreamBanner) {
            imgList = this.userInfo.dreamBanner
            imgList = setBanner(imgList)
          } else {
            imgList = []
          }
    
          imgList.map((v, i) => {
            bannerList.push({
              dreamTitle: i,
              dreamDefaultpicurl: v.indexOf('http') !=-1 ? v : '/' +v
            });
          })
          this.imgList = bannerList
      })
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
      async addone () {
        let imgLength = (this.localId.length + this.imgList.length)
        if(imgLength >= 10) {
         this.$msg('只能上传10张图片')
        }
        else {
          let num = 10 - imgLength > 9 ? 9 : 10 - imgLength
          await this.choiceImg(num).then(res => {
            let lo = res.localId
          for (let i = 0; i < lo.length; i ++) {
                let img = '<img src="' + lo[i] + '"/>'
            this.localId.push(img)
            let json = {}
            json[lo[i]] =  res.serverId[i]
            this.serverId.push(json)
          }
          })
        }
      },
      shanchu (i, bo) {
        this.index = i
        this.show = true
        this.bo = bo
      },
     async save () {
            await this.wxuploads(this.serverId).then(res => {
              var img = ''
              for (let j in this.imgList) {
                img = img + '<img src="' + this.imgList[j].dreamDefaultpicurl +'"/>,'
              }
              for (let i in res) {
                 img = img + '<img src="' + res[i] + '"/>,'
              }
              img = img.slice(0, img.length - 1)

            change({dreamUsername: this.userInfo.dreamUsername, dreamBanner: img}).then(res => {
              if (res.code == 2000) {
                zimgdel(this.del)
                this.$msg('保存成功')
                this.$set(this.userInfo, 'dreamBanner', img)
                this.$store.dispatch('setUserInfo', this.userInfo)
                setTimeout(() => {
                  this.$router.push({
                    path: '/newcard',
                    query: this.query
                  })
                }, 500)
              } else {
                this.$msg('保存失败')
              }
            })
          })

      },
      cancel () {
        this.show = false
      },
      confirm () {
        if (this.bo) {
          let src = this.imgList[this.index]
          this.imgList.splice(this.index, 1)
          // src = src.slice(10, src.length - 3)
          this.del.push(src)
        } else {
          this.localId.splice(this.index, 1)
          this.serverId.splice(this.index, 1)
        }
        this.show = false
      },
      moren () {
//      console.log(this.imgList)
        for (let i = 0; i < this.imgList.length; i ++) {
          this.del.push(this.imgList[i].dreamDefaultpicurl)
        }
        changBanner({dreamUsername: this.userInfo.dreamUsername}).then(res => {
          if (res.data.code == 2000) {
            zimgdel(this.del)
            this.$set(this.userInfo, 'dreamBanner', null)
            this.$store.dispatch('setUserInfo', this.userInfo)
            this.$msg('重置成功')
              setTimeout(() => {
                this.$router.push({
                  path: '../newcard',
                  query: this.query
              })
            }, 1500)
          } else {
            this.$msg('重置失败')
          }
//        console.log(res.data.code)
        })
      }
    },
    components: {
      confirm: (resolve) => require(['~components/msg/confirm'], resolve)
    },
    computed: {
      ...mapGetters({
        query: 'get_router_query'
      })
    }
  }
</script>

<style scoped>
  @import '~static/css/wusercenter/uploadbanner.css';
</style>
