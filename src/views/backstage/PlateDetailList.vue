<template>
  <div class="box-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/bghome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>板块管理</el-breadcrumb-item>
      <el-breadcrumb-item>帖子详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 板块管理区域 -->
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.name.toLowerCase().includes(search.toLowerCase()) ||
              data.intro.toLowerCase().includes(search.toLowerCase()),
          )
        "
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          prop="sid"
          label="板块"
          align="center"
          sortable
          width="80"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.sid === 1">创世神话</span>
            <span v-else-if="scope.row.sid === 2">英雄神话</span>
            <span v-else>自然神话</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="date"
          label="发帖日期"
          align="center"
          sortable
          width="180"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              new Date(scope.row.registerTime).toLocaleString()
            }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="name" label="帖子" align="center" width="120">
          <template slot-scope="scope">
            <el-tag style="margin-left: 10px">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="intro"
          label="人物简介"
          align="center"
          width="340"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.intro | ellipsis }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="story"
          label="人物故事"
          align="center"
          width="340"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.story | ellipsis }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="applaud"
          label="点赞量"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.applaud }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="collected"
          label="收藏量"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.collected }}</span>
          </template>
        </el-table-column> -->
        <el-table-column align="right" prop="address" :formatter="formatter">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              clearable
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-tooltip content="查看" placement="top">
              <el-button
                size="mini"
                type="primary"
                @click="PlateListEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                circle
              >
              </el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-button
              size="mini"
              @click="
                PlateListeDelete(scope.$index, scope.row.sid, scope.row.pid)
              "
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center; margin-top: 15px">
        <el-button
          class="add el-icon-plus"
          type="primary"
          size="mini"
          @click="plateListAdd"
          >添加</el-button
        >
      </div>
    </el-card>

    <!-- 添加帖子对话框 -->
    <el-dialog
      title="帖子详情"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
    >
      <el-form ref="detail" :model="detail" :rules="rules" label-width="80px">
        <el-form-item label="主题" prop="name">
          <el-input v-model="detail.name"></el-input>
        </el-form-item>
        <el-form-item label="板块区域" prop="sid">
          <el-select v-model="detail.sid" placeholder="请选择板块区域">
            <el-option label="创世神话" value="1"></el-option>
            <el-option label="英雄神话" value="2"></el-option>
            <el-option label="自然神话" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图画" prop="portrait">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/getImgPath"
            :show-file-list="false"
            list-type="picture-card"
            :multiple="false"
            :limit="1"
            :auto-upload="true"
            v-model="detail.portrait"
            :on-success="handle_success"
            accept="image/png, image/jpg, image/jpeg"
          >
            <div>
              <img
                v-if="this.detail.portrait"
                :src="this.detail.portrait"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <!-- <div v-show="showChooseAvatar">
              <ul>
                <li v-for="item in fileList" :key="item.id">
                  <img
                    class="avatar"
                    :src="item.portrait"
                    @click="chooseImg(item.portrait)"
                  />
                </li>
              </ul>
            </div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="人物简介" prop="intro">
          <el-input
            type="textarea"
            v-model="detail.intro"
            :autosize="{ minRows: 6 }"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="人物故事" prop="story">
          <el-input
            type="textarea"
            v-model="detail.story"
            :autosize="{ minRows: 6 }"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          :disabled="isDisabled"
          type="primary"
          @click="handlerPost(detail)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllPost,
  updatePost,
  goToRecycle,
} from '@/api/services/backstage.services';
export default {
  name: 'plate-list',
  data() {
    return {
      search: '',
      centerDialogVisible: false,
      detail: {},
      detailCopy: {
        sid: '',
        name: '',
        intro: '',
        story: '',
      },
      tableData: [],
      fileList: [
        {
          id: '1',
          portrait:
            'https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        },
      ],
      // showChooseAvatar: true,
      isDisabled: true,
      isAdd: 0,
      rules: {
        name: [
          { required: true, message: '请输入主题名称', trigger: 'blur' },
          { min: 1, message: '长度至少大于 1 个字符', trigger: 'blur' },
        ],
        sid: [{ required: true, message: '请选择板块区域', trigger: 'change' }],
        portrait: { required: true, message: '图画不能为空' },
        intro: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 1,
            max: 255,
            message: '长度至少大于 1 个字符',
            trigger: 'blur',
          },
        ],
        story: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 1,
            max: 255,
            message: '长度至少大于 1 个字符',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  watch: {
    detail: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(
          JSON.stringify(this.detailCopy) !== JSON.stringify(newValue),
          this.detailCopy,
        );
        if (JSON.stringify(this.detailCopy) !== JSON.stringify(newValue)) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      },
    },
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: '数据加载中......',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    setTimeout(() => {
      loading.close();
    }, 1000); /* 设置时间为1秒 */
  },
  // 控制详情展示文字
  filters: {
    ellipsis(value) {
      if (!value) return '';
      if (value.length > 50) {
        return value.slice(0, 48) + '...';
      }
      return value;
    },
  },
  mounted() {
    this.getAllPostInfo();
  },
  methods: {
    // 发起请求获取所有板块信息
    async getAllPostInfo(index, row) {
      const data = await getAllPost();
      console.log(data);
      if (data.status === 200) {
        return (this.tableData = data.data);
        // return this.$message.success('获取数据成功！');
      }
      return this.$message.error('获取数据失败！');
    },
    // 编辑
    PlateListEdit(index, row) {
      // this.detail = {};
      this.centerDialogVisible = true;
      this.detail = { ...row };
      this.detailCopy = { ...row };
    },
    // 增加
    plateListAdd() {
      this.detail = {};
      this.centerDialogVisible = true;
      this.detail.isAdd = 1;
      this.detailCopy.isAdd = 1;
    },
    // 取消
    handleCancel() {
      this.centerDialogVisible = false;
      if (this.detail.isAdd) {
        this.detail.isAdd = 0;
        this.detailCopy.isAdd = 0;
      }
    },
    // 删除
    async PlateListeDelete(index, sid, pid) {
      // console.log(pid);
      // console.log(index);
      const confirmResult = await this.$confirm('确定要删除此帖子吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err);

      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }

      const data = await goToRecycle(sid, pid);
      console.log(data);
      if (data.status === 200) {
        console.log(index);
        this.tableData.splice(index, 1);
        return this.$message.success('删除成功！');
      }
      // if (data.stu)
      //   // this.$router.go();
      //   this.tableData = data;
      return this.$message.error('删除失败！');
    },
    // 删除标签
    deleteLabel(text) {
      const reg = /<\/?.+?\/?>/g;
      return text.replace(reg, '');
    },
    // 更改帖子
    async handlerPost(detail) {
      console.log(detail);
      const res = await updatePost(detail);
      if (res.status === 200) {
        this.centerDialogVisible = false;
        this.$message.success(res.msg);
        return this.getAllPostInfo();
      }
      this.$message.error('失败！');
    },
    formatter(row, column) {
      console.log(row);
      return row.address;
    },
    handle_success(res) {
      console.log(res, 2);
      if (res.status === 200) {
        this.$message.success('图片上传成功');
        this.detail.portrait = res.data.url;
        console.log(this.detail.portrait);
      } else {
        this.$message.success('图片上传失败');
      }
    },
    // showImg() {
    //   this.showChooseAvatar = false;
    // },
    // chooseImg(portrait) {
    //   localStorage.setItem('avatar', portrait);
    //   this.signForm.portrait = localStorage.getItem('avatar');
    //   this.showChooseAvatar = false;
    // },
  },
};
</script>
<style lang="less" scoped>
.box-container {
  height: 100%;
  min-width: 800px;
}
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
/deep/ textarea {
  resize: none;
}
</style>
