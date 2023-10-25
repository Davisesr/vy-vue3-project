import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios'


export default class BaseAxios {

  /**
   * 用于创建 axios，并进行一些同一处理
   * @param config
   */
  create(config: AxiosRequestConfig): AxiosInstance {

    // 创建 axios 实例
    const axiosService = axios.create(
      Object.assign(
        {
          baseURL: '/api',
          timeout: config?.timeout || 15000
        },
        config
      )
    )

    // 请求开始
    axiosService.interceptors.request.use(
      (config) => {
        return this.requestUse(config)
      },
      (error) => {
        return this.requestError(error)
      }
    );


    // 请求结束
    axiosService.interceptors.response.use(
      (response) => {
        return this.responseUse(response)
      },
      (error: any) => {
        return this.responseError(error)
      }
    );

    return axiosService
  }


  /**
   * 请求前 配置请求
   * @param config
   */
  public requestUse(config: any) {
    // todo 权限问题
    const token = 'test_token'
    if (token) {
      config.headers['Authorization'] = config.headers['Authorization'] || 'Bearer ' + token
    }
    // todo 新增操作日志记录
    return config
  }

  /**
   * 请求前 发生错误
   * @param error
   */
  public requestError(error: any) {
    console.error('request', error.message)
    return Promise.reject(error)
  }

  /**
   * 请求成功后配置
   * @param response
   */
  public responseUse(response: any) {
    // todo 新增操作日志记录
    return response.data
  }

  /**
   * 结果发生错误
   * @param error
   */
  public responseError(error: any) {
    if (axios.isCancel(error)) {
      return Promise.reject()
    }
    // todo 进行失败记录
    return Promise.reject(error || '')
  }

}
