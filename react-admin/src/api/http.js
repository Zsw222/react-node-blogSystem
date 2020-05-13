import axios from 'axios'
import {message} from 'antd';
const token=sessionStorage.getItem('token')
axios.defaults.baseURL = 'http://localhost:8888/'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
// // axios拦截器
axios.interceptors.request.use(config => {
    config.headers['x-access-token']=token
        // 在这里设置请求头与携带token信息
    return config
})

axios.interceptors.response.use(response => {
    console.log(response)
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.code === 200 || response.data.code === 304) {
        return response.data || response.data
    }else{
        // 非200请求抱错
        message.error(response.data.msg || '服务异常');
        // throw Error(response.data.msg || '服务异常')
    }
})
export default axios