<template>
  <a-layout style="height: 100vh;width: 100vw">
    <a-layout-header style="height: 65px;width: 100%;">
      <layout-header>
        <template #appName v-if="$slots.appName">
          <slot name="appName"/>
        </template>
        <template #headerExtra v-if="$slots.headerExtra">
          <slot name="headerExtra"/>
        </template>
        <template #accountLeft v-if="$slots.accountLeft">
          <slot name="accountLeft"/>
        </template>
      </layout-header>
    </a-layout-header>
    <a-layout style="height: calc(100% - 65px);width: 100%">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <layout-menu/>
      </a-layout-sider>
      <a-layout style="height: 100%;">
        <a-layout-content style="margin: 16px;height: 100%;">
          <layout-breadcrumb style="height: 30px;"/>
          <div style="padding: 0; height: calc(100% - 30px)">
            <router-view/>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center;padding: 16px">
          <layout-footer/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {ref} from "vue"

import LayoutBreadcrumb from "../components/LayoutBreadcrumb.vue"
import LayoutHeader from "../components/LayoutHeader.vue"
import LayoutMenu from "../components/LayoutMenu.vue"
import LayoutFooter from "../components/LayoutFooter.vue"

let collapsed = ref<boolean>(false)

</script>
<style scoped>


</style>
