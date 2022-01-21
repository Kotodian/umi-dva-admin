import { userList } from '@/services/user';

const Model = {
  namespace: 'users',
  state: {},
  effects: {
    * list({ payload }, { call, put }) {
      const response = yield call(userList);

      if (response.code === 200) {
        const { data } = response;
        yield put({
            type: 'changeUserList',
            payload: {
              list: data.users,
            },
          },
        );
      }
      console.log('get user list success');
    },
  },
  reducers: {
    changeUserList(state, { payload: { list } }) {
      return { ...state, list };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user') {
          dispatch({ type: 'list' });
        }
      });
    },
  },
};

export default Model;
