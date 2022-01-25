import * as userService from '@/services/user';

const Model = {
  namespace: 'users',
  state: {},
  effects: {
    * list({ payload: { page = 1, pageSize = 10 } }, { call, put }) {
      const response = yield call(userService.list, { page, pageSize });

      if (response.code === 200) {
        const { data } = response;
        yield put({
            type: 'changeUserList',
            payload: {
              list: data.users,
              total: data.total,
              page: parseInt(page, 10),
              pageSize: parseInt(pageSize, 10),
            },
          },
        );
      }
      console.log('get user list success');
    },
    * create({ payload: values }, { call, put, select }) {
      yield call(userService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'list', payload: { page } });
    },
  },
  reducers: {
    changeUserList(state, { payload: { list, total, page, pageSize } }) {
      return { ...state, list, total, page, pageSize };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user') {
          dispatch({ type: 'list', payload: query });
        }
      });
    },
  },
};

export default Model;
