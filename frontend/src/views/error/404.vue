<template>
  <div class="not-found">
    <my-header></my-header>
    <el-empty
      description="警告！警告！！发生时空错乱，当前到达远古地带，请立即返回！！！"
    ></el-empty>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';
export default {
  components: { MyHeader },
};
</script>

<style lang="less" scoped>
.not-found {
  height: 100%;
  background-color: #fff;
  .el-empty {
    height: 80vh;
  }
}
</style>
