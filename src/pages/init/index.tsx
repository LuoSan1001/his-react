import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate  } from 'react-router-dom';
import { apiGetAllDiagnosis } from '../../api'
import { isNamedExportBindings } from 'typescript';

const initialValues = {
    ip: "113.45.138.188",
    port: "3306",
    username: "root",
    password: "usetc2022!",
    name: "his-d_his"
}

export default function Init() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        messageApi.open({
            type: 'success',
            content: '初始化成功',
          });
        console.log('Success:', values);
        navigate("/login");
    };
    
    const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{margin: '10% 25% 15.5% 25%'}}>
            <div style={{margin: '0 0 5% 39%'}}>请初始化</div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<any>
                label="服务器IP"
                name="ip"
                rules={[{ required: true, message: 'Please input your ip!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item<any>
                label="数据库端口号"
                name="port"
                rules={[{ required: true, message: 'Please input your port!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="数据库用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="数据库密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="数据库名称"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input />
                </Form.Item>

                <div style={{marginLeft: '55%'}}>
                    {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item label={null}>
                    {contextHolder}
                    <Button type="primary" htmlType="submit">
                        进入系统
                    </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
