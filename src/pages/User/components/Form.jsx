import { Form, Input, InputNumber, Modal } from 'antd';
import React, { useState } from 'react';

const FormItem = Form.Item;

function UserEditForm(props) {
  const [visible, setVisible] = useState(false);
  const { children } = props;
  const [form] = Form.useForm();
  const { name, age } = props.record;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const showHandler = e => {
    if (e) e.stopPropagation();
    form.setFieldsValue({
      name: name,
      age: age,
    });
    setVisible(true);
  };

  const hideHandler = () => {
    setVisible(false);
  };

  const okHandler = () => {
    setVisible(false);
  };

  const onChangeHandler = () => {};

  return (
    <span>
      <span onClick={showHandler}>{children}</span>
      <Modal
        title="编辑用户"
        visible={visible}
        onOk={okHandler}
        onCancel={hideHandler}
      >
        <Form form={form}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入您的名称',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: '请输入您的年龄',
                min: 0,
                max: 150,
                type: 'number',
              },
            ]}
          >
            <InputNumber />
          </FormItem>
        </Form>
      </Modal>
    </span>
  );
}

export default UserEditForm;
