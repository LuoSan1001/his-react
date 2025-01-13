import React, { useCallback, useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { apiGetPatient } from '../../../api';
import UpdateInfoButton from './updateInfoButton';

export default function Info() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items: DescriptionsProps['items'] = [
        {
          key: '1',
          label: '编号',
          children: '0',
        },
        {
          key: '2',
          label: '姓名',
          children: 'lai',
        },
        {
          key: '3',
          label: '性别',
          children: '男',
        },
        {
          key: '4',
          label: '出生日期',
          children: '2002-10-04',
        },
        {
          key: '5',
          label: '身份证号',
          span: 2,
          children: '410922200210060098',
        },
        {
          key: '6',
          label: '地址',
          span: 3,
          children: "成都市成华区",
        },
        {
          key: '7',
          label: '医疗卡识别号',
          children: '1234567',
        },
        {
          key: '8',
          label: '社会保险号',
          children: '1234567890',
        },
        {
          key: '9',
          label: '联系电话',
          children: '15939340999',
        }
    ];

    const [info, setInfo] = useState<any>({});

    const getPatient = useCallback(async () => {
        const res: any = await apiGetPatient(0);
        const { status, data } = res;

        if (status === 200 && data) {
            setInfo(data);
        } else {
            console.log("请求getPatient接口出错");
        }
    }, [])

    // items[0].children = info.pno;
    // items[1].children = info.pname;
    // items[2].children = info.psex;
    // items[3].children = info.pbd;
    // items[4].children = info.pid;
    // items[5].children = info.padd;
    // items[6].children = info.pmno;
    // items[7].children = info.pino;
    // items[8].children = info.ptel;

    useEffect(() => {
        getPatient();
    }, [getPatient]);

    return (
        <>
            <Descriptions title="User Info" layout="vertical" bordered items={items} />
            <UpdateInfoButton getPatient={getPatient} info={info}/>
        </>
    
    )
}
