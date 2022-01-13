import React from 'react';
import UserNav from '../../components/UserNav';

const History = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <br /><br />
                    user history page
                </div>
            </div>
        </div>
    );
};

export default History;