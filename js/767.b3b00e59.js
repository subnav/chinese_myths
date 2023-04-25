"use strict";(self["webpackChunkchinese_myths"]=self["webpackChunkchinese_myths"]||[]).push([[767],{5767:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"box-container"},[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/bghome"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("板块管理")]),t("el-breadcrumb-item",[e._v("板块列表")])],1),t("el-card",{staticClass:"box-card"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData.filter((t=>!e.search||t.name.toLowerCase().includes(e.search.toLowerCase())||t.detail.toLowerCase().includes(e.search.toLowerCase()))),"default-sort":{prop:"date",order:"descending"}}},[t("el-table-column",{attrs:{prop:"name",label:"帖子板块",align:"center",sortable:"",width:"180"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a.row.edit?t("el-input",{staticClass:"username",attrs:{placeholder:"帖子板块"},model:{value:a.row.name,callback:function(t){e.$set(a.row,"name",t)},expression:"scope.row.name"}}):e._e(),a.row.edit?e._e():t("span",{attrs:{size:"medium"}},[e._v(e._s(a.row.name))])],1)]}}])}),t("el-table-column",{attrs:{prop:"detail",label:"板块详情",align:"center",width:"580"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.edit?t("el-input",{staticClass:"plate",attrs:{placeholder:"板块详情"},model:{value:a.row.detail,callback:function(t){e.$set(a.row,"detail",t)},expression:"scope.row.detail"}}):e._e(),a.row.edit?e._e():t("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(a.row.detail))])]}}])}),t("el-table-column",{attrs:{align:"right",prop:"address",formatter:e.formatter},scopedSlots:e._u([{key:"header",fn:function(a){return[t("el-input",{attrs:{size:"mini",clearable:"",placeholder:"输入关键字搜索"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})]}},{key:"default",fn:function(a){return[t("el-button",{directives:[{name:"show",rawName:"v-show",value:!a.row.edit,expression:"!scope.row.edit"}],attrs:{size:"mini",type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(t){return e.PlateListEdit(a.$index,a.row)}}}),t("el-button",{directives:[{name:"show",rawName:"v-show",value:!a.row.edit,expression:"!scope.row.edit"}],attrs:{size:"mini",type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(t){return e.PlateListeDelete(a.$index,a.row.sid)}}}),t("el-button",{directives:[{name:"show",rawName:"v-show",value:a.row.edit,expression:"scope.row.edit"}],staticStyle:{"margin-left":"0"},attrs:{size:"mini"},on:{click:function(t){return e.handleCancel(a.$index,a.row)}}},[e._v("取消")]),t("el-button",{directives:[{name:"show",rawName:"v-show",value:a.row.edit,expression:"scope.row.edit"}],attrs:{disabled:e.isDsabled,size:"mini",type:"success"},on:{click:function(t){return e.handleSave(a.$index,a.row)}}},[e._v("保存")])]}}])})],1),t("div",{staticClass:"block",staticStyle:{"text-align":"center","margin-top":"15px"}},[t("el-button",{staticClass:"add el-icon-plus",attrs:{type:"primary",size:"mini"},on:{click:e.PlateListAdd}},[e._v("添加")])],1)],1)],1)},s=[],n=(a(7658),a(2761)),r={name:"plate-list",data(){return{tableData:[],tableDataCopy:[],newPlateList:{sid:"",name:"",detail:"",portrait:"",edit:!1},search:"",isDsabled:!0,index:0}},watch:{tableData:{deep:!0,handler(e,t){console.log(JSON.stringify(this.tableDataCopy)===JSON.stringify(t)),JSON.stringify(this.tableDataCopy)===JSON.stringify(t)?this.isDsabled=!0:this.isDsabled=!1}}},created(){const e=this.$loading({lock:!0,text:"数据加载中......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});setTimeout((()=>{e.close(),this.getAllPlateSections()}),1e3)},filters:{ellipsis(e){return e?e.length>10?e.slice(0,9)+"...":e:""}},methods:{async getAllPlateSections(){const e=await(0,n.Cy)(),t=e;t.data.forEach((e=>{e.edit=!1,this.tableData.push(e),this.tableDataCopy.push({...e})})),console.log(this.tableData)},PlateListEdit(e,t){t.edit=!0,this.tableDataCopy[e]&&(this.tableDataCopy[e].edit=!0)},PlateListAdd(e){const t=this.tableData.length;for(const a in this.tableData){if(a===t)break;if(this.tableData[a].edit)return void this.$message.warning("请先保存信息")}this.newPlateList.newList=1,this.tableData.push({...this.newPlateList}),this.tableDataCopy.push({...this.newPlateList}),this.PlateListEdit(t,this.tableData[t])},async PlateListeDelete(e,t){const a=await this.$confirm("确定要删除此板块吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("confirm"!==a)return this.$message.info("已取消删除");const i=await(0,n.GP)(t);if(200!==i.status)return this.$message.error("删除失败");this.$message.success(i.data),1!==this.tableData.length?(this.tableData.splice(e,1),this.tableDataCopy.splice(e,1)):this.$alert("至少要添加一条信息，无法删除",{confirmButtonText:"确定",callback:()=>{this.$message.warning("对应信息不能为空！")}})},handleCancel(e,t){if(console.log(this.tableData[e].name,t.name),t.newList)return this.tableDataCopy.pop(),this.tableData.pop();this.tableDataCopy[e].name!==t.name&&(t.name=this.tableDataCopy[e].name),this.tableDataCopy[e].detail!==t.detail&&(t.detail=this.tableDataCopy[e].detail),t.edit=!1,this.tableDataCopy[e].edit=!1},async handleSave(e,t){this.tableDataCopy[e]?t.isInset="":t.isInset=1;const a=await(0,n.qG)(t);if(console.log("123",a),200===a.status&&a.msg)return t.edit=!1,this.tableDataCopy[e]={...t},this.$message.success(a.msg);this.$message.error("添加失败")},formatter(e,t){return e.address}}},l=r,o=a(1001),c=(0,o.Z)(l,i,s,!1,null,"54d72744",null),d=c.exports},2761:function(e,t,a){a.d(t,{CP:function(){return p},Cy:function(){return u},GP:function(){return c},Xh:function(){return m},Y8:function(){return n},h8:function(){return o},jl:function(){return s},qC:function(){return b},qG:function(){return d},sl:function(){return l},x1:function(){return h},z2:function(){return r}});var i=a(5047);const s=()=>(0,i.v)("/getAllData"),n=(e,t)=>(0,i.v)("/getAllUser",{uid:e,token:t}),r=e=>(0,i.v)("/register",e),l=(e,t,a,s,{email:n,password:r,phone:l,role:o,uid:c,username:d})=>(0,i.v)("updataInfoByAdmin",{email:n,password:r,phone:l,role:o,uid:c,username:d,token:e,adminId:t,adminPwd:a,adminUser:s}),o=e=>(0,i.v)("/deleteUser",{uid:e}),c=e=>(0,i.v)("delectSection",{sid:e}),d=e=>(0,i.v)("addSection",e),u=()=>(0,i.v)("getAllSections"),h=()=>(0,i.v)("getAllPost"),p=e=>(0,i.v)("updatePost",e),m=(e,t)=>(0,i.v)("goToRecycle",{sid:e,pid:t}),b=(e,t)=>(0,i.v)("noneRecycle",{uid:e,pid:t})}}]);
//# sourceMappingURL=767.b3b00e59.js.map