/**
 * api
 */
export interface BaseApiOptions {
    /**
     * ID字段
     * 默认id
     */
    idField?: string
    /**
     * 数据表标题字段
     * 注：数据埋点数据标题，搜索显示标题，删除数据提示的用的字段
     * 如：myTitle
     */
    titleField: string
    /**
     * 接口名称
     * 注：一定要与数据表备注一样，用于数据埋点显示的操作对象
     * 如：用户
     */
    tableComment: string
    /**
     * 路由基础地址
     * 如：uaa/v1/node/list
     */
    baseUrl: string
}

export interface IBaseApi<T> extends BaseApiOptions {
    /**
     * ID字段
     * 默认id
     */
    idField: string

    /**
     * 分页数据
     * 防止重复请求用法 api.cancel('key').page()
     * @param pageParams
     */
    page(pageParams: BaseApiPageOptions): Promise<PageDTO<T>>

    /**
     * 通过ID获取某条数据
     * @param id
     */
    getById(id: string): Promise<T>

    /**
     * 通过ID删除某条数据
     * @param id
     */
    removeById(id: string | string[]): Promise<T>

    /**
     * 添加或者修改数据
     * @param data
     * @param id
     */
    saveOrUpdate(data, id): Promise<T>
}

/**
 * 分页结果
 */
export interface PageDTO<T> {
    /**
     * 当前页码 默认1
     */
    current: number,
    /**
     * 总条数
     */
    total: number,
    /**
     * 分页数量
     */
    pages: number,
    /**
     * 页大小 默认20,最大1000
     */
    size: number,
    /**
     * 数据
     */
    records: T[]
}

/**
 * 分页参数
 */
export interface BaseApiPageOptions {
    /**
     * 当前页码 默认1
     */
    current?: number

    /**
     * 页大小 默认20,最大1000
     */
    size?: number
}

/**
 * 基础字段
 */
export interface BaseDTO {
    /**
     * ID
     */
    id: string
    /**
     * 创建时间
     */
    gmtCreate: string
    /**
     * 最后修改时间
     */
    gmtModified: string
    /**
     * 创建用户ID
     */
    createdUserId: string
    /**
     * 最后修改用户ID
     */
    lastModifiedUserId: string
}