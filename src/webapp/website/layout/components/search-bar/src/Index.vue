<template>
  <div class="search-wrapper">
    <a-input allowClear v-model:value="keyword" @focus="onFocusOrBlur(true)" @blur="onFocusOrBlur(false)">
      <template #prefix>
        <img :src="BaiDuIcon" alt="" style="height: 24px;width: 24px;">
      </template>
    </a-input>
    <transition name="fade">
      <div v-if="searchResult.length > 0 && isInputFocus" class="list-box-wrapper">
        <div v-for="(v,i) in searchResult" :key="i">
          <a @click="openBaidu(v.q)" class="a-text-wrapper">{{ v.q }}</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue"
import {baiduSearch} from "../api/index"
import BaiDuIcon from "@/webapp/website/assets/baidu.svg"

const keyword = ref("")
const searchResult = ref<any[]>([])
const isInputFocus = ref(false)

watch(
  keyword,
  (value) => {
    baiduSearch(value).then(res => {
      searchResult.value = res.g
    })
  },
  {
    deep: true
  }
);

function openBaidu(keyword: string) {
  window.open(`https://www.baidu.com/s?ie=utf-8&wd=${keyword}`)
}

function onFocusOrBlur(e: boolean) {
  isInputFocus.value = e
}

</script>


<style scoped lang="less">
.search-wrapper {
  position: relative;
  box-shadow: 0 1px 2px #0000000d;
  width: 700px;
  height: 44px;

  :deep(.ant-input-affix-wrapper) {
    height: 100%;
  }

  .list-box-wrapper {
    width: calc(100% - 72px);
    height: auto;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 10px;

    padding: 16px;

    position: absolute;
    top: 50px;
    left: 40px;

    .a-text-wrapper {
      color: #000;
    }

    .a-text-wrapper:hover {
      color: blue;
      cursor: pointer;
    }
  }

  // （动画开始和移除的过度状态）
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s;
  }

  //（动画完成后，移除前）
  .fade-leave-from,
  .fade-enter-to {
    opacity: 1;
  }

  //（动画开始前，移除后）
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
