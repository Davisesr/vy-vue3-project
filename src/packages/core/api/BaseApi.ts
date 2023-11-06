
export default class BaseApi {

  /**
   * ID字段
   * 默认id
   */
  idField = 'id'
  /**
   * 数据表标题字段
   * 注：数据埋点数据标题，搜索显示标题，删除数据提示的用的字段
   * 如：myTitle
   */
  titleField = ''
  /**
   * 表注释
   * 一定要与数据表备注一样，用于数据埋点显示的操作对象
   * 如：用户
   */
  tableComment = ''
  /**
   * 路由基础地址
   * 如：uaa/v1/node/list
   */
  baseUrl = ''

  constructor(options: any) {
    Object.assign(this, options)
  }

}
