import { Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetFeeByPNo } from '../../../api';
import PayButton from './payButton';

const addOption = (feeList: any): void => {
    if (feeList) {
        feeList.forEach((item: any) => {
            item.optiom = ['pay'];
        })
    }
}

export default function Fee() {
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
                title: '诊断医生',
                dataIndex: 'dno',
                key: 'dno'
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
            },
            {
                title: '操作',
                dataIndex: 'option',
                key: 'option',
                render: (option: any, record: any) => {
                    console.log("record: ", record);
                    console.log("payed: ", record['payed']);
                    return record.payed==0 ? <PayButton getFeeList={getFeeList} fee={record}/> : <p>已支付</p>
                    
                }
                    // record.payed==1 ? <PayButton getFeeList={getFeeList} fee={record}/> : <p>已支付</p>
                    // if (option) {
                    // option.map((item: String | undefined) => {
                    //     switch (item) {
                    //         case "pay":
                    //             return record.payed===0 ? <PayButton getFeeList={getFeeList} fee={record}/> : <p>已支付</p>;
                    //         default:
                    //             return <p> </p>
                    //     }
                    // })
                    // } else {
                    //     return <p> </p>
                    // }
                
            }
    ];

    const getFeeList = async () => {
        const res: any = await apiGetFeeByPNo(0);
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
        <Table columns={columns} dataSource={fee} />
    </>
  )
}
