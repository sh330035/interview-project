import axios from 'axios'

// 設定 API 的基本網址
const apiClient = axios.create({
  baseURL: 'https://api.hiskio.com/v2',
  headers: {
    'Accept': 'application/json, */*',
    'Content-Type': 'application/json'
  }
})

const getToken = () => localStorage.getItem('token')

export default {
  // 登入 API 的路由
  login (credentials) {
    return apiClient.post('/auth/login', credentials)
  },
  // 其他 API 路由
  getCurrentUser(){
    return apiClient.get('/me', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  
}
