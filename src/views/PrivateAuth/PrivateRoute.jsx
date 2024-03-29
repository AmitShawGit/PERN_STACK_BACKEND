import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    let [login, setLogin] = useState(false)
    let navigate = useNavigate()
    let auth = localStorage.getItem("auth")
    let checkLogin = () => {
        if (auth === 'Your are most Welcome ' + true) {
            setLogin("Your are most Welcome " + true)
        } else {
            setLogin(false)
            navigate('/')

        }
    }
    useEffect(() => {
        checkLogin()
    }, [])
    return (
        <div>
            {login && <Outlet />}
        </div>
    )
}

export default PrivateRoute