/**
 * http配置
 * Created by sn on 2019/3/18.
 */

//引入axios以及element ui中的loading和message组件
import axios from 'axios'
import {message} from 'antd'
import $constants from './../../config/constants.conf'
import routerConfig from './../../config/router.conf'

//超时时间
axios.defaults.timeout = 3600
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'

//http请求拦截器
axios.interceptors.request.use(
  config => {
    message.loading("Loading...",0)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    message.destroy()
    message.error("加载超时")
    return Promise.reject(error)
  }
)


//http响应拦截器
axios.interceptors.response.use(
  response => {
    message.destroy()
    const data = response.data;
    if (data && data.code == $constants.CODE_NOT_LOGIN) {
      //登录跳转
      if(routerConfig.type=="hash"){
        let redirect=encodeURIComponent(window.location.hash)
        window.location.href=`/#login?redirect=${redirect}`
      }else{
        let redirect=encodeURIComponent(window.location.pathname)
        window.location.href=`/login?redirect=${redirect}`
      }
      //报错处理，打断then事件，以免返回数据导致错误判定
      return Promise.reject(data)
    }else{
      if (!data || data.code !== $constants.CODE_SUCCESS) {
        message.error(data.msg? data.msg:"请求失败")
        return Promise.reject(data)
      }
    }
    return response;
  },
  error => {
    message.destroy()
    message.error("加载失败")
    return Promise.reject(error.response)
  })


export default axios
