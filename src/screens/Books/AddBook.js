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
  const [uid, setUid] = useState('')
  const [languageData, setLanguageData] = useState('')
  const [genreData, setGenreData] = useState('')

  const maxBookName = 50;
  const maxDescription = 200;

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
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-users`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg.result);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUsers()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getLanguages() {
      await axios.get(`${API}/language/get-languages`)
        .then((resApi) => {
          console.log(resApi);
          setLanguageData(resApi.data.msg.result);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getLanguages()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getGenres() {
      await axios.get(`${API}/genre/get-genres`)
        .then((resApi) => {
          console.log(resApi);
          setGenreData(resApi.data.msg.result);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getGenres()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Add Book</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              bookName: "",
              genre: "",
              language: "",
              author: "",
              description: "",
              rentPerDay: "",
              image1: "",
              image2: "",
              image3: "",
              image4: "",
              uploadedBy: "",
              uniqueId: uid?._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                const formData = new FormData();
                formData.append('image1', values.image1);
                formData.append('image2', values.image2);
                formData.append('image3', values.image3);
                formData.append('image4', values.image4);
                formData.append('bookName', values.bookName);
                formData.append('genre', values.genre);
                formData.append('language', values.language);
                formData.append('author', values.author);
                formData.append('description', values.description);
                formData.append('rentPerDay', values.rentPerDay);
                formData.append('uniqueId', values.uniqueId);
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
                .max(maxBookName, `maximum ${maxBookName} chars allowed`)
                .required("Required"),
              author: Yup.string()
                .required("Required"),
              description: Yup.string()
                .max(maxDescription, `maximum ${maxDescription} chars allowed`)
                .required("Required"),
              rentPerDay: Yup.number('only numbers allowed')
                .integer('only numbers allowed')
                .max(999, 'maximum 3 digits allowed')
                .required("Required"),
              image1: Yup.string()
                .required(),
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

                  <label htmlFor="bookName">Book Name </label>
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
                  <div style={maxBookName - values.bookName.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxBookName - values.bookName.length) + '/' + maxBookName}</p>
                  </div>
                  <div style={errors.bookName && touched.bookName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.bookName && touched.bookName && errors.bookName}&nbsp;</div>


                  <label htmlFor="genre">Genre </label>
                  <select
                    name="genre"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value="" label="Select Genre" />
                    {genreData && genreData.map((i, index) => {
                      return (<>
                        <option value={i._id} label={i.genre} />
                      </>
                      )
                    })}
                  </select>
                  <div style={errors.genre && touched.genre ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.genre && touched.genre && errors.genre}&nbsp;</div>

                  <label htmlFor="language">Language </label>
                  <select
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value="" label="Select Language" />
                    {languageData && languageData.map((i, index) => {
                      return (<>
                        <option value={i._id} label={i.language} />
                      </>
                      )
                    })}
                  </select>
                  <div style={errors.language && touched.language ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.language && touched.language && errors.language}&nbsp;</div>

                  <label htmlFor="author">Author </label>
                  <input
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Enter book author"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.author && touched.author && "error"}
                  />
                  <div style={errors.author && touched.author ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.author && touched.author && errors.author}&nbsp;</div>

                  <label htmlFor="description">Description </label>
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
                  <div style={maxDescription - values.description.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxDescription - values.description.length) + '/' + maxDescription}</p>
                  </div>
                  <div style={errors.description && touched.description ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.description && touched.description && errors.description}&nbsp;</div>

                  <label htmlFor="rentPerDay">Rent Per Day </label>
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

                  <label htmlFor="image1">Image1 </label>
                  <input
                    id="image1"
                    name="image1"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("image1", event.currentTarget.files[0])
                    }}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.image1 && touched.image1 && "error"}
                  />
                  <div style={errors.image1 && touched.image1 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.image1 && touched.image1 && errors.image1}&nbsp;</div>

                  <label htmlFor="image2">Image2 (Optional)</label>
                  <input
                    id="image2"
                    name="image2"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("image2", event.currentTarget.files[0])
                    }}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.image2 && touched.image2 && "error"}
                  />
                  <div style={errors.image2 && touched.image2 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.image2 && touched.image2 && errors.image2}&nbsp;</div>

                  <label htmlFor="image3">Image3 (Optional)</label>
                  <input
                    id="image3"
                    name="image3"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("image3", event.currentTarget.files[0])
                    }}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.image3 && touched.image3 && "error"}
                  />
                  <div style={errors.image3 && touched.image3 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.image3 && touched.image3 && errors.image3}&nbsp;</div>

                  <label htmlFor="image4">Image4 (Optional)</label>
                  <input
                    id="image4"
                    name="image4"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("image4", event.currentTarget.files[0])
                    }}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.image4 && touched.image4 && "error"}
                  />
                  <div style={errors.image4 && touched.image4 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.image4 && touched.image4 && errors.image4}&nbsp;</div>


                  <label htmlFor="uploadedBy">Uploaded By </label>
                  <select
                    name="uploadedBy"
                    value={values.uploadedBy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: 'block', ...INPUT.box1 }}
                    required
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

export default AddBook