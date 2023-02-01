import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ScreenLoader from '../Components/Loaders/ScreenLoader/ScreenLoader';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoute = ({ children }) => {

    const { userInfo, userLoading } = useContext(AuthContext);
    const location = useLocation();

    if (userLoading) {
        return <ScreenLoader></ScreenLoader>
    }

    if (userInfo && userInfo?.email) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;