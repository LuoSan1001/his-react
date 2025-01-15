import React, {useState} from 'react';
import { Button, Form, Input, Modal, Table, TableProps, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiDeleteDoctor } from '../../../api';

interface Props {
    getDoctorList: any;
    columns: any;
    doctor: any;
}

export default function DeleteDoctorButton(props: Props) {
    const dnoList: number[] = [];
    const {getDoctorList, columns, doctor} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    if (doctor !== undefined) {
        for (let i = 0; i < doctor.length; i++) {
            doctor[i].key = i;
            
        }
    }

    const rowSelection: TableProps<any>['rowSelection'] = {
        onChange: (pno: React.Key[], selectedRows: any[]) => {
            dnoList.push(selectedRows.at(-1).dno);
            console.log("dnoList: ", dnoList);
        }
    };

    const deleteDoctor = async (params: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', params);
        setConfirmLoading(true);

        const res = await apiDeleteDoctor(params);

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setConfirmLoading(false);
        getDoctorList();
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleOk = () => {
        deleteDoctor(dnoList);
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
                    dataSource={doctor}
                />
            </Modal>
        </>
    )
}
