import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useParams  } from 'react-router-dom';
import { apiUpdatePatient } from '../../api'

export default function BindPatientInfo() {
    const navigate = useNavigate();
    const {type} = useParams();

    const bind = async (params: any) => {
        params.pno = 21;
        const res: any = await apiUpdatePatient(params);
        const {status, data} = res;
        
        if (status === 200 && data) {
            if (data === "success") {
                navigate(`/bind-success/patient21/${params.password}`)
            } else {
                console.log("错误");  
            }
        } else {
            console.log("请求bind接口错误");
        }
    } 

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        console.log("type: ", type);
        
        console.log('Success:', values);
        bind(values);
    };
    
    const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{margin: '10% 25% 15.5% 25%'}}>
            <div style={{margin: '0 0 5% 39%'}}>绑定信息</div>
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
                label="姓名"
                name="pname"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="身份证号"
                name="pid"
                rules={[{ required: true, message: 'Please input your sex!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item<any>
                label="社会保障编号"
                name="pino"
                rules={[{ required: true, message: 'Please input your age!' }]}
                >
                <Input placeholder="7位" />
                </Form.Item>
                <Form.Item<any>
                label="医疗卡识别号"
                name="pmno"
                rules={[{ required: true, message: '201/202/203/204' }]}
                >
                <Input placeholder="10位" />
                </Form.Item>
                <Form.Item<any>
                label="性别"
                name="psex"
                rules={[{ required: true, message: '1001/1002/1003/1004' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="出生日期"
                name="pbd"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="地址"
                name="padd"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<any>
                label="联系电话"
                name="ptel"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
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
