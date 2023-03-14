import axios from 'axios'
import qs from "qs"

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
  // 取得目前使用者資訊
  getCurrentUser(){
    return apiClient.get('/me', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  // 取得課程資訊
  getCourse(){
    return apiClient.get('/courses?type=arrival')
  },
  // 購物車
  // 加入購物車
  addToCart(courseData){
    return apiClient.post(`/carts`, courseData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      }) 
  },
  // 移出購物車
  removeFromCart(data){
    return apiClient.delete(`/carts?${qs.stringify(data)}`,  {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
}
