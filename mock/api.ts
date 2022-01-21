export default {
  'POST /auth/login': { id: 1, code: 200, data: { token: 'abcd', auth: [{ 'role': 'ROLE_ADMIN' }] } },
  '/auth/captcha': { result: true },
  'GET /users': {
    code: 200,
    data: {
      users: [
        { id: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
      ],
    },
  },
};
