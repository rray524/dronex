import React from "react";
import AdminNav from "../../components/AdminNav";


const AdminDashboard = () => {
    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">
                    <h4>Admin Dashboard</h4>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
