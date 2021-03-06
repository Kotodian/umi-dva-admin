import { Button, Pagination, Popconfirm, Table } from 'antd';
import { routerRedux } from 'dva/router';
import React from 'react';
import { connect } from 'umi';
import UserEditForm from './Form';

const { Column, ColumnGroup } = Table;

function Users({
  dispatch,
  users: dataSource,
  total,
  pageSize,
  loading,
  page: current,
}) {
  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/user',
        query: { page },
      }),
    );
  }

  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'create',
      payload: values,
    });
  }

  return (
    <div>
      <div>
        <UserEditForm record={{}} onOk={createHandler}>
          <Button type="primary">创建用户</Button>
        </UserEditForm>
      </div>
      <Table
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      >
        <Column
          title="用户名"
          dataIndex="name"
          key="name"
          render={text => <a>{text}</a>}
        />
        <Column title="年龄" dataIndex="age" key="age" />
        <Column title="住址" dataIndex="address" key="address" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <span>
              <UserEditForm
                record={record}
                onOk={editHandler.bind(null, record.id)}
              >
                <a>更新 </a>
              </UserEditForm>
              <Popconfirm
                title="Confirm to delete?"
                onConfirm={deleteHandler.bind(null, record.id)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <Pagination
        className="ant-table-pagination"
        loading={loading}
        total={total}
        defaultCurrent={1}
        current={current}
        onChange={pageChangeHandler}
        showTotal={total => `总共 ${total} 用户`}
        showSizeChanger
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, pageSize } = state.users;
  return {
    users: list,
    total: total,
    page: page,
    pageSize: pageSize,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);
