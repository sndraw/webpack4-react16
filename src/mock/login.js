/**
 * Created by sn on 2019/3/18.
 */
const login = {
  get: () => {
    return {
      code: 200,
      data: {status: 40001},
      msg: "账号尚未登录",
      time:new Date().getTime()
    }
  },
  post: () => {
    return {
      code: 200,
      data: [],
      msg: "请求成功",
      time: new Date().getTime()
    }
  },
  logout: () => {
    return {
      code: 200,
      data: [],
      msg: "请求成功",
      time: new Date().getTime()
    }
  }
}

export  default login
