import {BaseAxios} from "@/packages/core"
import config from "@/config"

class Axios extends BaseAxios {
  constructor() {
    super()
  }
}

const axios = new Axios().create({
  timeout: 30000,
  baseURL: config.gatewayUrl + '/'
})

export default axios
