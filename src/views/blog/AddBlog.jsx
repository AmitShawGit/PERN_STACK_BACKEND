import React, { useState } from "react";
import { CCol, CContainer, CForm, CRow, CFormInput, CCard } from "@coreui/react";
import { useForm } from "@refinedev/react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "src/lib/Validator";
import apiCall from "src/services/index.ts";

export default function AddBlog() {
    let [tag, setTag] = useState([])
    let [showTag, setShowTag] = useState(false)

    const formSchema = blogSchema.pick({
        blogTitle: true,
        shortDesc: true,
        description: true
    })
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blogTitle: "",
            shortDesc: "",
            description: "",
            tags: ""
        },
    });

    const listTag = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const value = e.target.value.trim();
            if (!value) return;

            setTag((prev) => [...prev, value]);
            setShowTag(true);
            e.target.value = "";
        }
    };


    const handleFormSubmit = async (values) => {
        console.log("I am clicked");

        let addValue = { ...values, tag }

        console.log(addValue);

        try {
            apiCall.post('/add-blog', addValue)
                .then(res => res.data.json())
                .then(res => alert(res.data))
        }
        catch (err) {
            console.log(err);

        }


    }

    return (
        <>
            <CContainer>
                <CCard className="p-2">
                    <CForm onSubmit={handleSubmit(handleFormSubmit)}>

                        <CRow>
                            <CCol md="4">
                                <CFormInput
                                    type="text"
                                    label="Blog Title"
                                    name="blogTitle"
                                    {...register('blogTitle')}
                                />
                            </CCol>
                            <CCol md="4">
                                <CFormInput
                                    type="text"
                                    name="shortDesc"
                                    label="Short Description"
                                    {...register('shortDesc')}
                                />
                            </CCol>
                            <CCol md="4">
                                <CFormInput
                                    type="text"
                                    name="description"
                                    label="Description"
                                    {...register('description')}
                                />
                            </CCol>
                            <CCol md="4">
                                <CFormInput
                                    type="text"
                                    label="Tags"

                                    onKeyDown={listTag}

                                />

                                <ul>
                                    {showTag && tag?.map((tag, index) => <li key={index}>{tag}</li>)}

                                </ul>
                            </CCol>

                        </CRow>
                        <button type="submit">Submit</button>


                    </CForm>
                </CCard>
            </CContainer>
        </>
    )
}