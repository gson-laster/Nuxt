<template lang="pug">
.user-detail
  ul
    li.item(:class="[colorTheme+'-barrage']", style='flex-direction:column')
      p(v-for='(item,index) in componeyAndServiceName', :key='index') {{item.dreamCompanyname}}    {{item.dreamServicename}}
    li.item
      p(:class="[colorTheme+'-mobile']", style='margin-left:0px;padding-left:30px;background-position:left center;')
        a(:href="'tel:'+userInfos.dreamMobile")
          | {{userInfos.dreamMobile == '' || userInfos.dreamMobile == null ? '您的电话号码' : userInfos.dreamMobile}}
      p(:class="[colorTheme+'-mobile']", style='margin-left:8px;padding-left:30px;background-position:left top;', v-show='userInfos.dreamMobile2') {{userInfos.dreamMobile2}}
    li(:class="['item', colorTheme+'-mail']", v-show='userInfos.dreamEmail')
      p {{userInfos.dreamEmail}}
    li(:class="['item', colorTheme+'-QQ']", v-show='userInfos.dreamQq')
      p {{userInfos.dreamQq}}
    li(:class="['item',colorTheme+'-coordinates']", v-show='userInfos.dreamAddress')
      p {{userInfos.dreamAddress}}
</template>

<script>
export default {
  name: 'user-profile',
  props: {
    userInfos: {
      require: true,
      type: Object
    },
    colorTheme: {
      default: '',
      type: String
    },
    isPreview: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    componeyAndServiceName() {
      let companyText = "",companyArr=[]
      if (this.isPreview ||!this.userInfos.dreamCompanyname){
        companyText = "您的公司名称"
        companyArr[0] = companyText
      } else {
        companyText = this.userInfos.dreamCompanyname;
        if(companyText.indexOf('|$|')){
          companyArr = companyText.split('|$|')
        }
      }
      let serviceName = "",serviceNameArr=[]
      if (this.userInfos.dreamServicename == null ||this.userInfos.dreamServicename == "") {
        serviceName = "您的职位名称"
        serviceNameArr[0] = serviceName
      } else {
        serviceName = this.userInfos.dreamServicename;
        if(serviceName.indexOf('|$|')){
          serviceNameArr = serviceName.split('|$|')
        }
      }
      // 公司名称与职位名称谁更长;
      let iteraData = []
      if(companyArr.length>serviceNameArr.length){
         iteraData = serviceNameArr
      }else{
        iteraData = companyArr
      }

      //拼接公司名称和职称;
      let data = {}
      let dataArr = []
      for(let i in iteraData){
          dataArr.push({dreamCompanyname:companyArr[i],dreamServicename:serviceNameArr[i]})
      }
      return dataArr
    }
  }
}
</script>

<style lang="css" scoped>
</style>
