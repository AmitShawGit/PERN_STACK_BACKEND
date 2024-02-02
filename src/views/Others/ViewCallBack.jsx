import { CTable, CModal, CButton, CModalBody, CModalTitle, CFormTextarea, CForm, CFormInput, CModalHeader, CModalFooter, CContainer, CRow, CCol } from "@coreui/react";
import React, { useEffect, useState } from "react";
import apiCall from "src/services/index.ts";


const ViewCallBack = () => {
  let [row, setRow] = useState([])
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState({ id: "", name: "", msg: "", email: "", phone_no: "" });


  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col" },
    },
    {
      key: "name",
      _props: { scope: "col" },
    },
    {
      key: "phone_no",
      label: "Phone No",
      _props: { scope: "col" },
    },
    {
      key: "email",
      label: "Email",
      _props: { scope: "col" },
    },
    
    {
      key: "action",
      label: "Action",
      _props: { scope: "col" },
    },
  ];


  useEffect(() => {
    apiCall.get('/view-call-back')
      .then(response => {
        setRow(response.data);
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
    setView(viewData || { id: "", name: "", msg: "", email: "", phone_no: "" });
    setVisible(true)
  }

  const handelChange = (e) => {
    setView((item) => ({ ...item, [e.target.name]: e.target.value }))
  }
  const updateData = (view) => {
    try {
      apiCall.put(`/update-user/${view.id}`, view)
        .then(() => { setRow(prevData => prevData.map(item => item.id === view.id ? view : item)) })
      setVisible(false);
    }
    catch (error) {
      console.log(error);
    }

  }
  const deleteData = (id) => {
    try {
      apiCall.delete(`/delete-user/${id}`)
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
                    name="phone_no"
                    label="Mobile Number"
                    value={view.phone_no}
                    onChange={handelChange}
                  />
                </CCol>

              </CRow>
              <CRow>
                <CCol>
                  <CFormTextarea
                    label="Msg"
                    rows={3}
                    name="msg"
                    value={view.msg}
                    onChange={handelChange}
                  ></CFormTextarea>
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

export default ViewCallBack;
