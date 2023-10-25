<template>
  <div class="clearfix">
    <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove">
      <a-button :loading="uploading">
        <upload-outlined></upload-outlined>
        选择文件
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {UploadOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';

import FileApi from "../api"

const fileList = ref<any[]>([]);
const uploading = ref<boolean>(false);

/**
 * 删除文件
 * @param file
 */
function handleRemove(file: any) {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
}

/**
 * 文件上传前调用
 * @param file
 */
function beforeUpload(file: any) {
  // 文件处理
  fileList.value = [...(fileList.value || []), file];

  // 手动上传
  handleUpload()

  // 开启手动上传
  return false;
}

/**
 * 手动上传文件
 */
function handleUpload() {
  const formData = new FormData();
  formData.append('file', fileList.value[0]);
  uploading.value = true;
  FileApi.uploadFile(formData).then(() => {
    fileList.value = [];
    uploading.value = false;
    message.success('upload successfully.');
  }).catch(() => {
    uploading.value = false;
    message.error('upload failed.');
  });
}
</script>

