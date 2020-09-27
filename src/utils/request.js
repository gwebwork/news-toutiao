/**
 *请求模块
 */
import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'

const request = axios.create({
    baseURL: ' http://ttapi.research.itcast.cn', //基础路径
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return jsonBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
})

//axios请求拦截器，只要是请求都会经过拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.state
    // 如果用户已登录,统一设置接口token信息
    if (user) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 这里return相当于放行请求，如果不return，请求会停在这里
    return config
}, function (error) {

    return Promise.reject(error)
})

export default request