import React, {useState} from 'react';
import { Button, Form, Input, Modal, Table, TableProps, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiDeleteUser } from '../../../api';

interface Props {
    getUserList: any;
    columns: any;
    user: any;
}

export default function DeleteUserButton(props: Props) {
    const idList: number[] = [];
    const {getUserList, columns, user} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    if (user !== undefined) {
        for (let i = 0; i < user.length; i++) {
            user[i].key = i;
            
        }
    }

    const rowSelection: TableProps<any>['rowSelection'] = {
        onChange: (pno: React.Key[], selectedRows: any[]) => {
            idList.push(selectedRows.at(-1).id);
            console.log("dnoList: ", idList);
        }
    };

    const deleteUser = async (params: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', params);
        setConfirmLoading(true);

        const res = await apiDeleteUser(params);

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
        deleteUser(idList);
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
                    dataSource={user}
                />
            </Modal>
        </>
    )
}
