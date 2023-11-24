<template>
  <div class="body-content-wrapper" id="content">
    <div class="main-content-wrapper">
      <div class="content-wrapper">
        <a-card v-for="(v,i) in anchorList" :key="i" :id="v.href.replace('#','')" :class="(elementId === v.href) ? 'selected' :''">
          {{ v.title }}
        </a-card>
      </div>
    </div>
    <div class="anchor-wrapper">
      <a-anchor
        :items="anchorList"
        :getContainer="anchorContainer"
        @change="onAnchorChange"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineProps, computed} from 'vue';
import type {PropType} from 'vue';

const props = defineProps({
  anchorList: {
    type: Array as PropType<any[]>,
    default: () => {
      const asd: any[] = []
      for (let i = 0; i < 20; i++) {
        asd.push({
          key: i,
          title: '标题-' + i,
          href: '#part-' + i,
        })
      }
      return asd
    }
  }
})

// 获取可视区域的宽度
const viewportWidth = ref(window.innerWidth || document.documentElement.clientWidth)
window.addEventListener('resize', () => (viewportWidth.value = window.innerWidth || document.documentElement.clientWidth))

// 锚 选中
const elementId = ref()
// 自定义锚点容器
const anchorContainer = () => document.getElementById('content')
// 锚点显示状态
const anchorDisplay = computed(() => (props.anchorList.length > 0 && viewportWidth.value < 600) ? 'none' : '')

/**
 * 锚定选中
 * @param eId
 */
function onAnchorChange(eId: string) {
  elementId.value = eId
}

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

.selected {
  border: 1px solid #1677FF;
}
</style>