<template>
<div class="box white-bg brand">
  <div class="new_brand_ts">
    <div>开通说明</div>
    <p>1、完成注册后，可自由选择需要开通的品牌。</p>
    <p>2、开通后切换成当前品牌，完善名片信息即可使用。</p>
    <p>3、如需同时分享多个品牌文章，可收藏每个品牌的名片链接来使用。</p>
  </div>
  <div class="new_brand_an">
    <button @click="rout('edituserinfo')">完善名片信息</button>
    <button @click="rout('inlineservice')">咨询客服</button>
  </div>
  <div class="brand_list_search">
    <div class="brand_list_search_warrp">
      <input type="text"
             name=""
             value=""
             class="brand_list_search_inp"
             placeholder="输入关键字，搜索品牌"
             v-model="dreamBrandtitle"
             @input="checkInput"
             />
      <button type="button"
              class="brand_list_search_btn"
              name="button"
              @click="seach()"></button>
    </div>
  </div>
  <div class="new_brand_list">
    <ul>
      <li v-for="(item, index) in contentInfo"
          v-if="text(item.id, index)">
        <div class="imgsbrand">
          <img :src="setLogo(item.dreamBrandlogo)" />
        </div>
        <div class="conbrand">
          <h3>{{item.dreamBrandtitle}}</h3><span>{{item.dreamBrandtitlecon}}</span></div>
        <div class="an"> <span>当前</span>
        </div>
      </li>
      <li v-for="(item, index) in contentInfo"
          v-if="!text(item.id, index)">
        <div class="imgsbrand">
          <img :src="setLogo(item.dreamBrandlogo)" />
        </div>
        <div class="conbrand">
          <h3>{{item.dreamBrandtitle}}</h3><span>{{item.dreamBrandtitlecon}}</span></div>
        <div class="an"><span @click="shift(item, index)"
                style="background: #FAAC01;">切换</span></div>
      </li>
    </ul>
  </div>
  <msg ref="msg"></msg>
</div>
</template>
<script>
import {change} from '~/apis/user.js';
import {getBrandList} from '~/apis/brand'

const msg = () =>import ('~/components/msg/msg')
import { localStore} from '~static/js/util';
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  data() {
    return {
      dreamBrandtitle: '',
      userInfo: {},
      contentInfo: '',
      active: '',
    }
  },
  async asyncData({ store, query}) {
    return {
      query: query,
    }
  },
  head(){
    return {
      title: '切换品牌'
    }
  },
  async created(){
    await keepUserOnline(this.$route, 'user').then(res => {
      this.userInfo = res.user
    })
    let res = await Promise.all([getBrandList({dreamIsshow: true})])
    let data = res[0]
    let active = this.userInfo.dreamBranddefault
    let arr = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == active) {
        arr.unshift(data[i])
        data.splice(i, 1)
      }
    }
    data.unshift(...arr)
    data.unshift({
      dreamBranddescription:'世界那么大 我们应该去看看 体验不一样的旅行',
      dreamBrandlogo: "http://www.wvmp360.com/images/wv1.jpg",
      dreamBrandtitle: "Dreamtrips",
      dreamBrandtitlecon: "Worldventures世界环旅集团",
      dreamCardcontent: null,
      dreamSzm: "W",
      id: 0
    })
    this.contentInfo = data;
    this.active = active;
  },
  methods: {
    text(index, key) {
      if (index == this.active) {
        return true;
      } else {
        return false;
      }
    },
    setLogo(imgUrl) {
      if(imgUrl){
        if (imgUrl.indexOf('http') != -1) return imgUrl
        else return '/' + imgUrl + '?f=png'
      } else {
        return ''
      }
    },
    async shift(index, i) {
      this.active = index.id
      let data = {
        dreamBranddefault: this.active,
        dreamUsername: this.userInfo.dreamUsername
      }
      let changeResult = await change(data)
      // console.log(changeResult);
      if (changeResult.code == 2000) {
        let newUserInfo = Object.assign(this.userInfo, data)
        this.$store.dispatch('setUserInfo', newUserInfo)
        let brandResult = await getBrandList({
          brandId: index.id
        })
        if (brandResult && brandResult.length != 0) {
          if (brandResult[0].id == 0) {
          	brandResult[0] = index
          }
          this.$store.dispatch('setBrandInfo', brandResult[0])
          localStore.set('brandInfo', JSON.stringify({
            brandInfo: brandResult[0],
            expires_in: new Date() * 1,
            share: false
          }), 'wvmp360')
        }
        this.query.brand = this.active
        setTimeout(() => {
          this.$router.push({
            path: '/newcard',
            query: this.query
          })
        }, 1000)
      } else {
        this.$msg('修改失败')
      }
    },
    seach() {
      Promise.resolve(getBrandList({
          dreamBrandtitle: this.dreamBrandtitle
        }))
        .then(res => {
         this.contentInfo = res
        })
    },
    rout(path) {
      this.$router.push({
        path: './' + path,
        query: this.query
      })
    },
    checkInput(){
        if(!this.dreamBrandtitle){
           getBrandList({dreamIsshow:true}).then(res=>{
             this.contentInfo = res
             this.contentInfo.unshift( {
              dreamBrandlogo: "http://www.wvmp360.com/images/wv1.jpg",
              dreamBrandtitle: "Dreamtrips",
              dreamBrandtitlecon: "Worldventures世界环旅集团",
              dreamCardcontent: null,
              dreamSzm: "W",
              id: 0})
           }).catch(e=>{

           })
        }

    }
  },
  components: {
    msg
  }
}
</script>

<style>
@import '~static/css/wusercenter/img.css';
@import '~static/css/wusercenter/brand.css';
</style>
