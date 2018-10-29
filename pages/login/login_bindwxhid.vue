<template lang="html">

</template>

<script>
import {numToCharacter} from '~static/js/util'
export default {
  asyncData({route, redirect,query}){
    query.uid = numToCharacter(query.uid, 2)
    return {
      query: query
    }
  },
  beforeMount(){
    this.$msg('绑定成功')
    this.$router.push({
      path: '/wusercenter',
      query: this.query
    })
  }
}
</script>

<style lang="css" scoped>
</style>
