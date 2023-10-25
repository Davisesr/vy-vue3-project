import axios from "@/axios";
import {BaseApi} from '@/prod/core'

class Api extends BaseApi {
  uploadFile(data: any) {
    return axios.post(
      this.baseUrl + "/upload-file",
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data' // 设置请求头以指示发送 FormData 数据
        }
      }
    )
  }
}

export default new Api({
  /**
   * 主键名
   */
  idField: 'id',

  /**
   * 数据表标题字段
   * 注：数据埋点数据标题，搜索显示标题，删除数据提示的用的字段
   * 如：myTitle
   */
  titleField: 'name',

  /**
   * 接口名称
   * 注：一定要与数据表备注一样，用于数据埋点显示的操作对象
   * 如：用户
   */
  tableComment: '文件系统',

  /**
   * 路由基础地址
   * 暂时不用baseUrl
   */
  baseUrl: '/file/v1/minio'
})
