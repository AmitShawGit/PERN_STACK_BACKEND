import React, { useState, useEffect } from 'react';
import { CModal, CButton, CModalBody, CModalTitle, CModalHeader, CModalFooter, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import apiCall from 'src/services/index.ts';
const PurchaseOrder = () => {
  let [row, setRow] = useState([])
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState({});

  //showDetails
  let showDetails = () => {
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
      await apiCall.get("/")
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
        <CCol md={4}>
          <CCard className='paymentCard' onClick={showDetails}>
            <CCardBody>
              <ul className='list-none'>
                <li>Subject : Business Studies</li>
                <li>Price :<span className='text-success'>$600</span> </li>
                <li>Buyer Name : Amit Shaw</li>
                <li><i className="fa fa-envelope"></i> amitshaw@gmail.com</li>
                <li><i className="fa fa-phone"></i> 8918769445</li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
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