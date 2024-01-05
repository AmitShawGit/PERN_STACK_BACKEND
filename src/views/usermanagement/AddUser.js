import React, { useState } from 'react'
import Input from 'src/components/Input';
import { CCard, CCardBody, CButton, CRow, CCol } from '@coreui/react'

const AddUser = () => {
  let [userCreated, setUserCreated] = useState({ name: "", email: "", password: "", mobile: "", address: "", role: "" })
  let userRegistration = [
    {
      key: 1,
      label: "Name",
      id: "username",
      placeholder: "Please Enter Name",
      validation: "Please enter full name",
      type: "text",
      name: "name",
    },
    {
      key: 2,
      label: "Mobile Number",
      id: "mobile",
      placeholder: "Please Enter Mpbile Number",
      validation: "Please enter valid number",
      type: "number",
      name: "mobile",   
    },
    {
      key: 5,
      label: "Role",
      id: "role",
      placeholder: "Please enter role",
      validation: "Please enter role",
      type: "text",
      name: "role",
    },
    {
      key: 4,
      label: "Address",
      id: "address",
      placeholder: "Please enter address",
      validation: "Please enter address",
      type: "text",
      name: "address",
    },
    {
      key: 3,
      label: "Email",
      id: "mail",
      placeholder: "Please enter email",
      validation: "Please enter valid email",
      type: "email",
      name: "email",
    },
    {
      key: 6,
      label: "Password",
      id: "passsword",
      placeholder: "Please enter password",
      validation: "Please enter password",
      type: "password",
      name: "password",
    },
  ];
  //user entry
  const handleChange = (e) => {
 
    setUserCreated((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }
  //Save User
  const saveUser = (e) => {
    e.preventDefault();
    console.log(userCreated);
  }
  return (
    <>
      <CCard>

        <CCardBody>
          <form onSubmit={saveUser}>
            <CRow>
              {
                userRegistration.map((item, index) => {
                  return <CCol key={index} sm={4}>
                    <Input 
                    name={item.name} 
                    type={item.type} 
                    label={item.label} 
                    id={item.id} 
                    placeholder={item.placeholder} 
                    validation={item.validation} change={handleChange} value={userCreated[item.name]} />

                    </CCol>

                })
              }
            </CRow>
            <CButton type='submit'>Go somewhere</CButton>
          </form>
        </CCardBody>
      </CCard>

    </>
  )
}

export default AddUser;