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

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit User</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate('/books')}>Back</button>
        </div>
      </div>

      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{ bookName: book?.bookName, genre: book?.genre, language: book?.language, description: book?.description, rentPerDay: book?.rentPerDay, uploadedBy: book?.uploadedBy, timestamp: new Date() }}
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
                .max(50, 'maximum 50 chars allowed')
                .required("Required"),
              genre: Yup.string()
                .required("Required"),
              language: Yup.string()
                .required("Required"),
              description: Yup.string()
                .max(200, 'maximum 200 chars allowed')
                .required("Required"),
              rentPerDay: Yup.number('only numbers allowed')
                .integer('only numbers allowed')
                .required("Required"),
              uploadedBy: Yup.string()
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
                    <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate('/books')}>Back</button>
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