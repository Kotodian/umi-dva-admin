import { Layout } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import HeaderNavigator from './components/HeaderNavigator';
import SideNavigator from './components/SideNavigator';


const { Header, Content, Sider, Footer } = Layout;

function BasicLayout(props) {
  const { children } = props;

  const logout = () => {
    props.dispatch({
      type: 'login/logout',
    });
  };

  return (
    <Layout>
      <Header className='header'>
        <div className={styles.logo} />
        <HeaderNavigator theme='dark'
                         items={
                           [
                             //
                             {
                               key: 'user', name: '个人中心', icon: <UserOutlined />, onClick: () => {

                               },
                             },
                             //
                             {
                               key: 'logout', name: '退出登录', icon: <LogoutOutlined />, onClick: () => {
                                 logout();
                               },
                             },
                           ]
                         } />
      </Header>
      <Layout>
        <Sider width={200} className={styles.siteLayoutBackground}>
          <SideNavigator
            subs={
              [
                {
                  key: 'user', name: '用户管理', icon: <UserOutlined />,
                  items: [
                    { key: 'list', name: '用户列表', icon: <UserOutlined />, link: '/user' },
                  ],
                },
              ]
            } />
        </Sider>
        <Content className={styles.siteLayoutBackground} style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default connect()(BasicLayout);
