import React, { useEffect, useState } from 'react'
import { CTable } from "@coreui/react";
import apiCall from 'src/services/index.ts';
const NewsLetter = () => {
    let [row, setRow] = useState([])
    const columns = [
        {
            key: "id",
            label: "S/N",
            _props: { scope: "col" },
        },

        {
            key: "email",
            label: "Email",
            _props: { scope: "col" },
        },

        {
            key: "action",
            label: "Action",
            _props: { scope: "col" },
        },
    ];


    useEffect(() => {
        apiCall.get('/newsletter-get')
            .then(response => {
                setRow(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const tableData = row?.map((data, index) => ({
        ...data,
        id: index + 1,
        action: (
            <i className="fa fa-trash" onClick={() => deleteData(data.id)}></i>
        )
    }))
    const deleteData = (id) => {
        try {
            apiCall.delete(`/delete-newsletter/${id}`)
                .then(() => { setRow(prevData => prevData.filter(item => item.id !== id)) })

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

        </>
    )
}

export default NewsLetter