import { history } from 'umi';
import { stringify } from 'querystring';
import { accountLogin, getPageQuery } from '@/services/login';

const Model = {
  namespace: 'login',
  state: {},
  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      if (response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        redirect = redirect === 'login' ? '/' : redirect;
        history.replace(redirect || '/');
        console.log('login success');
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');

      if (window.location.pathname !== '/login') {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        console.log('logout success');
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('roles', JSON.stringify(payload.data.auth));
      console.log(`login ${payload.data.auth}`);
      return { ...state };
    },
  },
};

export default Model;
