import React, { useState, useEffect } from 'react';
import { CModal, CButton, CModalBody, CModalTitle, CModalHeader, CModalFooter, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import apiCall from 'src/services/index.ts';

const PurchaseOrder = () => {
  let [row, setRow] = useState([])
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState({ id: "", paymentimage: "" });
  let imageURL = process.env.REACT_APP_BASE_URL +'payments/'


  const getPaymentInfo = async () => {
    try {
      await apiCall.get("/paymentinfo")
        .then((res) => { 
          setRow(res.data.response);
        })
    }
    catch (err) {
      console.log(err);
    }
  }
  const getSpecificPayment = async (id) => {
    setVisible(true)
    try {
      await apiCall.get(`/api/paymentinfo/${id}`)
        .then((res) => {
         
          setView({ paymentimage: res.data[0].paymentimage, id: res.data[0].id });
         
        })

    }
    catch (err) {
      console.log(err);
    }
  }
  const deleteData = (id) => {
    try {
      apiCall.delete(`/delete-payment/${id}`)
        .then(() => { setRow(prevData => prevData.filter(item => item.id !== id)) })
      setVisible(false);
    }
    catch (error) {
      console.log(error);
    }


  }
  //search

  const searchItem = (e) => {
    let searchQuery = e.target.value.toLowerCase();
    let dataSearch = row.filter(item =>
      item.subject.toLowerCase().includes(searchQuery) || item.name.toLowerCase().includes(searchQuery) || item.email.includes(searchQuery)

    );
    setRow(dataSearch)

  }


  //call api
  useEffect(() => {
    getPaymentInfo()
  }, [])


  return (

    <>
      <div className="searchBars">
        <input type="text" onChange={searchItem} />
      </div>
      <CRow>
        {row.map((item) => {
          return (<CCol md={4} key={item.id}>
            <CCard className='paymentCard' onClick={() => getSpecificPayment(item.id)}>
              <CCardBody>
                <ul className='list-none'>
                  <li>Subject : {item.subject}</li>
                  <li>Price :{item.price} </li>
                  <li>Amount Paid :<span className='text-success'>{item.amount}</span> </li>
                  <li>Buyer Name : {item.name}</li>
                  <li><i className="fa fa-envelope"></i> {item.email}</li>
                  <li><i className="fa fa-phone"></i> {item.contact}</li>
                  <li><i className="fa fa-calendar"></i> {item.todayDate}</li>
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
            <img src={imageURL + view?.paymentimage} alt="" className='img-fluid' />
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