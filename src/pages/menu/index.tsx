import React from 'react';
import type { MenuProps } from 'antd';
import { MenuUnfoldOutlined, GoldOutlined, CopyOutlined, AlignRightOutlined, DiffOutlined, AreaChartOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import MenuRouter from '../../router/menuRouter';

interface MenuItemProps {
    label: React.ReactNode | String,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItemProps[],
    type?: 'group'
}

const { Content, Sider } = Layout;

const style = {
    padding: '24px 0',
    background: 'colorBgContainer',
    borderRadius: 'borderRadiusLG',
    height: '675px'
};

const patientItems: MenuItemProps[] = [
    {label: <Link to={'/menu/info'}>个人中心</Link>, key: 'info', icon: <MenuUnfoldOutlined />},
    {label: <Link to={'/menu/register'}>挂号预约</Link>, key: 'register',  icon: <CopyOutlined />},
    {label: <Link to={'/menu/diagnosis'}>就诊记录</Link>, key: 'diagnosis',  icon: <AlignRightOutlined />},
    {label: <Link to={'/menu/fee'}>支付缴费</Link>, key: 'fee',  icon: <DiffOutlined />}
];

const doctorItems: MenuItemProps[] = [
    {label: <Link to={'/menu/d_today_register'}>今日挂号</Link>, key: 'd_today_register',  icon: <MenuUnfoldOutlined />},
    {label: <Link to={'/menu/d_register'}>我的挂号</Link>, key: 'd_register',  icon: <CopyOutlined />},
    {label: <Link to={'/menu/d_diagnosis'}>患者就诊</Link>, key: 'd_diagnosis',  icon: <DiffOutlined />},
    {label: <Link to={'/menu/d_info'}>个人中心</Link>, key: 'd_info',  icon: <MenuUnfoldOutlined />}
];

const adminItems: MenuItemProps[] = [
    {label: <Link to={'/menu/user_info'}>用户管理</Link>, key: 'user_info',  icon: <MenuUnfoldOutlined />},
    {label: <Link to={'/menu/patient_admin'}>患者管理</Link>, key: 'patient_admin',  icon: <CopyOutlined />},
    {label: <Link to={'/menu/doctor_admin'}>医生管理</Link>, key: 'doctor_admin',  icon: <AlignRightOutlined />},
    {label: <Link to={'/menu/diagnosis_admin'}>就诊管理</Link>, key: 'diagnosis_admin',  icon: <DiffOutlined />},
    {label: <Link to={'/menu/fee_admin'}>处方管理</Link>, key: 'fee_admin',  icon: <AreaChartOutlined />},
];

export default function IMenu() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const type: String | null = localStorage.getItem("type"); 

    return (
        <Content style={{padding: '0 48px'}}>
            <Layout
                style={style}
            >
                <Sider style={{ background: colorBgContainer }} width={200}>
                    {type === 'patient' && <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                        items={patientItems}
                    />}
                    {type === 'doctor' && <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                        items={doctorItems}
                    />}
                    {type === 'admin' && <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                        items={adminItems}
                    />}
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Content>
    )
}
