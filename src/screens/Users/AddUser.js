import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";

const AddUser = () => {

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
        <p>Add User</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate('/users')}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            initialValues={{ userName: "", email: "", phone: "", city: "", timestamp: new Date() }}
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
              userName: Yup.string()
                .max(50, 'maximum 50 chars allowed')
                .required("Required"),
              email: Yup.string()
                .email()
                .max(100, 'maximum 100 chars allowed')
                .required("Required"),
              phone: Yup.string()
                .max(10, 'maximum 10 chars allowed')
                .required("Required"),
              city: Yup.string()
                .max(50, 'maximum 50 chars allowed')
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

                  <label htmlFor="userName">User Name</label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter your userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.userName && touched.userName && "error"}
                  />
                  <div style={errors.userName && touched.userName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.userName && touched.userName && errors.userName}&nbsp;</div>

                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.email && touched.email && "error"}
                  />
                  <div style={errors.email && touched.email ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.email && touched.email && errors.email}&nbsp;</div>

                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter your phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.phone && touched.phone && "error"}
                  />
                  <div style={errors.phone && touched.phone ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.phone && touched.phone && errors.phone}&nbsp;</div>

                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.city && touched.city && "error"}
                  />
                  <div style={errors.city && touched.city ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.city && touched.city && errors.city}&nbsp;</div>

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

export default AddUser