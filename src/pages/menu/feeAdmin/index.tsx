import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetAllFee } from '../../../api';
import UpdateFeeButton from './updateFeeButton';
import DeleteFeeButton from './deleteFeeButton';

const addOption = (feeList: any): void => {
    if (feeList) {
        feeList.forEach((item: any) => {
            item.optiom = ['pay'];
        })
    }
}

export default function FeeAdmin() {
    const [fee, setFee] = useState<any>();

    const columns: any = [
            {
                title: '发票单编号',
                dataIndex: 'fno',
                key: 'fno',
            },
            {
                title: '发票编号',
                dataIndex: 'fnumber',
                key: 'fnumber',
            },
            {
                title: '日期',
                dataIndex: 'fdate',
                key: 'fdate'
            },
            {
                title: '处方编号',
                dataIndex: 'rno',
                key: 'rno',
            },
            {
                title: '收银员',
                dataIndex: 'cno',
                key: 'cno'
            },
            {
                title: '患者',
                dataIndex: 'pno',
                key: 'pno'
            },
            {
                title: '应收金额',
                dataIndex: 'frecipeFee',
                key: 'frecipeFee'
            },
            {
                title: '减免折扣金额',
                dataIndex: 'fdiscount',
                key: 'fdiscount'
            },
            {
                title: '实收金额',
                dataIndex: 'fsum',
                key: 'fsum'
            }
    ];

    const getFeeList = async () => {
        const res: any = await apiGetAllFee();
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            addOption(data);
            setFee(data);
        } else {
            console.log("请求getFeeList接口出错");
        }
    }

        useEffect(() => {
            getFeeList();
        }, []);

  return (
    <>
        <UpdateFeeButton getFeeList={getFeeList} />
        <DeleteFeeButton getFeeList={getFeeList} columns={columns} fee={fee} />
        <Table columns={columns} dataSource={fee} />
    </>
  )
}
