import React, { useState } from 'react';
import { Modal, message, Button } from 'antd';
import { deleteCase } from '../../../api';
import { Case } from "../../../type/api";

interface Props {
    id: String;
    operation: String;
    getCaseList: () => void;
}

export default function DeleteCaseButton(props: Props) {
    const { id, operation, getCaseList } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [modalText, setModalText] = useState<String>('确定要删除这个用例吗');
    // const [id, setId] = useState<String>();

    const handleClick = (operation: String, id: String) => {
        if (operation === 'delete') {
            setOpen(true);
            // setId(id);
        }
    }

    const handleOk = () => {
        console.log("ok");
        setConfirmLoading(true);
        setModalText('正在删除...');
        if (id) {
            deleteCase(id).then((res) => {
                const { status } = res;
                if (status == 200) {
                    message.success("删除成功");
                } else {
                    message.error("删除失败");
                }

                setConfirmLoading(false);

                setOpen(false);
                setModalText("确定要删除这个用例吗");
                // setTimeout(() => console.log("sleep"), 5000);
                getCaseList();
            })
        }
    }

    return (
        <>
            <Button type='link' onClick={() => handleClick(operation, id)}>删除</Button>
            <Modal
                title="Confirm"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    )
}
