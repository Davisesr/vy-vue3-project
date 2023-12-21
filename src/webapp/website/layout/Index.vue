<template>
  <a-layout class="main-wrapper">
    <a-layout-header class="header-wrapper">
      <search-bar/>
    </a-layout-header>
    <a-layout-content class="content-wrapper">
      <content-bar/>
    </a-layout-content>
    <a-layout-footer class="footer-wrapper">
      <footer-bar/>
    </a-layout-footer>
  </a-layout>
</template>


<script setup lang="ts">
import {SearchBar} from "./components/search-bar"
import {ContentBar} from "./components/content-bar"
import {FooterBar} from "./components/footer-bar"

</script>

<style scoped lang="less">
.main-wrapper {
  height: 100vh;
  width: 100vw;

  .header-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    //box-shadow: 0 1px 2px #0000000d;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 30px;
  }

  .content-wrapper {
    padding: 8px;
    display: flex;
    justify-content: center;
    z-index: 1;
    overflow: auto;
    scroll-behavior: smooth;
  }

  .footer-wrapper {
    z-index: 1;
    display: flex;
    justify-content: center;
    background-color: #fff;
  }
}
</style>