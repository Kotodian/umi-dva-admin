import { Space, Table } from 'antd';
import { connect } from 'umi';
import React from 'react';


function Users({ dispatch, users: dataSource }) {
  console.log(dataSource);
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
    />
  );
}

function mapStateToProps(state) {
  const { users } = state;
  console.log('mapStateToProps', users);
  return {
    users: users.list,
  };
}

export default connect(mapStateToProps)(Users);
