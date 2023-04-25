"use strict";(self["webpackChunkchinese_myths"]=self["webpackChunkchinese_myths"]||[]).push([[214],{6214:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var s=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/bghome"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("用户管理")]),t("el-breadcrumb-item",[e._v("用户列表")])],1),t("el-card",[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:8}},[t("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getUserList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchList},slot:"append"})],1)],1),t("el-col",{attrs:{span:4}},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加用户")])],1)],1),t("el-table",{attrs:{data:e.userlist,border:"",stripe:""}},[t("el-table-column",{attrs:{label:"#",type:"index"}}),t("el-table-column",{attrs:{label:"用户名",prop:"username"}}),t("el-table-column",{attrs:{label:"邮箱",prop:"email"}}),t("el-table-column",{attrs:{label:"电话",prop:"phone"}}),t("el-table-column",{attrs:{label:"密码",prop:"password"}}),t("el-table-column",{attrs:{label:"用户等级"},scopedSlots:e._u([{key:"default",fn:function(r){return[r.row.role?t("el-tag",{staticClass:"tag-width",attrs:{type:"success",effect:"dark"}},[e._v("管理员")]):t("el-tag",{staticClass:"tag-width",attrs:{type:"info",effect:"dark"}},[e._v("普通用户")])]}}])}),t("el-table-column",{attrs:{label:"操作",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(t){return e.showEditDialog({...r.row})}}}),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(t){return e.removeUserById(r.row.uid)}}})]}}])})],1),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[1,2,5,10],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"添加用户",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},close:e.addDialogClosed}},[t("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{model:{value:e.addForm.password,callback:function(t){e.$set(e.addForm,"password",t)},expression:"addForm.password"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.addForm.email,callback:function(t){e.$set(e.addForm,"email",t)},expression:"addForm.email"}})],1),t("el-form-item",{attrs:{label:"手机",prop:"phone"}},[t("el-input",{model:{value:e.addForm.phone,callback:function(t){e.$set(e.addForm,"phone",t)},expression:"addForm.phone"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"修改用户",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t}}},[t("el-form",{ref:"editFormRef",attrs:{model:e.editForm,rules:e.editFormRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{model:{value:e.editForm.password,callback:function(t){e.$set(e.editForm,"password",t)},expression:"editForm.password"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),t("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[t("el-input",{model:{value:e.editForm.phone,callback:function(t){e.$set(e.editForm,"phone",t)},expression:"editForm.phone"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editUserInfo()}}},[e._v("确 定")])],1)],1)],1)},i=[],a=r(2761),l=r(3822),o={data(){const e=(e,t,r)=>{const s=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;if(s.test(t))return r();r(new Error("请输入合法的手机号"))};return{queryInfo:{query:"",pagenum:1,pagesize:5},userlist:[],total:0,role:!1,dialogVisible:!1,addForm:{username:"",password:"",email:"",phone:""},addFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:8,message:"长度在 3 到 8 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:e,trigger:"blur"}]},editDialogVisible:!1,editForm:{},editFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:8,message:"长度在 3 到 8 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:e,trigger:"blur"}]}}},computed:{...(0,l.rn)(["user","token"])},methods:{async queryUser(){const e=await(0,a.Y8)(this.user.uid,this.token);200===e.status&&this.$message.success("获取数据成功！"),console.log(e),this.userlist=[...e.data.filter((e=>e.username!==this.user.username))],this.total=e.data.length},async getUserList(){await this.queryUser(),this.changeUserList(0,this.queryInfo.pagesize),this.queryInfo.pagenum=1},changeUserList(e,t){t>this.userlist.length&&(t=this.userlist.length),this.userlist=this.userlist.slice(e,t)},async handleSizeChange(e){this.queryInfo.pagesize=e,this.queryInfo.pagenum=1,await this.queryUser(),this.changeUserList(0,e)},async handleCurrentChange(e){this.queryInfo.pagenum=e,await this.queryUser();const t=this.queryInfo.pagesize*(e-1),r=this.queryInfo.pagesize*e;this.changeUserList(t,r)},addDialogClosed(){this.$refs.addFormRef.resetFields()},addUser(){this.$refs.addFormRef.validate((async e=>{if(!e)return;const t=await(0,a.z2)(this.addForm);return 1062===t.msg.errno?this.$message.error("用户或者手机号已被注册!"):40001===t.status?this.$message.warning("服务器错误，请稍候再试！"):(this.$message.success("添加用户成功！"),this.dialogVisible=!1,void this.getUserList())}))},showEditDialog(e){this.editForm=e,this.editDialogVisible=!0},editUserInfo(){this.$refs.editFormRef.validate((async e=>{if(!e)return;const t=await(0,a.sl)(window.localStorage.getItem("token"),this.user.uid,this.user.password,this.user.username,this.editForm);if(console.log(t),200!==t.status)return this.$message.error("更改用户信息失败");this.editDialogVisible=!1,this.handleCurrentChange(this.queryInfo.pagenum),this.$message.success("更新用户信息成功！")}))},async searchList(){await this.queryUser(),this.userlist=this.userlist.filter((e=>-1!==e.username.indexOf(this.queryInfo.query)))},async removeUserById(e){const t=await this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("confirm"!==t)return this.$message.info("已取消删除");const r=await(0,a.h8)(e);if(200!==r.status)return this.$message.error("删除用户失败");this.$message.success(r.data),this.getUserList()}},created(){this.getUserList()}},n=o,u=r(1001),d=(0,u.Z)(n,s,i,!1,null,"56e60dec",null),m=d.exports},2761:function(e,t,r){r.d(t,{CP:function(){return g},Cy:function(){return m},GP:function(){return u},Xh:function(){return p},Y8:function(){return a},h8:function(){return n},jl:function(){return i},qC:function(){return h},qG:function(){return d},sl:function(){return o},x1:function(){return c},z2:function(){return l}});var s=r(5047);const i=()=>(0,s.v)("/getAllData"),a=(e,t)=>(0,s.v)("/getAllUser",{uid:e,token:t}),l=e=>(0,s.v)("/register",e),o=(e,t,r,i,{email:a,password:l,phone:o,role:n,uid:u,username:d})=>(0,s.v)("updataInfoByAdmin",{email:a,password:l,phone:o,role:n,uid:u,username:d,token:e,adminId:t,adminPwd:r,adminUser:i}),n=e=>(0,s.v)("/deleteUser",{uid:e}),u=e=>(0,s.v)("delectSection",{sid:e}),d=e=>(0,s.v)("addSection",e),m=()=>(0,s.v)("getAllSections"),c=()=>(0,s.v)("getAllPost"),g=e=>(0,s.v)("updatePost",e),p=(e,t)=>(0,s.v)("goToRecycle",{sid:e,pid:t}),h=(e,t)=>(0,s.v)("noneRecycle",{uid:e,pid:t})}}]);
//# sourceMappingURL=214.ee3a0d28.js.map