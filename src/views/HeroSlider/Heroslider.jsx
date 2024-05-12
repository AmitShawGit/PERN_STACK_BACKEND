import React, { useState, createRef } from 'react';
import { CCard, CCardBody, CRow, CCol, CButton } from '@coreui/react';
const Heroslider = () => {

  let [previewImage, setPreviewImage] = useState(null);
  let [isVisible, setIsVisible] = useState(false)
  let imageFile = createRef();

  let uploadImage = (e) => {
    let imgObject = URL.createObjectURL(e.target.files[0])
    setPreviewImage(imgObject)
    setIsVisible(true)
  }
  let removeImage = () => {
    setPreviewImage(null);
    imageFile.current.value = "";
    setIsVisible(false)
  }
  let postImage = () => {

  }

  return (
    <>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol md={5}>
              <label htmlFor="addImg">Add Image</label>
              <input type="file" name="sliderImg" id="addImg" className='form-control' onChange={uploadImage} ref={imageFile} />
            </CCol>
            <CCol md={3}>
              {isVisible && <CButton className="btn btn-success mt-4" onClick={postImage}>Post</CButton>}
            </CCol>
          </CRow>
          <CRow >
            <CCol md={4} className='preview-slider-img'>
              {previewImage && (
                <div>
                  <span><i className="fa fa-x" onClick={removeImage}></i></span>
                  <img src={previewImage} alt="" className='img-fluid' />
                </div>
              )}
            </CCol>
          </CRow>
        </CCardBody>

      </CCard>


    </>
  )
}

export default Heroslider;