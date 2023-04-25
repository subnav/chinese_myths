<template>
  <div class="container">
    <!-- 头部区 -->
    <MyHeader></MyHeader>

    <!--各个板块区域 -->
    <!-- <div class="plateAera"> -->
    <el-button
      type="primary"
      icon="el-icon-back"
      class="back"
      circle=""
      @click="logout"
    ></el-button>
    <!-- <div class="PlateHeader" v-if="section">
        <h3>{{ section.name }}</h3>
        <p>{{ section.detail }}</p>
      </div> -->
    <el-row class="box-card">
      <el-col :span="7" v-for="item in PlateList" :key="item.index">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <!-- 帖子展示图片 -->
          <img v-if="item.portrait" :src="item.portrait" class="image" />
          <!-- 用户名 -->
          <div class="username" v-if="item.name">
            <span>{{ item.name }}</span>
          </div>
          <div style="padding: 10px">
            <span @click="godetail(item.sid, item.pid)" v-if="item">{{
              item.intro | ellipsis
            }}</span>
            <!-- 头像 -->
            <!-- <el-popover placement="top-start" width="200" trigger="hover">
                <div v-if="item.user">
                  <div class="userInfo">
                    <img class="userInfo" :src="item.user.portrait" alt="" />
                  </div>
                  <p>{{ item.user.username }}</p>
                  <p>{{ item.user.introduction }}</p>
                </div>
                <div slot="reference" class="userInfo" v-if="item.user">
                  <img :src="item.user.portrait" alt="" />
                </div>
              </el-popover> -->

            <div class="bottom clearfix">
              <!-- <span class="time" v-if="item">{{
                  new Date(item.post.registerTime).toLocaleString()
                }}</span> -->
              <el-button
                type="text"
                class="button"
                @click="godetail(item.sid, item.pid)"
                >more</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!-- </div> -->
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';
import { getAllPost } from '@/api/services/backstage.services';
import { plate } from '@/api/services/article.services';
export default {
  name: 'page-plate',
  components: {
    MyHeader,
  },
  data() {
    return {
      imgurl: 'https://www.keaidian.com/uploads/allimg/190424/24110307_20.jpg',
      avatar:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic_source%2F64%2F0d%2Fae%2F640dae9832158294570a6fc4febce63e_15.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651818323&t=711f5462d336b1a565fb704f5b073b55',
      PlateList: {
        sid: '',
      },
      lastSid: '',
      section: {},
      currentDate: [],
    };
  },
  filters: {
    ellipsis(value) {
      if (!value) return '';
      if (value.length > 10) {
        return value.slice(0, 10) + '...';
      }
      return value;
    },
  },
  mounted() {
    this.lastSid = this.$route.query.sid;
    console.log('123', this.lastSid);
    this.getPlateList(this.$route.query.sid);
  },
  methods: {
    logout() {
      this.$router.go(-1);
    },
    async getPlateList(sid) {
      this.PlateList.sid = sid;
      const data = await plate(sid, this.PlateList);
      console.log(data, 1);
      this.PlateList = data.data;
      this.section = data.section;
      console.log(data);
    },
    godetail(sid, pid) {
      this.$router.push(`detail?sid=${sid}&pid=${pid}`);
    },
    // pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getPlateList();
    },
    // 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getPlateList();
    },
  },
};
</script>

<style lang="less" scoped>
.plateAera {
  min-width: 1100px;
}
.plateAera h3 {
  text-indent: 2rem;
  color: #333;
}
.PlateHeader {
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
}
.PlateHeader p {
  position: relative;
  top: -8px;
  text-indent: 3rem;
}
.el-col-7 {
  width: 25%;
}
.box-card {
  // cursor: pointer;
  padding: 0 50px;
}
.el-card {
  box-sizing: border-box;
  width: 272px;
  height: 400px;
  // margin-left: 8px;
  border-radius: 5px;
  margin: 70px auto 0;
  overflow: hidden;
  &:hover {
    box-shadow: 5px 12px 20px rgb(36 37 38 / 53%);
  }
}
.el-card span {
  cursor: pointer;
}
.userInfo {
  width: 50px;
  height: 50px;
}
.userInfo img {
  width: 100%;
  height: 50px;
  border: 1px solid red;
  border-radius: 50%;
}
.username {
  text-align: center;
  line-height: 50px;
  // position: relative;
  // font-size: 14px;
  // text-align: center;
  // top: -18px;
  // width: 60% !important;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  line-height: 8px;
}

.button {
  padding: 0;
  margin-top: 5px;
  float: right;
}

.image {
  // height: 130px;
  width: 100%;
  display: block;
  cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuOC4zICgyOTgwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+em9vbS1jdXJzb3I8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMjQsMTIgQzI0LDE4LjYzIDE4LjYyNywyNCAxMiwyNCBDNS4zNzIsMjQgMCwxOC42MyAwLDEyIEMwLDUuMzcgNS4zNzIsMCAxMiwwIEMxOC42MjcsMCAyNCw1LjM3IDI0LDEyIEwyNCwxMiBaIiBpZD0icGF0aC0xIj48L3BhdGg+CiAgICAgICAgPGZpbHRlciB4PSItNTAlIiB5PSItNTAlIiB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMSIgZHk9IjEiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMTY4ODQ2MjQxIDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJ6b29tLWN1cnNvciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy4wMDAwMDAsIDMuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJQYWdlLTEiPgogICAgICAgICAgICAgICAgPGcgaWQ9Inpvb20tY3Vyc29yIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iU3ZnanNTdmcxMDAwIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlN2Z2pzUGF0aDEwMDciPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9InBhdGgtMS1saW5rIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0icGF0aC0xIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWx0ZXI9InVybCgjZmlsdGVyLTIpIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0icGF0aC0xLWxpbmsiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNCwxMiBDMjQsMTguNjMgMTguNjI3LDI0IDEyLDI0IEM1LjM3MiwyNCAwLDE4LjYzIDAsMTIgQzAsNS4zNyA1LjM3MiwwIDEyLDAgQzE4LjYyNywwIDI0LDUuMzcgMjQsMTIgTDI0LDEyIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0ibWFnbmlmeWluZy1nbGFzcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIgZmlsbD0iIzFBMUExQiI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ2FwYV8xIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEuODk0OTAwMiwxMS4zODgwMjY2IEw4Ljk3ODcxMzk3LDguNDcxODQwMzUgQzkuNzYwOTc1NjEsNy41NzI1MDU1NCAxMC4yMzQ1ODk4LDYuMzk5MTEzMDggMTAuMjM0NTg5OCw1LjExNjYyOTcxIEMxMC4yMzQ1ODk4LDIuMjkzNTY5ODQgNy45MzgzNTkyLDAgNS4xMTc5NjAwOSwwIEMyLjI5NDkwMDIyLDAgMC4wMDEzMzAzNzY5NCwyLjI5NjIzMDYgMC4wMDEzMzAzNzY5NCw1LjExNjYyOTcxIEMwLjAwMTMzMDM3Njk0LDcuOTM3MDI4ODIgMi4yOTc1NjA5OCwxMC4yMzMyNTk0IDUuMTE3OTYwMDksMTAuMjMzMjU5NCBDNi40MDA0NDM0NiwxMC4yMzMyNTk0IDcuNTczODM1OTIsOS43NTk2NDUyMyA4LjQ3MzE3MDczLDguOTc3MzgzNTkgTDExLjM4OTM1NywxMS44OTM1Njk4IEMxMS40NTg1MzY2LDExLjk2Mjc0OTQgMTEuNTUxNjYzLDEyIDExLjY0MjEyODYsMTIgQzExLjczMjU5NDIsMTIgMTEuODI1NzIwNiwxMS45NjU0MTAyIDExLjg5NDkwMDIsMTEuODkzNTY5OCBDMTIuMDMzMjU5NCwxMS43NTUyMTA2IDEyLjAzMzI1OTQsMTEuNTI2Mzg1OCAxMS44OTQ5MDAyLDExLjM4ODAyNjYgTDExLjg5NDkwMDIsMTEuMzg4MDI2NiBaIE0wLjcxNzA3MzE3MSw1LjExNjYyOTcxIEMwLjcxNzA3MzE3MSwyLjY5MDAyMjE3IDIuNjkxMzUyNTUsMC43MTg0MDM1NDggNS4xMTUyOTkzMywwLjcxODQwMzU0OCBDNy41NDE5MDY4NywwLjcxODQwMzU0OCA5LjUxMzUyNTUsMi42OTI2ODI5MyA5LjUxMzUyNTUsNS4xMTY2Mjk3MSBDOS41MTM1MjU1LDcuNTQwNTc2NSA3LjU0MTkwNjg3LDkuNTE3NTE2NjMgNS4xMTUyOTkzMyw5LjUxNzUxNjYzIEMyLjY5MTM1MjU1LDkuNTE3NTE2NjMgMC43MTcwNzMxNzEsNy41NDMyMzcyNSAwLjcxNzA3MzE3MSw1LjExNjYyOTcxIEwwLjcxNzA3MzE3MSw1LjExNjYyOTcxIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=),
    pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.back {
  position: absolute;
  bottom: 5%;
  left: 2%;
  z-index: 1;
}
</style>
