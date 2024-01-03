import React, { Component, Suspense , useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoute from './PrivateRoute';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/signup/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = ()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const handleLogin = ()=>{
    setIsAuthenticated(true)
  };
  const handleLogout = ()=>{
    setIsAuthenticated(false)
  };
  return(
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <PrivateRoute path='*' element={<DefaultLayout onLogout={handleLogout}  isAuthenticated={isAuthenticated}  />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
