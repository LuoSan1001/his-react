import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useParams  } from 'react-router-dom';
import { apiSignUp } from '../../api'

type FieldType = {
    userName?: string;
    password?: string;
    remember?: string;
};

export default function SignUp() {
    const navigate = useNavigate();

    const login = async (params: any) => {
        const res: any = await apiSignUp(params);
        const {status, data} = res;
        
        if (status === 200 && data) {
            if (data === "success") {
                navigate("/bind-info")
            } else {
                console.log("错误");  
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

    return (
        <div style={{margin: '10% 25% 15.5% 25%'}}>
            <div style={{margin: '0 0 5% 39%'}}>注册</div>
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
                        注册
                    </Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    )
}
