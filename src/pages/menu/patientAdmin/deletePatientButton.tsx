import React, {useState} from 'react';
import { Button, Form, Input, Modal, Table, TableProps, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiDeletePatient } from '../../../api';

interface Props {
    getPatientList: any;
    columns: any;
    patient: any;
}

export default function DeletePatientButton(props: Props) {
    const pnoList: number[] = [];
    const {getPatientList, columns, patient} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    if (patient !== undefined) {
        for (let i = 0; i < patient.length; i++) {
            patient[i].key = i;
            
        }
    }

    const rowSelection: TableProps<any>['rowSelection'] = {
        onChange: (pno: React.Key[], selectedRows: any[]) => {
            pnoList.push(selectedRows.at(-1).pno);
            console.log("pnoList: ", pnoList);
        }
    };

    const deletePatient = async (params: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', params);
        setConfirmLoading(true);

        const res = await apiDeletePatient(params);

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
        deletePatient(pnoList);
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
                    dataSource={patient}
                />
            </Modal>
        </>
    )
}
