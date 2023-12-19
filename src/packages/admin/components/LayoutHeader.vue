<template>
  <div class="header-wrapper">
    <div>
      <slot name="appName"/>
    </div>
    <div>
      <slot name="headerExtra"/>
    </div>
    <div>
      <slot name="accountLeft"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.header-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
</style>
