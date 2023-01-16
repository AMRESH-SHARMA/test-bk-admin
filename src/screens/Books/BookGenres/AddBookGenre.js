import React, { useState, useEffect } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../../assets/constants/theme";
import { API } from "../../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../Redux/actions/useAlert";

const AddBookGenre = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();
  const [uid, setUid] = useState('')

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }
  useEffect(() => {
    async function getUid() {
      await axios.get(`${API}/getUid`)
        .then((resApi) => {
          console.log(resApi);
          setUid(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUid()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Add Genre</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              genre: "",
              image: "",
              uniqueId: uid?._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                const formData = new FormData();
                formData.append('uniqueId', values.uniqueId);
                formData.append('image', values.image);
                formData.append('genre', values.genre);
                await axios.post(`${API}/genre/create-genre`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  }
                })
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('Genre Created', 'green')
                    navigate('/books/genre')
                  })
                  .catch((e) => {
                    console.log(e);
                    handleAlert(e.response.data.msg, 'red')
                  }).finally(() => setSubmitting(false))
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              genre: Yup.string()
                .max(50, 'maximum 20 chars allowed')
                .required('required feild')
            })}
          >

            {props => {
              const {
                values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue
              } = props;

              if (isSubmitting) {
                var disableStyle = { cursor: "not-allowed", }
              }

              return (<>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                  <label htmlFor="genre">Genre</label>
                  <input
                    id="genre"
                    name="genre"
                    type="text"
                    placeholder="Enter genre"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.genre && touched.genre && "error"}
                  />
                  <div style={errors.genre && touched.genre ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.genre && touched.genre && errors.genre}&nbsp;</div>

                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      // setimage(URL.createObjectURL(event.target.files[0]))
                      setFieldValue("image", event.currentTarget.files[0])
                    }}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.image && touched.image && "error"}
                  />
                  <div style={errors.image && touched.image ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.image && touched.image && errors.image}&nbsp;</div>
                  {/* 
                  <img style={{ width: 'auto', height: '100px' }} src={URL.createObjectURL(values.image)} alt={values.image.name} /> */}

                  <label htmlFor="timestamp">TimeStamp</label>
                  <input
                    id="timestamp"
                    name="timestamp"
                    value={new Date()}
                    onChange={handleChange}
                    style={INPUT.boxdisable}
                    disabled
                  />
                  <div style={ERROR.inputFFalse}>
                  </div>

                  <label htmlFor="uniqueId">Unique Id</label>
                  <input
                    id="uniqueId"
                    name="uniqueId"
                    value={values.uniqueId}
                    onChange={handleChange}
                    style={INPUT.boxdisable}
                    disabled
                  />
                  <div style={ERROR.inputFFalse}>
                  </div>

                  <div className='gcard-btn-panel'>
                    <button type="submit" className="gbtn2 gbtn-dblue" style={disableStyle} disabled={isSubmitting}>
                      {isSubmitting ? <i className="fa fa-refresh fa-1x" /> : 'Save'}</button>
                    <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
                  </div>
                </form>
              </>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>

  </>
  )
}

export default AddBookGenre