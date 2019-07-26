<template>
  <div>
    <mt-swipe :auto="4000" id="lunbotu">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<style lang="less" scoped>
.mint-swipe {
  height: 120px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>


<script>
export default {
    props:["lunbotuList"]
};
</script>