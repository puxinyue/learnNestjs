import React from 'react'
import { Button, Form, Input} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
export default function Login() {
 const [form] = Form.useForm();;
  const onFinish = async(values) => {
    console.log(values);
    const data = await axios.post('http://localhost:3001/user/login', {
      email: values.email,
      code: values.password
    })
    if(data?.data === 'success') {
      console.log('登录成功');
    } else {
      console.log('登录失败');
    }
  };
  const sendCode = async() =>{
    const email = form.getFieldValue('email');
    if(!email){
      console.log('请输入邮箱');
      return;
    }
    const data = await axios.get('http://localhost:3001/email/code', {
      params: {
        email: email,
      }
    })

    if(data?.data) {
      console.log('发送验证码成功');
    } else {
      console.log('发送验证码失败');
    }
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
