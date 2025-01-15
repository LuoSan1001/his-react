import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useParams  } from 'react-router-dom';
import { apiUpdateUser } from '../../api'

export default function SignUp() {
    const navigate = useNavigate();
    const {type} = useParams();
    // const [status, setStatus] = useState<number>();
    // const [data, setData] = useState<any>();

    const login = async (params: any) => {
        // params.id = 7;
        // const res: any = await apiUpdateUser(params);
        // const {status, data} = res;
        
        if (params.type === "doctor") {
            params.id = 6;
            const res: any = await apiUpdateUser(params);
            const {status, data} = res;
            if (status === 200 && data) {
                navigate(`/bind-info/doctor`)
            }
        } else if (params.type === "patient") {
            params.id = 5;
            const res: any = await apiUpdateUser(params);
            const {status, data} = res;
            if (status === 200 && data) {
                navigate(`/bind-info/patient`)
            }
        } else if (params.type === "admin") {
            navigate(`/bind-success/admin902/`)
            // params.id = 7;
            // const res: any = await apiUpdateUser(params);
            // const {status, data} = res;
            // if (status === 200 && data) {
            //     navigate(`/bind-info/admin`)
            // }
        }
    } 

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        console.log("type: ", type);
        
        console.log('Success:', values);
        login(values);
    };
    
    const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
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
                <Form.Item<any>
                label="类型"
                name="type"
                rules={[{ required: true, message: 'patient/doctor/admin' }]}
                >
                <Input placeholder="patient/doctor/admin" />
                </Form.Item>
                <Form.Item<any>
                label="用户名"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item<any>
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
