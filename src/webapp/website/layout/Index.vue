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

import {
  StorageUtils
} from "@/packages/utils/storage"


const storageUtils = new StorageUtils();

const bool:boolean = storageUtils.setStorage(
  "dome",
  "11111111111"
);

let storageFromKey = storageUtils.getStorageFromKey('dome');
console.log(storageFromKey)

</script>

<style scoped lang="less">
.main-wrapper {
  height: 100vh;
  width: 100vw;

  .header-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 2px #0000000d;
    z-index: 5;
    position: sticky;
    top: 0;
  }

  .content-wrapper {
    padding: 0 8px;
    margin: 8px 0;
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