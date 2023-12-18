<template>
  <div class="body-content-wrapper">
    <div class="main-content-wrapper" ref="contentRef">
      <div class="content-wrapper">
        <a-card v-for="(v,i) in anchorList" :key="i" :id="v.href?.replace('#','')" :class="(elementId === v.href) ? 'selected' :''">
          <template #title>
            {{ v.title }}
          </template>
          <template #default>
            id：{{ v.href?.replace('#', '') }}
          </template>
        </a-card>
      </div>
    </div>
    <div class="anchor-wrapper">
      <a-anchor :affix="false" :getContainer="()=>$refs.contentRef" :items="anchorList" @change="onAnchorChange"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineProps, defineEmits, computed} from 'vue';
import type {PropType} from 'vue';

// props
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
// emits
const emit = defineEmits(['change'])


// 初始化获取可视窗口宽度
const viewportWidth = ref(window.innerWidth || document.documentElement.clientWidth)
// 动态获取可视窗口的宽度
window.addEventListener('resize', () => (viewportWidth.value = (window.innerWidth || document.documentElement.clientWidth)))
// 根据可视窗口宽度处理【锚点组件】显示状态
const anchorDisplay = computed(() => (props.anchorList.length > 0 && viewportWidth.value < 1350) ? 'none' : '')

// 锚选中
const elementId = ref("")

/**
 * 锚定选中
 * @param eId
 */
function onAnchorChange(eId: string) {
  elementId.value = eId
  emit('change', eId)
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
    padding: 0 8px;
    display: flex;
    justify-content: center;
    overflow: auto;

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
    right: 16px;
    width: 100px;
    display: v-bind(anchorDisplay);
  }

  .selected {
    border: 1px solid #1677FF;
  }
}
</style>