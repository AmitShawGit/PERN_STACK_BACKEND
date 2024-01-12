import { CCard, CCardBody, CButton, CRow, CCol, CFormSelect, CFormTextarea } from '@coreui/react'
import React, { useState } from 'react'
import Input from 'src/components/Input'
const AddAssignment = () => {
    let [assignment, setAssignment] = useState({ subject_name: "", semester: "", short_description: "", description: "", image: "", sell_price: "", price: "", })
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
        {
            key: 4,
            label: "Image",
            id: "image",
            type: "file",
            placeholder: "Enter Image",
            name: "image",
        },
    ]
    const handleChange = (e) => {
        setAssignment((item) => ({ ...item, [e.target.name]: e.target.value }))

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(assignment);
    }
    return (
        <>
            <CCard>
                <CCardBody>
                    <form onSubmit={handleSubmit}  encType='multipart/form-data'>
                        <CRow>
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
                                                value={assignment[item.name]} />
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
                        <CButton type='submit'>Save</CButton>

                    </form>
                </CCardBody>
            </CCard>

        </>
    )
}

export default AddAssignment