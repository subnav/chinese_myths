<template>
  <div class="sign-container">
    <!-- 背景 -->
    <div class="background"></div>
    <!-- 表单域 -->
    <div class="sign_box">
      <!-- 头像 -->
      <!-- <div class="avatar-box">
        <Avatar></Avatar>
        </div> -->
      <!-- 输入框 -->
      <el-form>
        <sign-form></sign-form>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Avatar from '@/components/signUp/avatar'
import SignForm from '@/components/signUp/signForm';
export default {
  name: 'Sign-Up',
  components: {
    // Avatar,
    SignForm,
  },
};
</script>
<style lang="less" scoped>
.sign-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 500px;
  background-size: 36%;
  background-image: linear-gradient(
    to top,
    #f3e7e9 0%,
    #e3eeff 99%,
    #e3eeff 100%
  );
  height: 100%;
  .background {
    width: 690px;
    height: 100%;
    background: url('../assets/images/login/login.svg') 20% no-repeat;
    background-size: 80%;
  }
  .sign_box {
    width: 450px;
    height: 570px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate3d(-50%, -50%, 0);
    .title {
      position: absolute;
      left: 50%;
      top: 5px;
    }
    .signForm {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      bottom: 0px;
      padding: 0 30px;
    }

    .avatar-box {
      width: 350px;
      height: 50px;
      // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    }
  }
}
</style>
