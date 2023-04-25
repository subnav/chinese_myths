<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="220px">
      <el-menu
        :default-active="$store.state.activePath"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409FFF"
      >
        <div class="logo"><img src="@/assets/logoBg.svg" alt="" /></div>
        <!-- 后台首页 -->
        <el-menu-item index="/bghome" @click="toManagement('/bghome')">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <!-- 一级菜单 -->
        <el-submenu
          class=""
          v-for="item of menuList"
          :key="item.index"
          :index="item.index"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-show="item.children"
            v-for="subItem of item.children"
            :key="subItem.index"
            :index="subItem.index"
            @click="toManagement(subItem.index)"
          >
            <template slot="title">
              <i :class="subItem.icon"></i>
              <span>{{ subItem.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右边内容 -->
    <el-container>
      <el-header style="height: 80px">
        <img :src="$store.state.user.portrait" alt="" />
        <el-button type="info" @click="logout">返回</el-button>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [
        {
          index: '1',
          icon: 'el-icon-menu',
          title: '板块管理',
          children: [
            {
              index: '/PlateList',
              icon: 'el-icon-s-order',
              title: '板块列表',
            },
          ],
        },
        {
          index: '2',
          icon: 'el-icon-folder-opened',
          title: '帖子管理',
          children: [
            {
              index: '/PlateDetailList',
              icon: 'el-icon-document',
              title: '帖子详情',
            },
            // {
            //   index: '/Recycleplate',
            //   icon: 'el-icon-delete',
            //   title: '回收站'
            // }
          ],
        },
        {
          index: '3',
          icon: 'el-icon-s-custom',
          title: '用户管理',
          children: [
            {
              index: '/usermanagement',
              icon: 'el-icon-data-line',
              title: '用户数据',
            },
          ],
        },
      ],
    };
  },
  methods: {
    logout() {
      // 返回home
      this.$router.push('/home');
    },
    // 跳转页面
    toManagement(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.logo {
  position: relative;
  height: 80px;
  text-align: center;
  overflow: hidden;
  img {
    position: absolute;
    top: -40%;
    left: 0;
    width: 100%;
  }
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
  box-sizing: border-box;
}
</style>
