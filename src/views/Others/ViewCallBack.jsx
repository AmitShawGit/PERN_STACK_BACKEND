import { CTable } from "@coreui/react";
import React, { useEffect, useState } from "react";
import apiCall from "src/services/index.ts";


const ViewCallBack = () => {
  let [row, setRow] = useState([])


  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col" },
    },
    {
      key: "name",
      _props: { scope: "col" },
    },
    {
      key: "phone_no",
      label: "Phone No",
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
    apiCall.get('/view-call-back')
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
      <i className="fa fa-trash" onClick={() => deleteData(data.id)}></i>
    )
  }))



  const deleteData = (id) => {
    try {
      apiCall.delete(`/delete-review/${id}`)
        .then(() => { setRow(prevData => prevData.filter(item => item.id !== id)) })
    }
    catch (error) {
      console.log(error);
    }


  }
  return (
    <>
      <CTable columns={columns} items={tableData} />


    </>
  );
};

export default ViewCallBack;
