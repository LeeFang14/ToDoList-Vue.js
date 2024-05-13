import axios from 'axios'

const apiUrl = import.meta.env.VITE_APP_API_URL
const apiKey = import.meta.env.VITE_APP_API_KEY

export const API = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

API.interceptors.request.use(
  (config) => {
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        //可以在這裡針對不同 status code 做處理
        case 401:
          alert('token 無效')
          console.log(error.message)
          break
        case 404:
          alert('頁面不存在')
          console.log(error.message)
          break
        case 500:
          alert('程式發生問題')
          console.log(error.message)
          break
        default:
          alert('程式發生問題')
          console.log(error.message)
      }
    }
    if (!window.navigator.onLine) {
      alert('請重新連線後重整網頁')
      return
    }
    return Promise.reject(error)
  }
)
