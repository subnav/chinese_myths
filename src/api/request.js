import axios from 'axios'
import Vue from 'vue'

import Qs from 'qs'

// 创建axios
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://172.17.211.49:5656' : 'http://43.138.211.99:5656',
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
// axios.defaults.baseURL = "http://172.17.211.49:5656";
// axios.defaults.timeout = 5000;

// post请求头
service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 为请求头对象添加token验证
    if (config.url.indexOf('http') !== -1) {
      config.baseURL = ''
    }
    if (localStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    return Promise.reject(error, 1)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    console.log('服务器响应成功')
    if (res.status === 200) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res)
  },
  (error) => {
    console.log('服务器响应错误')
    console.log(error)
    if (error.response.data.error === 'Authentication Error') {
      console.log(1);
      return Vue.prototype.$message.error('Token验证失败')
    }
  }
)

// get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// post方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, Qs.stringify(params))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
