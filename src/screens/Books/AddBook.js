import React from 'react'
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

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

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
            initialValues={{ bookname: "", genre: "", language: "", description: "", rentperday: "", timestamp: new Date() }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                await axios.post(`${API}/user/create-user`, values)
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('User Created', 'green')
                    navigate('/users')
                  })
                  .catch((e) => {
                    console.log(e);
                    handleAlert(e.response.data.msg, 'red')
                  })
                setSubmitting(false);
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              bookname: Yup.string()
                .max(50, 'maximum 50 chars allowed')
                .required("Required"),
              genre: Yup.string()
                .required("Required"),
              language: Yup.string()
                .required("Required"),
              description: Yup.string()
                .max(200, 'maximum 200 chars allowed')
                .required("Required"),
              rentperday: Yup.string()
                .required("Required"),
            })}
          >

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

                  <label htmlFor="bookname">Book Name</label>
                  <input
                    id="bookname"
                    name="bookname"
                    type="text"
                    placeholder="Enter book name"
                    value={values.bookname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.bookname && touched.bookname && "error"}
                  />
                  <div style={errors.bookname && touched.bookname ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.bookname && touched.bookname && errors.bookname}&nbsp;</div>

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

                  <label htmlFor="rentperday">Rent Per Day</label>
                  <input
                    id="rentperday"
                    name="rentperday"
                    type="text"
                    placeholder="Enter book's rent per day"
                    value={values.rentperday}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.rentperday && touched.rentperday && "error"}
                  />
                  <div style={errors.rentperday && touched.rentperday ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.rentperday && touched.rentperday && errors.rentperday}&nbsp;</div>

                  <label htmlFor="images">Images</label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    value={values.images}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.images && touched.images && "error"}
                  />
                  <div style={errors.rentperday && touched.rentperday ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.rentperday && touched.rentperday && errors.rentperday}&nbsp;</div>

                  <label htmlFor="rentperday">Uploaded By</label>
                  <select style={INPUT.box1}>
                    <option>a</option>
                    <option>a</option>
                  </select>
                  <div style={errors.rentperday && touched.rentperday ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.rentperday && touched.rentperday && errors.rentperday}&nbsp;</div>

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