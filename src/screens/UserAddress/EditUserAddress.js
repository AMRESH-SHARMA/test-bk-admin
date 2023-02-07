import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";

const EditUserAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  const [user, setUser] = useState('')

  const maxUserName = 50
  const maxEmail = 100
  const maxPhone = 10
  const maxCity = 50

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-single-user/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setUser(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUsers()
  }, [id])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit User Address</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              userName: user?.userName || "",
              email: user?.email || "",
              phone: user?.phone || "",
              city: user?.city || "",
              uniqueId: user._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                console.log(values)
                await axios.put(`${API}/user/update-user/${id}`, values)
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('User Updated successfully', 'green')
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
                .max(maxUserName, `maximum ${maxUserName} characters allowed`)
                .required("Required"),
              email: Yup.string()
                .email()
                .max(maxEmail, `maximum ${maxEmail} characters allowed`)
                .required("Required"),
              phone: Yup.number('only numbers allowed')
                .integer('only numbers allowed')
                .max(9999999999, `maximum ${maxPhone} digits allowed`)
                .required("Required"),
              city: Yup.string()
                .max(maxCity, `maximum ${maxCity} characters allowed`)
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
                  <div style={maxUserName - values.userName.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxUserName - values.userName.length) + '/' + maxUserName}</p>
                  </div>
                  <div style={errors.userName && touched.userName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.userName && touched.userName && errors.userName}&nbsp;</div>

                  <label htmlFor="addressLine">Address Line</label>
                  <input
                    id="addressLine"
                    name="addressLine"
                    type="text"
                    placeholder="Enter your address line"
                    value={values.addressLine}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.addressLine && touched.addressLine && "error"}
                  />
                  <div style={errors.addressLine && touched.addressLine ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.addressLine && touched.addressLine && errors.addressLine}&nbsp;</div>

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
                  <div style={maxCity - values.city.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxCity - values.city.length) + '/' + maxCity}</p>
                  </div>
                  <div style={errors.city && touched.city ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.city && touched.city && errors.city}&nbsp;</div>

                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Enter your state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.state && touched.state && "error"}
                  />
                  <div style={errors.state && touched.state ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.state && touched.state && errors.state}&nbsp;</div>

                  <label htmlFor="zipCode">Pin Code</label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="number"
                    placeholder="Enter your zip code"
                    value={values.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.zipCode && touched.zipCode && "error"}
                  />
                  <div style={errors.zipCode && touched.zipCode ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.zipCode && touched.zipCode && errors.zipCode}&nbsp;</div>


                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Enter your country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.country && touched.country && "error"}
                  />
                  <div style={errors.country && touched.country ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.country && touched.country && errors.country}&nbsp;</div>

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
                    <button type="submit" className="gbtn2 gbtn-save" style={disableStyle} disabled={isSubmitting}>
                      {isSubmitting ? <i className="fa fa-refresh fa-1x" /> : 'Save'}</button>
                    <button type="button" className='gbtn2 gbtn-back' onClick={() => navigate(-1)}>Back</button>
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

export default EditUserAddress