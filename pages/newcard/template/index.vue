<template>
  <div>
  <!-- template1 -->
   <div id="info" class="newcard" v-if="dreamTemplate==1">
    <div class="new_userinfo1">
    <div class="new_userlogo">
    <a href="javascript:void(0)" @click="showDialog"><img :src="setImgUrl({src:userInfos.dreamImg})" border="0"></a></div>
    <div class="new_shoucang fxdpy" id="fxdpy2">收藏</div>
    <div class="new_name"><h3>{{userInfos.dreamFullname}}</h3><span>{{splitName(userInfos.dreamServicename)}}</span></div>
    <div class="new_phone" v-show="userInfos.dreamMobile"><a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a></div>
    <div class="new_phone" v-show="userInfos.dreamMobile2"><a :href="'tel:'+userInfos.dreamMobile2">{{userInfos.dreamMobile2}}</a></div>
    <div class="new_wx"><a href="javascript:;" @click="showDialog"><img :src="wx_icon"></a></div>
    </div>
    <div class="new_urllink">
    <ul>
    <li v-for="(item,index) in userLink" v-bind:key="index"><nuxt-link :to="{path:item.path,query:query}"><div :class="item.className">{{item.title}}</div></nuxt-link></li>
    </ul>
    </div>
    <div class="new_userinfo2">
      <ul>
      <li><h3>{{splitName(userInfos.dreamCompanyname)}}</h3></li>
      <li><span>邮箱：</span><p>{{userInfos.dreamEmail}}</p></li>
      <li><span>Q Q ：</span><p>{{userInfos.dreamQq}}</p></li>
      <li><span>电话：</span><p><a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a> <a :href="'tel:'+userInfos.dreamMobile2"></a></p></li>
      <li><span>地址：</span><p class="nowrap">{{userInfos.dreamAddress}}</p></li>
      <li><span style="width:75px;">个人说明：</span><p>{{userInfos.dreamContent}}</p></li>
      <li class="con"><p></p></li>
      </ul>
      </div>
  </div>

  <!-- template 3 -->
   <div id="info1" v-if="dreamTemplate==3">
    <div class="new_card">
      <div class="cleardiv">
        <div class="new_userlogo"><a href="javascript:void(0)" @click="showDialog"><img :src="setImgUrl({src:userInfos.dreamImg})" border="0"></a></div>
        <div class="new_userinfo1"><div class="new_xmth">
          <div class="new_name"><h3>{{userInfos.dreamFullname}}</h3><span>{{splitName(userInfos.dreamCompanyname)}}</span></div><div class="new_phone"><a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a></div></div>
          <div class="new_urllink">
            <ul>
              <!-- <li v-for="(item,index) in userLink" v-bind:key="index"><a :href="item.path+'?uid='+query.uid+'&brand='+query.brand" target="_blank"><div :class="item.className">{{item.title}}</div></a></li>    -->
            <li v-for="(item,index) in userLink" v-bind:key="index">
              <nuxt-link :to="{path:item.path,query:setQuery()}">
                <div :class="item.className">{{item.title}}</div>
              </nuxt-link>
            </li>
            </ul>
            </div></div></div><div class="new_userinfo2">
            <ul><li><h3>{{splitName(userInfos.dreamCompanyname)}}</h3></li>
            <li><span>邮箱：</span><p>{{userInfos.dreamEmail}}</p></li>
            <li><span>Q Q：</span><p>{{userInfos.dreamQq}}</p></li>
            <li><span>电话：</span><p><a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a></p></li>
            <li><span>地址：</span><p>{{userInfos.dreamAddress}}</p></li>
            <li><span style="width:80px;">个人说明：</span><p>{{userInfos.dreamContent}}</p></li>
            <li class="con"><p></p></li>
            </ul>
            <div class="new_wx"><a href="javascript:;" @click="showDialog"><img :src="wx_icon"><br></a></div></div>
            <div class="new_userinfo3"><div class="con"></div>
            <!-- <div class="new_shoucang fxdpy" id="fxdpy2">收藏</div> -->
             </div>
            </div>
            </div>

  <!-- template 6 -->
  <div class="cleardiv" v-if="dreamTemplate==6" id="info2">
  <div class="new_userlogo"><a href="javascript:void(0)" @click="showDialog"><img :src="setImgUrl({src:userInfos.dreamImg})" border="0"></a></div>
  <div class="new_userinfo1"><div class="new_xmth"><div class="new_name"><h3>{{userInfos.dreamFullname}}</h3><span>{{splitName(userInfos.dreamServicename)}}</span></div>
  <div class="new_phone"><a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a></div></div>
  <div class="new_urllink">
  <ul>
    <li v-for="(item,index) in userLink" v-bind:key="index">
      <nuxt-link :to="{path:item.path,query:setQuery()}">
        <div :class="item.className">{{item.title}}</div>
      </nuxt-link>
      <!-- <a :href="item.path+'?uid='+query.uid+'&brand='+query.brand" target="_blank"><div :class="item.className">{{item.title}}</div></a> -->
    </li>
  </ul>
  </div>
  </div>
  <div class="new_userinfo2">
  <ul>
  <li><span class="ico1"><i>公司：</i><span class="name">{{splitName(userInfos.dreamCompanyname)}}</span></span></li>
  <li><span class="ico2"><i>微信：</i><span class="name">{{userInfos.dreamWx}}</span><div class="new_wx"><a href="javascript:void(0)" @click="showDialog"><img :src="qr_code"></a></div></span></li>
  <li><span class="ico3"><i>QQ：</i><span class="name">{{userInfos.dreamQq}}</span></span></li>
  <li><span class="ico4"><i>邮箱：</i><span class="name">{{userInfos.dreamEmail}}</span></span></li>
  <li><span class="ico5"><i>地址：</i><span class="name">{{userInfos.dreamAddress}}</span></span></li>
  <li><span style="padding-left:18px;">个人说明：</span><p style="padding:4px 4px 4px 0px;">{{userInfos.dreamContent}}</p></li></ul></div>
  <div class="new_userinfo3"><div class="con"></div></div>
  <!-- <div class="new_shoucang fxdpy" id="fxdpy2">收藏这张名片</div> -->
  </div>

<!-- 其余模板 -->
 <div id="info3" v-if="dreamTemplate!==1&&dreamTemplate!==3&&dreamTemplate!==6">
    <div class="new_card" :class="templateClassName">
      <div class="new_userlogo"><a href="javascript:void(0)" @click="showDialog"><img :src="setImgUrl({src:userInfos.dreamImg})" border="0"></a></div>
      <div class="new_userinfo1">
        <!-- <a href="javascript:void(0)"><div class="new_shoucang" id="shoucang">收藏</div></a> -->
        <div class="new_name"><h3>{{userInfos.dreamFullname}}</h3></div>
        <div class="new_canshu">{{splitName(userInfos.dreamServicename)}}
        <a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a>
        <!-- <a :href="'tel:'+userInfos.dreamMobile2">{{userInfos.dreamMobile2}}</a> -->
        <div class="new_wx">
        <a :href="'tel:'+userInfos.dreamMobile"><img :src="tel_icon"></a>
        <a href="javascript:void(0)" @click="showDialog"><img :src="qr_code"></a>
         </div>
        </div>
       </div>
      <div class="new_urllink">
      <ul>
        <li v-for="(item,index) in userMenu[0]" v-bind:key="index">
           <nuxt-link :to="{path:item.path,query:setQuery()}">
             <i :class="item.iconName"></i>
             <div>{{item.title}}</div>
          </nuxt-link>
        </li>
      </ul>

      <ul>
        <li>
          <a :href="userMenu[1][0].path" @click="showPerson()"><i :class="userMenu[1][0].iconName"></i><div>{{userMenu[1][0].title}}</div></a>
        </li>
        <li>
        <a :href="userMenu[1][1].path+'?uid='+query.uid+'&brand='+query.brand"><i :class="userMenu[1][1].iconName"></i><div>{{userMenu[1][1].title}}</div> </a>
        </li>
        <li>
           <nuxt-link :to="{path:userMenu[1][2].path,query:setQuery()}">
            <i :class="userMenu[1][2].iconName"></i><div>{{userMenu[1][2].title}}</div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    </div>
  <!-- 个人信息弹窗 -->
  <div class="info_shadow" v-show="isPersonShow">
  <div id="dialog5" style="display:block">
  <p class="close"><a href="javascript:void(0)" @click="hidePerson">X</a></p>
  <div class="new_userinfo2">
  <ul>
    <li><h3>{{userInfos.dreamCompanyname}}</h3></li>
    <li><span>邮箱：</span><p>{{userInfos.dreamEmail}}</p></li>
    <li><span>Q Q：</span><p>{{userInfos.dreamQq}}</p></li>
    <li><span>电话：</span><p><a :href="'tel:'+userInfos.dreamMobile">{{userInfos.dreamMobile}}</a> <a :href="'tel:'+userInfos.dreamMobile"></a></p></li>
    <li><span>地址：</span><p>{{userInfos.dreamAddress}}</p></li>
    <li><span>个人说明：</span><p>{{userInfos.dreamContent}}</p></li>
    </ul>
    </div>
    </div>
  </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import setImgUrl from "~static/mixins/setImgUrl";
import setQuery from "~static/mixins/setQuery";
import appConf from "~/app.config";
import avatarAndQrcode from "~components/avatarAndQrcode";
import dialogAvatar from "~pages/newcard/dialog/dialog_avatar";
import {cradTemplateListz} from '~/apis/brand.js'
export default {
  props: {
    userInfos: {
      type: Object,
      default: {}
    },
    query: {
      type: Object,
      default: {}
    },
    dreamTemplate:{
      type:Number,
      default:0
    },
    templateClassName:{
      type:String,
      default:''
    }

  },
  data() {
    return {
      userLink: [
        { title: "公司介绍", path: "/", className: "",flag:''},
        { title: "我的原创", path: "/wusercenter/editarticle/selfopusmap", className: "" ,flag:''},
        { title: "事业说明", path: "/newslist", className: "" ,flag:'推荐文章'},
        { title: "申请网站", path: "/register", className: "red" ,flag:''}
      ],
      userMenu: [
        [
          { title: "公司介绍", path: "/", className: "", iconName: "icon_1" },
          { title: "事业说明", path: "/newslist", className: "", iconName: "icon_2" },
          { title: "我的原创", path: "/wusercenter/editarticle/selfopusmap", className: "", iconName: "icon_3" }
        ],
        [
          { title: "个人信息", path: "javascript:;", className: "", iconName: "icon_4" },
          { title: "分享论坛", path: "http://www.vzan.com/f/s-596345?typeId=0", className: "", iconName: "icon_5" },
          { title: "申请网站", path: "/register", className: "red", iconName: "icon_6" }
        ]
      ],
      wx_icon: appConf.old_card_template.wx_icon,
      tel_icon:appConf.old_card_template.tel_icon,
      qr_code:appConf.old_card_template.qr_code,
      isDialog:false,
      isPersonShow:false,
      // isTemplateShowOne:false,
      // isTemplateShowThree:false,
      // isTemplateShowSix:false,
      // isTemplateShowOthers:false,
    };
  },
  methods:{
    hidePerson(){
      this.isPersonShow =false
    },
    showPerson(){
      this.isPersonShow = true
    },
    showDialog(){
       this.$emit('showDialog')
    },
    // 公司名称和职位名称;
    splitName(name){
      let retName = ''
      if(name){
         if(name.indexOf('|$|')!=-1){
        retName = name.split('|$|')[0]
      }else{
        retName = name
      }
      }else{
        retName = ''
      }
      return retName
    },
  },
  mixins: [setImgUrl,setQuery],
  components:{
    avatarAndQrcode,
    dialogAvatar
  }
};
</script>
