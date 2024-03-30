import { CTable, CModal, CButton, CModalBody, CModalTitle, CForm, CFormInput, CModalHeader, CModalFooter, CContainer, CRow, CCol } from "@coreui/react";
import React, { useEffect, useState } from "react";
import apiCall from "src/services/index.ts";


const ViewCustomer = () => {
  let [row, setRow] = useState([])
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState({ id: "", name: "", contact: "", email: "", password: "" });


  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col" },
    },
    {
      key: "name",
      label: "Name",
      _props: { scope: "col" },
    },
    {
      key: "contact",
      label: "Phone No",
      _props: { scope: "col" },
    },
    {
      key: "email",
      label: "Email",
      _props: { scope: "col" },
    },
    {
      key: "password",
      label: "Password",
      _props: { scope: "col" },
    },
    {
      key: "action",
      label: "Action",
      _props: { scope: "col" },
    },
  ];


  useEffect(() => {
    apiCall.get('/view-customer')
      .then(response => {
        setRow(response.data.response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const tableData = row.map((data, index) => ({
    ...data,
    id: index + 1,
    action: (
      <i className="fa fa-pen" onClick={() => handleAction(data.id)}></i>
    )
  }))

  const handleAction = (id) => {
    const viewData = row.find(item => item.id === id);
    setView(viewData || { id: "", name: "", phone_no: "", email: "", role: "", address: "" });
    setVisible(true)
  }

  const handelChange = (e) => {
    setView((item) => ({ ...item, [e.target.name]: e.target.value }))
  }
  const updateData = (view) => {
    try {
      apiCall.put(`/update-specific-customer/${view.id}`, view)
        .then(() => { setRow(prevData => prevData.map(item => item.id === view.id ? view : item)) })
      setVisible(false);
    }
    catch (error) {
      console.log(error);
    }

  }
  const deleteData = (id) => {
    try {
      apiCall.delete(`/delete-customer/${id}`)
        .then(() => { setRow(prevData => prevData.filter(item => item.id !== id)) })
      setVisible(false);
    }
    catch (error) {
      console.log(error);
    }


  }
  return (
    <>
      <CTable columns={columns} items={tableData} />


      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        size="lg"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">View & Edit Message</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CForm>
              <CRow>
                <CCol md="auto">
                  <CFormInput
                    type="text"
                    label="Name"
                    name="name"
                    value={view.name}
                    onChange={handelChange}
                  />
                </CCol>
                <CCol md="auto">
                  <CFormInput
                    type="mail"
                    name="email"
                    label="Email address"
                    value={view.email}
                    onChange={handelChange}
                  />
                </CCol>
                <CCol md="auto">
                  <CFormInput
                    type="number"
                    name="contact"
                    label="Mobile Number"
                    value={view.contact}
                    onChange={handelChange}
                  />
                </CCol>

              </CRow>
              <CRow>
                <CCol md="auto">
                  <CFormInput
                    type="text"
                    name="password"
                    label="Role"
                    value={view.password}
                    onChange={handelChange}
                  />
                </CCol>

              </CRow>
            </CForm>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => { deleteData(view.id) }}>Delete</CButton>
          <CButton color="primary" onClick={() => { updateData(view) }}>Update</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ViewCustomer;


