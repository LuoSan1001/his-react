import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiGetRegisterByDNoAndToday } from '../../../api';

function getCurrentFormattedDate(): string {
    const now = new Date();

    const year: number = now.getFullYear(); // 获取年份
    const month: number = now.getMonth() + 1; // 获取月份，+1是因为getMonth()返回的月份是从0开始的
    const day: number = now.getDate(); // 获取日

    const hour: number = now.getHours(); // 获取小时
    const minute: number = now.getMinutes(); // 获取分钟
    const second: number = now.getSeconds(); // 获取秒钟

    // 如果日期小于10，添加一个前导零
    const monthStr: string = month < 10 ? '0' + month.toString() : month.toString();
    const dayStr: string = day < 10 ? '0' + day.toString() : day.toString();
    const hourStr: string = hour < 10 ? '0' + hour.toString() : hour.toString();
    const minuteStr: string = minute < 10 ? '0' + minute.toString() : minute.toString();
    const secondStr: string = second < 10 ? '0' + second.toString() : second.toString();

    return `${year}-${monthStr}-${dayStr}`;
    // return `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`;
}

export default function DTodayRegister() {
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
        console.log("today: ", getCurrentFormattedDate());
        const res: any = await apiGetRegisterByDNoAndToday(101, getCurrentFormattedDate());
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
