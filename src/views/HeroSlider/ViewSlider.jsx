import React, { useEffect, useState } from 'react'
import apiCall from 'src/services/index.ts'
import { CTable } from '@coreui/react';

const ViewSlider = () => {
  let [slider, setSlider] = useState([]);
  let [isVisible, setIsVisible] = useState([]);



  let imageURL = process.env.REACT_APP_BASE_URL + "uploadSlider/"

  //switch on off by backend
  const isSliderOn = () => {
    apiCall.get("/showSlider")
      .then((res) => {
        setIsVisible(res.data)
      })
      .catch((err) => { console.log(err); })
  }
  // custom switch on off 
  const checkValue = (e) => {
    let isChecked = e.target.checked;
    console.log("returning is checked from check value ", isChecked);

    console.log(slider.length);


    if (isChecked) {
      if (slider.length !== 0) {
        apiCall.put("/showHideSlider", {
          visibility: 1,
          sliderId: isVisible[0].id
        })
          .then((res) => {
            setIsVisible((prev) =>
              prev.map((item, index) => {
                if (index === 0) {
                  return { ...item, visibility: 1 };
                }
                return item;
              })
            );
            alert(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (!isChecked) {
      console.log("Slider Hidden From website");
      apiCall.put("/showHideSlider", {
        visibility: 0,
        sliderId: isVisible[0].id
      })
        .then((res) => {
          setIsVisible((prev) =>
            prev.map((item, index) => {
              if (index === 0) {
                return { ...item, visibility: 0 };
              }
              return item;
            })
          );
          alert(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isChecked && slider.length === 0) {
      alert("Please add at least two images");
    }

  };



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



  useEffect(() => {
    getData();
    isSliderOn();

    setTimeout(() => {
      console.log("isvisible", isVisible);
    }, 2000)
    return clearTimeout()
  }, [])
  



  return (
    <>
      {/* <h3>Do you want to show slider in Home page? </h3>&nbsp; */}
      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Do you want to show slider in Home page?</label>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={checkValue} checked={isVisible.length !== 0 ? Boolean(isVisible[0].visibility) : false} />
      </div>

      <div className="table-responsive">
        <CTable columns={columns} items={tableData} />
      </div>
    </>
  )
}

export default ViewSlider;