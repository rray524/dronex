import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const Navigation = () => {
    const [current, setCurrent] = useState('home');
    const handleClick = () => {
        // text
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                Home
            </Menu.Item>

            <SubMenu key="SubMenu" icon={<LoginOutlined />} title="Login/Register">
                <Menu.ItemGroup>
                    <Menu.Item key="setting:1">Login</Menu.Item>
                    <Menu.Item key="setting:2">Register</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
    );
};

export default Navigation;