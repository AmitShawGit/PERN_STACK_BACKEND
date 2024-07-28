import React, { useEffect, useState } from 'react'
import apiCall from 'src/services/index.ts'
import { CTable } from '@coreui/react';

const ViewSlider = () => {
  let [slider, setSlider] = useState([])
  let imageURL = process.env.REACT_APP_BASE_URL + "uploadSlider/"
  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col" },
    },
    {
      key: "sliderImage",
      _props: { scope: "col" },
    },
    {
      key: "action",
      label: "Action",
      _props: { scope: "col" },
    },
  ];

  let getData = () => {
    try {
      apiCall.get("/view-slider")
        .then(response => {
          setSlider(response.data);
        })

    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const tableData = slider.map((data, index) => ({

    ...data,
    id: index + 1,
    sliderImage: <img src={`${imageURL}` + data.sliderImage} alt='images' className='img-fluid w-50' />,
    action: (
      <i className="fa fa-trash" onClick={() => deleteData(data.id)}></i>
    )

  }
  )
  )

  const deleteData = (id) => {
    try {
      apiCall.delete(`/delete-slider/${id}`)
        .then((res) => { alert(res.data); getData() })
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

export default ViewSlider