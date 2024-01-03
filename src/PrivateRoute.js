import React from 'react'
import { Route, Navigate } from 'react-router-dom'
const PrivateRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? (
        element
    ) : (<Navigate to="/login" state={{ from: window.location.pathname }} replace />)
}

export default PrivateRoute;