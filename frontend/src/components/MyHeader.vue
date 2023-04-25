<template>
  <!-- 头部导航 -->
  <el-header id="myHead">
    <!-- logo -->
    <div class="logo">
      <!-- 校园社区logo -->
      <img src="@/assets/logo.svg" alt="" />
      <!-- <div>我是logo</div> -->
    </div>

    <el-button type="text" class="text" @click="toHome">网站主页</el-button>
    <el-button type="text" class="text" @click="toRelationshipGraph"
      >关系图谱</el-button
    >

    <!-- 搜索框 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="text"
        clearable
        @change="search(text)"
      >
      </el-input>
      <ul
        v-show="keyword"
        class="content"
        :class="{ defaultContent: !searchList.length }"
      >
        <li
          class="searchLi"
          v-for="(item, id) of searchList"
          :key="id"
          @click="toDetail(item.sid, item.pid)"
        >
          {{ item.intro }}
        </li>
      </ul>
    </div>

    <!-- 登录注册 -->
    <drop-down v-if="$store.state.token"> </drop-down>
    <div class="right" v-else>
      <el-button type="primary" @click="toLogin">登录</el-button>
      <el-button type="primary" @click="toSignUp">注册</el-button>
    </div>
  </el-header>
</template>

<script>
import DropDown from './dropdown/DropDown.vue';
import { search } from '@/api/services/article.services';
export default {
  data() {
    return {
      // 搜索框绑定
      text: '',
      // 搜索返回内容绑定
      searchList: [],
      // 搜索展示面板
      keyword: false,
    };
  },
  components: {
    DropDown,
  },
  methods: {
    // 搜索方法
    async search(text) {
      if (!text) {
        this.searchList = [];
        this.keyword = false;
        return;
      }
      const data = await search(text);
      console.log(data, 1);
      if (!data.data) return;
      this.searchList = data.data;
      this.keyword = true;
    },
    // 跳转到home页面
    toHome() {
      this.$router.push('home');
    },
    // 跳转到登录界面
    toLogin() {
      this.$router.push('/login');
    },
    // 跳转到注册页面
    toSignUp() {
      this.$router.push('/SignUp');
    },
    // 跳转到关系图谱页面
    toRelationshipGraph() {
      this.$router.push('/RelationshipGraph');
    },
    // 跳转到帖子详情
    toDetail(sid, pid) {
      this.$router.push(`/detail?sid=${sid}&pid=${pid}`);
    },
  },
};
</script>

<style lang="less" scoped>
header,
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header {
  position: sticky;
  top: 0;
  width: 100vw;
  min-width: 1200px;
  height: 10vh;
  min-height: 64px;
  padding: 0 50px;
  box-sizing: border-box;
  background-color: #0095ff;
  z-index: 11;
  box-shadow: 0 1px 40px -8px rgb(0 0 0 / 50%);
  .logo {
    width: 170px;
    height: 100%;
  }
}
.logo {
  position: relative;
  background-color: #0095ff;
  overflow: hidden;
}
.logo img {
  position: absolute;
  top: -40%;
  left: 0;
  width: 100%;
  // height: 8vh;
}
img {
  width: 30px;
  cursor: pointer;
}
.text {
  color: #fff;
  font-size: 16px;
  // div {
  // margin: 0 10px;
  &:hover {
    color: #000000;
    text-shadow: 1px 1px 1px #000, -1px -1px 1px #fff;
    cursor: pointer;
  }
  // }
}
.search {
  position: relative;
  width: 500px;
  .content {
    position: absolute;
    top: 30px;
    width: 500px;
    height: 300px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 2px solid skyblue;
    box-shadow: 0 10px 30px -8px grey;
    background-color: #fff;
    z-index: -1;
  }
  .defaultContent {
    background: url('https://s1.hdslb.com/bfs/static/blive/blfe-message-web/static/img/nodata.4d721f9d.png')
      no-repeat center #fff;
  }
  .searchLi {
    line-height: 60px;
    padding: 0 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      background-color: rgb(246, 246, 246);
    }
  }
}
.right {
  width: 240px;
  justify-content: space-around;
}
</style>
