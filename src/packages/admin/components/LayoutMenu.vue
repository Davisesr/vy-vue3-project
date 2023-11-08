<template>
  <a-menu
    theme="dark"
    mode="inline"
    v-model:selectedKeys="selectedKeys">
    <a-menu-item key="1">
      <pie-chart-outlined/>
      <span>Option 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <desktop-outlined/>
      <span>Option 2</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>
        <span>
          <user-outlined/>
          <span>User</span>
        </span>
      </template>
      <a-menu-item key="3">Tom</a-menu-item>
      <a-menu-item key="4">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
            <span>
              <team-outlined/>
              <span>Team</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9">
      <file-outlined/>
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
/**
 * 时间：2023/9/12 11:18
 */
import {defineComponent} from 'vue'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons-vue";

export default defineComponent({

  components: {
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    DesktopOutlined,
    UserOutlined
  },

  data() {
    return {
      selectedKeys: ['1']
    }
  }

})
</script>

<style lang="less" scoped>

</style>
