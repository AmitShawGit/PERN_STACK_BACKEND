import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
    let [userEntry, setUserEntry] = useState({ username: "", password: "" })
    const navigate= useNavigate()
    const handleChange = (e) => {
        setUserEntry((dataEntry) => ({ ...dataEntry, [e.target.name]: e.target.value }))
    }
    const checkUser = (e) => {
        e.preventDefault();
        if(userEntry.username === "mayank@1999"){
            if(userEntry.password === "1234"){
         
                navigate("/dashboard") 
            }else{
                alert("wrong password");
            }
        }else{
            alert("wrong email");
        }
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center loginBg">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={4}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={checkUser}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput type='text' placeholder="Username" value={userEntry.username} onChange={handleChange} name='username' />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                name='password'
                                                value={userEntry.password}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CButton color="primary" className="px-4"  type='submit'>
                                                    Login
                                                </CButton>
                                            </CCol>

                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>

                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
