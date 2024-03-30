import { CTable, CModal, CButton, CModalBody, CModalTitle, CForm, CFormInput, CModalHeader, CModalFooter, CContainer, CRow, CCol } from "@coreui/react";
import React, { useEffect, useState } from "react";
import apiCall from "src/services/index.ts";


const ViewReview = () => {
    let [row, setRow] = useState([])
    const [visible, setVisible] = useState(false);
    const [view, setView] = useState({ id: "", user_name: "", user_comment: "" });
    let imageURL = process.env.REACT_APP_BASE_URL + "upload/"

    const columns = [
        {
            key: "id",
            label: "S/N",
            _props: { scope: "col" },
        },
        {
            key: "user_name",
            _props: { scope: "col" },
        },


        {
            key: "user_comment",
            label: "User Comment",
            _props: { scope: "col" },
        },
        {
            key: "action",
            label: "Action",
            _props: { scope: "col" },
        },
    ];


    useEffect(() => {
        apiCall.get('/view-review')
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
        setView(viewData || { id: "", user_name: "", user_comment: "" });
        setVisible(true)
    }

    const handelChange = (e) => {
        setView((item) => ({ ...item, [e.target.name]: e.target.value }))
    }
    const updateData = (view) => {
        try {
            apiCall.put(`/update-review/${view.id}`, view)
                .then(() => { setRow(prevData => prevData.map(item => item.id === view.id ? view : item)) })
            setVisible(false);
        }
        catch (error) {
            console.log(error);
        }

    }
    const deleteData = (id) => {
        try {
            apiCall.delete(`/delete-ratings/${id}`)
                .then(() => { setRow(prevData => prevData.filter(item => item.id !== id)) })
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
                                        name="user_name"
                                        value={view.user_name}
                                        onChange={handelChange}
                                    />
                                </CCol>

                                <CCol md="auto">
                                    <CFormInput
                                        type="text"
                                        name="user_comment"
                                        label="User Comment"
                                        value={view.user_comment}
                                        onChange={handelChange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>

                                <CCol md="auto" className="mt-5">
                                    <img src={imageURL + view?.image} onChange={handelChange} name="image" alt="imageofpost" className="img-fluid" />
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

export default ViewReview;
