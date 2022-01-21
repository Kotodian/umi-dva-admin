import { Form, Input, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { getFakeCaptcha } from '../../../../services/login';
import ItemMap from './map';
import LoginContext from './LoginContext';

const FormItem = Form.Item;

const getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }) => {
  const options = {
    rules: rules || customProps.rules,
  };

  if (onChange) {
    options.onChange = onChange;
  }

  if (defaultValue) {
    options.initialValue = defaultValue;
  }

  return options;
};

const LoginItem = props => {
  const [count, setCount] = useState(props.countDown || 0);
  const [timing, setTiming] = useState(false);

  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;


  const onGetCaptcha = useCallback(async mobile => {
    const result = await getFakeCaptcha(mobile);

    if (result === false) {
      return;
    }

    message.success('获取验证码成功! 验证码为: 1234');
    setTiming(true);
  }, []);


  useEffect(() => {
    let interval = 0;
    const { countDown } = props;

    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  if (!name) {
    return null;
  }

  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};


const LoginItems = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItems[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItems;
