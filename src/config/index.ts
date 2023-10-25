const baseConfig = {
  /**
   * 网关地址
   */
  gatewayUrl: "/api",
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
