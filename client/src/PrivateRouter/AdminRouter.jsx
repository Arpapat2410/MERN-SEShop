import useAuth from '../hook/useAuth'
import React, { Children, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAdmin from '../hook/useAdmin'

const AdminRouter = () => {
    const { user } = useAuth()
    const { isAdmin , isAdminLoading } = useAdmin()
    const location = useLocation();
    console.log(isAdmin);
    if(user && isAdmin) {
        return children;
    }
    return <Navigate to="/SignIn" state={{from: location}} replace />
}

export default AdminRouter