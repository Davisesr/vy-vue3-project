
/**
 * 字典对象
 */
export type Dic = Record<string,DictionaryItemOptions[]>

export interface DictionaryOptions {
  /**
   * 主键
   */
  id?: string
  /**
   * 父id
   */
  pid?: string
  /**
   * 字典备注
   */
  memo?: string
  /**
   * 字典名
   */
  name: string
  /**
   * 字典数据
   */
  property: string
}


export interface DictionaryList {
  /**
   * 字典名
   */
  key: string,
  /**
   * 字典数据
   */
  data: DictionaryItemOptions[]
}

export interface DictionaryItemOptions extends Record<string, any>{
  /**
   * 字典值
   */
  value: any
  /**
   * 字典标签
   */
  label: string
  /**
   * 用于多级
   */
  children?: DictionaryItemOptions[]
}
