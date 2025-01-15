import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetAllDiagnosis } from '../../../api';
import UpdateDiagnosisButton from './updateDiagnosisButton';
import DeleteDiagnosisButton from './deleteDiagnosisAdmin';

export default function DiagnosisAdmin() {
    const [diagnosis, setDiagnosis] = useState<any>();

    const columns: any = [
            {
                title: '诊断编号',
                dataIndex: 'dgNo',
                key: 'dgNo',
            },
            {
                title: '患者编号',
                dataIndex: 'pno',
                key: 'pno',
            },
            {
                title: '部门编号',
                dataIndex: 'deptNo',
                key: 'deptNo'
            },
            {
                title: '医生编号',
                dataIndex: 'dno',
                key: 'dno',
            },
            {
                title: '症状描述',
                dataIndex: 'symptom',
                key: 'symptom'
            },
            {
                title: '诊断结论',
                dataIndex: 'diagnosis',
                key: 'diagnosis'
            },
            {
                title: '诊断时间',
                dataIndex: 'dgTime',
                key: 'dgTime'
            }
    ];

    const getDiagnosisList = async () => {
        const res: any = await apiGetAllDiagnosis();
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            setDiagnosis(data);
        } else {
            console.log("请求getDiagnosisList接口出错");
        }
    }

        useEffect(() => {
            getDiagnosisList();
        }, []);

  return (
    <> 
        <UpdateDiagnosisButton getDiagnosisList={getDiagnosisList} />
        <DeleteDiagnosisButton getDiagnosisList={getDiagnosisList} columns={columns} diagnosis={diagnosis} />
        <Table columns={columns} dataSource={diagnosis} />
    </>
  )
}
