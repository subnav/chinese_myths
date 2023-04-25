<template>
  <el-container>
    <my-header></my-header>

    <el-main class="container">
      <div class="one" @click="toPlate(1)">
        <div class="two">
          <img src="@/assets/creation.jpg" alt="" title="创世神话" />
          <h2>创世神话</h2>
        </div>
        <div class="content">
          创世神话反映了中国历史早期原始社会人类关于宇宙、人类起源解释的一种思维方式。创世神话叙述的是世界以及人类怎样产生的过程，在神话学领域占有极为重要的地位，对揭示一个民族的宗教情绪和神话思维很有意义。
        </div>
      </div>
      <div class="one" @click="toPlate(2)">
        <div class="two">
          <img src="@/assets/hero.jpg" alt="" title="英雄神话" />
          <h2>英雄神话</h2>
        </div>
        <div class="content">
          世界各民族都有自己爱戴和崇敬的英雄人物，爱戴之至便生歌颂，歌颂便生夸诞，夸诞日久便成神话，因而英雄神话向来是神话故事的一大主题。英雄神话在中国古代神话中居于多数，中国人于英雄崇拜自古有特殊的情结，故所创作之神话以英雄为多。
        </div>
      </div>
      <div class="one" @click="toPlate(3)">
        <div class="two">
          <img src="@/assets/nature.jpg" alt="" title="自然神话" />
          <h2>自然神话</h2>
        </div>
        <div class="content">
          自然崇拜是世界各早期文明民族原始宗教中的普遍现象，中国在夏、商、周三代就一直把这些自然力列入祭祀之列，但在中国自然崇拜在宗教信仰中不占主要地位，占主要地位的乃是英雄崇拜。中国古人虽也把各种自然力列入祀典，但看重的只是这些自然力对民生的实际功用。
        </div>
      </div>
    </el-main>
    <el-footer>
      <a
        href="https://gitee.com/lying-flat-rowing/chinese_myths"
        target="_black"
        >有问题?</a
      >
    </el-footer>
  </el-container>
</template>

<script>
// 引入 MyHeader 组件
import MyHeader from '../components/MyHeader.vue';

export default {
  data() {
    return {
      // value: 2,
      // marks: {
      //   0: '天地之初',
      //   8: '8°C',
      //   37: '37°C',
      //   100: '100°C'
      // }
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    // 跳转到板块
    toPlate(sid) {
      console.log('hhhh');
      this.$router.push(`/plate?sid=${sid}`);
    },
    //  跳转外部连接
    toissue() {
      this.$router.push('http://www.baidu.com');
    },
  },
};
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
  // background: rgba(6, 48, 83, 0.6);
}

.container {
  // margin-top: 50px;
  position: relative;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  // padding: 10px 0px;
  font-size: 18px;
}
.container .one {
  position: relative;
  width: 300px;
  height: 305px;
  background: #fff;
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
.container .one:hover {
  height: 450px;
}
.container .one .two {
  position: relative;
  width: 260px; /*改*/
  height: 260px; /*改*/
  top: -60px;
  left: 20px;

  // text-align: center;
  // line-height: 70px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
}
.container .one .two img {
  width: 260px; /*改*/
  height: 260px; /*改*/
  border-radius: 4px;
}
.container .one .two h2 {
  font-family: '楷体';
  text-align: center;
  margin-top: 40px;
  transition: 0.3s ease-in-out;
  // line-height: 70px;
  // font-size: 30px;
  // width: 260px; /*改*/
  // height: 260px; /*改*/
  // border-radius: 4px;
}
// .container .one .two img:hover {
//   box-shadow: 5px 5px 5px #000;
// }
.container .one .content {
  position: relative;
  margin-top: -140px;
  padding: 10px 15px;
  // text-align: center;
  text-indent: 2em;
  color: #111;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.container .one:hover h2 {
  visibility: hidden;
  margin-top: 200px;
  transition-delay: 0.2s;
}
.container .one:hover .content {
  visibility: visible;
  opacity: 1;
  margin-top: -40px;
  transition-delay: 0.3s;
}

.el-footer {
  background-color: #323537;
  color: #333;
  font-size: 18px;
  // text-align: center;
  line-height: 60px;
}
</style>
