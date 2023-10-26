import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import os from 'os';
import Components from 'unplugin-vue-components/vite'; // 按需加载自定义组件
import {ElementPlusResolver, AntDesignVueResolver} from 'unplugin-vue-components/resolvers'

// cpu核数
const threads = os?.cpus()?.length || 0
console.log('编译线程数：', threads)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需引入
    Components({
      resolvers: [
        ElementPlusResolver(), // ElementPlus按需加载
        AntDesignVueResolver({
          importStyle: false
        })// AntDesignVue 按需加载
      ]
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置前端服务地址和端口
  server: {
    host: '0.0.0.0', // host: "localhost",
    port: 6688, // 端口号
    hmr: true,
    https: false,// 是否开启 https
    //open: true,//配置自动启动浏览器
    // 设置反向代理，跨域
    proxy: {
      '/api': {
        // 后台地址（要访问的接口域名）
        target: 'http://localhost:9105',
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        //这里理解成用"/api"代替target里面的地址,比如我要调用"http://40.00.100.100:3002/user/add"，直接写"/api/user/add"即可
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
