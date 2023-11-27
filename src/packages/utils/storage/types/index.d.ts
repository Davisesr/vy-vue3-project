/**
 * 创建者：杜家源
 * 时间：2023/11/25
 * 文件详情：$END$
 */

interface IGlobalConfig {
  type: 'localStorage' | 'sessionStorage', // 类型
  prefix: string, // 前缀
  expire: number, // 过期时间
  isEncrypt: boolean // 是否加密
}

interface IStorageConfig {
  value: any, //存储值
  time: number, //存储日期
  expire: number, //过期时间
}

export type {
  IGlobalConfig,
  IStorageConfig
}