import request from '../utils/request';


export async function userList() {
  return request('/users', {
    method: 'GET',
  }).then(function(response) {
    console.log(response);
    return response;
  }).catch(function(error) {
    console.log(error);
  });
}
