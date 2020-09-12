import axios from 'axios';
// 第四种导出方式-----利用promise方式
export function request(config){
  // 1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:5000
  })

  // 2.axios局部实例的拦截器
  // 2.1拦截请求（包括请求成功和请求失败的拦截）
  // 该use方法中为两个函数作为参数，第一个函数为请求成功时的回调，参数为config。第二个函数为请求s失败时的回调，参数为error
  instance.interceptors.request.use(config=>{
    // console.log(config);

    // 需要return该请求的信息，否则请求的信息被拦截后，内部发送请求但无法获取请求的内容
    return config;
  },err=>{
    console.log(err);
  })

  // 2.2拦截响应（包括响应成功和响应失败的拦截）
  // 此处的res为服务器响应的结果
  instance.interceptors.response.use(res=>{
    // console.log(res);
    // 拦截响应后需要返回响应，不然在其他地方获取不到响应的结果，该结果为res.data;
    return res.data;
  },err=>{
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)//该返回类型本身就是promise类型
}
