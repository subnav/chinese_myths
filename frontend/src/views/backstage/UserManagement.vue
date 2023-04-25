<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/bghome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <!-- <el-table-column label="昵称" prop="realName"></el-table-column> -->
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="用户等级">
          <template slot-scope="scope">
            <el-tag
              class="tag-width"
              v-if="scope.row.role"
              type="success"
              effect="dark"
              >管理员</el-tag
            >
            <el-tag class="tag-width" v-else type="info" effect="dark"
              >普通用户</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditDialog({ ...scope.row })"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeUserById(scope.row.uid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="昵称" prop="realName">
          <el-input v-model="addForm.realName"></el-input>
        </el-form-item> -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名">
          <el-input v-model="editForm.realName"></el-input>
        </el-form-item> -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllUser,
  register,
  updataInfoByAdmin,
  deleteUser,
} from '@/api/services/backstage.services';
import { mapState } from 'vuex';
export default {
  data() {
    // 验证手机号
    const checkMobile = (rule, value, cb) => {
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error('请输入合法的手机号'));
    };
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      role: false,
      // 控制用户对话框显示与隐藏
      dialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        phone: '',
        // realName: '',
        // timestamp: new Date().getTime()
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState(['user', 'token']),
  },
  methods: {
    // 请求用户数据
    async queryUser() {
      const data = await getAllUser(this.user.uid, this.token);
      if (data.status === 200) {
        this.$message.success('获取数据成功！');
      }
      console.log(data);
      this.userlist = [
        ...data.data.filter((item) => item.username !== this.user.username),
      ];
      this.total = data.data.length;
    },
    // 初始化展示
    async getUserList() {
      await this.queryUser();
      this.changeUserList(0, this.queryInfo.pagesize);
      this.queryInfo.pagenum = 1;
    },
    // 拆封数组
    changeUserList(begin, end) {
      if (end > this.userlist.length) {
        end = this.userlist.length;
      }
      this.userlist = this.userlist.slice(begin, end);
    },
    // 监听 pagesize 改变的事件
    async handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.queryInfo.pagenum = 1;
      await this.queryUser();
      this.changeUserList(0, newSize);
    },
    // 监听 页码值 改变的事件
    async handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      await this.queryUser();
      const begin = this.queryInfo.pagesize * (newPage - 1);
      const end = this.queryInfo.pagesize * newPage;
      this.changeUserList(begin, end);
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击添加用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起网络请求
        const data = await register(this.addForm);
        if (data.msg.errno === 1062) {
          return this.$message.error('用户或者手机号已被注册!');
        }
        if (data.status === 40001) {
          return this.$message.warning('服务器错误，请稍候再试！');
        }
        this.$message.success('添加用户成功！');
        // 隐藏添加用户的对话框
        this.dialogVisible = false;
        // 重新获取用户列表
        this.getUserList();
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(data) {
      this.editForm = data;
      this.editDialogVisible = true;
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const data = await updataInfoByAdmin(
          window.localStorage.getItem('token'),
          // this.editForm.registrationTime,
          this.user.uid,
          this.user.password,
          this.user.username,
          this.editForm,
        );
        console.log(data);
        if (data.status !== 200) return this.$message.error('更改用户信息失败');
        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.handleCurrentChange(this.queryInfo.pagenum);
        // 提示修改成功
        this.$message.success('更新用户信息成功！');
      });
    },
    // 查找用户
    async searchList() {
      await this.queryUser();
      this.userlist = this.userlist.filter((item) => {
        if (item.username.indexOf(this.queryInfo.query) !== -1) return true;
        return false;
      });
    },
    // 根据 id 删除用户信息
    async removeUserById(uid) {
      // 弹窗询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      ).catch((err) => err);

      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      const res = await deleteUser(uid);
      if (res.status === 200) {
        this.$message.success(res.data);
      } else {
        return this.$message.error('删除用户失败');
      }
      this.getUserList();
    },
  },
  created() {
    this.getUserList();
  },
};
</script>
<style lang="less" scoped>
.tag-width {
  width: 70px;
  text-align: center;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}

.el-tag {
  margin: 0 25%;
}
</style>
