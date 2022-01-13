import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
    const user = useSelector(state => state.user.loggedInUser);

    return user && user.tokenId ? <Route {...rest} /> : <LoadingToRedirect />
};

export default UserRoute;