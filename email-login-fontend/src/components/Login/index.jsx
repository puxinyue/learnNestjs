import React from 'react'
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
export default function Login() {
 const [form] = Form.useForm();
  const onFinish = async(values) => {
    console.log(values);
  };
  const sendCode = async() =>{
   const data = await axios.get('http://localhost:3001', {
      email: form.getFieldValue('email')
    })
    console.log('sendCode===>',data);
  }
  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        style={{ width: '300px', margin: '0 auto', marginTop: '100px' }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      > 
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item>
          <Button onClick={sendCode}>
            发送验证码
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
        </Form.Item>
        
      </Form>
    </div>
  )
}
