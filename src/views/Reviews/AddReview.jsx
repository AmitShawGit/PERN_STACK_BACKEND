import { CCard, CCardBody, CButton, CRow, CCol } from '@coreui/react'
import React, { useState } from 'react'
import Input from 'src/components/Input'
import apiCall from 'src/services/index.ts'
const AddReview = () => {
    let [assignment, setAssignment] = useState({ id: "", user_name: "", user_comment: "" })
  
    let assignmentForm = [
        {
            key: 1,
            label: "User Name",
            id: "user_name",
            type: "text",
            placeholder: "Enter User Name",
            name: "user_name",
        },
        {
            key: 2,
            label: "User Comment",
            id: "user_comment",
            type: "text",
            placeholder: "Enter User Comment",
            name: "user_comment",
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
        const formData = new FormData();
        for (const key in assignment) {
            formData.append(key, assignment[key]);
        }
        try {
            await apiCall.post("/post-review", formData, {
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

    return (
        <>
            <CCard>
                <CCardBody>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
                        <CRow>
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

                        </CRow>
                        <CButton type='submit' className='mt-3'>Save</CButton>

                    </form>
                </CCardBody>
            </CCard>
        

        </>
    )
}

export default AddReview