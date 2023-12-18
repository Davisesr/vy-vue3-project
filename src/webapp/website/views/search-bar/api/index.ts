import axios from "axios";
import {message} from 'ant-design-vue';


function baiduSearch(wd?: string): Promise<{ q: any, g: any[] }> {
  if (!wd) {
    return new Promise(resolve => resolve({q: "", g: []}))
  }
  const axiosInstance = axios.create({baseURL: '/baidu'});
  return axiosInstance.get(`/sugrec?prod=pc&wd=${wd}`).then(res => {
    return res.data
  }).catch(error => {
    message.error(error).then(r => r)
    return error
  })
}

export {
  baiduSearch
}
