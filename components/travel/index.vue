<template>
<div class="single_item">
  <li>
    <nuxt-link :to="{path:path,query:{cid:content.dreamClassid,id:content.id,uid:query.uid,brand:query.brand}}">
      <div class="img"><img src="~static/img/blank.gif"
             v-lazy="content.dreamDefaultpicurl + '?w=160&h=120&p=1'" /></div>
      <div class="text">
        <h3>{{content.dreamTitle}}</h3>
        <span>
            <b>时间</b>
            {{content.dreamTime1}}
            </span>
        <span>
            <b>价格</b>
            <p><cite>$</cite>{{content.dreamPrice2}}/人</p>
            <i>抵积分{{content.dreamPrice}}</i>
          </span>
      </div>
    </nuxt-link>
  </li>
</div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    content: {
      default: ''
    },
    query: {
      default: ''
    }
  }
}
</script>
<style scoped>
.newnews_list .single_item {
  margin: 0 5px;
  border: 1px #E8E8E8 solid;
  border-top: none;
  background: #FFF;
  overflow: hidden;
}

.newnews_list.noline .lytcclass,
.newnews_list.noline .single_item {
  margin: 0;
  border: none;
  border-bottom: 1px #E8E8E8 solid;
}

.newnews_list .single_item li {
  float: left;
  width: 100%;
  padding: 10px 0;
  list-style: none;
}

.newnews_list .single_item li div.img {
  float: left;
  width: 130px;
  margin-left: 10px;
}

.newnews_list .single_item li div.img img {
  float: left;
  width: 100%;
}

.newnews_list .single_item li div.text {
  margin-left: 150px;
  margin-right: 10px;
  font-size: 16px;
  font-family: "微软雅黑";
  position: relative;
  overflow: hidden;
}

.newnews_list .single_item li div.text h3 {
  float: left;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  padding-bottom: 20px;
}

.newnews_list .single_item li div.text span {
  float: left;
  width: 100%;
}

.newnews_list .single_item li div.text span b,
.newnews_list .single_item li div.text span p {
  float: left;
  font-weight: 400;
  padding-right: 10px;
  color: #FA0;
}

.newnews_list .single_item li div.text span i {
  color: #699391;
  font-size: 14px;
  font-style: normal;
}

@media screen and (max-width: 420px) {
  .newnews_list .single_item li div.img {
    width: 100px;
  }
  .newnews_list .single_item li div.text {
    margin-left: 120px;
    font-size: 14px;
  }
  .newnews_list .single_item li div.text h3 {
    font-size: 16px;
    padding-bottom: 5px;
    line-height: 130%;
  }
  .newnews_list .single_item li div.text span {
    line-height: 150%;
  }
  .newnews_list .single_item li div.text span i {
    font-size: 14px;
    font-style: normal;
  }
}
</style>
