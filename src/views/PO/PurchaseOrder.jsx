import React, { useState, useEffect } from 'react';
import { CModal, CButton, CModalBody, CModalTitle, CModalHeader, CModalFooter, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import apiCall from 'src/services/index.ts';
const PurchaseOrder = () => {
  let [row, setRow] = useState([])
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState({});

  //showDetails
  let showDetails = (val) => {
    console.log(val);
    setVisible(true)
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
  const getPaymentInfo = async () => {
    try {
      await apiCall.get("/paymentinfo")
        .then((res) => {setRow(res.data.response);})
    }
    catch (err) {
      console.log(err);
    }
  }
  const getSpecificPayment = async (id) => {
    console.log(id);
    try {
      await apiCall.get(`/api/paymentinfo/${id}`)
        .then((res) => res.response)
    }
    catch (err) {
      console.log(err);
    }
  }
  //call api
  useEffect(() => {
    getPaymentInfo()
  }, [])
  return (

    <>
      <CRow>
        { row.map((item)=>{
       return  ( <CCol md={4} key={item.id}>
          <CCard className='paymentCard' onClick={()=>getSpecificPayment(item.id)}>
            <CCardBody>
              <ul className='list-none'>
                <li>Subject : {item.subject}</li>
                <li>Price :{item.price} </li>
                <li>Amount Paid :<span className='text-success'>{item.amount}</span> </li>
                <li>Buyer Name : {item.name}</li>
                <li><i className="fa fa-envelope"></i> {item.email}</li>
                <li><i className="fa fa-phone"></i> {item.contact}</li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>)
        })}
        
      </CRow>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        size="lg"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">View Payment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>

          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => { deleteData(view.id) }}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default PurchaseOrder