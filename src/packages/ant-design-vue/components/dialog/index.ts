/**
 * 创建者：杜家源
 * 时间：2023/9/16
 * 文件详情：$END$
 */
import {createApp, h} from 'vue';
import {ConfigProvider, Drawer, Modal} from 'ant-design-vue';
import type {Component} from 'vue';
import type {DrawerProps} from 'ant-design-vue';
import type {ModalFuncProps} from 'ant-design-vue/es/modal';
import type {DialogComponentOptions} from "../../types/dialog.d";
import {useAntDStore} from "../../store";

function dialog(
  component: Component,
  componentProps: DialogComponentOptions,
  modalOrDrawerOptions?: DrawerProps | ModalFuncProps | boolean,
  isDrawer = false
) {

  // 准备挂在对象
  const divElement = document.createElement('div');
  document.body.appendChild(divElement)

  //有滚动条才加
  if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
    document.body.classList.add('body-hidden')
  }

  // 弹窗或抽屉组件 的 一些基础配置
  modalOrDrawerOptions = Object.assign({
    title: isDrawer ? '抽屉' : '弹窗',
    width: 700,
    maskClosable: false,
    drawerStyle: {
      paddingBottom: '53px'
    },
    bodyStyle: {
      padding: isDrawer ? undefined : '24px 0 0 0'
    },
    footer: null
  }, modalOrDrawerOptions || {});

  // 弹窗的拖拽属性名
  const dragClassName = 'drag-' + Number(Date.now()).toString(36)

  // 创建渲染对象
  const dialogInstance = createApp({
    data() {
      return {
        open: true // 弹窗抽屉的开关
      };
    },

    watch: {
      // 监听路由变化，就关闭（若未引入路由此监听不要）
      '$route.path'() {
        this.handleClose();
      }
    },

    methods: {
      /**
       * 弹窗或抽屉触发【ok（提交）】操作，通过 handleSubmit 影响 component 组件
       * @param e 弹窗或抽屉给与的参数，交由 component 处理
       */
      handleOk(e: any) {
        if (typeof this.$refs?.component?.handleSubmit === 'function') {
          this.$refs.component.handleSubmit(e);
        } else {
          console.log('组件中未写handleSubmit方法');
          this.$refs?.component?.$emit('close');
        }
      },

      /**
       * 弹窗或抽屉触发【close（关闭）】操作，通过 handleSubmit 影响 component 组件
       */
      handleClose() {
        this.$refs?.component?.$emit('close');
      },

      /**
       * component 触发 【destroy（销毁）】操作
       */
      handleDestroy() {
        // 关闭弹窗抽屉
        this.open = false;
        // 销毁节点
        setTimeout(() => {
          dialogInstance.unmount();
          document.body.removeChild(divElement)

          if (document.getElementsByClassName('vy-dialog').length === 0) {
            document.body.classList.remove('body-hidden')
          }

        }, 200);
      }
    },

    render(vm: any) {

      //注入上下文
      // vm.$.appContext = appContext;

      // 1、外部传入组件的渲染准备
      const componentRender = h(
        component,
        {
          ...componentProps,
          ok: undefined,
          close: undefined,
          ref: 'component',
          onOk: (values: any, arg1: any, arg2: any) => {
            if (typeof componentProps?.ok === 'function') {
              componentProps.ok(values, arg1, arg2);
            }
            this.handleDestroy()
          },
          onClose: (values: any, arg1: any, arg2: any) => {
            if (typeof componentProps?.close === 'function') {
              componentProps.close(values, arg1, arg2);
            }
            this.handleDestroy()
          }
        }
      );

      // 2、准备弹窗或抽屉组件的渲染准备
      const DialogRender = h(
        isDrawer ? Drawer : Modal,
        {
          // @ts-ignore
          ...modalOrDrawerOptions,
          ref: 'root',
          class: 'vy-dialog ' + dragClassName,
          open: this.open,
          onOk: (e: any) => {
            this.handleOk(e);
          },
          onCancel: () => {
            this.handleClose();
          },
          onClose: () => {
            this.handleClose();
          }
        },
        {
          default: () => [componentRender]
        }
      )

      // 3、返回需要渲染的组件（再套上层语言国际化处理）
      return h(
        ConfigProvider,
        {
          locale: useAntDStore().locale
        },
        {
          default: () => [DialogRender]
        }
      )
    }
  });

  dialogInstance.mount(divElement);
}

export {
  dialog
}
