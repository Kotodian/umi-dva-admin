import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)。',
  204: '删除数据成功。',
  400: '发出的请求有错误, 服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限 (令牌、用户名、密码错误)',
  403: '用户得到授权,但是访问是禁止的。',
  404: '发出的请求针对的是不存在的记录,服务器没有进行操作。',
  500: '服务器发生错误,请检查服务器。',
};

/*
* 异常处理程序
*/


const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常,无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};


const request = extend({
  // prefix: 'http://localhost:8090',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler,
  credentials: 'include',
});

export default request;
