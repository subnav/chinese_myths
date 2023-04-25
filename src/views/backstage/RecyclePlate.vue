<!-- 回收用户信息页面 -->
<template>
  <!-- 主布局 -->
  <div class="container">
    <!-- 卡片式布局 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/bghome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item>回收站</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- table表单数据-->
      <el-table
        ref="multipleTable"
        style="
          font-size: 14px;
          box-shadow: 10px 10px 5px rgba(99, 99, 153, 0.2);
        "
        :data="PlateDetailList"
        stripe
        :header-cell-style="{ background: '#f8f8f9', color: '#515a6e' }"
        @selection-change="handleSelectionChange"
      >
        <!-- 可勾选控件 -->
        <el-table-column type="selection"></el-table-column>
        <!-- 发帖日期 -->
        <el-table-column
          label="发帖日期"
          prop="registerTime"
          align="center"
          min-width="10%"
        >
          <template slot-scope="scope">{{ scope.row.registerTime }}</template>
        </el-table-column>
        <!-- 板块列 -->
        <el-table-column
          label="帖子"
          prop="topic"
          align="center"
          min-width="10%"
        ></el-table-column>
        <!-- 帖子详情列 -->
        <el-table-column
          label="详情"
          prop="text"
          align="center"
          min-width="10%"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="!scope.row.edit">{{
              scope.row.text | ellipsis
            }}</span>
          </template>
        </el-table-column>
        <!-- 点赞量 -->
        <el-table-column
          label="点赞量"
          prop="state"
          align="center"
          min-width="10%"
        >
          <template slot-scope="scope">{{ scope.row.applaud }}</template>
        </el-table-column>
        <!-- 收藏量 -->
        <el-table-column
          label="收藏量"
          prop="state"
          align="center"
          min-width="10%"
        >
          <template slot-scope="scope">{{ scope.row.collected }}</template>
        </el-table-column>
        <!-- 作用域操作，将操作放在同一个列中 -->
        <el-table-column label="操作" align="center" min-width="15%">
          <template slot-scope="scope">
            <!-- 恢复按钮 -->
            <el-tooltip content="恢复" placement="top">
              <el-button
                type="success"
                icon="el-icon-upload"
                size="mini"
                @click="
                  recyclePlates(scope.$index, scope.row.sid, scope.row.pid)
                "
              ></el-button>
            </el-tooltip>
            <!--  删除按钮 -->
            <el-tooltip content="彻底删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="
                  PlateListeDelete(scope.$index, scope.row.sid, scope.row.pid)
                "
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button
          @click="
            toggleSelection([
              PlateDetailList[0],
              PlateDetailList[PlateDetailList.length - 1],
            ])
          "
          >全选</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  removeFromRecycle,
  getAllRecycle,
  recover,
} from "@/api/services/backstage.services";
export default {
  name: "recycle-plate",
  // 数据定义
  data() {
    return {
      PlateDetailList: [],
      multipleSelection: [],
    };
  },
  // 控制详情展示文字
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 9) + "...";
      }
      return value;
    },
  },
  mounted() {
    this.getUpdateSection();
  },
  methods: {
    // 更新
    async getUpdateSection(indedx, row) {
      const data = await getAllRecycle();
      console.log(data);
      if (data.length === 0) return;
      data.forEach((item) => {
        item.registerTime = new Date(item.registerTime).toLocaleString(
          "chinese",
          { hour12: false }
        );
        const reg = /<\/?.+?\/?>/g;
        item.text = item.text.replace(reg, "");
      });
      this.PlateDetailList = data;
      // console.log("111", row);
    },
    // 恢复操作
    async recyclePlates(index, sid, pid) {
      const data = await recover(sid, pid);
      console.log(data);

      this.$router.push("PlateDetailList");
      return this.$message.success("恢复帖子成功！");
    },
    // 彻底删除
    async PlateListeDelete(index, sid, pid) {
      // this.PlateListeDelete = index
      // if (this.PlateDetailList.length !== 0) {
      //   this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(async () => {
      //       await
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       })
      //     })
      //     .catch(() => {
      //       this.PlateDetailList.splice(index, 0)
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       })
      //     })
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      await removeFromRecycle(sid, pid);
      this.PlateDetailList.splice(index, 1);
      this.$message.success("帖子删除成功");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
