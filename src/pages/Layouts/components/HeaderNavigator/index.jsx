import { Menu } from 'antd';
import React from 'react';
import styles from './index.less';


function HeaderNavigator(props) {
  const { theme, items } = props;

  return (
    <Menu
      theme={theme}
      mode='horizontal'
      className={styles.HeaderNavigator}
    >
      {
        items.map(item => {
          return (
            <Menu.Item key={item.key} icon={item.icon}
                       style={{ fontSize: '14px' }} onClick={item.onClick}>{item.name}</Menu.Item>
          );
        })
      }
    </Menu>
  );
}

export default HeaderNavigator;
