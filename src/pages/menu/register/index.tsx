import React, {useState} from 'react';
import { Form, Input, Modal, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiInsertRegister } from '../../../api';

export default function Register() {
    const [open, setOpen] = useState<boolean>(true);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = useForm();

    const updateCase = async (formValue: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', formValue);
        setConfirmLoading(true);

        const res = await apiInsertRegister(formValue);

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setConfirmLoading(false);
    }

    // const handleClick = () => {
    //     setOpen(true);
    // }

    const handleOk = () => {
        const formValue = form.getFieldsValue();
        console.log(formValue);
        updateCase(formValue);
        form.submit();
    }

    const onFinish = () => {
        setOpen(false);
        form.setFieldsValue({ id: undefined, title: undefined });
    }

    return (
        <>
            <Modal
                title="填写挂号信息"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => {setOpen(false)}}
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
                    label="挂号科室"
                    name="rfDept"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="挂号医生"
                    name="rfDoctor"
                    // rules={[{ required: true, message: 'Please input your director!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="挂号患者"
                    name="rfPatient"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="挂号收费员"
                    name="rfCashier"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="挂号时间"
                    name="rfTime"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="预约就诊时间"
                    name="rfVisitTime"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="挂号费"
                    name="rfFee"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="备注"
                    name="rfNotes"
                    // rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
 

            </Modal>
        </>
    )
}
