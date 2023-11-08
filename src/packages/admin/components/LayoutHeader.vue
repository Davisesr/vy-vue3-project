<template>
  <div class="header-wrapper" style="">
    <img :src="FAVICON_ICO" alt="">
    <div class="title">
      {{ props.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue"
import FAVICON_ICO from "public/favicon.ico"

const props = defineProps({
  title: {
    type: String,
    default: "管理后台"
  }
})


</script>

<style lang="less" scoped>
.header-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    height: 40px;
    width: 40px;
  }

  .title {
    color: #fff;
    font-size: 20px
  }
}
</style>
