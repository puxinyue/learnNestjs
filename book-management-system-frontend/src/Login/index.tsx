import { Button, Card, Form, Input, message } from 'antd'
import './index.css'
import { login } from '../api'

const Login = () => {

    return <div className="cotent-login">
        <Card title="图书管理系统" style={{ width: 400, marginTop: 180 }}>
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 20 }}
                onFinish={async (values) => {
                    try {
                        await login(values)
                        message.success('登录成功');
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 1000);
                    } catch (error: any) {
                        console.log(error)
                        message.error(error.response.data.message);
                    }
                }}
            >
                <Form.Item
                    label="用户名"
                    name="userName"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="passWord"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <a style={{ marginLeft: 122 }} href='/register'>没有账号？ 去注册！</a>
                <Form.Item noStyle>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 20 }}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default Login