import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url   
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor

//拦截器 axios 默认多加了一层data  data{data：[]}


service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
//响应拦截  axios 默认多加了一层data  data{data：'8888-558989'}
service.interceptors.response.use(
    
  response => {
    const {success,message,data} = response.data
    if(success){
          return data
    } else {
          Message.error(message)
          return Promise.reject(new Error(message))
    }
 },
  error => {
    Message.error(message)
    return Promise.reject(error)
  }
)

export default service
