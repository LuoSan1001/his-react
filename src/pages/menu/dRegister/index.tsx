import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetRegisterByDNo } from '../../../api';

export default function DRegister() {
    const [register, setRegister] = useState<any>();

    const columns: any = [
            {
                title: '挂号单编号',
                dataIndex: 'rfNo',
                key: 'rfNo',
            },
            {
                title: '挂号科室',
                dataIndex: 'rfDept',
                key: 'rfDept',
            },
            {
                title: '挂号医生',
                dataIndex: 'rfDoctor',
                key: 'rfDoctor'
            },
            {
                title: '挂号患者',
                dataIndex: 'rfPatient',
                key: 'rfPatient',
            },
            {
                title: '收费员',
                dataIndex: 'rfCashier',
                key: 'rfCashier'
            },
            {
                title: '挂号时间',
                dataIndex: 'rfTime',
                key: 'rfTime'
            },
            {
                title: '预约就诊时间',
                dataIndex: 'rfVisitTime',
                key: 'rfVisitTime'
            },
            {
                title: '挂号费',
                dataIndex: 'rfFee',
                key: 'rfFee'
            },
            {
                title: '备注',
                dataIndex: 'rfNotes',
                key: 'rfNotes'
            }
    ];

    const getRegisterList = async () => {
        const res: any = await apiGetRegisterByDNo(101);
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            setRegister(data);
        } else {
            console.log("请求getRegisterList接口出错");
        }
    }

        useEffect(() => {
            getRegisterList();
        }, []);

  return (
    <>
        <Table columns={columns} dataSource={register} />
    </>
  )
}
