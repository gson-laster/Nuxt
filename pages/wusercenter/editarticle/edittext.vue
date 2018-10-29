<template>
<div title="弹出文字输入框" class="txt_input_div">
  <div class="mask_div">
    <div class="input_txt_div">
      <textarea :style="content.css" v-model="content.text" class="input_txtarea"></textarea>
    </div>
    <div class="toolbar">
      <dd @click="listClick(i)"  v-for="(item, i) in list">
        <i :class="item.name" ref="li"></i>
      </dd>
      <div v-if="colorShow" class="color_group">
        <dt @click="colorClick(index)" v-for="(item, index) in colorList"><span :style="item">■</span></dt>
      </div>
    </div>
    <btn  @cancel="cancel" @confirm="confirm">  </btn>
  </div>
</div>
</template>
<script>
  import btn from '~/components/editarticle/btn'
  import {mapGetters} from 'vuex'
  export default {
    async asyncData ({query, store}) {
      let contents = {
        type: 'text',
        text: '',
        css: {
          fontWeight: 'normal',
          fontSize: '14px',
          color: '#333',
          textAlign: 'left'
        }
      }
      if (query.update) {
      	Object.assign(contents, store.state.articleList.tyContent[store.state.articleIndex])
      }
      return {
        content: contents
      }
    },
    middleware: ["auth"],
    computed: {
      ...mapGetters({
        query: 'get_router_query',
        getArticleIndex: 'getArticleIndex',
        articleLists: 'getArticleList'
      })
    },
    data () {
      return {
        list: [
          {name: 'iconfont icon icontext icon-a'},
          {name: 'iconfont icon icontext icon-zitijia'},
          {name: 'iconfont icon icontext icon-textaligncenter'},
          {name: 'iconfont icon icontext icon-A-ZICONCopy'},
        ],
        activeli: [],
        colorShow: false,
        colorList: [
          {color: '#000'},
          {color: '#808080'},
          {color: '#EE2207'},
          {color: '#FF8900'},
          {color: '#37B549'},
          {color: '#157FF7'},
          {color: '#B14EBB'}
        ],
      }
    },
    created () {
      this.$store.dispatch('setFooterShow', false)
    },
  methods: {
    listClick (i) {
      if (this.activeli.some( function(n) {return n == i})) {
        if (i != 3) {
          this.$refs.li[i].style.color = '#000'
        }
        if (i == 0) {
          this.content.css.fontWeight = 'normal'
        }
        if (i == 3) {
          this.colorShow = false
        }
        if (i == 2) {
          this.content.css.textAlign = 'left'
        }
        if (i == 1) {
          this.content.css.fontSize = '14px'
        }
        let index = this.activeli.findIndex(function (n) {
          return n == i
        })
         this.activeli.splice(index, 1)
      } else {
        this.activeli.push(i)
        if (i != 3) {
          this.$refs.li[i].style.color = '#04BE02'
        }
        if (i == 0) {
        	this.content.css.fontWeight = 'bold'
        }
        if (i == 2) {
          this.content.css.textAlign = 'center'
        }
        if (i == 1) {
          this.content.css.fontSize = '16px'
        }
        if (i == 3) {
        	this.colorShow = true
        }
      }
    },
    colorClick (i) {
      this.content.css.color = this.colorList[i].color
      this.$refs.li[3].style.color = this.colorList[i].color
    },
    confirm () {
      if (this.query.update) {
      	this.articleLists.tyContent.splice(this.getArticleIndex, 1, this.content)
      } else{
      	this.articleLists.tyContent.splice(this.getArticleIndex, 0, this.content)
//      this.articleLists.tyContent.push(this.content)
      }
//    this.$store.dispatch('setArticleList', this.articleLists)
      delete this.query.update
      this.$router.replace({
        path: './edit',
        query: this.query
      })
    },
    cancel () {
      delete this.query.update
      this.$router.replace({
        path: './edit',
        query: this.query
      })
    }
  },
  components: {
    btn
  },
}
</script>
<style>
  @import '~static/css/editarticle/edittext.css';
</style>
