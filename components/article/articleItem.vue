<template>
<div>
  <li class="li_list">
    <div class="newmk_list_new">
      <div class="single_item">
        <nuxt-link :to="{path:path, query: setQueryObj({aid: article.id})}">
          <div class="fl">
            <img src="~static/img/blank.gif"
                 v-lazy="article.dreamDefaultpicurl+'?w=80&h=80&p=0'">
          </div>
          <div class="fr">
            <h3>{{article.dreamTitle}}</h3>
            <span>{{formatTime(article.dreamUpdatetime)}} </span>
            <i>{{article.dreamHits}}</i>
          </div>
        </nuxt-link>
      </div>
    </div>
  </li>
</div>
</template>

<script>
import {dateFormat} from '~/static/js/util'
import setQuery from '~/static/mixins/setQuery'
export default {
  props: ['article', "query"],
  mixins: [setQuery],
  computed: {
    path() {
      let query = this.$store.state.routerQuery
      return query.is_preview ? '../preview/previewarticlens' : '/article'
    }
  },
  methods: {
    formatTime(date) {
      return dateFormat('y-M-d', date)
    },
    setQueryObj(obj){
      let _obj = Object.assign({}, obj, this.query)
      return this.setQuery(_obj)
    },
  }
}
</script>
<style scoped>
@import '~static/css/article/articleItem.css'
</style>
