<template>
  <div class="body-content-wrapper" id="content">
    <div class="main-content-wrapper">
      <div class="content-wrapper">
        <a-card v-for="(v,i) in anchorList" :key="i" :id="'part-' + i">
          {{ v.title }}
        </a-card>
      </div>
    </div>
    <div class="anchor-wrapper">
      <a-anchor :items="anchorList" :getContainer="anchorContainer"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';

const anchorList = computed(() => {
  const asd: any[] = []
  for (let i = 0; i < 20; i++) {
    asd.push({
      key: i,
      title: '标题-' + i,
      href: '#part-' + i,
    })
  }
  return asd
})

// 获取可视区域的宽度
const viewportWidth = ref(window.innerWidth || document.documentElement.clientWidth)
window.addEventListener('resize', () => ( viewportWidth.value = window.innerWidth || document.documentElement.clientWidth ))

// 锚点显示状态
const anchorDisplay = computed(() => ((viewportWidth.value < 1350) ? 'none' : ''))

// 自定义锚点容器
const anchorContainer = () => document.getElementById('content')

</script>

<style scoped lang="less">
.body-content-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .main-content-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .content-wrapper {
      width: 1080px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  .anchor-wrapper {
    position: fixed;
    top: 100px;
    right: 8px;
    width: 100px;
    display: v-bind(anchorDisplay);
  }
}
</style>