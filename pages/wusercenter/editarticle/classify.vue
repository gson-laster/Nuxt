<template>
<div class="box">
  <section>
    <div @click="addNewClassify"
         class="addClassify">
      添加新分类
    </div>
  </section>
  <section>
    <div class="contentList">
      <div class="list">
        <span>全部文章</span>(<span class="artSum">{{totalArticle}}</span>)
      </div>
      <div>
        <div v-for="(item, index) in secondList"
             class="list"
             v-bind:key="index"
             >
          <span>{{item.dreamTitle}}</span>({{item.artcount || 0}})
          <div class="editBox">
            <span @click="prevNext(index, true)"
                  v-if="index == secondList.length - 1">
                <i class="icon iconfont icon-icondownload-copy"></i>
                                             上移
              </span>
            <span @click="prevNext(index, false)"
                  v-else>
                <i class="icon iconfont icon-icondownload"></i>
                                             下移
              </span>
            <span @click="changeName(index)">
                <i class="icon iconfont icon-bianji"></i>
                 改名
              </span>
            <span @click="deletes(item.id, index)">
                <i class="icon iconfont icon-delete"></i>

                删除
              </span>
          </div>
        </div>
      </div>
    </div>
    <div @click="path('./draft')"
         class="list draft">
      草稿箱(<span>{{dr(this.secondList[0])}}</span>)
    </div>
  </section>
  <confirm @cancel="cancel"
           @confirm="confirm"
           :content="content"
           v-if="show">
    <div v-if="selectShow"
         slot="txt">
      <input v-model="secondClassifyName.dreamTitle"
             type="text"
             style="border-bottom: 1px solid #FFAA00; width: 80%; text-align: center; font-size: 16px; line-height: 32px"
             placeholder="请输入分类名称" />
      <p style="border: 1px solid #FFAA00; line-height: 32px; margin-top: 15px;"
         @click="select">
        {{firstClassInfo.dreamTitle}}
      </p>
    </div>
  </confirm>
  <bottomslider @cancel="cancelClass"
                v-if="btmslider">
    <li @click="firstClassifySelect(item.id, item.dreamTitle)"
        v-for="item in firstList"
        slot="list">{{item.dreamTitle}}</li>
  </bottomslider>
  <msg ref="msg"></msg>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import keepUserOnline from '~static/js/keepUserOnline'
import {
  getClassify,
  getartclassList,
  artclasseditor,
  delartclass
} from '~/apis/editarticle.js'
export default {
  async asyncData({
    store
  }) {
//  let list;
//  let secondList;
//  let articleList;
//  await Promise.all([getClassify(store.state.userInfo.dreamUsername), getartclassList(store.state.userInfo.dreamUsername)]).then(res => {
//      list = res[0].data.data.result || []
//      secondList = res[1].data.data.result || []
//    })
    return {
      firstList: [],
      secondList: []
    }
  },
  middleware: ["auth"],
  data() {
    return {
      show: false,
      content: '',
      selectShow: false,
      btmslider: false,
      secondClassifyName: {
        dreamTitle: '',
      },
      firstClassInfo: {
        dreamTitle: '',
        id: -1
      },
      firstListIdkey: [],
      deleId: -1,
      totalArticle: 0,
      index: -1,
      userInfo: {}
    }
  },
  beforeCreate() {
    this.$store.dispatch('setFooterShow', false)
  },
  async created() {
    await keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
    })
    await Promise.all([getClassify(this.userInfo.dreamUsername), getartclassList(this.userInfo.dreamUsername)]).then(res => {
      this.firstList = res[0].data.data.result || []
      this.secondList = res[1].data.data.result || []
    })
    for (let i = 0; i < this.firstList.length; i++) {
      this.firstListIdkey[this.firstList[i].id] = this.firstList[i]
    }
    for (let i = 0; i < this.secondList.length; i++) {
      this.totalArticle += this.secondList[i].artcount
    }
    if (this.secondList[0] && this.secondList[0].hasOwnProperty('previewart')) {
      this.totalArticle += (this.secondList[0].previewart || 0)
    }
  },
  methods: {
    deletes(id, i) {
      this.content = '您确定删除吗'
      this.selectShow = false
      this.show = true
      this.deleId = id
      this.index = i
    },
    cancel() {
      this.show = false
    },
    confirm() {
      if (this.selectShow) {
        if (this.secondClassifyName.dreamTitle.trim() == '') {
          this.$msg('请输入二级分类名称');
          return false
        }
        if (this.firstClassInfo.id == -1) {
          this.$msg('请选择一级分类');
          return false
        }
        let data = {
          dreamUserid: this.userInfo.dreamUsername,
          dreamTitle: this.secondClassifyName.dreamTitle,
          dreamClassid: this.firstClassInfo.id,
          dreamIsok: 1
        };
        if (this.secondClassifyName.hasOwnProperty('id')) {
          data.id = this.secondClassifyName.id
        }
        artclasseditor(data)
          .then(res => {
            if (res.data.code == 2000) {
              this.$msg('成功')
              location.reload()
            } else {
              this.$msg('失败')
            }
          })
      } else {
        delartclass(this.deleId)
          .then(res => {
            if (res.data.code == 2000) {
              this.$msg('删除成功')
              this.show = false
              //          	location.reload()
              this.secondList.splice(this.index, 1)
            } else {
              this.$msg('删除失败')
              this.show = false
            }
          })
      }
    },
    addNewClassify() {
      delete this.secondClassifyName.id
      Object.assign(this.secondClassifyName, {
        dreamTitle: ''
      })
      Object.assign(this.firstClassInfo, {
        dreamTitle: '点击选择一级分类',
        id: -1
      })
      this.content = ''
      this.selectShow = true
      this.show = true
    },
    dr(n) {
      if (n && n.hasOwnProperty('previewart')) {
      	return n.previewart
      } else {
        return 0
      }
    },
    select() {
      this.btmslider = true
    },
    cancelClass() {
      this.btmslider = false
    },
    firstClassifySelect(id, name) {
      Object.assign(this.firstClassInfo, {
        id: id,
        dreamTitle: name
      })
      this.btmslider = false
    },
    changeName(i) {
      this.content = ''
      this.selectShow = true
      let data = {
        id: this.secondList[i].id,
        dreamTitle: this.secondList[i].dreamTitle
      };
      let firstData = {
        id: this.firstListIdkey[this.secondList[i].dreamClassid].id,
        dreamTitle: this.firstListIdkey[this.secondList[i].dreamClassid].dreamTitle
      }
      Object.assign(this.secondClassifyName, data);
      Object.assign(this.firstClassInfo, firstData)
      this.show = true
    },
    prevNext(i, bool) {
      let zid;
      let that;
      if (bool) {
        that = this.secondList[i - 1]
        zid = that.dreamZid + 1
      } else {
        that = this.secondList[i + 1]
        zid = that.dreamZid - 1
      }
      let data = {
        id: this.secondList[i].id,
        dreamZid: zid
      }
      artclasseditor(data)
        .then(res => {
          if (res.data.code == 2000) {
            let t = this.secondList[i]
            if (bool) {
              this.secondList.splice(i - 1, 2, t, that)
            } else {
              this.secondList.splice(i, 2, that, t)
            }
            //        location.reload()
          } else {
            this.$refs.msg.state('失败')
          }
        })
    },
    path(p) {
      this.$router.push({
        path: p,
        query: this.query
      })
    }
  },
  components: {
    confirm: require('~/components/msg/confirm'),
    bottomslider: require('~/components/msg/bottomslider'),
    msg: require('~/components/msg/msg'),
  },
  computed: {
    ...mapGetters({
//    userInfo: 'getUserInfo',
      query: 'get_router_query'
    })
  }
}
</script>

<style>
/* @import '~static/css/wusercenter/img.css'; */

@import '~static/css/editarticle/classify.css';
</style>
