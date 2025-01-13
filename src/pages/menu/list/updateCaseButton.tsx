import React, {useState} from 'react';
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { Case, CaseList } from '../../../type/api';
import { apiUpdateCase } from '../../../api';

type FieldType = {
    id: string;
    title: string;
    status: String;
    director: String;
};

interface Props {
    getCaseList: () => Promise<void>;
    case: Case;
}

const getParams = (caseRecord: any, formValue: any): Case => {
    const params: any = {...caseRecord, ...formValue};
    if (params.status === "未完成") {
        params.status = 0;
    } else {
        params.status = 1;
    }
    return params;
}

export default function UpdateCaseButton(props: Props) {
    const {case: caseRecord, getCaseList} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = useForm();

    const updateCase = async (formValue: FieldType) => {
        const params: Case = getParams(caseRecord, formValue);
        setConfirmLoading(true);

        const res = await apiUpdateCase(params);

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
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
            updateCase(formValue);
        } else {
            message.info("请填写信息");
            return;
        }
        form.submit();
    }

    const onFinish = () => {
        setOpen(false);
        form.setFieldsValue({ id: undefined, title: undefined });
    }

    return (
        <>
            <Button type="link" onClick={handleClick}>更新</Button>
            <Modal
                title="Confirm"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    initialValues={caseRecord}
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
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="状态"
                        name="status"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="负责人"
                        name="director"
                        rules={[{ required: true, message: 'Please input your director!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
