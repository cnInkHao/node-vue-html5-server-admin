import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
  // Bearer token类型
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(res => {
return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  return Promise.reject(err)
})

export default http