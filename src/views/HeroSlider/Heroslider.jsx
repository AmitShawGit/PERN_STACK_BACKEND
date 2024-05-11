import React from 'react';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
const Heroslider = () => {
  return (
    <>

        <CCard>
          <CCardBody>
      <CRow>
            <CCol md={5}>
              <label htmlFor="addImg">Add Image</label>
              <input type="file" name="sliderImg" id="addImg" className='form-control' />
            </CCol>

      </CRow>
      <CRow >
        <CCol md={4} className='preview-slider-img'>
          <span><i className="fa fa-x"></i></span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Dscn4066-pendennis-dark-in-shed_crop_1200x600.jpg" alt="" className='img-fluid' />
        </CCol>
      </CRow>
          </CCardBody>

        </CCard>


    </>
  )
}

export default Heroslider;