import { CTable } from "@coreui/react";
import React, { useEffect, useState } from "react";
import apiCall from "src/services/index.ts";


const ViewBlog = () => {
    let [blog, setBlog] = useState([])
    const columns = [
        {
            key: "id",
            label: "S/N",
            _props: { scope: "col" },
        },
        {
            key: "blogTitle",
            _props: { scope: "col" },
        },

        {
            key: "shortDesc",
            label: "Short Desc",
            _props: { scope: "col" },
        },
        {
            key: "tags",
            label: "Tags",
            _props: { scope: "col" },
        },
        {
            key: "description",
            label: "Description",
            _props: { scope: "col" },
        },
        {
            key: "date",
            label: "Date",
            _props: { scope: "col" },
        },
        {
            key: "action",
            label: "Action",
            _props: { scope: "col" },
        },
    ];


    useEffect(() => {
        getDataFromApi()
    }, []);

    //fetch university
    let getDataFromApi = () => {
        apiCall.get('/view-blog')
            .then(response => {
                console.log("i m response", response);

                setBlog(response.data.response);
            })
            .catch(error => {
                console.error(error);
            });
    }


    const tableData = blog.map((data, index) => ({

        ...data,
        id: index + 1,

        action: (
            <i className="fa fa-trash" onClick={() => handleAction(data.id)}></i>
        )

    }
    )
    )

    //handle update form

    const handleAction = (id) => {
        try {
            apiCall.delete(`/delete-blog/${id}`)
                .then(() => { setBlog(prevData => prevData.filter(item => item.id !== id)) })
            alert("Blog Deleted")
        }
        catch (error) {
            console.log(error);
        }


    }
    return (
        <>
            <div className="table-responsive">
                <CTable columns={columns} items={tableData} />
            </div>
            {/*  
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
                    name="price"
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
                  <div className="image-section">
                    <label htmlFor="imageUpdate" className="fileUpdate">
                      <i className="fa fa-camera"></i>
                      <input type="file" id="imageUpdate" onChange={handleImageChange} name="image" style={{ display: 'none' }} ref={UpdateImage} />
                    </label>
                    <img src={view?.image !== "" ? imageURL + view?.image: view?.image} name="image" alt="imageOfPost" className="img-fluid" ref={previewImg} />
                  </div>
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

      */}
        </>
    );
};

export default ViewBlog;
