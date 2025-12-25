import { CTable, CModal, CButton, CModalBody, CModalTitle, CForm, CFormInput, CModalHeader, CModalFooter, CContainer, CRow, CCol } from "@coreui/react";
import React, { useEffect, useState, useRef, createRef } from "react";
import apiCall from "src/services/index.ts";


const AssignmentCycle = () => {

    const [visible, setVisible] = useState(false);
    const [view, setView] = useState({ id: "", packagename: "", head: "", price: "", del: "", semester: "", img: null });
    let [subject, setSubject] = useState([])

    let imageURL = process.env.REACT_APP_BASE_URL + "uploadCycle/"

    const columns = [
        {
            key: "id",
            label: "S/N",
            _props: { scope: "col" },
        },
        {
            key: "packagename",
            label: "Package Name",
            _props: { scope: "col" },
        },
        {
            key: "head",
            label: "heading",
            _props: { scope: "col" },
        },
        {
            key: "semester",
            label: "Semester",
            _props: { scope: "col" },
        },
        {
            key: "price",
            label: "Sell Price",
            _props: { scope: "col" },
        },

        {
            key: "del",
            label: "Del Price",
            _props: { scope: "col" },
        },
        {
            key: "img",
            label: "Image",
            _props: { scope: "col" },
        },
        {
            key: "action",
            label: "Action",
            _props: { scope: "col" },
        },
    ];

    useEffect(() => {
        getAssignment()
    }, [])

    //get assignment
    const getAssignment = () => {
        try {
            apiCall.get('/get-assignment-cycle')
                .then((item) => { setSubject(item.data) })
        }
        catch (err) {
            console.log(err.message);

        }
    }

    const tableData = subject.map((data, index) => ({

        ...data,
        id: index + 1,
        img: (<img src={imageURL + data.img} alt={data.img} className="img-fluid table-img" />),
        action: (
            <i className="fa fa-pen" onClick={() => handleAction(data.id)}></i>
        )

    }
    )
    )

    //open specific modal
    const handleAction = (id) => {
        const viewData = subject.find(item => item.id === id);
        setView(viewData || { id: "", subject_name: "", semester: "", sell_price: "", price: "", short_description: "", description: "", image: "" });
        setVisible(true)
    }

    const previewImg = createRef(null);
    //handle update form
    const handelChange = (e) => {
        setView((item) => ({ ...item, [e.target.name]: e.target.value }))
    }
    const handleImageChange = (e) => {
        const showImage = URL.createObjectURL(e.target.files[0])
        previewImg.current.src = showImage
        // setView((item) => ({ ...item, image: showImage }))
    }

    //   update check need to work
    let UpdateImage = useRef(null)
    const updateData = (view) => {
        const formData = new FormData();
        Object.keys(view).forEach((key) => {
            console.log(view[key]);
            if (key !== "img") {
                formData.append(key, view[key])
            }
        })
        if (UpdateImage.current.files[0]) {
            console.log(UpdateImage.current.files[0]);
            formData.append('img', UpdateImage.current.files[0])


        }
        try {
            apiCall.put(`/update-assignment-cycle/${view.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(() => {
                    setTimeout(() => {

                    }, 1000)

                })
            setVisible(false);
        }
        catch (error) {
            console.log(error);
        }

    }

    //delete query check
    const deleteData = (id) => {
        try {
            apiCall.delete(`/delete-assignment/${id}`)
                .then(() => { })
            setVisible(false);
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
                                <CCol md="4">
                                    <CFormInput
                                        type="text"
                                        label="Package Name"
                                        name="packagename"
                                        value={view?.packagename}
                                        onChange={handelChange}
                                    />
                                </CCol>
                                <CCol md="4">
                                    <CFormInput
                                        type="text"
                                        name="semester"
                                        label="semester"
                                        value={view?.semester}
                                        onChange={handelChange}
                                    />
                                </CCol>
                                <CCol md="4">
                                    <CFormInput
                                        type="text"
                                        name="price"
                                        label="Price"
                                        value={view?.price}
                                        onChange={handelChange}
                                    />
                                </CCol>
                                <CCol md="4">
                                    <CFormInput
                                        type="text"
                                        name="del"
                                        label="Del Price"
                                        value={view?.del}
                                        onChange={handelChange}
                                    />
                                </CCol>

                            </CRow>
                            <CRow>
                                <CCol md="4">
                                <CFormInput
                                        label="Heading"
                                        rows={3}
                                        name="head"
                                        value={view?.head}
                                        onChange={handelChange}
                                    />
                                </CCol>
                                <CCol md="6">
                                    <div className="image-section">
                                        <label htmlFor="imageUpdate" className="fileUpdate">
                                            <i className="fa fa-camera"></i>
                                            <input type="file" id="imageUpdate" onChange={handleImageChange} name="img" style={{ display: 'none' }} ref={UpdateImage} />
                                        </label>
                                        <img src={view?.image !== "" ? imageURL + view?.img : view?.img} name="img" alt="imageOfPost" className="img-fluid" ref={previewImg} />
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
        </>
    );
};

export default AssignmentCycle;
