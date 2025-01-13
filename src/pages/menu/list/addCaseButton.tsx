import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { Case } from '../../../type/api';
import { apiAddCase } from '../../../api';

type FieldType = {
    id: string;
    title: string;
};

export default function AddCaseButton(props: {getCaseList: () => Promise<void>}) {
    const { getCaseList } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = useForm();

    const addCase = async (formValue: FieldType) => {
        const params: Case = {...formValue, status: 0, director: "洛三"};
        setConfirmLoading(true);

        const res = await apiAddCase(params);

        const {status} = res;
        if (status === 200) {
            message.success("添加成功");
        } else {
            message.error("添加失败");
        }
        setConfirmLoading(false);
        getCaseList();
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleOk = () => {
        const formValue = form.getFieldsValue();
        console.log(formValue);
        if (formValue.id && formValue.title) {
            addCase(formValue);
        } else {
            message.info("请填写信息");
            return;
        }
        form.submit();
    }

    const onFinish = () => {
        setOpen(false);
        form.setFieldsValue({id: undefined, title: undefined});
        console.log("finish")
        // setOpen(false);
    }

    return (
        <>
            <Button
                type='primary'
                style={{ float: "right", marginBottom: "10px" }}
                onClick={handleClick}
            >
                添加用例
            </Button>
            <Modal
                title="Confirm"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="用例编号"
                        name="id"
                        rules={[{ required: true, message: 'Please input your id!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="用例名称"
                        name="title"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
