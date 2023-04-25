<template>
  <div class="login_container">
    <div class="img"></div>
    <el-tabs v-model="activeName" class="login_box" :before-leave="resetForm">
      <!-- 密码登录面板 -->
      <el-tab-pane label="密码登录" name="login">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="loginFormRules"
          :hide-required-asterisk="true"
          :inline="true"
          ref="loginFormRef"
        >
          <!-- 用户名 -->
          <el-form-item label="账号" prop="username">
            <el-input
              class="el-form-item-inp"
              placeholder="请输入账号"
              v-model.trim="loginForm.username"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" label="密码">
            <el-input
              class="el-form-item-inp"
              placeholder="请输入密码"
              v-model.trim="loginForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 提交按钮 -->
          <el-form-item class="btns el-form-item-inp">
            <el-button type="primary" @click="login('loginFormRef', loginForm)"
              >登录</el-button
            >
            <el-button type="info" @click="toSignUp">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 短信登录面板 -->
      <!-- <el-tab-pane label="短信登录" name="sms">
        <el-form
          class="login_form"
          :model="smsForm"
          :rules="smsFormRules"
          :hide-required-asterisk="true"
          :inline="true"
          ref="smsFormRef"
        > -->
      <!-- 用户名 -->
      <!-- <el-form-item label="手机号" prop="phone">
            <el-input
              class="el-form-item-inp"
              placeholder="请输入手机号"
              v-model="smsForm.phone"
            ></el-input>
          </el-form-item> -->
      <!-- 密码 -->
      <!-- <el-form-item prop="securityCode" label="验证码">
            <el-input
              class="el-form-item-inp"
              placeholder="请输入验证码"
              maxlength="4"
              v-model="smsForm.securityCode"
            ></el-input>
            <el-button
              :disabled="disabled"
              class="sms"
              type="text"
              @click="validateBtn"
              >{{ codeValue }}</el-button
            >
          </el-form-item> -->
      <!-- 提交按钮 -->
      <!-- <el-form-item class="btns el-form-item-inp">
            <el-button type="primary" @click="getVerifyCode">登录</el-button>
            <el-button type="info" @click="toSignUp">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { login, loginforphone } from '@/api/services/loginUser.services';
// import axios from 'axios'
export default {
  data() {
    // 验证手机号的规则
    const checkMobile = (rule, value, cb) => {
      if (!value) cb(new Error('请输入手机号'));
      // 验证手机号的正则表达式
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error('请输入合法的手机号'));
    };
    // 验证验证码的规则
    const checkCode = (rule, value, cb) => {
      if (!value) cb(new Error('请输入验证码'));
      if (this.smsForm.phone && value === this.smsForm.securityCode) {
        return cb();
      }
      cb(new Error('验证码错误'));
    };
    return {
      // 当前显示标签页
      activeName: 'login',
      // 登录表单的数据绑定
      loginForm: {
        username: '',
        password: '',
      },
      // 短信表单的数据绑定
      smsForm: {
        phone: '',
        securityCode: '',
      },
      // 自定义验证码
      myCode: '',
      // 发送验证码是否禁用绑定
      disabled: false,
      // 验证码按钮内容绑定
      codeValue: '获取验证码',
      // 登录验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 100,
            message: '长度在 3 到 8 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 150,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
      // 短信验证规则
      smsFormRules: {
        phone: [{ validator: checkMobile, trigger: 'blur' }],
        securityCode: [{ validator: checkCode, trigger: 'blur' }],
      },
    };
  },
  methods: {
    // 登录预验证
    login(formRef, form) {
      this.$refs[formRef].validate(async (valid) => {
        // 判空
        if (!valid) return;
        const data = await login(form);
        console.log(data);
        // 弹窗提示
        if (data && data.status === 200) {
          this.$message.success('登录成功');
          this.saveUser(data);
          return;
        }
        if (data && data.status === 40001)
          return this.$message.error('网站出问题了，请等会在试吧！');
        if (!data.status) return;
        this.$message.error(data.msg);
      });
    },
    // 重置表单验证
    resetForm(activeName) {
      if (activeName === 'sms') return this.$refs.loginFormRef.resetFields();
      if (activeName === 'login') return this.$refs.smsFormRef.resetFields();
    },
    // 发送验证码
    getVerifyCode() {
      this.$refs.smsFormRef.validateField('phone', async (valid) => {
        // 判断手机号是否正确
        if (valid) return;
        const data = await loginforphone(this.smsForm);
        // 弹窗提示
        if (data.status === 404)
          return this.$message.error('当前手机号还没注册');
        if (data.status === 409) return this.$message.error('验证码错误');
        this.$message.success('登录成功');
        this.saveUser(data);
      });
    },
    // 验证码按钮
    validateBtn() {
      let time = 60;
      this.$message.success('获取验证码成功');
      const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          this.codeValue = '获取验证码';
          this.disabled = false;
        } else {
          // 倒计时
          this.codeValue = time + '秒后重试';
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    // 跳转到注册页面
    toSignUp() {
      this.$router.push('/SignUp');
    },
    // 登录成功保存用户信息
    saveUser(data) {
      // 存储用户信息
      // data.account.timestamp = data.account.registrationTime
      // delete data.account.registrationTime
      console.log(data);
      this.$store.commit('loginUser', {
        user: data.data,
        token: data.token,
      });
      if (data.data.role) return this.$router.push('/backstage');
      this.$router.push('/home');
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 80vh;
  min-height: 500px;
  min-width: 880px;
  width: 70%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid var(--common_line_light_color, rgba(126, 134, 142, 0.16));
  box-shadow: 0 4px 14px 0 rgb(126 134 142 / 16%);
  .img {
    flex: 1 0 auto;
    width: 0;
    height: 100%;
    background: url('../assets/login.svg') 80% no-repeat;
    background-size: 80%;
    --tw-bg-opacity: 1;
    background-color: rgb(249 250 251 / var(--tw-bg-opacity));
  }
}
.login_box {
  flex: 1 0 auto;
  width: 0;
  margin: 25px 40px;
  // margin-right: 10%;
  background-color: #fff;
  .login_form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 300px;
    // width: 80%;
    margin-top: 80px;
    .sms {
      position: absolute;
      top: 0;
      right: 15px;
    }
    .el-form-item-inp {
      width: 350px;
    }
  }
}

.btns {
  button {
    width: 100px;
    margin: 0 36px;
  }
  .el-button--info {
    // margin-left: 20%;
  }
}
</style>
