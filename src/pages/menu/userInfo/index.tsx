import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetAllUser } from '../../../api';

export default function UserInfo() {
    const [info, setInfo] = useState<any>();

    const columns: any = [
            {
                title: '用户编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '用户类型',
                dataIndex: 'type',
                key: 'type'
            }
    ];

    const getUserList = async () => {
        const res: any = await apiGetAllUser();
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            setInfo(data);
        } else {
            console.log("请求getUserList接口出错");
        }
    }

        useEffect(() => {
            getUserList();
        }, []);

  return (
    <>
        <Table columns={columns} dataSource={info} />
    </>
  )
}
