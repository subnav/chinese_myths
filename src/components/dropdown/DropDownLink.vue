<template>
  <div class="drop-down-link">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .drop-down-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 10px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    &:hover {
      /deep/ img {
        animation: leap 0.4s;
      }
    }
    /deep/ img {
      width: 21px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }

  @keyframes leap {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>
