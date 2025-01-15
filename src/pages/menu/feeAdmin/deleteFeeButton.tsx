import React, {useState} from 'react';
import { Button, Form, Input, Modal, Table, TableProps, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiDeleteFee } from '../../../api';

interface Props {
    getFeeList: any;
    columns: any;
    fee: any;
}

export default function DeleteFeeButton(props: Props) {
    const fnoList: number[] = [];
    const {getFeeList, columns, fee} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    if (fee !== undefined) {
        for (let i = 0; i < fee.length; i++) {
            fee[i].key = i;
            
        }
    }

    const rowSelection: TableProps<any>['rowSelection'] = {
        onChange: (pno: React.Key[], selectedRows: any[]) => {
            fnoList.push(selectedRows.at(-1).fno);
            console.log("dnoList: ", fnoList);
        }
    };

    const deleteFee = async (params: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', params);
        setConfirmLoading(true);

        const res = await apiDeleteFee(params);

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
        deleteFee(fnoList);
    }

    const onFinish = () => {
        setOpen(false);
    }

    return (
        <>
            <Button type="primary" onClick={handleClick} style={{marginLeft: "10px"}}>批量删除</Button>
            <Modal
                title="Confirm"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                width={'80%'}
            >
                <Table
                    rowSelection={{ ...rowSelection }}
                    columns={columns}
                    dataSource={fee}
                />
            </Modal>
        </>
    )
}
