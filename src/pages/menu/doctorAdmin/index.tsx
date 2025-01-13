import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetAllDoctor } from '../../../api';

export default function DoctorAdmin() {
    const [doctor, setDoctor] = useState<any>();

    const columns: any = [
            {
                title: '医生编号',
                dataIndex: 'dno',
                key: 'dno',
            },
            {
                title: '医生姓名',
                dataIndex: 'dname',
                key: 'dname',
            },
            {
                title: '性别',
                dataIndex: 'dsex',
                key: 'dsex'
            },
            {
                title: '年龄',
                dataIndex: 'dage',
                key: 'dage'
            },
            {
                title: '所属部门',
                dataIndex: 'deptno',
                key: 'deptno',
            },
            {
                title: '职位',
                dataIndex: 'tno',
                key: 'tno'
            },
            {
                title: '用户名',
                dataIndex: 'duserName',
                key: 'duserName'
            }
    ];

    const getDoctorList = async () => {
        const res: any = await apiGetAllDoctor();
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            setDoctor(data);
        } else {
            console.log("请求getDoctorList接口出错");
        }
    }

        useEffect(() => {
            getDoctorList();
        }, []);

  return (
    <>
        <Table columns={columns} dataSource={doctor} />
    </>
  )
}
