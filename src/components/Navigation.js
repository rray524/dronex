import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import { HomeOutlined, UserOutlined, UserAddOutlined, LogoutOutlined, MenuOutlined, SearchOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { searchText } from '../redux/slices/searchSlice';

const { Item } = Menu;

const Navigation = () => {
    const [current, setCurrent] = useState('home');
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.loggedInUser);
    console.log("User", user);
    const { cart } = useSelector(state => state.cart);
    // console.log(user);
    const search = useSelector(state => state.search.text);
    const { text } = search;

    const handleChange = (e) => {
        // console.log(e.target.value);
        dispatch(searchText({ text: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${text}`);
        // dispatch(searchText({ text: "" }));
    };
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
        <Menu onClick={handleClick} selectedKeys={[current]} style={{ lineHeight: "69px" }} mode="horizontal" className='justify-content-center'>
            <Item key="home" icon={<HomeOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link style={{ fontSize: "18px" }} to="/cart"><Badge style={{ fontSize: "18px" }} count={cart.length} offset={[9, 0]}>
                    Cart
                </Badge></Link>
            </Item>
            <Item key="shop" icon={<ShopOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link to="/shop">Shop</Link>
            </Item>
            {(user && user.role === "subscriber") && <Item key="user-dashboard" icon={<MenuOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link to="/user/history">User Dashboard</Link>
            </Item>}
            {(user && user.role === "admin") && <Item key="admin-dashboard" icon={<MenuOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
            </Item>}
            {!user && <Item key="login" icon={<UserOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/login">Login</Link></Item>}
            {!user && <Item key="register" icon={<UserAddOutlined />} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/registration">Register</Link></Item>
            }
            {user?.email && <Item key="logout" icon={<LogoutOutlined />} onClick={logout} style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}><Link to="/logout">Logout</Link></Item>}
            {user && <div style={{ display: 'flex', alignItems: 'center', fontSize: "18px" }}>{< UserAddOutlined />} <p style={{ display: 'flex', alignItems: 'center', fontSize: "18px", margin: "0 6px 0 8px", textTransform: 'capitalize' }}> {user?.email?.split("@")[0]}</p></div>}
            <form className="form-inline my-2 my-lg-0 mx-4" onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="search"
                    value={text}
                    className="form-control mr-sm-2"
                    placeholder="Search"
                />
                <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
            </form>

        </Menu >
    );
};

export default Navigation;