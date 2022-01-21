import { Menu } from 'antd';
import React from 'react';
import styles from './index.less';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'umi';

const { SubMenu } = Menu;

function SideNavigator(props) {
  const { subs } = props;
  return (
    <Menu
      mode='inline'
      className={styles.navigator}
      defaultOpenKeys={['index']}
    >
      <Menu.Item key='index' icon={<HomeOutlined />}>
        <Link to='/index'>
          首页
        </Link>
      </Menu.Item>
      {
        subs.map((item) => (
          <SubMenu key={item.key} icon={item.icon} title={item.name}>
            {
              item.items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}><Link to={item.link}>{item.name}</Link></Menu.Item>
              ))
            }
          </SubMenu>
        ))
      }
    < /Menu>
  );
}

export default SideNavigator;
