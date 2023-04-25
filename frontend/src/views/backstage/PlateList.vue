<template>
  <div class="box-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/bghome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>板块管理</el-breadcrumb-item>
      <el-breadcrumb-item>板块列表</el-breadcrumb-item>
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
              data.detail.toLowerCase().includes(search.toLowerCase()),
          )
        "
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!-- <el-table-column
          prop="timestamp"
          label="日期"
          align="center"
          sortable
          width="180"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.edit"
              v-model="scope.row.registerTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <span style="margin-left: 10px" v-if="!scope.row.edit">{{
              new Date(scope.row.registerTime).toLocaleString()
            }}</span>
          </template>
        </el-table-column> -->
        <!-- 板块 -->
        <el-table-column
          prop="name"
          label="帖子板块"
          align="center"
          sortable
          width="180"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-input
                class="username"
                placeholder="帖子板块"
                v-if="scope.row.edit"
                v-model="scope.row.name"
              ></el-input>
              <span size="medium" v-if="!scope.row.edit">{{
                scope.row.name
              }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- 详情 -->
        <el-table-column
          prop="detail"
          label="板块详情"
          align="center"
          width="580"
        >
          <template slot-scope="scope">
            <el-input
              class="plate"
              placeholder="板块详情"
              v-if="scope.row.edit"
              v-model="scope.row.detail"
            ></el-input>
            <span style="margin-left: 10px" v-if="!scope.row.edit">{{
              scope.row.detail
            }}</span>
          </template>
        </el-table-column>
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
            <el-button
              v-show="!scope.row.edit"
              size="mini"
              type="primary"
              @click="PlateListEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <!-- 删除 -->
            <el-button
              v-show="!scope.row.edit"
              size="mini"
              @click="PlateListeDelete(scope.$index, scope.row.sid)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
            <!-- 取消 -->
            <el-button
              v-show="scope.row.edit"
              size="mini"
              @click="handleCancel(scope.$index, scope.row)"
              style="margin-left: 0"
              >取消</el-button
            >
            <!-- 保存 -->
            <el-button
              v-show="scope.row.edit"
              :disabled="isDsabled"
              size="mini"
              type="success"
              @click="handleSave(scope.$index, scope.row)"
              >保存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center; margin-top: 15px">
        <el-button
          class="add el-icon-plus"
          type="primary"
          size="mini"
          @click="PlateListAdd"
          >添加</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  delectSection,
  addSection,
  getAllSection,
} from '@/api/services/backstage.services';
export default {
  name: 'plate-list',
  data() {
    return {
      tableData: [],
      tableDataCopy: [],
      newPlateList: {
        sid: '',
        // timestamp: new Date().getTime(),
        name: '',
        detail: '',
        portrait: '',
        edit: false,
      },
      search: '',
      isDsabled: true,
      index: 0,
      // pickerOptions: {
      //   disabledDate (time) {
      //     return time.getTime() > Date.now().toLocaleString()
      //   },
      //   shortcuts: [
      //     {
      //       text: '今天',
      //       onClick (picker) {
      //         picker.$emit('pick', new Date().toLocaleString())
      //       }
      //     },
      //     {
      //       text: '昨天',
      //       onClick (picker) {
      //         const date = new Date()
      //         date.setTime(date.getTime() - 3600 * 1000 * 24)
      //         picker.$emit('pick', date.toLocaleString())
      //       }
      //     },
      //     {
      //       text: '一周前',
      //       onClick (picker) {
      //         const date = new Date()
      //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      //         picker.$emit('pick', date.toLocaleString())
      //       }
      //     }
      //   ]
      // }
    };
  },
  watch: {
    tableData: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(
          JSON.stringify(this.tableDataCopy) === JSON.stringify(oldValue),
        );
        if (JSON.stringify(this.tableDataCopy) === JSON.stringify(oldValue)) {
          this.isDsabled = true;
        } else {
          this.isDsabled = false;
        }
      },
    },
  },
  // 懒加载
  created() {
    const loading = this.$loading({
      lock: true,
      text: '数据加载中......',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    setTimeout(() => {
      loading.close();
      this.getAllPlateSections();
    }, 1000); /* 设置时间为1秒 */
  },
  // 控制详情展示文字
  filters: {
    ellipsis(value) {
      if (!value) return '';
      if (value.length > 10) {
        return value.slice(0, 9) + '...';
      }
      return value;
    },
  },
  methods: {
    // 渲染
    async getAllPlateSections() {
      const res = await getAllSection();
      const data = res;
      data.data.forEach((temp) => {
        temp.edit = false;
        this.tableData.push(temp);
        this.tableDataCopy.push({ ...temp });
      });
      console.log(this.tableData);
    },
    // 编辑
    PlateListEdit(index, row) {
      row.edit = true;
      if (this.tableDataCopy[index]) {
        this.tableDataCopy[index].edit = true;
      }
    },
    // 增加
    PlateListAdd(row) {
      // const newPlateList = { ...this.newPlateList };
      const index = this.tableData.length;
      for (const i in this.tableData) {
        if (i === index) break;
        if (this.tableData[i].edit) {
          this.$message.warning('请先保存信息');
          return;
        }
      }
      this.newPlateList.newList = 1;
      this.tableData.push({ ...this.newPlateList });
      this.tableDataCopy.push({ ...this.newPlateList });
      this.PlateListEdit(index, this.tableData[index]);
    },
    // 删除
    async PlateListeDelete(index, row) {
      const confirmResult = await this.$confirm('确定要删除此板块吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err);

      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      const res = await delectSection(row);
      if (res.status === 200) {
        this.$message.success(res.data);
        if (this.tableData.length !== 1) {
          this.tableData.splice(index, 1);
          this.tableDataCopy.splice(index, 1);
        } else {
          this.$alert('至少要添加一条信息，无法删除', {
            confirmButtonText: '确定',
            callback: () => {
              this.$message.warning('对应信息不能为空！');
            },
          });
        }
      } else {
        return this.$message.error('删除失败');
      }
    },
    // 取消
    handleCancel(index, row) {
      // this.tableData.pop();
      console.log(this.tableData[index].name, row.name);
      if (row.newList) {
        this.tableDataCopy.pop();
        return this.tableData.pop();
      }
      if (this.tableDataCopy[index].name !== row.name) {
        row.name = this.tableDataCopy[index].name;
      }
      if (this.tableDataCopy[index].detail !== row.detail) {
        row.detail = this.tableDataCopy[index].detail;
      }
      row.edit = false;
      this.tableDataCopy[index].edit = false;
    },
    // 保存
    async handleSave(index, row) {
      if (!this.tableDataCopy[index]) {
        row.isInset = 1;
      } else {
        row.isInset = '';
      }
      // let c, b
      // if (typeof row.registerTime === 'object') {
      //   b = row.registerTime.toJSON().replace('T', ' ')
      //   c = b.slice(0, 19)
      // }
      // if (typeof row.registerTime === 'string') {
      //   while (row.registerTime.indexOf('/') !== -1) {
      //     row.registerTime = row.registerTime.replace('/', '-')
      //     console.log(c)
      //   }
      //   c = row.registerTime
      // }
      // console.log(c)
      // row.registerTime = c

      const res = await addSection(row);
      console.log('123', res);
      if (res.status === 200 && res.msg) {
        row.edit = false;
        this.tableDataCopy[index] = { ...row };
        return this.$message.success(res.msg);
      }
      this.$message.error('添加失败');
    },
    formatter(row, column) {
      return row.address;
    },
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
</style>
