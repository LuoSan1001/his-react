import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import UserImage from "../asset/userImage.jpg";
import { useNavigate  } from 'react-router-dom';

const { Header } = Layout;

export default function Header1() {
    const navigate = useNavigate();
    const un = localStorage.getItem("username");
    const [username, setUsername]: any = useState<any>(un);

    const handleClick = () => {
        navigate("/login");
        localStorage.removeItem("type");
        localStorage.removeItem("username");
    }

    useEffect(() => {
        setUsername(localStorage.getItem("username"))
    }, [])

    return (
        <Header style={{ display: 'flex', alignItems: 'center'}}>
            {/* <div style={{fontSize: '30px', color: 'white'}}>ICase</div> */}
            {/* <div style={{marginLeft: '80%'}}> */}
            {/* {username !== null && <div>
                <img src={UserImage} style={{ width: '45px', verticalAlign: 'middle'}} />
                <span style={{ color: 'white', marginLeft: '20px' }}>{username}</span>
            </div>} */}
            <div style={{marginLeft: '40%'}}>
                <span style={{ color: 'white', fontSize: '35px' }}>人民医院</span>
            </div>
            {/* {username !== null && <Button
                type="link"
                onClick={handleClick}
                style={{marginLeft: "40%", color: "white"}}
            >
                退出登录
            </Button>} */}
            <Button
                type="link"
                onClick={handleClick}
                style={{marginLeft: "40%", color: "white"}}
            >
                退出登录
            </Button>
        </Header>
    )
}
