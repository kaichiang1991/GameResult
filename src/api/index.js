import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: store.getters.apiURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    store.commit('SET_LOADING', true);
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    store.commit('SET_LOADING', false);
    return res
  },
  error => {
    if (error.response) {
      //...
    }
    store.commit('SET_LOADING', false);
    return Promise.reject(error)
  }
)

export default service
