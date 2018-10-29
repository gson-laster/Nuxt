<template>
<div class="newmk_top" style="max-width:640px;">
  <div class="newmk_top_search">
    <div class="n_search_form">
      <div class="s-btn">
        <!-- 未过期 -->
        <button type="button"
                @click="seacharticles()"
                v-show="!getUserDude"
                >搜索</button>
        <!-- 过期 -->
        <button type="button"
                @click="LoginOut"
                v-show="getUserDude"
                >
            退出
        </button>
        </div>
      <div class="s-val"><input type="text"
               name="keys"
               id="keys"
               :placeholder="placeholder"
               v-model="keyword"
               ></div>
      <nuxt-link :to="{path: '/wusercenter', query: setQuery(query)}"><img :src="dreamImg+'?w=80&h=80&p=1'"
             class="avatar" /></nuxt-link>
    </div>
  </div>
</div>
</template>
<script>
import appConf from '~/app.config.js'
import {userLoginOut} from '~/apis/user'
import { mapGetters} from 'vuex'
import setQuery from '~static/mixins/setQuery'
import {setCookie,localStore} from '~static/js/util'
import keepUserOnline from '~static/js/keepUserOnline'

export default {
  props: {
    placeholder: {
      type: String,
      default: '输入关键字，找到你想要的文章...'
    },
    isPreview: {
      default: ''
    },
    seacheField: {
      type: String,
      default: ''
    },
    toUrl: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    },
    query: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dreamImg: ''
    }
  },
  mixins: [setQuery],
  computed: {
    ...mapGetters(['getUserInfo','getUserDude'])
  },
  mounted() {
  },
  async beforeCreate(){
    let data = await keepUserOnline(this.$route, 'user')
    this.$store.dispatch('setUserInfo', data.user)
    this.dreamImg = (this.isPreview || data.user.dreamImg == null || data.user.dreamImg == '') ? appConf.preview.search_avatar : data.user.dreamImg
  },
  methods: {
    seacharticles() {
      let queryObj = {}
      queryObj[this.seacheField] = this.keyword
      this.$router.push({
        path: this.toUrl,
        query: this.setQuery(queryObj)
      })
    },
     LoginOut() {
      userLoginOut()
        .then(res => {
          if (res.data.code == 2000) {
            document.cookie =
              'dreamUsername="";expires=' + new Date(0)
              .toUTCString();
            setCookie('loginUser',"",-1)
            this.$store.dispatch("LoginOut");
            localStore.delete("userInfo");
            localStore.delete("brandInfo");
            localStore.delete("userMenu");
            this.$router.push({
              path: "/login",
              query: {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
}
</script>
<style>
@import '~static/css/common/index.css';
</style>
