import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";


const AdminRoute = ({ children, ...rest }) => {
    const user = useSelector(state => state.user.loggedInUser);
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.tokenId) {
            currentAdmin(user.tokenId)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setOk(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setOk(false);
                });
        }
    }, [user]);

    return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
