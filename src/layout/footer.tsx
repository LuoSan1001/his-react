import React from 'react'
import { Layout } from 'antd';

const { Footer } = Layout;

export default function footer() {
    return (
        <Footer style={{ textAlign: 'center' }}>
            HIS ©{new Date().getFullYear()} Created by LuoSan
        </Footer>
    )
}
