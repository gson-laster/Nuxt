<template lang="pug">
div
  #myAblum.ablum-container(style='transform: translateX(0px);')
    ul
      li(v-for="(item,index) in lists")
        i.weui_icon_cancel(style='float: right;width: 3rem;height: 3rem;text-align: center;line-height: 3rem;position: absolute;top: -6px;right: -6px;')
        nuxt-link(:to="{path: setPath(item.mubantype), query: setQuery({id: item.id})}")
          .img-box
            img(src='', v-lazy="setImg(item.mainpic)", :alt='item.title')
          .ablum-title {{item.title}}
        .delete(@click="deleteItem(index)")
          span 删除
  dia-log(:show="dialogStatus", @confirm="dialogConfirm", @cancel="dialogCancel")
</template>

<script>
import {getUserablumLists} from '~/apis/user.js'
import setQuery from '~static/mixins/setQuery.js'
import {delUserablume} from '~/apis/user.js'
import dialog from '~components/msg/dialog.vue'
console.log(dialog);
export default {
  async asyncData ({store}) {
    let dreamUsername = store.getters.getUserInfo.dreamUsername
    let options = {
      username: dreamUsername,
      index: 1,
      pageSize: 10
    }
    let lists = await getUserablumLists(options)

    var result = lists.data
    lists = result.result
    console.log(lists);

    return {
      lists: lists,
      hasNext: result.hasNext,
      nextPage: result.nextPage
    }
  },
  data(){
    return {
      dialogStatus: false,
      id: '',
      index: ''
    }
  },
  head(){
    return {
      title: '音乐相册'
    }
  },
  mixins:[setQuery],
  methods:{
    setImg(img){
      if(img) return img.indexOf("http") != -1 ? img : "/" + img + '?q=0.6'
      else return ''
    },
    setPath(type){
      let typeArr = ['autumnscenery', 'romanticbeach', 'starrynight', 'beautyfield', 'bluesky',  'travel']
      console.log(type);
      return "/musicalbum/view/"+typeArr[type - 1]
    },
    async deleteItem(index) {
      let id = this.lists[index].id
      this.index= index
      this.dialogStatus = true
      this.id = id
    },
    async dialogConfirm(){
      let result = await delUserablume(this.id)
      this.dialogStatus = false
      console.log(result.code);
      if(result.code == 2000) {
        this.lists.splice(this.index, 1)
        this.$msg('删除成功')
      }else{
        this.$msg('删除失败')
      }
    },
    dialogCancel(){
      this.dialogStatus = false
    }
  },
  components: {
    'dia-log': dialog
  }
}
</script>

<style lang="stylus" scoped>
.ablum-container
  position absolute
  top 0
  left 50%
  right 0
  width 100%
  margin-left -50%
  max-width 640px
  z-index 19891014
  min-height 100%
  background #fff
  padding-top 12px
  overflow-x hidden
  transform translateX(-100%)
  transition transform .5s ease-in
  ul
    width 94%
    margin 0 auto
    overflow hidden
  li
    width 30%
    float left
    height 136px
    padding 4px
    border 1px solid #ddd
    border-radius 5px
    position relative
    margin-left 5px
    margin-top 10px
    box-sizing border-box
    overflow hidden
    .img-box
      height 95px
      overflow hidden
      img
        width 100%
  .ablum-title
    font-size 14px
    text-align center
    color #333
    overflow hidden
    line-height 32px
    max-height 56px
    height 32px
    overflow hidden
    text-overflow ellipsis
  .delete
    position absolute
    top 0
    left 0
    right 0
    background rgba(0,0,0,0.4)
    color #fff
    text-align center
    height 24px
    line-height 24px
    width 100%
</style>
