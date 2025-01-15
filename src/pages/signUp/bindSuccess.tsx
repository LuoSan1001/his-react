import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useParams  } from 'react-router-dom';
import { apiUpdateDoctor } from '../../api'

export default function BindSuccess() {
    const navigate = useNavigate();
    const {account, password} = useParams();

    const handleClick = () => {
        navigate("/login")
    }


    return (
        <div style={{margin: '10% 25% 15.5% 25%'}}>
            <div style={{margin: '0 0 5% 39%'}}>绑定信息</div>
            <div style={{marginLeft: "35%"}}>您的账号为{account}</div>
            <div style={{marginLeft: "35%"}}>请使用账号和密码登录</div>
            <Button type="text" onClick={handleClick} style={{marginLeft: '48%'}}>
                去登录
            </Button>
        </div>
    )
}
