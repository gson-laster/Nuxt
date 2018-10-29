<template>
<div class="articlefooter">
  <ul>
      		<li v-for="(item, index) in list" v-bind:key="index" @click="path(item.path, index)">
      		  <div v-if="index == 1" class="circle">
      		  	<i :class="item.icon"></i>
      		  </div>
      		  	<i v-else :class="curryClass(item.path, item.icon)" ></i>
      		  <p :class="curryClass (item.path)" v-if="item.name != ''">{{item.name}}</p>
      		</li>
  </ul>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      list: [
        {
          name: '美文广场',
          icon: 'icon-all icon iconfont f',
          path: './articlesquire'
        },
        {
          name: '',
          icon: 'icon-add icon iconfont col f',
          path: './edit'
        },
        {
          name: '我的',
          icon: 'icon iconfont icon-account f',
          path: './self'
        },
      ],
    }
  },
  methods: {
    path (p, i) {
      if (p == './edit') {
        let data = {
          tyContent: [],
          TyTitle: '',
          tyTitilebg: '',
          tyMusic: '',
          ServerId: []
        }
        delete this.get_router_query.aid
        delete this.get_router_query.id
        this.$store.dispatch('setArticleList', data)    
      }
      this.$router.push({
        path: p,
        query: this.get_router_query
      })
    },
    curryClass ( p ,cla = '') {
      if (this.$route.path.indexOf(p.split('/')[1]) != -1) {
      	cla = cla + ' footerArticleActive'
      }
      return cla
    }
  },
  computed: {
    ...mapGetters([
         'get_router_query',
         'getArticleList'
        ]),
  },
}
</script>

<style>
@import '~static/css/editarticle/articlefooter.css';
</style>
