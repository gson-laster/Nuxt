<template>
  <div>
    <div class="listitle">会员分享</div>
    <div class="listnav">
      <div class="list">
        <article-item></article-item>
        <article-item></article-item>
        <article-item></article-item>
        <article-item></article-item>
        <article-item></article-item>
      </div>
    </div>

  </div>
</template>

<script>
import ArticleItem from '~components/article/articleItem'
export default {
  components: {
    ArticleItem
  }
}
</script>

<style scoped>
.listitle {
  max-width: 640px;
  width: 99%;
  margin: 0 auto;
  clear: both;
  line-height: 35px;
  font-size: 18px;
  font-weight: 700;
  background-color: #fff;
  border-bottom: 1px #DBDBDB solid;
}

.listnav #list {
  padding: 10px;
}
</style>
