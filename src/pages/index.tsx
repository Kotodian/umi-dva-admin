import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.normal}>
      <img className={styles.img}
           src='../assets/login.jpg'
           alt='just a pic'
      />
    </div>
  );
}
