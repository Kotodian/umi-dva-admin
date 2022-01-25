export default {
  'POST /auth/login': { id: 1, code: 200, data: { token: 'abcd', auth: [{ 'role': 'ROLE_ADMIN' }] } },
  '/auth/captcha': { result: true },
  'GET /users': (req, res) => {
    const { query } = req;
    let data = {
      code: 200,
      data: {
        total: 1,
        users: [
          { id: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
        ],
      },
    };
    res.status(200).json(data);
  },
  'GET /users/:id': (req, res) => {

  },
  'POST /users': { code: 200, data: { id: 2 } },
};
