import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const FormItem = Form.Item;


function UserEditForm(props) {
  const [visible, setVisible] = useState(false);
  const { children } = props;
  const { getFieldDecorator } = props.form;
  const { name } = props.record;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const showHandler = (e) => {
    if (e) e.stopPropagation();
    setVisible(true);
  };

  const hideHandler = () => {
    setVisible(false);
  };

  const okHandler = () => {
    const { onOk } = props;
    props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        hideHandler();
      }
    });
  };

  return (
    <span>
     <span onClick={showHandler}>
       {children}
     </span>
     <Modal
       title='编辑用户'
       visible={visible}
       onOk={okHandler}
       onCancel={hideHandler}
     >
      <Form horizontal onSubmit={okHandler}>
        <FormItem
          {...formItemLayout}
          label='用户名'
        >
          {
            getFieldDecorator('name', {
              initialValue: name,
            })(<Input />)
          }
        </FormItem>
      </Form>
     </Modal>
</span>
  );
}

export default Form.create()(UserEditForm);
