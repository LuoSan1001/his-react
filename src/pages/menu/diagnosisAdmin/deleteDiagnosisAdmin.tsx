import React, {useState} from 'react';
import { Button, Form, Input, Modal, Table, TableProps, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { apiDeleteDiagnosis } from '../../../api';

interface Props {
    getDiagnosisList: any;
    columns: any;
    diagnosis: any;
}

export default function DeleteDiagnosisButton(props: Props) {
    const dgnoList: number[] = [];
    const {getDiagnosisList, columns, diagnosis} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    if (diagnosis !== undefined) {
        for (let i = 0; i < diagnosis.length; i++) {
            diagnosis[i].key = i;
            
        }
    }

    const rowSelection: TableProps<any>['rowSelection'] = {
        onChange: (pno: React.Key[], selectedRows: any[]) => {
            dgnoList.push(selectedRows.at(-1).dgNo);
            console.log("dgnoList: ", dgnoList);
        }
    };

    const deleteDiagnosis = async (params: any) => {
        // const params: Case = getParams(info, formValue);
        console.log('params:', params);
        setConfirmLoading(true);

        const res = await apiDeleteDiagnosis(params);

        const {status} = res;
        if (status === 200) {
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setConfirmLoading(false);
        getDiagnosisList();
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleOk = () => {
        deleteDiagnosis(dgnoList);
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
                    dataSource={diagnosis}
                />
            </Modal>
        </>
    )
}
