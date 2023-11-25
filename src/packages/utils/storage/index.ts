import {encrypt, decrypt} from './encrypt/index';
import type {IGlobalConfig, IStorageConfig} from './types/index.d';

/**
 * 本地存储二次封装（含加密、解密、过期处理）
 *
 * @example <br/>
 * const storageUtils = new StorageUtils()
 * 或
 * const storageUtils = new StorageUtils({
 *     type: 'sessionStorage', //存储类型，localStorage | sessionStorage
 *     prefix: 'ui_0.0.1', //版本号
 *     expire: 60, //过期时间，默认为一天，单位为分钟
 *     isEncrypt: true, //支持加密、解密数据处理
 * });
 *
 * storageUtils.getAllStorage()
 */
class StorageUtils {

  // 默认配置
  config: IGlobalConfig = {
    type: 'localStorage', //存储类型，localStorage | sessionStorage
    prefix: 'react-view-ui_0.0.1', //版本号
    expire: 24 * 60, //过期时间，默认为一天，单位为分钟
    isEncrypt: true, //支持加密、解密数据处理
  }

  /**
   * 构造函数
   * @param defineConfig
   */
  constructor(defineConfig?: object) {
    if (defineConfig) {
      Object.assign(this.config, defineConfig)
    }
  }

  /**
   * 存储值
   * @param key 关键字
   * @param value 值
   * @param expire 过期时间（默认一天）
   * @return boolean 存储成功返回 true
   */
  setStorage(key: string, value: any, expire: number = 24 * 60): boolean {
    // 1、空值重置
    if (value === '' || value === null || value === undefined) {
      value = null;
    }

    // 2、过期时间值合理性判断
    if (isNaN(expire) || expire < 0) {
      throw new Error('过期时间必须是数字（Expire must be a number）');
    }

    // 3、获取当前时间
    const currentTime = Date.now();

    // 4、组装数据
    const storageVal: IStorageConfig = {
      value: value, //存储值
      time: currentTime, //存储日期
      expire: currentTime + 1000 * 60 * expire, //过期时间
    };

    //5、封装数据：是否需要加密，判断装载加密数据或原数据
    window[this.config.type].setItem(
      this.autoAddPreFix(key),
      this.config.isEncrypt ? encrypt(JSON.stringify(storageVal)) : JSON.stringify(storageVal)
    );

    return true;
  }

  /**
   * 根据 key 获取 value，
   * @param key 关键值
   * @return any|null <br/> 当key不存在或过期，则返回null
   */
  getStorageFromKey(key: string) {

    // 1、自动补全前缀
    if (this.config.prefix && key.indexOf(this.config.prefix) === -1) {
      key = this.autoAddPreFix(key);
    }

    // 2、不存在判断
    if (!window[this.config.type].getItem(key)) {
      return null;
    }

    // 3、获取缓存的数据
    const data: string = window[this.config.type].getItem(key) || '';

    // 4、判断是否需要解密
    const storageVal: IStorageConfig = this.config.isEncrypt ? JSON.parse(decrypt(data)) : JSON.parse(data);

    // 5、判断是否过期
    const now = Date.now();
    if (now >= storageVal.expire) {
      // 过期销毁
      this.removeStorageFromKey(key);
      // 返回空值
      return null;
    } else {
      // 不过期，回值
      return storageVal.value;
    }
  }

  /**
   * 获取所有存储值
   * @return any 所有存储的storage对象
   */
  getAllStorage(): any {
    // 1、声明
    const storageList: any = {};

    // 2、获取所有缓存的key
    const keys = Object.keys(window[this.config.type]);

    // 3、循环筛选
    keys.forEach((key) => {
      const value = this.getStorageFromKey(key);
      // 如果值没有过期，加入到列表中
      if (value !== null) {
        storageList[key] = value;
      }
    });

    // 返回
    return storageList;
  }

  /**
   * 获取存储值数量
   * @return number 存储值数量
   */
  getStorageLength(): number {
    //获取值列表长度
    return window[this.config.type]?.length || 0;
  }

  /**
   * 根据key删除存储值
   * @param key 键
   */
  removeStorageFromKey(key: string) {
    //删除值
    if (this.config.prefix) {
      key = this.autoAddPreFix(key);
    }
    window[this.config.type].removeItem(key);
  }

  /**
   * 清空存储列表
   */
  clearStorage(){
    window[this.config.type].clear();
  }

  /**
   * 添加前缀，保持浏览器Application视图唯一性
   * @param key 键
   * @return string 补全后的key
   */
  autoAddPreFix(key: string) {
    const prefix = this.config.prefix || '';
    return `${prefix}_${key}`;
  }
}

export {
  StorageUtils,
  encrypt,
  decrypt
}

