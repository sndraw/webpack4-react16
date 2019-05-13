/**
 * Created by sn on 2019/3/18.
 */
import Mock from 'mockjs'
import site from "./site"
import login from "./login"

Mock.mock('/admin/index','get',()=>{
  const data= site.getSiteInfo()
  console.log('mock-get-admin-index:',data)
  return data
})
Mock.mock('/admin/login','get',()=>{
  const data= login.get()
  console.log('mock-get-admin-login:',data)
  return data
})
Mock.mock('/admin/login','post',()=>{
  const data= login.post()
  console.log('mock-post-admin-login:',data)
  return data
})
Mock.mock('/admin/logout','get',()=>{
  const data= login.logout()
  console.log('mock-get-admin-logout:',data)
  return data
})
export default  Mock
