import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoute from './views/PrivateAuth/PrivateRoute'
// import PrivateRoute from './PrivateRoute'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/signup/Login'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path='/auth' name="all page" element={<PrivateRoute />}>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App