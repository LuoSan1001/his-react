import React, {useState} from 'react';
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiUpdatePatient } from '../../../api';

interface Props {
    getPatientList: any;
}

export default function UpdatePatientButton(props: Props) {
    const {getPatientList} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = useForm();

    const UpdateDiagnosis = async (formValue: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', formValue);
        setConfirmLoading(true);

        const res = await apiUpdatePatient(formValue);

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setConfirmLoading(false);
        getPatientList();
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleOk = () => {
        const formValue = form.getFieldsValue();
        console.log(formValue);
        UpdateDiagnosis(formValue);
        form.submit();
    }

    const onFinish = () => {
        setOpen(false);
        form.setFieldsValue({ id: undefined, title: undefined });
    }

    return (
        <>
            <Button type="primary" onClick={handleClick} style={{marginLeft: "80%"}}>修改信息</Button>
            <Modal
                title="Confirm"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    // initialValues={info}
                    onFinish={onFinish}
                    form={form}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="患者编号"
                        name="pno"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="患者姓名"
                        name="pname"
                        // rules={[{ required: true, message: 'Please input your director!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="身份证号"
                        name="pid"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="社会保障编号"
                        name="pmno"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="医疗卡识别号"
                        name="pino"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="psex"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                        name="pbd"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="padd"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="联系电话"
                        name="ptel"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
