import { Button, Card, Form, Input, message } from "antd";
import { register } from '../api'

const Register = () => {
    return <div className="cotent-login">
        <Card title="图书管理系统" style={{ width: 400, marginTop: 180 }}>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20 }}
                onFinish={async (values) => {
                    if (values.passWord !== values?.confirmPassWord) {
                        message.error('两次密码不一致');
                        return;
                    }
                    try {
                        await register(values)
                        message.success('注册成功');
                        setTimeout(() => {
                            window.location.href = '/login';
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
                <Form.Item
                    label="确认密码"
                    name="confirmPassWord"
                    rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password />
                </Form.Item>
                <a style={{ marginLeft: 122 }} href='/login'>已有账号？ 去登录！</a>
                <Form.Item noStyle>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 20 }}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default Register