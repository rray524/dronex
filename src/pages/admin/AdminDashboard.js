import React, { useState, useEffect } from "react";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import AdminNav from "../../components/AdminNav";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user.loggedInUser);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () =>
        getOrders(user.tokenId).then((res) => {
            // console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.tokenId).then((res) => {
            toast.success("Status updated");
            loadOrders();
        });
    };

    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Admin Dashboard</h4>
                    {/* {JSON.stringify(orders)} */}
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
