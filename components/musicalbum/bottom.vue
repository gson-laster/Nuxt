<template>
  <div class="bottom musicBtm">
    <nuxt-link :to="{path: '/newcard', query: setQuery({})}" tag="div" class="userInfoimg">
    	<img :src="userInfo.dreamImg+'?w=180&h=180'"/>
    </nuxt-link>
    <div class="names">
    	{{userInfo.dreamFullname}}
    </div>
    <nuxt-link :to="{path: '/musicalbum', query: setQuery({})}" class="want" tag="div">
    	<span>我也想制作</span>
    </nuxt-link>
    <div class="confirmCancel" v-show="preview">
      <div @click="con(false)" class="cancel">
        取消
      </div>
     <div @click="con(true)" class="confirm">
      确定
     </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import setQuery from '~static/mixins/setQuery.js'
	export default {
    props:{
      preview: {
        type: Boolean,
        default: false
      }
    },
    mixins:[setQuery],
	  methods: {
	    con (bol) {
	      this.$emit('con', bol)
	    }
	  },
	  computed: {
      ...mapGetters({
	      userInfo: 'getUserInfo'
      })
	  }
	}
</script>
<style>
  @import '~static/css/musicalbum/bottom.css';
</style>
