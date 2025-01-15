import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetAllPatient } from '../../../api';
import UpdatePatientButton from './updatePatientAdmin';
import DeletePatientButton from './deletePatientButton';

export default function PatientAdmin() {
    const [patient, setPatient] = useState<any>();

    const columns: any = [
            {
                title: '患者编号',
                dataIndex: 'pno',
                key: 'pno',
            },
            {
                title: '患者姓名',
                dataIndex: 'pname',
                key: 'pname',
            },
            {
                title: '身份证号',
                dataIndex: 'pid',
                key: 'pid'
            },
            {
                title: '社会保障编号',
                dataIndex: 'pino',
                key: 'pino',
            },
            {
                title: '医疗卡识别号',
                dataIndex: 'pmno',
                key: 'pmno'
            },
            {
                title: '性别',
                dataIndex: 'psex',
                key: 'psex'
            },
            {
                title: '出生日期',
                dataIndex: 'pbd',
                key: 'pbd'
            },
            {
                title: '地址',
                dataIndex: 'padd',
                key: 'padd'
            },
            {
                title: '联系电话',
                dataIndex: 'ptel',
                key: 'ptel'
            }
    ];

    const getPatientList = async () => {
        const res: any = await apiGetAllPatient();
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            setPatient(data);
        } else {
            console.log("请求getPatientList接口出错");
        }
    }

        useEffect(() => {
            getPatientList();
        }, []);

  return (
    <>
        <UpdatePatientButton getPatientList={getPatientList} />
        <DeletePatientButton getPatientList={getPatientList} columns={columns} patient={patient} />
        <Table columns={columns} dataSource={patient} />
    </>
  )
}
