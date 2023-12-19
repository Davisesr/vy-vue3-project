<template>
  <admin-layout>
    <template #appName>
      <router-link to="/" style="display: flex;gap: 8px;">
        <img src="../assets/logo.svg" alt="" style="width: 40px;"/>
        <div style="width: auto;color: #fff;font-size: 20px">管理后台</div>
      </router-link>
    </template>
  </admin-layout>
</template>


<script setup lang="ts">
import {AdminLayout} from "@/packages/admin"
</script>

<style scoped lang="less">

</style>