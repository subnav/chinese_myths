<template>
  <div id="app">
    <router-view :key="$router.fullPath" />
  </div>
</template>

<script>
import { home } from '@/api/services/loginUser.services';
export default {
  name: 'app',
  components: {},
  methods: {
    search() {},
    // 自动登录用户信息
    async updateUser(token) {
      const data = await home(token);
      console.log(data, 123);
      if (!data || !data.data) return;
      this.$store.commit('loginUser', {
        user: data.data,
        token: data.token,
      });
      console.log(this.$store.state.user);
    },
  },
  created() {
    // 拿取token验证是否登录
    const token = window.localStorage.getItem('token');
    // 根据token发送请求的用户数据
    if (!this.$store.state.token) {
      if (!token) return;
      this.updateUser(token);
    }
  },
};
</script>


<style>
#app {
  background-image: linear-gradient(
      90deg,
      rgba(60, 10, 30, 0.04) 3%,
      transparent 0
    ),
    linear-gradient(1turn, rgba(60, 10, 30, 0.04) 3%, transparent 0);
  background-size: 20px 20px;
  background-color: #efefef;
}
</style>
