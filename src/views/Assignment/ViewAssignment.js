import { CTable, CModal, CButton, CModalBody, CModalTitle, CFormTextarea, CForm, CFormInput, CModalHeader, CModalFooter, CContainer, CRow, CCol } from "@coreui/react";
import React, { useEffect, useState } from "react";
import apiCall from "src/services/index.ts";


const ViewAssignment = () => {
  let [university, setUniversity] = useState([])
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState({ id: "", subject_name: "", semester: "", sell_price: "", price: "" ,short_description:"",description:"",image:""});
  let [subject, setSubject] = useState([])
  let imageURL = process.env.REACT_APP_BASE_URL+"upload/"
  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col" },
    },
    {
      key: "subject_name",
      _props: { scope: "col" },
    },
    {
      key: "semester",
      label: "Semester",
      _props: { scope: "col" },
    },
    {
      key: "sell_price",
      label: "Sell Price",
      _props: { scope: "col" },
    },
    {
      key: "action",
      label: "Action",
      _props: { scope: "col" },
    },
  ];


  useEffect(() => {
    apiCall.get('/view-assignment')
      .then(response => {
        setUniversity(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

//Select University
const getSelectedVal = async (event) => {
  let selected = event.target.value;
  let find = university.find((item) =>{ return item.name === selected});
  if (find) {
      setSubject(find.subjects);
  } else {
      setSubject([]);
  }
}
  const tableData = subject.map((data, index) => ({
  
    ...data,
    id: index + 1,
    action: (
      <i className="fa fa-pen" onClick={() => handleAction(data.id)}></i>
      )

    }
    )
    )

    //open specific modal
  const handleAction = (id) => {
    const viewData = subject.find(item => item.id === id);
    console.log(viewData);
    setView(viewData || { id: "", subject_name: "", semester: "", sell_price: "", price: "" ,short_description:"",description:"",image:"" });
    setVisible(true)
  }
//handle update form
  const handelChange = (e) => {
    setView((item) => ({ ...item, [e.target.name]: e.target.value }))
  }
  const updateData = (view) => {
    try {
      apiCall.put(`/view-specific-assignment/${view.id}`, view)
        .then(() => { setUniversity(prevData => prevData.map(item => item.id === view.id ? view : item)) })
      setVisible(false);
    }
    catch (error) {
      console.log(error);
    }

  }
  const deleteData = (id) => {
    try {
      apiCall.delete(`/delete-user/${id}`)
        .then(() => { setUniversity(prevData => prevData.filter(item => item.id !== id)) })
      setVisible(false);
    }
    catch (error) {
      console.log(error);
    }


  }
  return (
    <>
      <CRow>
        <CCol md={3}>
          <label htmlFor="select">Select University</label>
        </CCol>
        <CCol md={9}>
          <select id="select" className="form-control" onChange={getSelectedVal}>
            <option value="select">Select University</option>
            {university.map((value) => {
              return (
                <option key={value?.id} value={value?.name} >{value?.name}</option>
              )
            })}

          </select>
        </CCol>

      </CRow>

      <CTable columns={columns} items={tableData} />


      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        size="xl"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">View & Edit Subjects</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CForm>
              <CRow>
                <CCol md="3">
                  <CFormInput
                    type="text"
                    label="Subject Name"
                    name="name"
                    value={view?.subject_name}
                    onChange={handelChange}
                  />
                </CCol>
                <CCol md="3">
                  <CFormInput
                    type="text"
                    name="semester"
                    label="semester"
                    value={view?.semester}
                    onChange={handelChange}
                  />
                </CCol>
                <CCol md="3">
                  <CFormInput
                    type="text"
                    name="sell_price"
                    label="Sell Price"
                    value={view?.sell_price}
                    onChange={handelChange}
                  />
                </CCol>
                <CCol md="3">
                  <CFormInput
                    type="text"
                    name="sell_price"
                    label="Price"
                    value={view?.price}
                    onChange={handelChange}
                  />
                </CCol>

              </CRow>
              <CRow>
                <CCol md="6">
                  <CFormTextarea
                    label="Short Description"
                    rows={3}
                    name="short_description"
                    value={view?.short_description}
                    onChange={handelChange}
                  ></CFormTextarea>
                </CCol>
                <CCol md="6">
                  <CFormTextarea
                    label="Description"
                    rows={3}
                    name="description"
                    value={view?.description}
                    onChange={handelChange}
                  ></CFormTextarea>
                </CCol>
                <CCol md="6">
                  <img src={imageURL + view?.image} onChange={handelChange} name="image" alt="imageofpost"/>
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

export default ViewAssignment;
