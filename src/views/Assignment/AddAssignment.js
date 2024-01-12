import { CCard, CCardBody, CButton, CRow, CCol, CFormSelect, CFormTextarea } from '@coreui/react'
import React, { useState } from 'react'
import Input from 'src/components/Input'
import apiCall from 'src/services/index.ts'
const AddAssignment = () => {
    let [assignment, setAssignment] = useState({ subject_name: "", semester: "", short_description: "", description: "", image: null, sell_price: "", price: "", })


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
        setAssignment((item) => ({
            ...item,
            [name]: name === 'image' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in assignment) {
                formData.append(key, assignment[key]);
            }
            console.log(formData);
            await apiCall.post("/paid-assignmen", formData)
                .then((res) => alert(res.data))
                .catch(err => alert(err.data))
           
        }
        catch (err) {
            alert(err)
        }

    }
    return (
        <>
            <CCard>
                <CCardBody>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                                                value={assignment[item.name]}
                                            />
                                        </CCol>
                                    )
                                })
                            }

                            <CCol sm={4}>
                                <Input type="file" id="image" label="Image" name="image" onChange={handleChange} value={assignment.image} />

                            </CCol>
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