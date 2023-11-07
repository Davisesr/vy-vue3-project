import {BaseAxios} from "@/packages/core"
import config from "@/config"

class Axios extends BaseAxios {

  constructor() {
    super()
  }
}

const axios = new Axios().create({
  // 设置超时时间
  timeout: 30000,
  // 加入网关
  baseURL: config.gatewayUrl + '/'
})

export default axios
