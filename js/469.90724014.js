"use strict";(self["webpackChunkchinese_myths"]=self["webpackChunkchinese_myths"]||[]).push([[469],{7469:function(t,e,n){n.r(e),n.d(e,{default:function(){return d}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"artivle"},[e("h2",{staticClass:"Info-title"},[t._v("帖子板块")]),t.articles?e("el-collapse",{attrs:{accordion:""},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},t._l(t.articles,(function(n,i,s){return e("el-collapse-item",{key:s,attrs:{title:n.title,name:n.title}},[n.content.length?e("div",{staticClass:"item-content"},t._l(n.content,(function(n){return e("el-card",{key:n.pid,staticClass:"box-card",attrs:{"body-style":{padding:"0px"},shadow:"hover",title:n.name},nativeOn:{click:function(e){return t.toDetail(n.sid,n.pid)}}},[n.portrait?e("img",{attrs:{src:n.portrait,alt:""}}):e("div",{staticClass:"default-image"}),e("div",{staticClass:"article-title"},[t._v(t._s(n.name))]),e("el-button",{attrs:{type:"text"},on:{click:function(e){return e.stopPropagation(),t.delect(t.$store.state.user.uid,n.pid)}}},[t._v("取消收藏")])],1)})),1):e("div",{staticClass:"defaultBgI"})])})),1):t._e()],1)},s=[],a=(n(7658),n(5707)),c=n(2761),r={data(){return{activeName:"我的收藏",articles:{collected:{title:"我的收藏",content:[]}}}},methods:{toDetail(t,e){console.log(t,e),this.$router.push(`/detail?sid=${t}&pid=${e}`)},updatePost(t){this.articles.collected.content=t},async getArticleObj(){console.log(1);const t=await(0,a.V8)(this.$store.state.user.uid);console.log(t),t.data&&this.updatePost(t.data)},async delect(t,e){const n=await this.$confirm("此操作将取消收藏该帖子, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((t=>t));if("confirm"!==n)return this.$message.info("已取消删除");const i=await(0,c.qC)(t,e);200===i.status?(this.$message.success("取消成功"),this.getArticleObj()):this.$message.error("取消失败")}},created(){this.getArticleObj()}},o=r,l=n(1001),u=(0,l.Z)(o,i,s,!1,null,"104595b4",null),d=u.exports},5707:function(t,e,n){n.d(e,{V8:function(){return a},if:function(){return c},yC:function(){return s}});var i=n(5047);const s=t=>(0,i.v)("/search",{text:t}),a=t=>(0,i.v)("/post",{uid:t}),c=(t,e)=>(0,i.v)(`section/${t}`,e)},2761:function(t,e,n){n.d(e,{CP:function(){return v},Cy:function(){return d},GP:function(){return l},Xh:function(){return p},Y8:function(){return a},h8:function(){return o},jl:function(){return s},qC:function(){return h},qG:function(){return u},sl:function(){return r},x1:function(){return f},z2:function(){return c}});var i=n(5047);const s=()=>(0,i.v)("/getAllData"),a=(t,e)=>(0,i.v)("/getAllUser",{uid:t,token:e}),c=t=>(0,i.v)("/register",t),r=(t,e,n,s,{email:a,password:c,phone:r,role:o,uid:l,username:u})=>(0,i.v)("updataInfoByAdmin",{email:a,password:c,phone:r,role:o,uid:l,username:u,token:t,adminId:e,adminPwd:n,adminUser:s}),o=t=>(0,i.v)("/deleteUser",{uid:t}),l=t=>(0,i.v)("delectSection",{sid:t}),u=t=>(0,i.v)("addSection",t),d=()=>(0,i.v)("getAllSections"),f=()=>(0,i.v)("getAllPost"),v=t=>(0,i.v)("updatePost",t),p=(t,e)=>(0,i.v)("goToRecycle",{sid:t,pid:e}),h=(t,e)=>(0,i.v)("noneRecycle",{uid:t,pid:e})}}]);
//# sourceMappingURL=469.90724014.js.map