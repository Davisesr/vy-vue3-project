/**
 * 基础配置（常改动）
 */
const baseConfig = {
  /**
   * 网关地址
   */
  gatewayUrl: "/api",

  /**
   * minio
   */
  fileHostUrl: "http://121.5.138.130:9001/",

  /**
   * minio 桶
   */
  bucKetName: "website",
};

/**
 * 项目全局配置
 */
const config = Object.assign(
    // 不常变动的配置
    {

    },

    // 常变动的配置
    baseConfig
);

export default config;
