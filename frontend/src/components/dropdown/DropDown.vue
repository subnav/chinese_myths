<template>
  <div class="drop-down">
    <!-- 消息栏 -->
    <el-dropdown
      split-button
      type="text"
      @click="handleCommand"
      v-if="$store.state.user.role"
    >
      <drop-down-link>
        <el-badge slot="item-icon">
          <img src="@/assets/images/myheader/news.png" alt="" />
        </el-badge>
        <div slot="item-text">后台</div>
      </drop-down-link>
      <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
      <!-- <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          评论我的
          <el-badge :value="2" class="item" />
        </el-dropdown-item>
        <el-dropdown-item>回复我的
          <el-badge class="item" />
        </el-dropdown-item>
        <el-dropdown-item>收到的赞
          <el-badge :value="15" class="item" />
        </el-dropdown-item>
      </el-dropdown-menu> -->
    </el-dropdown>
    <!-- 通知栏 -->
    <!-- <drop-down-link @click.native="toNote">
      <img src="@/assets/images/myheader/note.png" alt="" slot="item-icon">
      <div slot="item-text">笔记</div>
    </drop-down-link> -->
    <!-- 设置栏 -->
    <el-dropdown placement="bottom">
      <drop-down-link>
        <img slot="item-icon" src="@/assets/images/myheader/mine.png" alt="" />
        <div slot="item-text">设置</div>
      </drop-down-link>
      <el-dropdown-menu slot="dropdown" class="tab-bar-set">
        <img :src="$store.state.user.portrait" alt="" />
        <div class="user-name">用户名</div>
        <div class="account">账户</div>
        <ul>
          <li>
            <el-button type="text" @click="toUser">我的账号</el-button>
          </li>
          <li>
            <el-button type="text" @click="password">更换密码</el-button>
          </li>
        </ul>
        <el-button class="tab-bar-exit" type="primary" @click="exit"
          >退出</el-button
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import DropDownLink from './DropDownLink.vue';
export default {
  data() {
    return {};
  },
  methods: {
    // 跳转到用户页面
    toUser() {
      this.$router.push('/userinfo');
    },
    // 笔记页面
    // toNote () {
    //   this.$store.commit('updateUrl', 'http://43.138.211.99:8090/')
    //   this.$router.push('/others')
    // },
    // 退出方法
    exit() {
      window.localStorage.clear();
      this.$router.go(0);
    },
    // 修改密码
    password() {
      this.$router.push('/updatepwd');
    },
    // 跳转到用户帖子
    handleCommand() {
      this.$router.push('/bghome');
    },
  },
  components: {
    DropDownLink,
  },
};
</script>

<style lang="less" scoped>
.drop-down {
  display: flex;
  justify-content: space-between;
  width: 180px;
  height: 100%;
  margin-right: 40px;
  /deep/ .el-dropdown__caret-button {
    display: none;
  }
}
.el-dropdown-menu {
  top: 50px !important;
}
.tab-bar-set {
  position: relative;
  width: 200px;
  height: 270px;
  padding: 20px;
  background-color: rgb(158, 216, 255);
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
    transform: translateX(-10px);
  }
  .account {
    clear: both;
    line-height: 50px;
    font-size: 16px;
    color: gray;
  }
  .tab-bar-exit {
    position: absolute;
    bottom: 15px;
    left: 50%;
    width: 100px;
    transform: translateX(-50%);
    border-radius: 10px;
    letter-spacing: 5px;
  }
}
</style>
