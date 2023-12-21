<template>
  <div class="router-view-page-wrapper">
    <a-breadcrumb class="breadcrumbs-wrapper">
      <EnvironmentOutlined/>
      当前位置：
      <a-breadcrumb-item v-for="(breadcrumb,index) in breadcrumbs" :key="index">
        <router-link :to="breadcrumb.path">{{ breadcrumb.name }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="router-view-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 时间：2023/9/12 11:27
 */
import {ref, watch} from 'vue'
import router from "@/router"
import {EnvironmentOutlined} from "@ant-design/icons-vue"

//声明 面包屑数组
const breadcrumbs = ref<any[]>([]);

/**
 * 监听 Router中的path路径变化
 * @type {Router}
 */
const routerObject = router.currentRoute;

watch(
  //1、监听的对象
  () => routerObject.value.path,
  //2、变化时执行的方法
  () => {
    //判断面包屑是否隐藏
    const meta = routerObject.value.meta;
    if (!meta["hideCrumbs"]) {
      const matched = routerObject.value.matched;
      //置空数组
      breadcrumbs.value.length = 0;
      //重新加载数据
      matched.forEach((item) => {
        breadcrumbs.value.push({
          name: item.meta?.title || item?.name || '',
          path: item.path,
        });
      });
    }
  },
  //3、其他配置
  {
    immediate: true, //加载时执行一次
    deep: true, // 深度监听
  }
);
</script>

<style lang="less" scoped>
.router-view-page-wrapper {
  height: 100%;
  width: 100%;
  padding: 0 16px 16px 16px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  .breadcrumbs-wrapper {
    display: flex;
    align-items: center;
    padding-top: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid #eee
  }

  .router-view-wrapper {
    height: calc(100% - 38px);
    width: 100%;
    overflow: auto;
  }
}
</style>
