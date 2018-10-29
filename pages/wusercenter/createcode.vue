<template>
    <div class="box createcode">

    <!-- 生成开通码的弹窗 -->
    <div class="layer-shadow first " v-show="creatCodeLayer" @click="hideCodeList">
      <div class="layer-content">
        <header class="layer-header">
          <span class="number">{{creatCodeLen}}个</span><span>开通码已生成</span>
          <p class="close-btn">x</p>
        </header>
        <div class="layer-list">
           <p v-for="(item,index) in creatCodeList" v-bind:key="index">{{item.dreamCdkey}}</p> 
        </div>
        <div class="confirm-btn" id="firstConfirmBtn" style="margin-top:0px;">确认</div>
      </div>
    </div>

    <!-- 使用开通码的弹窗 -->
    <div class="layer-shadow layer-usecode" v-show="isUseCode">
      <div class="layer-content">
        <header class="layer-header">
          <span class="number"></span><span>使用开通码</span>
          <p class="close-btn" @click="hideUserShadow">x</p>
        </header>
        <div class="account-wrapper">
          <ul>
            <li>
              <p>开通码</p>
              <p id="showOpenCode">{{needUseCode}}</p>
            </li>
            <li>
              <p>账号</p>
              <p><input type="number" name="" value="" placeholder="请输入账号" class="account" v-model="openUser" @input="writeInput"></p>
            </li>
            <li style="color:#ff0000;text-align:center;" v-show="isConfirmLayer">{{confirmContent}}</li>
          </ul>
        </div>
        <div class="confirm-btn" @click="confirmOpen()">确认开通</div>
      </div>
    </div>
 
    <!-- 核对信息弹窗 -->
    <div class="layer-shadow  layer-check" v-show="isCheckLayer">
      <div class="layer-content">
        <header class="layer-header" @click="closeCheckLayer">
          <span class="number"></span><span>请核对信息</span>
          <p class="close-btn">x</p>
        </header>
        <div class="account-wrapper">
          <ul>
            <li class="clearfix"style="margin-top:20px;"><p>账号</p><p>{{openUser}}</p></li>
            <li class="clearfix"><p>默认密码</p><p>123456</p></li>
            <!-- <li class="clear"><p>账号</p><p>18500551104</p></li>
              <li class="clear"><p>密码</p><p>123456</p></li> -->
            <!-- <li style="text-align:center;margin-top:20px;font-size:16px;color:#ff0000;">开通码已使用</li> -->
          </ul>
        </div>
        <div class="confirm-btn" @click="creatUserByCode">确认</div>
      </div>
    </div>
    <div class="fix-container">
      <header class="header">
        <div class="title-container">
          <div class="title">剩余开通码</div>
          <p class="remainderCode">{{isNaN(remainderCode)?0:remainderCode}}</p>
        </div>

        <div class="title-bottom">
          <label> <span>开通人数</span> <input type="number" v-model="opendNumber" class="openNumber">
        </label>
          <button class="create-code-btn" @click="createCDKeys">生成开通码</button>
        </div>
      </header>
      <nav class="navaga clearfix">
        <ul>
          <li @click="napeListClick(index)" v-for="(item, index) in napeList" :class="{active: none == index}" v-bind:key="index">{{item.name}}</li>
        </ul>
      </nav>
      <!--  未使用的部分-->
      <div class="list-header clearfix" v-show="!none">
        <ul>
          <li>
            <div class="left">开通码</div>
            <div class="right">
              <span style="text-align:left">开通时间</span>
              <span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-show="none == 0" class="list-content scrollload-container-noUse">
      <ul class="codeNoUsed">
      <li v-for="(item,index) in agentNoUse.result" v-bind:key="index" class="item"><div class="left">{{item.dreamOpencode}}</div><div class="right"><p class="time">{{formatDate(item.dreamBuildtimes)}}</p><button class="btn" @click="use(item.dreamOpencode)">使用</button></div></li>
      </ul>
    <pagination v-show="agentNoUse.result && agentNoUse.result.length != 0" :pagination="agentNoUse.totalPages" @changePagination="changePagination" :nowActive="agentNoUse.pageNo"></pagination>  
    </div> 
   
    <!-- 已经使用的部分 -->
    <div v-show="none == 1" class="list-header  clearfix">
      <ul>
        <li>
          <div class="left">开通码</div>
          <div class="right">
            <span>使用人(会员编号)</span>
          </div>
        </li>
      </ul>
    </div>
    
    <div v-if="none == 1" class="list-content scrollload-container">
      <ul class="codeUsed scrollload-content">
      <li v-for="(item,index) in agentUesed.result" v-bind:key="index" class="item"><div class="left">{{item.dreamOpencode}}</div><div class="right"><p class="time">{{item.dreamConsumer}}</p></div></li>
      </ul>
      <pagination v-if="agentUesed.result && agentUesed.result.length!= 0" :pagination="agentUesed.totalPages" @changePagination="changePagination" :nowActive="agentUesed.pageNo"></pagination>
    </div>
  </div>
</template>
<script>
import { getOpenpermit, getOpenuserrecode, getcdkeys,openuser} from "~/apis/agents";
import { fecthUserInfo } from "~/apis/user";
import { declassify, dateFormat } from "~static/js/util";
import pagination from "~components/pagination";
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  async asyncData({ query, store }) {
    let dreamUserid = declassify(query.uid);
    let result = await Promise.all([
      getOpenpermit({ dreamUserid: dreamUserid }),
      getOpenuserrecode({ dreamIsuser: 1, dreamOwner: dreamUserid, index: 1 }), //已使用
      getOpenuserrecode({ dreamIsuser: 0, dreamOwner: dreamUserid, index: 1 }) //未使用
    ]).catch(e => {
      console.log(e)
    });
    return {
      agentOpenInfo: result[0],
      agentNoUse: result[2] || [],
      agentUesed: result[1],
      query: query,
      user: dreamUserid,
      remainderCode: Number(result[0].dreamOpenprimit) - Number(result[0].dreamHaveopend)
    };
  },
//computed: {
//  remainderCode() {
//    return (
//      Number(this.agentOpenInfo.dreamOpenprimit) -
//      Number(this.agentOpenInfo.dreamHaveopend)
//    );
//  }
//},
  data() {
    return {
      napeList: [{ name: "未使用" }, { name: "已使用" }],
      opendNumber: 1,
      none: 0,
      needUseCode: "",
      isUseCode: false,
      isVip: false,
      openUser: "",
      confirmContent: "该账号已是VIP,请勿重复开通",
      isConfirmLayer: false,
      isCheckLayer: false,
      allLoaded: false,
      bottomStatus: "",
      creatCodeLayer: false,
      creatCodeLen: 0,
      creatCodeList: []
    };
  },
  methods: {
    // 输入开通码
    writeInput(){
      if(!this.openUser){
          this.isConfirmLayer = false   
      }
    },
    closeCheckLayer(){
      this.isCheckLayer = false
      this.openUser = ''
    },
    async napeListClick(i) {
      this.none = i;
    },
    use(item) {
      this.needUseCode = item;
      this.isUseCode = true;
    },
    hideUserShadow() {
      this.isUseCode = false;
    },
    // 使用开通码,进行核对;
    confirmOpen() {
      if (!this.openUser) {
        this.confirmContent = "请输入需要开通的账号";
        this.isConfirmLayer = true;
        return;
      }
      fecthUserInfo({ dreamUsername: this.openUser })
        .then(res => {
          if (res.userInfo[0].dreamUsername&&res.userInfo[0].dreamIsok) {
            this.confirmContent = "该账号已经是VIP,请勿重复开通";
            this.isConfirmLayer = true;
          }else{
            this.isConfirmLayer = false;
            this.isCheckLayer = true;
            this.isUseCode = false;      
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    creatUserByCode() {
      let data = {};
      let brand = this.query.brand;
      data.dreamBranddefault = brand;
      data.dreamOpencode = this.needUseCode;
      data.dreamUsername = this.openUser;
      openuser(data).then(res=>{
        if(res.code==2000){
           alert(res.data)
           setTimeout(()=>{
             window.location.reload()
           },500) 
        }else{
          alert('开通失败')
        }
      }).catch(e=>{
          console.log(e)
      })    
    },
    createCDKeys() {
      if (this.remainderCode < this.opendNumber) {
      	this.$msg('开通码数额不足，请联系客服购买。');
      	return false;
      }
      let data = {};
      data.dreamUserid = this.user;
      data.pagesize = this.opendNumber;
      getcdkeys(data)
        .then(res => {
          getOpenuserrecode({ dreamIsuser: 0, dreamOwner: this.user, index: 1 }).then(res => {
//          console.error(res)
            this.agentNoUse = res
          })
          if (res.code == 2000) {
            this.remainderCode = this.remainderCode - this.opendNumber
          //  console.log(this.remainderCode)
            this.creatCodeLayer = true;
            this.creatCodeLen = res.data.length;
            this.creatCodeList = res.data;
          } else {
            this.$msg("生成开通码失败");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    hideCodeList() {
      this.creatCodeLayer = false;
    },
    formatDate(timeStamp) {
      return dateFormat("y-M-d", timeStamp);
    },
    changePagination(index) {
      if (this.none == 0) {
        getOpenuserrecode({
          dreamIsuser: 0,
          dreamOwner: this.user,
          index: index
        }).then(res => {
           this.agentNoUse = res  
        }); //未使用
      } else {
        getOpenpermit({
          dreamIsuser: 1,
          dreamOwner: this.user,
          index: index
        }).then(res => {
          this.agentUesed = res  
        });
      }
    }
  },
  components: {
    pagination
  }
};
</script>
<style scoped>
@import "~static/css/wusercenter/createcode.css";
.box.createcode .layer-shadow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 300;
  max-width: 640px;
}
.box.createcode .layer-content {
  background-color: #fff;
  width: 330px;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
}
.box.createcode .layer-content .layer-header {
  text-align: center;
  height: 47px;
  line-height: 47px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.box.createcode .layer-usecode .account-wrapper {
  margin: 0 10px;
}
.box.createcode .layer-shadow .confirm-btn {
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #ff0000;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  margin-top: 20px;
  font-size: 15px;
}
.box.createcode .layer-content .layer-header .close-btn {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 47px;
  text-align: center;
  line-height: 47px;
  width: 50px;
  text-align: center;
  color: #ff0000;
  font-size: 20px;
}
.box.createcode .account-wrapper li {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
}
.box.createcode .account-wrapper li .account {
  outline-style: none;
  border: 1px solid #ccc;
  height: 26px;
  line-height: 26px;
  border-radius: 6px;
  text-indent: 10px;
}
</style>