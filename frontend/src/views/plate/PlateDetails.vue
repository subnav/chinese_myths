<template>
  <div class="container">
    <MyHeader></MyHeader>
    <el-main>
      <el-button
        type="primary"
        icon="el-icon-back"
        class="back"
        circle=""
        @click="logout"
      ></el-button>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2 v-if="commentList">{{ commentList.name }}</h2>
          <div>
            <el-button type="text" class="button">中国神话故事平台</el-button>
            <!-- <time class="time" v-if="commentList">{{
              new Date(commentList.post.registerTime).toLocaleString()
            }}</time> -->
          </div>
          <div slot="reference" class="content-user" v-if="commentList">
            <img :src="commentList.portrait" class="userHeadImg" />
            <!-- <span>{{ commentList.name }}</span> -->
          </div>
        </div>
        <div class="content">
          <!-- <div class="content-user" v-if="commentList.user"> -->
          <!-- 用户头像 -->
          <!-- <img
                :src="commentList.user.portrait"
                class="userHeadImg"
                @click="goUserpage"
              />
              <span v-if="commentList.user">{{
                commentList.user.username
              }}</span>
              <span v-if="commentList.user">{{
                commentList.user.introduction
              }}</span>
            </div> -->

          <div class="text item" v-if="commentList">
            <!-- {{ deleteLabel(commentList.post.text) }} -->
            <h3 class="glode">一、人物简介</h3>
            <div style="padding-bottom: 30px" v-html="commentList.intro"></div>
            <h3 class="glode">二、人物故事</h3>
            <div v-html="commentList.story"></div>
            <!-- <div></div>
            <div>
              在传说中，常羲是一个集美丽和智慧于一身的女神，属于创世之神，她不但要担当维持宇宙秩序的重担，还要负责调节阴阳平衡，所以在《山海经》中，常羲又被称为“女和月母”。
            </div> -->
          </div>

          <!-- 点赞收藏区 -->
          <div class="content-main" v-for="(item, i) in comments" :key="i">
            <el-tooltip
              class="item"
              effect="dark"
              :content="tcontent[isC]"
              placement="top-start"
            >
              <el-rate
                v-model="value1"
                :max="max"
                :icon-classes="icon"
                void-icon-class="el-icon-star-off"
                @change="addPost($store.state.user.uid, commentList.pid)"
              ></el-rate>
            </el-tooltip>
            <!-- 点赞量 -->
            <!-- <span
              class="content-btns"
              @click="countlikeNumber('1', i, item.id)"
            >
              <i class="iconfont icon-dianzan3"></i>
              {{ item.like }}
            </span> -->
            <!-- 收藏量 -->
            <!-- <span
              class="content-btns"
              @click="countcollectNumber('1', i, item.id)"
            >
              <i class="iconfont icon-shoucang2"></i>
              {{ item.collect }}
            </span> -->
          </div>
          <!-- </div> -->
          <!-- <div> -->
          <!-- 评论区 -->
          <!-- <Comment></Comment> -->
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import MyHeader from '../../components/MyHeader.vue';
// import Comment from '../../components/detail/comment'
import { post } from '../../api/request.js';
import { noneRecycle } from '@/api/services/backstage.services';
export default {
  name: 'page-detail',
  components: {
    MyHeader,
    // Comment
  },
  data() {
    return {
      lastSid: '',
      lastPid: '',
      commentList: {
        pid: '',
        sid: '',
      },
      content: [],
      value1: null,
      isC: 0,
      max: 1,
      tcontent: ['收藏', '取消收藏'],
      icon: {
        1: 'el-icon-circle-check',
      },
      index: '0',
      subIndex: '0',
      comments: [
        {
          id: '1', // 用户id
          collect: 0, // 评论数
          like: 0, // 点赞数
          isLike: false,
          isCollect: false,
          likeListId: [],
          collectListId: [],
          inputShow: false,
        },
      ],
      activeNames: ['1'],
      currentPage4: 1,
    };
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
    this.lastPid = this.$route.query.pid;
    this.lastSid = this.$route.query.sid;
    this.getcommentsList(this.$route.query.sid, this.$route.query.pid);
  },
  // watch: {
  //   commentList: {
  //     deep: true,
  //     handler(newV, oldV) {
  //       this.drawLabelChart();
  //     },
  //   },
  // },
  methods: {
    logout() {
      this.$router.go(-1);
    },
    async getcommentsList(sid, pid) {
      this.commentList.pid = pid;
      this.commentList.sid = sid;
      this.commentList.uid = this.$store.state.user.uid;
      const data = await post(`section/${sid}/${pid}`, this.commentList);
      // if (typeof data === 'string') {
      //   data = eval('(' + data + ')');
      // }
      // console.log(data);
      if (data.status !== 200) {
        return this.$message.error('加载失败，稍后重试！');
      }
      this.commentList = data.data.res[0];
      if (data.data.isCollects.length) {
        this.value1 = 1;
        this.isC = 1;
      }
      console.log(this.value1);
      console.log(this.commentList);
      return this.$message.success('获取帖子详情成功！');
    },
    // 删除标签
    deleteLabel(text) {
      const reg = /<\/?.+?\/?>/g;
      return text.replace(reg, '');
    },
    // goUserpage() {
    //   this.$message.success('欢迎来到用户主页！');
    //   this.$router.push('user');
    // },
    handleChange(val) {},
    // 实现点赞收藏回复功能
    addlikeNumber(i, id) {
      const list = this.comments[i].likeListId;
      // console.log(i, name, id)
      if (list.length === 0) {
        // 在已经点赞的列表中未找到userId
        this.comments[i].isLike = true;
        this.comments[i].like += 1;
        this.comments[i].likeListId.push(id);
        console.log(
          '点赞+1',
          this.comments[i].isLike,
          this.comments[i].like,
          this.comments[i].likeListId,
        );
      } else {
        const index = list.indexOf(this.myId);
        this.comments[i].isLike = false;
        this.comments[i].like -= 1;
        this.comments[i].likeListId.splice(index, 1);
        console.log(
          '点赞-1',
          this.comments[i].isLike,
          this.comments[i].likeListId,
        );
      }
    },
    countlikeNumber(type, i, j, id) {
      const text = type === '1' ? this.comments[i] : this.comments[i].reply[j];
      const list = text.likeListId;
      if (list.length === 0) {
        // 在已经点赞的列表中未找到userId
        text.isLike = true;
        text.like += 1;
        text.likeListId.push(id);
        console.log('点赞+1', text.isLike, text.like, text.likeListId);
      } else {
        const index = list.indexOf(this.myId);
        text.isLike = false;
        text.like -= 1;
        text.likeListId.splice(index, 1);
        console.log('点赞-1', text.isLike, text.likeListId);
      }
    },
    // 添加收藏数
    async addPost(uid, pid) {
      console.log(this.value1);
      if (this.isC) {
        const res = await noneRecycle(uid, pid);
        if (res.status === 200) {
          this.$message.success('取消成功');
          this.value1 = 0;
          this.isC = 0;
        } else {
          this.$message.error('取消失败');
        }
      } else {
        const res = await post('/addPost', { uid, pid });
        if (res.status === 200) {
          this.icon = {
            1: 'el-icon-circle-check',
          };
          this.isC = 1;
          this.$message.success('收藏成功');
        } else {
          this.value1 = 0;
          this.isC = 0;
          this.$message.error('收藏失败');
        }
      }
      console.log(1);
    },
    addcollectNum(i, id) {
      const list = this.comments[i].collectListId;
      // console.log(i, name, id)
      if (list.length === 0) {
        // 在已经点赞的列表中未找到userId
        this.comments[i].isCollect = true;
        this.comments[i].collect += 1;
        this.comments[i].collectListId.push(id);
        console.log(
          '收藏+1',
          this.comments[i].isCollect,
          this.comments[i].collect,
          this.comments[i].collectListId,
        );
      } else {
        const index = list.indexOf(this.myId);
        this.comments[i].isCollect = false;
        this.comments[i].collect -= 1;
        this.comments[i].collectListId.splice(index, 1);
        console.log(
          '收藏-1',
          this.comments[i].isCollect,
          this.comments[i].collectListId,
        );
      }
    },
    countcollectNumber(type, i, j, id) {
      const text = type === '1' ? this.comments[i] : this.comments[i].reply[j];
      const list = text.collectListId;
      if (list.length === 0) {
        // 在已经点赞的列表中未找到userId
        text.isCollect = true;
        text.collect += 1;
        text.collectListId.push(id);
        console.log('收藏+1', text.isCollect, text.collect, text.collectListId);
      } else {
        const index = list.indexOf(this.myId);
        text.isCollect = false;
        text.collect -= 1;
        text.collectListId.splice(index, 1);
        console.log('收藏-1', text.isCollect, text.collectListId);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.glode {
  color: gold;
  margin-bottom: 20px;
}
.container {
  position: relative;
  // height: 100%;
  min-height: 100%;
  background: url('@/assets/bgp.png') no-repeat;
  background-size: cover;
}
.box-card {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -40%);
  margin: 50px auto;
  width: 70%;
  background-color: rgba(0, 0, 0, 0.5);
  // height: auto;
}
.text {
  font-size: 16px;
  text-indent: 2rem;
}
.time {
  font-size: 13px;
  // color: #999;
}
.button {
  padding: 5px;
}
.back {
  position: absolute;
  bottom: 5%;
  left: 2%;
}
.item {
  margin-bottom: 18px;
  color: #fff;
  font-size: 18px;
  margin-top: 30px;
}
.content-user {
  display: flex;

  flex-direction: column;
  width: 100px;
  justify-content: center;
}
.userHeadImg {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 120px;
  // height: 80px;
  border-radius: 50%;
  float: left;
}
.content-user span {
  flex: 1;
  font-size: 14px;
  // color: #999;
  margin-top: 10px;
  margin-left: 10px;
}
.content-img {
  width: 100%;
  text-align: center;
}
.content-img img {
  height: 400px;
}
.content-main {
  position: relative;
  height: 50px;
}
.content-btns {
  float: right;
  margin-right: 40px;
}
.clearfix {
  position: relative;
  text-align: center;
  // height: 40px;
  font-size: 24px;
  color: #fff;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.el-rate {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
