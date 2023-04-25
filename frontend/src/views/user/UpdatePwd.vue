<template>
  <div class="user-password">
    <h2 class="Info-title">修改密码</h2>
    <div class="tips">
      <el-tag type="warning" effect="plain">为了安全，我们强烈建议您选择与其他在线账户不同的独一无二密码。</el-tag>
    </div>
    <div class="main">
      <!-- 密码板块 -->
      <el-form
        class="updatePwdForm"
        :model="updatePwdForm"
        :rules="rules"
        ref="updatePwdForm">
        <!-- 用户名 -->
        <el-form-item label="原始密码" prop="oldPwd">
          <el-input v-model.trim="updatePwdForm.oldPwd"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="newPwd">
          <el-input type="password" v-model.trim="updatePwdForm.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="updatePwdForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="info" @click="resetLoginForm">放弃更改</el-button>
          <el-button type="primary" @click="updatePwd">保存变更</el-button>
        </el-form-item>
      </el-form>
      <el-divider direction="vertical"></el-divider>
      <!-- 文字提示 -->
      <ul>
        <li>您的密码</li>
        <li>您的密码必须由 7 个或更多字符组成。</li>
        <li>您的密码必须包含至少 1 位数字</li>
        <li>您的密码不得含有空格</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUserPwd } from '@/api/services/loginUser.services'
export default {
  data () {
    // 验证当前密码
    const oldPwd = (rule, value, callback) => {
      if (!value) callback(new Error('当前密码不能为空'))
      console.log(this.$store.state.user.password,value);
      if (value !== this.$store.state.user.password) callback(new Error('密码错误，请重新输入'))
      callback()
    }
    // 验证密码
    const newPwd = (rule, value, callback) => {
      if (!value) callback(new Error('密码不能为空'))
      if (this.updatePwdForm.checkPass) this.$refs.updatePwdForm.validateField('checkPass')
      callback()
    }
    // 验证确认密码
    const checkPass = (rule, value, callback) => {
      if (!value) callback(new Error('请再次输入密码'))
      if (value !== this.updatePwdForm.newPwd) callback(new Error('两次输入密码不一致!'))
      callback()
    }
    return {
      // 密码表单的数据绑定
      updatePwdForm: {
        oldPwd: '',
        newPwd: '',
        checkPass: ''
      },
      // 表单验证规则
      rules: {
        oldPwd: [
          { validator: oldPwd, trigger: 'blur' }
        ],
        newPwd: [
          { validator: newPwd, trigger: 'blur' }
        ],
        checkPass: [
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  methods: {
    // 重置方法
    resetLoginForm () {
      this.$refs.updatePwdForm.resetFields()
    },
    // 登录预验证
    updatePwd () {
      this.$refs.updatePwdForm.validate(async valid => {
        // 判空
        if (!valid) return
        const data = await updateUserPwd(this.user.username, this.updatePwdForm, this.token)
        console.log(data)
        // 弹窗提示
        if (data.status !== 200) return this.$message.error('更换密码失败')
        this.$message.success(data.msg)
        // 更新信息
        this.$store.commit('updatePwd', {
          user: data.data,
          token: data.token
        })
        window.localStorage.setItem('token', data.token)
        this.$refs.updatePwdForm.resetFields()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-tag {
    margin-bottom: 40px;
    font-size: 14px;
  }
  .updatePwdForm {
    width: 40%;
    .el-button {
      margin: 10px 0 0 20px;
    }
  }
  .main {
    display: flex;
    justify-content: space-between;
    .el-divider {
      height: 300px;
    }
    li {
      width: 300px;
      font-size: 16px;
      color: gray;
      padding: 18px 0;
    }
  }
</style>
