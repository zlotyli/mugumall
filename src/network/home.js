// 单独对首页请求的url进行管理。使home.vue面向home.js开发
import {request} from './request'
// 1.请求轮播图数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

// 2.请求商品数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}

