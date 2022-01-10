import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/slices/userSlice';
import { useHistory } from 'react-router-dom';

const { Item } = Menu;

const Navigation = () => {
    const [current, setCurrent] = useState('home');
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.loggedInUser);
    console.log(user);
    const handleClick = (e) => {

        setCurrent(e.key)
    }

    const logout = () => {
        signOut(auth).then(() => {
            dispatch(logOut(null));
            toast.success(
                `You have been logged out successfully`
            );
            history.push("/login")
        }).catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
        });
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='justify-content-center'>
            <Item key="home" icon={<HomeOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link to="/">Home</Link>
            </Item>
            {!user && <Item key="login" icon={<UserOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/login">Login</Link></Item>}
            {!user && <Item key="register" icon={<UserAddOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/registration">Register</Link></Item>}
            {user && <Item key="logout" icon={<LogoutOutlined />} onClick={logout} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/logout">Logout</Link></Item>}
            {user && <p style={{ display: 'flex', alignItems: 'center', fontSize: "18px", margin: 0, textTransform: 'capitalize' }}>{user.email.split("@")[0]}</p>}
        </Menu >
    );
};

export default Navigation;