<template>
  <div class="artivle">
    <h2 class="Info-title">帖子板块</h2>
    <el-collapse v-if="articles" v-model="activeName" accordion>
      <el-collapse-item
        v-for="(val, key, pid) in articles"
        :key="pid"
        :title="val.title"
        :name="val.title"
      >
        <div v-if="val.content.length" class="item-content">
          <el-card
            v-for="obj of val.content"
            :key="obj.pid"
            :body-style="{ padding: '0px' }"
            shadow="hover"
            class="box-card"
            @click.native="toDetail(obj.sid, obj.pid)"
            :title="obj.name"
          >
            <img v-if="obj.portrait" :src="obj.portrait" alt="" />
            <div v-else class="default-image"></div>
            <div class="article-title">{{ obj.name }}</div>
            <el-button
              type="text"
              @click.stop="delect($store.state.user.uid, obj.pid)"
              >取消收藏</el-button
            >
          </el-card>
        </div>
        <div v-else class="defaultBgI"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { Posts } from '@/api/services/article.services';
import { noneRecycle } from '@/api/services/backstage.services';
export default {
  data() {
    return {
      // 默认展开
      activeName: '我的收藏',
      // 文章数据绑定
      articles: {
        collected: {
          title: '我的收藏',
          content: [],
        },
        // issued: {
        //   title: '我的',
        //   content: []
        // }
      },
    };
  },
  methods: {
    // 点击帖子跳转
    toDetail(sid, pid) {
      console.log(sid, pid);
      this.$router.push(`/detail?sid=${sid}&pid=${pid}`);
    },
    // 渲染数据
    updatePost(data) {
      // for (const item in data) {
      this.articles.collected.content = data;
      // }
    },
    // 获取帖子信息
    async getArticleObj() {
      console.log(1);
      const data = await Posts(this.$store.state.user.uid);
      console.log(data);
      if (!data.data) return;
      // delete data.status;
      this.updatePost(data.data);
    },
    async delect(uid, pid) {
      // 弹窗询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将取消收藏该帖子, 是否继续?',
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
      const res = await noneRecycle(uid, pid);
      if (res.status === 200) {
        this.$message.success('取消成功');
        this.getArticleObj();
      } else {
        this.$message.error('取消失败');
      }
    },
  },
  created() {
    this.getArticleObj();
  },
};
</script>

<style lang="less" scoped>
img,
.default-image {
  width: 220px;
  height: 200px;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}
/deep/ .el-collapse-item__header {
  font-size: 20px;
}
.item-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-height: 700px;
  overflow: auto;
  .box-card {
    position: relative;
    flex: 0 1 auto;
    width: 220px;
    height: 300px;
    margin: 20px 0;
    &:hover .article-title {
      color: skyblue;
    }
    .el-button {
      position: absolute;
      bottom: 0;
      right: 10px;
    }
  }
  img {
    vertical-align: middle;
  }
  .article-title {
    font-size: 18px;
    padding-left: 20px;
    line-height: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.defaultBgI {
  width: 256px;
  height: 256px;
  margin: 30px auto;
  background-image: url('@/assets/images/default/default.png');
}
</style>
