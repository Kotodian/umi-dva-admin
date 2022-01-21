import LoginForm from './components/Login';
import { connect } from 'umi';
import React, { Component } from 'react';
import styles from './style.less';
import logo from '../../assets/login.jpg';

const { UserName, Password, Submit } = LoginForm;

export default @connect()
class extends Component {

  onSubmit = values => {
    console.log('用户输入: ', values);
    this.props.dispatch({ type: 'login/login', payload: values });
  };

  render() {
    return (
      <div className={styles.normal}>
        <div style={{ 'height': '20%' }}>

        </div>
        <div className={styles.main}>
          <img
            className={styles.logo}
            src={logo}
            alt='冰封王座' />
          <LoginForm onSubmit={this.onSubmit}>
            <UserName
              name='username'
              placeholder='admin'
              rules={[{ required: true, message: '请输入用户名' }]}
            />
            <Password
              name='password'
              placeholder='admin'
              rules={[{ required: true, message: '请输入密码' }]}
            />
            <Submit>登录</Submit>
          </LoginForm>
        </div>
      </div>
    );
  }
}

