<template>
 <div class="mui-numbox" data-numbox-step='1' data-numbox-min="1" data-numbox-max="100">
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" value="1" />
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>

  <!-- 分析： 子组件什么时候把 数据传递给父组件 -->
  <!--  -->
</template>

<script>
import mui from "../../lib/mui/js/mui.js"

export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  }
};
</script>

<style lang="scss" scoped>
</style>
