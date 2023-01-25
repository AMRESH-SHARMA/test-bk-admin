import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [book, setBook] = useState('')
  const [languageData, setLanguageData] = useState([])
  const [genreData, setGenreData] = useState([])
  const [userData, setUserData] = useState([])

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
    async function getBooks() {
      await axios.get(`${API}/book/get-single-book/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setBook(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getBooks()
  }, [id])  // eslint-disable-line react-hooks/exhaustive-deps

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
  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-users`)
        .then((resApi) => {
          console.log(resApi);
          setUserData(resApi.data.msg.result);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUsers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Book</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              bookName: book?.bookName || "",
              genre: book?.genre || "",
              language: book?.language || "",
              description: book?.description || "",
              rentPerDay: book?.rentPerDay || "",
              uniqueId: book?._id || "",
              uploadedBy: book?.uploadedBy || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                // console.log(values)
                await axios.put(`${API}/book/update-book/${id}`, values)
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('Book Updated successfully', 'green')
                    navigate('/books')
                  })
                  .catch((e) => {
                    console.log(e);
                    handleAlert(e.response.data.msg, 'red')
                  })
                setSubmitting(false);
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              bookName: Yup.string()
                .max(maxBookName, `maximum ${maxBookName} chars allowed`)
                .required("Required"),
              description: Yup.string()
                .max(maxDescription, `maximum ${maxDescription} chars allowed`)
                .required("Required"),
              rentPerDay: Yup.number('only numbers allowed')
                .integer('only numbers allowed')
                .max(999, 'maximum 3 digits allowed')
                .required("Required"),
            })}>

            {props => {
              const {
                values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
              } = props;

              if (isSubmitting) {
                var disableStyle = { cursor: "not-allowed", }
              }

              return (<>
                <form
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
                  <div style={maxBookName - values.bookName.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxBookName - values.bookName.length) + '/' + maxBookName}</p>
                  </div>
                  <div style={errors.bookName && touched.bookName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.bookName && touched.bookName && errors.bookName}&nbsp;</div>

                  <label htmlFor="genre">Genre</label>
                  <select
                    name="genre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value={values.genre._id} label={values.genre.genre} />
                    {genreData && genreData.map((i, index) => {
                      return (<>
                        <option value={i._id}>{i.genre}</option>
                      </>
                      )
                    })}
                  </select>
                  <div style={errors.genre && touched.genre ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.genre && touched.genre && errors.genre}&nbsp;</div>

                  <label htmlFor="language">Language</label>
                  <select
                    name="language"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value={values.language._id} label={values.language.language}/>
                    {languageData && languageData.map((i, index) => {
                      return (<>
                        <option value={i._id}>{i.language}</option>
                      </>
                      )
                    })}
                  </select>
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
                  <div style={maxDescription - values.description.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxDescription - values.description.length) + '/' + maxDescription}</p>
                  </div>
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

                    <label htmlFor="uploadedBy">uploadedBy</label>
                  <select
                    name="uploadedBy"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value={values.uploadedBy._id} label={values.uploadedBy.userName}/>
                    {userData && userData.map((i, index) => {
                      return (<>
                        <option value={i._id}>{i.userName}</option>
                      </>
                      )
                    })}
                  </select>
                  <div style={errors.language && touched.language ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.language && touched.language && errors.language}&nbsp;</div>

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

export default EditBook