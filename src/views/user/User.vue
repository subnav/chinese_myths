<template>
  <div class="user">
    <my-header></my-header>
    <el-container>
      <!-- 左侧列表 -->
      <el-card class="user-list" :body-style="{ padding: '0px' }">
        <el-aside width="200px">
          <el-menu
            :default-active="$store.state.activePath"
            :router="true"
            class="el-menu-vertical-demo"
            @select="handlSelect"
          >
            <el-menu-item
              v-for="(item, index) of userList"
              :key="index"
              :index="item.path"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.content }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-card>
      <!-- 右侧主题内容 -->
      <el-card>
        <el-main>
          <!-- <h2 class="Info-title">{{activeTitle}}</h2> -->
          <router-view></router-view>
        </el-main>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';
export default {
  components: {
    MyHeader,
  },
  data() {
    return {
      // 左侧用户列表数据绑定
      userList: [
        {
          path: '/userinfo',
          icon: 'el-icon-user-solid',
          content: '我的资料',
        },
        {
          path: '/userarticle',
          icon: 'el-icon-document',
          content: '帖子板块',
        },
        {
          path: '/updatepwd',
          icon: 'el-icon-key',
          content: '修改密码',
        },
      ],
      // 被激活的内容标题
      activeTitle: '',
    };
  },
  methods: {
    // 菜单激活地址存储
    handlSelect(activePath) {
      this.$store.state.activePath = activePath;
      this.setTitle(activePath);
    },
    // 设置菜单激活的标题
    setTitle(activePath) {
      this.userList.forEach((item) => {
        if (item.path === activePath) {
          this.activeTitle = item.content;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100vw;
  min-width: 1200px;
  min-height: 100%;
  background: url('@/assets/images/user/info.png') no-repeat left 52vh;
  background-size: 24%;
  /deep/ .Info-title {
    border-left: 5px solid skyblue;
    color: skyblue;
    font-weight: 400;
    padding-left: 10px;
    margin: 0 0 40px 0;
  }
}
.el-container {
  justify-content: space-between;
  width: 1080px;
  margin: 40px auto;
  .user-list {
    height: 280px;
  }
  .el-menu {
    border: none;
  }
  .el-aside {
    height: 200px;
  }
}
.el-main {
  position: relative;
  flex: 0 1 auto;
  width: 820px;
}
</style>
