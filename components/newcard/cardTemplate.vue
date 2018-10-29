<template lang="pug">
div.card-profile
  old-card-template(v-if="templateId<=13&&isoldTemplateShow", :userInfos="userInfos", :query="setQuery()", @showDialog="showDialog", :dreamTemplate ="templateId", :templateClassName = "templateClassName")
  newCardTemplate(v-if="templateId>13&&!isoldTemplateShow", :userInfos="userInfos", :isPreview="isPreview", :templateId="templateId", :colorTheme="colorTheme", :isApplyShow="isApplyShow" @showDialog="showDialog")
</template>

<script>
import { cradTemplateListz } from "~/apis/brand"
import oldCardTemplate from "~pages/newcard/template/index"
import newCardTemplate from "./newCardTemplate"
import setQuery from '~static/mixins/setQuery'
export default {
  name: 'card-template',
  props: {
    userInfos: {
      require: true,
      type: Object
    },
    isPreview: {
      default: false,
      type: Boolean
    },
    templateId: {
      require: true,
      type: Number
    },
    isApplyShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isoldTemplateShow: false, // 标识旧模板
      templateClassName: '',
      colorTheme: ''
    }
  },
  beforeMount () {
    this.initCardTheme()  // 图标
  },
  methods: {
    showDialog () {
      this.$emit('changeDialogStatus')
    },
    /**
     * 初始化名片图标
     * @return {[type]} [description]
     */
    initCardTheme () {
      let templateCss, templateValue
      cradTemplateListz({id: this.templateId}).then(result => {
        templateValue = result
        // 是否存在
        if (this.templateId && this.templateId != "null") {
          //  新模板
          if (Number(this.templateId) > 13) {
            templateCss = templateValue.dreamCardtemplatecss;
            this.colorTheme = templateCss.split("/")[1];
            // console.log(this.colorTheme);
            templateCss = templateCss.split("/")[2];
    				require(`~static/css/newcard/template/${templateCss}`);
    				this.isoldTemplateShow = false
          } else {
    				//旧模板,并且不显示修改资料的选项;
    				this.$emit('cardTemplateInit', '/wusercenter/editdata')
            if (this.templateId == 1 ||this.templateId == 3 ||this.templateId == 6) {
              templateCss = templateValue.dreamCardtemplatecss;
              templateCss = templateCss.split("/")[1]; //获取css地址
              require(`~static/css/newcard/template/${templateCss}`);
            } else {
              templateCss = templateValue.dreamCardtemplatecss;
              templateCss = templateCss.split("/")[1];
              this.templateClassName = templateCss.split('.')[0]
              let a = require(`~static/css/newcard/template/cardmb_5.css`);
              require(`~static/css/newcard/template_icon/${templateCss}`);
    				}
    				this.isoldTemplateShow = true
          }
        } else {
    			// 未选择名片模板默认蓝色模板id=17;
    			require(`~static/css/newcard/template/cardmb_15.css`);
    			this.isoldTemplateShow = false
          console.log("没有选择名片模板");
        }
      }).catch(e => {
        console.log('获取名片模板失败', e);
      })
    },
  },
  mixins: [setQuery],
  components: {
    oldCardTemplate,
    newCardTemplate
  }
}
</script>

<style lang="css" scoped>
</style>
