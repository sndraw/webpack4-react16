/**
 * Created by sn on 2017/2/26.
 */

const config = {
  mock: true,//mock数据模拟，设置为true自动加载并合并mock.conf.js中的mock配置，api请求指向mock数据（默认指向src/mock文件夹）
  apiUrl: "//localhost:8081",
  uploadUrl: "//localhost:8085",
  defaultImgUrl: "//localhost:8085/static/default.jpg"
}
export  default config
