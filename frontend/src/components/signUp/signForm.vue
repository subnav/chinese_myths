<template>
  <el-form
    :model="signForm"
    :rules="SignRules"
    ref="signFormRef"
    label-width="100px"
    class="signForm"
  >
    <el-form-item class="avatar-box" prop="portrait">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/getImgPath"
        :show-file-list="false"
        :multiple="false"
        :limit="1"
        :auto-upload="true"
        v-model="signForm.portrait"
        :on-success="handle_success"
        accept="image/png, image/jpg, image/jpeg"
      >
        <div @click="showImg">
          <img
            v-if="this.signForm.portrait"
            :src="this.signForm.portrait"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div v-show="showChooseAvatar">
          <ul>
            <li v-for="item in fileList" :key="item.id">
              <img
                class="avatar"
                :src="item.portrait"
                @click="chooseImg(item.portrait)"
              />
            </li>
          </ul>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="用户名：" class="lable" prop="username">
      <el-input
        prefix-icon="iconfont icon-dengluyemianyonghuming"
        v-model="signForm.username"
        clearable
      ></el-input>
    </el-form-item>
    <!-- <el-form-item label="姓名：" class="lable" prop="realName">
      <el-input
        prefix-icon="iconfont icon-1zhenshixingming"
        v-model="signForm.realName"
        clearable
      ></el-input>
    </el-form-item> -->
    <el-form-item label="电话：" class="lable" prop="phone">
      <el-input
        prefix-icon="iconfont icon-shoujihao1"
        v-model="signForm.phone"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱： " class="lable" prop="email">
      <el-input
        prefix-icon="iconfont icon-youxiang2"
        v-model="signForm.email"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="设置密码：" class="lable" prop="password">
      <el-input
        prefix-icon="iconfont icon-mima"
        v-model="signForm.password"
        type="password"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" class="lable" prop="checkpassword">
      <el-input
        prefix-icon="iconfont icon-mima1"
        v-model="signForm.checkpassword"
        type="password"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="primary" @click="signUP('signForm')">注册</el-button>
      <p class="login" @click="login('signForm')">已有账号？立即登录</p>
    </el-form-item>
  </el-form>
</template>

<script>
// import Avatar from "@/components/signUp/avatar";
import { register } from '@/api/services/loginUser.services';
export default {
  name: 'Sign-form',
  // components: {
  //   Avatar,
  // },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.signForm.checkpassword !== '') {
          this.$refs.signFormRef.validateField('checkpassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.signForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'));
      } else {
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('手机号格式有误'));
        }
      }
    };
    return {
      imgVisible: false,
      showChooseAvatar: true,
      fileList: [
        {
          id: '1',
          portrait:
            'https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        },
      ],
      signForm: {
        username: '',
        // realName: "",
        phone: '',
        email: '',
        password: '',
        portrait: '',
        checkpassword: '',
        // timestamp: new Date().getTime(),
      },
      SignRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 4, max: 14, message: '长度在 4 到 14个字符', trigger: 'blur' },
        ],
        // realName: [
        //   { required: true, message: "姓名不能为空", trigger: "blur" },
        //   { min: 2, max: 14, message: "长度在 4 到 14个字符", trigger: "blur" },
        // ],
        phone: [
          { required: true, trigger: 'blur' },
          {
            validator: validatePhone,
            min: 11,
            message: '手机号格式有误',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' },
        ],
        checkpassword: [
          { validator: validatePass2, required: true, trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    // this.signForm.portrait = localStorage.getItem("avatar");
  },
  methods: {
    // beforeUpload(file) {
    //   console.log(file);
    //   this.$emit('beforeUpload', file);
    // },
    signUP() {
      this.$refs.signFormRef.validate(async (valid) => {
        if (!valid) return;
        console.log(this.signForm);
        const data = await register(this.signForm);
        console.log(data);
        // return this.$message.error("注册失败！");
        if (data.status !== 200) {
          if (data.msg.errno === 1062) {
            return this.$message.warning('用户名已存在，请更改！');
          }
          if (data.status === 40001) {
            return this.$message.warning('服务器错误，请稍候再试！');
            // return this.$message.warning("该用户名已被注册，请更换用户名");
          }
          return this.$message.error('请按要求填写信息！');
        }
        this.$message.success('注册成功！');
        this.$router.push('login');
      });
    },
    chooseImg(portrait) {
      localStorage.setItem('avatar', portrait);
      this.signForm.portrait = localStorage.getItem('avatar');
      this.showChooseAvatar = false;
    },
    showImg() {
      this.showChooseAvatar = false;
    },
    handle_success(res) {
      console.log(res, 2);
      if (res.status === 200) {
        this.$message.success('图片上传成功');
        this.signForm.portrait = res.data.url;
        // console.log(this.signForm.portrait);
      } else {
        this.$message.success('图片上传失败');
      }
    },
    login() {
      this.$router.push('login');
    },
  },
};
</script>
<style lang="less" scoped>
.el-form {
  position: absolute;
  left: -5%;
}
.label {
  .el-form-item_label::before {
    content: '*';
    color: #f56c6c;
    margin-right: 5px;
    font-weight: bold;
  }
}
.el-button {
  width: 100%;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
  left: 50%;
  transform: translate(-5%);
}
.avatar-box {
  box-sizing: border-box;
  // width: 350px;
  height: 60px;
  // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  // border-radius: 50%;
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 5px;
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid #66a6ff;
  display: block;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translate(-65%);
}
</style>
