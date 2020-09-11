// 单独对首页请求的url进行管理。使home.vue面向home.js开发
import {request} from './request'
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
