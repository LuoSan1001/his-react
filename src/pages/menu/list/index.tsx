import React, { ReactNode, useEffect, useState } from 'react';
import { Table, Modal, message } from 'antd';
import type { TableProps } from 'antd';
import { apiGetCaseList, deleteCase } from '../../../api';
import { Case, CaseList } from "../../../type/api";
import AddCaseButton from './addCaseButton';
import UpdateCaseButton from "./updateCaseButton";
import DeleteCaseButton from "./deleteCaseButton";

const addOperation = (caseList: Case[]): void => {
    if (caseList) {
        caseList.forEach((item) => {
            item.operation = ['update', 'delete'];
        })
    }
}

export default function List() {
    const [data, setData] = useState<Case[]>([]);

    const columns: TableProps<Case>['columns'] = [
        {
            title: '用例编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用例名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text): any => {
                switch (text) {
                    case 0: return <p>未完成</p>;
                    case 1: return <p>已完成</p>;
                    default: return <p>未完成</p>;
                }
            }
        },
        {
            title: '负责人',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text): any => <p>{text.slice(0, 10)}</p>
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            // render: (operations, { id }): any => (
            //     operations.map((item: String) => <p onClick={() => handleClick(item, id)}>{item === 'update' ? '更新' : '删除'}</p>)
            // )
            render: (operations, record): any => (
                operations.map((item: String) => {
                    switch (item) {
                        case "update":
                            return <UpdateCaseButton getCaseList={getCaseList} case={record}/>
                        case "delete":
                            return <DeleteCaseButton getCaseList={getCaseList} id={record.id} operation={item}/>
                    }
                })
            )
        }
    ];

    const getCaseList = async () => {
        const res: any = await apiGetCaseList();
        const { status, data } = res;

        if (status === 200 && data) {
            console.log("data: ", data);
            setData(data.list);
        } else {
            console.log("请求getCaseList接口出错");
        }
    }

    addOperation(data);

    useEffect(() => {
        getCaseList();
    }, []);

    return (
        <>
            <AddCaseButton getCaseList={getCaseList}/>
            <Table columns={columns} dataSource={data} />
        </>
    )
}
