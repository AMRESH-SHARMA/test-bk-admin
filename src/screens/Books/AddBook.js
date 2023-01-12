import React, { useState, useEffect } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";

const AddBook = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();
  const [ApiData, setApiData] = useState('')

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-users`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUsers()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Add Book</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate('/users')}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            initialValues={{ bookName: "", genre: "", language: "", description: "", rentPerDay: "", image1: "", uploadedBy: "", timestamp: new Date() }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                const formData = new FormData();
                formData.append('image1', values.image1);
                formData.append('bookName', values.bookName);
                formData.append('genre', values.genre);
                formData.append('language', values.language);
                formData.append('description', values.description);
                formData.append('rentPerDay', values.rentPerDay);
                formData.append('uploadedBy', values.uploadedBy);
                await axios.post(`${API}/book/create-book`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  }
                })
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('Book Created', 'green')
                    navigate('/books')
                  })
                  .catch((e) => {
                    console.log(e);
                    handleAlert(e.response.data.msg, 'red')
                  }).finally(() => setSubmitting(false))
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              bookName: Yup.string()
                .max(50, 'maximum 50 chars allowed')
              // .required("Required"),
              // genre: Yup.string()
              //   .required("Required"),
              // language: Yup.string()
              //   .required("Required"),
              // description: Yup.string()
              //   .max(200, 'maximum 200 chars allowed')
              //   .required("Required"),
              // rentPerDay: Yup.number('only numbers allowed')
              //   .integer('only numbers allowed')
              //   .required("Required"),
              // uploadedBy: Yup.string()
              //   .required("Required"),
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
                  enctype="multipart/form-data"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                  <label htmlFor="bookName">Book Name</label>
                  <input
                    id="bookName"
                    name="bookName"
                    type="text"
                    placeholder="Enter book name"
                    value={values.bookName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.bookName && touched.bookName && "error"}
                  />
                  <div style={errors.bookName && touched.bookName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.bookName && touched.bookName && errors.bookName}&nbsp;</div>

                  <label htmlFor="genre">Genre</label>
                  <input
                    id="genre"
                    name="genre"
                    type="text"
                    placeholder="Enter book genre"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.genre && touched.genre && "error"}
                  />
                  <div style={errors.genre && touched.genre ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.genre && touched.genre && errors.genre}&nbsp;</div>

                  <label htmlFor="language">Language</label>
                  <input
                    id="language"
                    name="language"
                    type="text"
                    placeholder="Enter book language"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.language && touched.language && "error"}
                  />
                  <div style={errors.language && touched.language ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.language && touched.language && errors.language}&nbsp;</div>

                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Enter book description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.description && touched.description && "error"}
                  />
                  <div style={errors.description && touched.description ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.description && touched.description && errors.description}&nbsp;</div>

                  <label htmlFor="rentPerDay">Rent Per Day</label>
                  <input
                    id="rentPerDay"
                    name="rentPerDay"
                    type="number"
                    placeholder="Enter book's rent per day"
                    value={values.rentPerDay}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.rentPerDay && touched.rentPerDay && "error"}
                  />
                  <div style={errors.rentPerDay && touched.rentPerDay ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.rentPerDay && touched.rentPerDay && errors.rentPerDay}&nbsp;</div>

                  <label htmlFor="image1">Image1</label>
                  <input
                    id="image1"
                    name="image1"
                    type="file"
                    onChange={(event) => {
                      // setImage1(URL.createObjectURL(event.target.files[0]))
                      setFieldValue("image1", event.currentTarget.files[0])
                    }}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.image1 && touched.image1 && "error"}
                  />
                  <div style={errors.image1 && touched.image1 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.image1 && touched.image1 && errors.image1}&nbsp;</div>
{/* 
                  <img style={{ width: 'auto', height: '100px' }} src={URL.createObjectURL(values.image1)} alt={values.image1.name} /> */}

                  <label htmlFor="uploadedBy">Uploaded By</label>
                  <select
                    name="uploadedBy"
                    value={values.uploadedBy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: 'block', ...INPUT.box1 }}
                  >
                    <option value="" label="Select a User" />
                    {ApiData && ApiData.map((i, index) => {
                      return (<>
                        <option value={i._id} label={i.userName} />
                      </>
                      )
                    })}
                  </select>
                  <div style={errors.uploadedBy && touched.uploadedBy ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.uploadedBy && touched.uploadedBy && errors.uploadedBy}&nbsp;</div>

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
                    value={'(376274632478)dummy uid'}
                    onChange={handleChange}
                    style={INPUT.boxdisable}
                    disabled
                  />
                  <div style={ERROR.inputFFalse}>
                  </div>

                  <div className='gcard-btn-panel'>
                    <button type="submit" className="gbtn2 gbtn-dblue" style={disableStyle} disabled={isSubmitting}>
                      {isSubmitting ? <i className="fa fa-refresh fa-1x" /> : 'Save'}</button>
                    <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate('/users')}>Back</button>
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

export default AddBook