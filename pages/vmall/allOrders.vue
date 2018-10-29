<template>
  <section>
    <vmall-topbar :title="title"></vmall-topbar>
    <div class="new_vbshop">
      <div class="new_shopuser">
        <div class="new_shopordermk1">
          <ul>
            <li>
              <a href="?ordertype=1&amp;uid=%25D%25%25F%25%25L%25%25J%25%25C%25%25J%25%25C%25%25G%25%25H%25%25C%25%25I%25&amp;brand=0">待发货</a>
            </li>
            <li>
              <a href="?ordertype=2&amp;uid=%25D%25%25F%25%25L%25%25J%25%25C%25%25J%25%25C%25%25G%25%25H%25%25C%25%25I%25&amp;brand=0">已发货</a>
            </li>
            <li>
              <a href="?ordertype=3&amp;uid=%25D%25%25F%25%25L%25%25J%25%25C%25%25J%25%25C%25%25G%25%25H%25%25C%25%25I%25&amp;brand=0">已完成</a>
            </li>
          </ul>
        </div>
        <div class="new_navjg"></div>
        <div class="new_shoporderqq">
          <div>
            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=918890126&amp;site=qq&amp;menu=yes&amp;uid=%25D%25%25F%25%25L%25%25J%25%25C%25%25J%25%25C%25%25G%25%25H%25%25C%25%25I%25&amp;brand=0" target="_blank">联系客服</a>
          </div>
        </div>
        <div class="new_navjg"></div>
        <div class="new_shoporderlist" id="new_shoporderlist"></div>
        <div class="fline"></div>
      </div>
    </div>
  </section>
</template>

<script>
import vmallTopbar from '~components/vmall/topBar'
export default {
  components: {
    vmallTopbar
  },
  data() {
    return {
      title: '全部订单'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
@import '~static/css/vmall/allOrders.css';
</style>
