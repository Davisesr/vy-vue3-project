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
import {SearchBar} from "../views/search-bar"
import {ContentBar} from "../views/content-bar"
import {FooterBar} from "../views/footer-bar"

</script>

<style scoped lang="less">
.main-wrapper {
  min-height: 100vh;

  .header-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 2px #0000000d;

    z-index: 5;
    position: sticky;
    top: 0;
  }

  .content-wrapper {
    padding: 16px;
    display: flex;
    justify-content: center;
    z-index: 1;
  }

  .footer-wrapper {
    z-index: 1;
    display: flex;
    justify-content: center;
    background-color: #fff;
  }
}
</style>