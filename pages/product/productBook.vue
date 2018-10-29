<template>
<div class="new_body">
  <div class="new_brandorder_con">
    <div class="new_brandorder_t1">您将预订</div>
    <div class="new_brandorder_t2" v-html="title"></div>
  </div>
  <form action=""
        name="form1"
        method="post">
    <input type="hidden"
           name="tid">
    <div class="new_brandorder_form">
      <div class="formli">
        <div class="t">姓　　名</div>
        <div class="input"><input name="brandxm"
                 type="text"
                 v-model="formData.dreamNames"></div>
      </div>
      <div class="formli">
        <div class="t">电　　话</div>
        <div class="input"><input name="brandphone"
                 type="text"
                 v-model="formData.dreamPhone"></div>
      </div>
      <div class="formli">
        <div class="t">地　　址</div>
        <div class="input"><input name="brandaddress"
                 type="text"
                 v-model="formData.dreamAddress"></div>
      </div>
      <div class="formli">
        <div class="t">预订数量</div>
        <div class="input"><input name="brandnum"
                 type="text"
                 v-model="formData.dreamNumber"></div>
      </div>
    </div>
    <div class="new_brandorder_ps"><span>确认以上信息无误后，点击提交按钮确认！</span><span id="brandname"></span>工作人员会尽快和您联系。</div>
    <div class="new_brandorder_an"><input name="button"
             type="button"
             @click="addBrandOrder()"
             value="提交"
             id="button"></div>
  </form>
  <msg ref="msg" />
</div>
</template>

<script>
import msg from '~components/msg/msg'
import {
  addBrandOrder
} from '~/apis/product'
export default {
  asyncData({store,query}) {
    let userInfo = store.getters.getUserInfo
    store.dispatch('setFooterShow',true)
    return {
      formData: {
        dreamNames:userInfo.dreamFullname,
        dreamPhone: userInfo.dreamUsername,
        dreamAddress: userInfo.dreamAddress,
        dreamNumber: 1,
        dreamBrandid: query.brand,
        dreamPid: query.id
      },
      title: query.info,
      query:query
    }
  },
  beforeCreate () {
    this.$store.dispatch('setFooterShow', false)
  },
  data() {
    return {
      msg: ''
    }
  },
  head() {
    return {
      title: '预定产品-' + this.title
    }
  },
  methods: {
    addBrandOrder() {
      let data = this.formData
      if (data.dreamNames == '') {
        this.$refs.msg.state('姓名不能为空哦-_-')
      }
      if (data.dreamPhone == '') {
        this.$refs.msg.state('电话不能为空哦-_-')
      }
      if (data.dreamNumber <= 0) {
        this.$refs.msg.state('数量不能小于0哦-_-')
      }

      addBrandOrder(data)
        .then(res => {
          if (res.code == 2000) {
            this.$refs.msg.state('预订成功')
            setTimeout(() => {   
              this.$router.push({ path: '/wusercenter/intentclient', query:this.query})
            }, 500);
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  components: {
    msg
  }
}
</script>
<style>
@import '~static/css/product/productBook.css';
</style>
