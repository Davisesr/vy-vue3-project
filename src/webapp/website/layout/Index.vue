<template>
  <a-layout class="main-wrapper">
    <a-layout-header class="header-wrapper">
      搜索栏
    </a-layout-header>
    <a-layout-content class="content-wrapper">
      <div style="height: 2000px;">
        内容
      </div>
    </a-layout-content>
    <a-layout-footer class="footer-wrapper">
      蜀ICP备20009335号-1
    </a-layout-footer>
  </a-layout>
</template>


<script setup lang="ts">

</script>

<style scoped lang="less">
.main-wrapper {
  .header-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 2px #0000000d;

    z-index: 5;
    position: sticky;
    top: 0;
  }

  .content-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    z-index: 1;
  }

  .footer-wrapper {
    z-index: 1;
    display: flex;
    justify-content: center;
  }
}
</style>