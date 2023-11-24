
import {BaseApi} from '@/packages/core'
import axios from "@/axios";

class Api extends BaseApi {

  /**
   * 获取全部字典
   */
  list() {
    return axios.get(
      this.baseUrl + '/list'
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
  tableComment: '赛程表',

  /**
   * 路由基础地址
   * 暂时不用baseUrl
   */
  baseUrl: 'pretty_derby/v1/contest'
})