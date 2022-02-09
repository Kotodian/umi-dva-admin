import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const FormItem = Form.Item;

function UserEditForm(props) {
  const [visible, setVisible] = useState(false);
  const { children } = props;
  const [form] = Form.useForm();
  const { name } = props.record;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    form.setFieldsValue({
      name: name,
    });
  });

  const showHandler = e => {
    if (e) e.stopPropagation();
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
                message: 'Please input your name',
              },
            ]}
          >
            <Input />
          </FormItem>
        </Form>
      </Modal>
    </span>
  );
}

export default UserEditForm;
