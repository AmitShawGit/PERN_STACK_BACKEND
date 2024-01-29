import React, { useState } from 'react'
import Input from 'src/components/Input';
import { CCard, CCardBody, CButton, CRow, CCol, CFormSelect } from '@coreui/react'
import apiCall from "src/services/index.ts";

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
    const { name, value } = e.target;
    setUserCreated((prevData) => ({ ...prevData, [name]: value }));
  };

  //Save User
  const saveUser = async (e) => {
    e.preventDefault();
    await apiCall.post("create-user", userCreated)
      .then(res => alert(res.data))
      .catch((err) => { console.log(err) })
    console.log(userCreated);
  }
  return (
    <>
      <CCard>

        <CCardBody>
          <form onSubmit={saveUser}>
            <CRow>
              {
                userRegistration.map((item) => {
                  return (

                    <CCol key={item.key} sm={4}>
                      <Input
                        name={item.name}
                        type={item.type}
                        label={item.label}
                        id={item.id}
                        placeholder={item.placeholder}
                        validation={item.validation}
                        change={handleChange}
                        value={userCreated[item.name]} />
                    </CCol>

                  )

                })
              }
              <CCol sm={4}>
                <CFormSelect
                  label="Role"
                  name="role"
                  onChange={handleChange}
                  id="role"
                  options={[
                    'Select',
                    { label: 'Admin', value: 'admin' },
                    { label: 'User', value: 'user' },
                    { label: 'Student', value: 'student' },
                  ]}
                />
              </CCol>
            </CRow>
            <CButton type='submit'>Save</CButton>
          </form>
        </CCardBody>
      </CCard>

    </>
  )
}

export default AddUser;