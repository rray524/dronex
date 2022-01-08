import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Item } = Menu;
const Navigation = () => {
    const [current, setCurrent] = useState('home');
    const handleClick = (e) => {

        setCurrent(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='justify-content-center'>
            <Item key="home" icon={<HomeOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/login">Login</Link></Item>
            <Item key="register" icon={<UserAddOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/registration">Register</Link></Item>
        </Menu >
    );
};

export default Navigation;