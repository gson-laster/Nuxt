<template>
<div class="new_user_vbcz"
     id="new_user_vbcz">
  <div class="new_user_vbcztitle">
    <h3>续费会员</h3>
    <span class="dq">会员到期时间：2022-01-15 </span>
  </div>
  <div class="new_user_renewsm">您的V币剩余
    <i>0</i>个，会员续费1年消耗
    <i>299</i>个<br>您确定续费吗？</div>
  <form name="form1"
        method="post"
        action="user_renew.html"><input type="hidden"
           id="vbczkyvb"
           name="vbczkyvb"
           value="0"><input type="hidden"
           name="action"
           value="renewok">
    <div class="new_user_vbczan"><input name="button"
             type="button"
             value="确定续费"
             id="button"></div>
  </form>
  <div class="new_user_renewan"></div>
</div>
</template>

<script>
export default {

}
</script>

<style>
@import '~/static/css/renew/index.css'
</style>
