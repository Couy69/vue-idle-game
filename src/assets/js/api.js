/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../../router';
import vue from '../../main'

export async function getAxiosInstance() {
  var baseURL, instance

  baseURL = 'http://localhost:3001/';
  
  /** 
   * 跳转登录页
   * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
   */
  const toLogin = () => {
    vue.$message('登录过期，请重新登录');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    vue.$router.push({
      name: "login"
    });
    setTimeout(() => {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
    }, 1000)
  }

  /** 
   * 请求失败后的错误统一处理 
   * @param {Number} status 请求失败的状态码
   */
  const errorHandle = (status, response) => {
    // 状态码判断
    switch (status) {
      // 401: 未登录状态，跳转登录页
      case 401:
        toLogin();
        vue.$message({
          message: response.data.message || '服务器有点问题，请稍后重试',
          type: "warning"
        });
        break;
      case 403:
        vue.$message({
          message: response.data.message || '服务器有点问题，请稍后重试',
          type: "warning"
        });
        break;
      case 404:
        vue.$message('请求的资源不存在');
        break;
      default:
        vue.$message({
          message: response.data.message || '服务器有点问题，请稍后重试',
          type: "warning"
        });
    }
  }

  // 创建axios实例 
  instance = axios.create({
    timeout: 1000 * 12 // 设置十二秒钟的请求超时限制
    // transformRequest: data => qs.stringify(data)
  });
  if (process.env.NODE_ENV == 'development') {
    //开发环境
    instance.defaults.baseURL = baseURL;
  } else if (process.env.NODE_ENV == 'debug') {
    //debug
    instance.defaults.baseURL = baseURL;
  } else if (process.env.NODE_ENV == 'production') {
    //生产环境
    instance.defaults.baseURL = baseURL;
  }
  // 设置post请求头
  instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

  // 响应拦截器
  instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
      const {
        response
      } = error;
      if (response) {
        // 请求已发出，但是不在2xx的范围 
        errorHandle(response.status, response);

        return Promise.reject(response);
      } else {
        //网络连接问题
        vue.$message({
          message: '网络连接有问题',
          type: "warning"
        });
        console.log('请求失败')
      }
    });

  return instance
}