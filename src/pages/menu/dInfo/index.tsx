import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { apiGetDoctorByDNo } from '../../../api';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '编号',
    children: '301',
  },
  {
    key: '2',
    label: '姓名',
    children: '张三',
  },
  {
    key: '3',
    label: '性别',
    children: '男',
  },
  {
    key: '4',
    label: '年龄',
    children: '45',
  },
  {
    key: '5',
    label: '所属部门',
    span: 2,
    children: '内科',
  },
  {
    key: '6',
    label: '职称',
    span: 3,
    children: "主任医师",
  }
];

export default function DInfo() {


    const [info, setInfo] = useState<any>(null);

    const getDoctor = async () => {
      const res: any = await apiGetDoctorByDNo(301);
      const { status, data } = res;

      if (status === 200 && data) {
          // window.location.reload()
          setInfo(data);
      } else {
          console.log("请求getDoctor接口出错");
      }
    }

    // items[0].children = info.dno;
    // items[1].children = info.dname;
    // items[2].children = info.dsex;
    // items[3].children = info.dage;
    // items[4].children = info.deptNo;
    // items[5].children = info.tno;

    useEffect(() => {  
        getDoctor();
        // window.location.reload()
    }, []);

    console.log("items: ", items);
    

    return (
        <>
            <Descriptions title="User Info" layout="vertical" bordered items={items} />
            {/* {info !== null && <Descriptions title="User Info">
              <Descriptions.Item label="UserName">{info.dname}</Descriptions.Item>
              <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
              <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
              <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>} */}
        </>
    
    )
}
