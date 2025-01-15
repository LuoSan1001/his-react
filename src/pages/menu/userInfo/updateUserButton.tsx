import React, {useState} from 'react';
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiUpdateUser } from '../../../api';

interface Props {
    getUserList: any;
}

export default function UpdateUserButton(props: Props) {
    const {getUserList} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = useForm();

    const UpdateDiagnosis = async (formValue: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', formValue);
        setConfirmLoading(true);

        const res = await apiUpdateUser(formValue);

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setConfirmLoading(false);
        getUserList();
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
                        label="用户编号"
                        name="id"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="userName"
                        // rules={[{ required: true, message: 'Please input your director!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="用户类型"
                        name="type"
                        // rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
