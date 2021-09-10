// 封装基于axios的请求模块

import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  baseURL: ''
})

export default request
