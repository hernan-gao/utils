import axios from 'axios'


const service = axios.create({
  baseURL: '', // api
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  
})


// respone拦截器
service.interceptors.response.use(response => {
  
})



export default service
