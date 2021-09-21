// 封装基于axios的请求模块

import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/36a9e00e879f5ca13efb754122435c34/myblog'
  baseURL: 'http://localhost:3000'
})

// 请求拦截器中 统一设置token请求头
request.interceptors.request.use(
  (config) => {
    const token = window.localStorage.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  }
)

export default request
