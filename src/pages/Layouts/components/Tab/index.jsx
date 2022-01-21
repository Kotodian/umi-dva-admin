import React from 'react';
import styles from './index.less';
import { Breadcrumb } from 'antd';

function Tab(props) {
  const { items } = props.item;

  return (
    <Breadcrumb className={styles.breadcrumb}>
      {
        items.map(item => (
          <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
}

export default Tab;
