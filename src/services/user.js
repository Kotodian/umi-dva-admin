import request from '../utils/request';


export async function userList({ page, pageSize }) {
  return request(`/users?page=${page}&limit=${pageSize}`, {
    method: 'GET',
  }).then(function(response) {
    console.log(response);
    return response;
  }).catch(function(error) {
    console.log(error);
  });
}

export async function remove(id) {
  return request(`/users/${id}`, {
    method: 'DELETE',
  }).then(function(response) {
    console.log(response);
    return response;
  }).catch(function(error) {
    console.log(error);
  });
}

export async function patch(id, values) {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
