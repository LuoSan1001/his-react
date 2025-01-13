import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate  } from 'react-router-dom';
import { apiLogin } from '../../api'

type FieldType = {
    userName?: string;
    password?: string;
    remember?: string;
};

export default function Login() {
    const navigate = useNavigate();

    const login = async (params: any) => {
        const res: any = await apiLogin(params);
        const {status, data} = res;
        
        if (status === 200 && data) {
            const username: String = params.userName;
            if (data === "success") {
                localStorage.setItem("username", params.userName);
                if (username.includes("patient")) {
                    localStorage.setItem("type", "patient");
                    navigate("/menu/info");
                } else if (username.includes("doctor")) {
                    localStorage.setItem("type", "doctor");
                    navigate("/menu/d_diagnosis");
                } else if (username.includes("admin")) {
                    localStorage.setItem("type", "admin");
                    navigate("/menu/patient_admin");
                }
            } else {
                console.log("账户或密码错误");  
            }
        } else {
            console.log("请求login接口错误");
        }
    } 

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        login(values);
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSignup = () => {
        navigate("/sign-up")
    }

    return (
        <div style={{margin: '10% 25% 15.5% 25%'}}>
            <div style={{margin: '0 0 5% 39%'}}>请登录</div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                label="用户名"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>

                <div style={{marginLeft: '55%'}}>
                    {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    </Form.Item>
                </div>

                <Button type="text" onClick={handleSignup} style={{marginLeft: '48%'}}>
                    没有账号？去注册
                </Button>
                <div style={{color: 'gray', margin: '0 0 0 40%'}}>
                    <div>测试账号：</div>
                    <div>患者账号：patient0， 密码：123456</div>
                    <div>医生账号：doctor301， 密码：123456</div>
                    <div>管理员账号：admin901， 密码：123456</div>
                </div>
            </Form>
        </div>
    )
}
