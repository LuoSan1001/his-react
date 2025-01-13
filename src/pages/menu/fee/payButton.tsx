import React, {useState} from 'react';
import { Button, Modal, message } from "antd";
import { apiUpdateFee } from '../../../api';

interface Props {
    getFeeList: any;
    fee: any;
}

export default function PayButton(props: Props) {
    const {fee, getFeeList} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const payForFee = async () => {
        setConfirmLoading(true);

        const res = await apiUpdateFee({fno: fee.fno, payed: 1});

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setConfirmLoading(false);
        getFeeList();
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleOk = () => {
        payForFee();
    }

    return (
        <>
            <Button type="text" onClick={handleClick} style={{margin: '0px -25px'}}>请确认支付</Button>
            <Modal
                title="Confirm"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                支付金额为{fee.fsum}
            </Modal>
        </>
    )
}
