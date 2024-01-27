import { CCard, CFormInput, CContainer, CForm, CCardBody, CButton, CRow, CCol, CFormSelect, CFormTextarea, CModal, CModalBody, CModalTitle, CModalHeader, CModalFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {
    cilPlus,
} from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import Input from 'src/components/Input'
import apiCall from 'src/services/index.ts'
const AddFreePdf = () => {
    let [assignment, setAssignment] = useState({ university: "", subject_name: "", semester: "", short_description: "", image: null, description: "", sell_price: "", price: "", })
    let [visible, setVisible] = useState(false)
    let [universityName, setUniversityName] = useState({ universityName: "" })
    let [university, setUniversity] = useState([])
    let assignmentForm = [
        {
            key: 1,
            label: "Subject Name",
            id: "subject",
            type: "text",
            placeholder: "Enter Subject Name",
            name: "subject_name",
        },
        {
            key: 2,
            label: "Sell Price",
            id: "sell_price",
            type: "number",
            placeholder: "Enter Sell Price",
            name: "sell_price",
        },
        {
            key: 3,
            label: "Price",
            id: "price",
            type: "number",
            placeholder: "Enter Price",
            name: "price",
        },
    ]
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files);
        setAssignment((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Assignment Object:", assignment);
        const formData = new FormData();
        for (const key in assignment) {
            formData.append(key, assignment[key]);
        }
        try {
            await apiCall.post("/paid-assignment", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((res) => alert(res.data.response))
                .catch(err => alert(err.data.response));

        }

        catch (err) {
            alert(err)
        }

    }

    //get university
    let getUniversity = () => {
        apiCall.get('/view-university')
            .then(res => {
                setUniversity(res.data.response);
            })
            .catch(error => {
                console.error(error);
            });
    }
    let addUniversity = async () => {
        try {
            await apiCall.post("/add-university", universityName)
                .then(res => { alert(res.data.response); getUniversity() })
                .catch(err => alert(err))
        }
        catch (err) {
            console.log(err);
        }
        setVisible(false)
    }
    useEffect(() => {
        getUniversity()

    }, [])
    return (
        <>
            <CCard>
                <CCardBody>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
                        <CRow>
                            <CCol sm={4}> <CIcon icon={cilPlus} title="Download file" onClick={() => setVisible(!visible)} />
                                <CFormSelect
                                    label="Add University"
                                    name="university"
                                    onChange={handleChange}
                                    id="university"
                                    options={[
                                        { label: 'Select', value: '' },
                                        ...university.map((item) => {
                                            return {
                                                label: item.name,
                                                value: item.id
                                            };

                                        })

                                    ]} />

                            </CCol>
                            <CCol sm={4}>
                                <label>Upload Image</label>
                                <input type="file" id="image" name="image" onChange={handleChange} className='form-control mt-1' />

                            </CCol>
                            {
                                assignmentForm.map((item) => {
                                    return (
                                        <CCol key={item.key} sm={4}>
                                            <Input
                                                name={item.name}
                                                type={item.type}
                                                label={item.label}
                                                id={item.id}
                                                placeholder={item.placeholder}
                                                change={handleChange}
                                                value={assignment[item.name]}
                                            />
                                        </CCol>
                                    )
                                })
                            }


                            <CCol sm={4}>
                                <CFormSelect
                                    label="Semester"
                                    name="semester"
                                    onChange={handleChange}
                                    id="semester"
                                    options={[
                                        'Select',
                                        { label: '1', value: '1' },
                                        { label: '2', value: '2' },
                                        { label: '3', value: '3' },
                                        { label: '4', value: '4' },
                                    ]} />

                            </CCol>
                            <CCol sm={4}>
                                <CFormTextarea
                                    label="Short Description"
                                    rows={3}
                                    name="short_description"
                                    value={assignment.short_description}
                                    onChange={handleChange}
                                ></CFormTextarea>
                            </CCol>
                            <CCol sm={4}>
                                <CFormTextarea
                                    label="Description"
                                    rows={3}
                                    name="description"
                                    value={assignment.description}
                                    onChange={handleChange}
                                ></CFormTextarea>
                            </CCol>

                        </CRow>
                        <CButton type='submit' className='mt-3'>Save</CButton>

                    </form>
                </CCardBody>
            </CCard>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                size="sm"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add University</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CForm>
                            <CRow>
                                <CCol>
                                    <CFormInput
                                        type="text"
                                        label="University Name"
                                        name="University Name"
                                        value={university.universityName}
                                        onChange={(e) => setUniversityName((prevItem) => ({ ...prevItem, universityName: e.target.value }))}

                                    />
                                </CCol>


                            </CRow>

                        </CForm>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" >
                        Close
                    </CButton>
                    <CButton color="primary" onClick={addUniversity}>Add</CButton>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default AddFreePdf