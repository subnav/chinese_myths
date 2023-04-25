<template>
    <!-- 用户信息表单 -->
    <el-form
      ref="form"
      :model="user"
      :rules="rules"
      label-width="80px">
      <h2 class="Info-title">我的资料</h2>
      <img :src="$store.state.user.portrait" alt="">
      <el-form-item label="用户名:" prop="username">
        <el-input class="min-width" v-model="user.username" placeholder="你的昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input class="min-width" placeholder="你的手机号" v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input class="min-width" placeholder="你的邮箱" v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="我的签名:">
        <el-input
          type="textarea"
          rows="4"
          maxlength="30"
          show-word-limit
          placeholder="填写简介让大家更容易认识自己(๑╹ヮ╹๑)ﾉ"
          v-model="user.introduction"
          resize="none"
          size="medium"
          class="textarea">
        </el-input>
      </el-form-item>
      <el-divider></el-divider>
      <!-- 提交按钮 -->
    <el-button
      type="primary"
      class="user-info-save"
      @click="updateInfo"
      :disabled="disabled">保存</el-button>
    </el-form>
</template>

<script>
import { updateInfo, home } from '@/api/services/loginUser.services'
export default {
  data () {
    // 验证当前密码
    const username = (rule, value, callback) => {
      if (!value) return callback(new Error('用户名不能为空'))
      callback()
    }
    // 验证手机号的规则
    const checkPhone = (rule, value, callback) => {
      if (!value) return callback(new Error('手机号不能为空'))
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      // 表单验证规则
      rules: {
        username: [
          { required: true, validator: username, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      // 用户信息绑定
      user: {
        phone: '',
        username: '',
        email: '',
        introduction: ''
      }
    }
  },
  created () {
    const token = window.localStorage.getItem('token')
    if (!token) return
    this.updateUser(token)
  },
  methods: {
    async updateUser (token) {
      const data = await home(token)
      console.log(data,987);
      if (!data.data) return
      console.log(data.data,243);
      this.$store.commit('loginUser', {
        user: data.data,
        token: localStorage.getItem('token')
      })
      this.user = { ...this.$store.state.user }
      console.log(this.user,this.$store.state.user,675);
      this.$message.success('获取信息成功')
    },
    updateInfo () {
      this.$refs.form.validate(async valid => {
        // 判空
        if (!valid) return
        this.user.token = this.$store.state.token
        if(!this.user.introduction) {
          delete this.user.introduction
        }
        // 发送请求
        // if (this.user.registrationTime) {
        //   this.user.timestamp = this.user.registrationTime
        //   delete this.user.registrationTime
        // }
        console.log(this.user)
        const data = await updateInfo(this.user)
        console.log(data.data)
        if (!data.data && data.state !== 200) return this.$message.error('修改信息失败')
        // 更新信息
        // delete this.user.token
        this.$store.commit('updateInfo', this.user)
        this.$message.success('修改信息成功')
      })
    }
  },
  computed: {
    // 提交是否禁用
    disabled () {
      if (JSON.stringify(this.user) !== JSON.stringify(this.$store.state.user)) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    position: absolute;
    top: 10%;
    right: 10%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .textarea {
    width: 400px;
  }
  .min-width {
    width: 300px;
  }
  .user-info-save {
    display: block;
    width: 100px;
    margin: 100px auto 50px;
  }
</style>
