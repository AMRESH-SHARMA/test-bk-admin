import React, { useEffect, useState } from 'react'
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
  const [uid, setUid] = useState('')

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
    async function getUid() {
      await axios.get(`${API}/getUid`)
        .then((resApi) => {
          setUid(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUid()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Add User</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-back' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              userName: "",
              fullName: "",
              email: "",
              phone: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              state: "",
              pinCode: "",
              uniqueId: uid?._id || "",
              timestamp: new Date()
            }}
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
                .max(maxUserName, `maximum ${maxUserName} characters allowed`)
                .required("Required"),
              email: Yup.string()
                .email()
                .max(maxEmail, `maximum ${maxEmail} characters allowed`)
                .required("Required"),
              phone: Yup.string()
                .max(maxPhone, `maximum ${maxPhone} digits allowed`)
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
                    placeholder="Enter your user name"
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

                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.fullName && touched.fullName && "error"}
                  />
                  {/* <div style={maxUserName - values.name.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxUserName - values.name.length) + '/' + maxUserName}</p>
                  </div> */}
                  <div style={errors.fullName && touched.fullName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.fullName && touched.fullName && errors.fullName}&nbsp;</div>

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
                  <div style={maxEmail - values.email.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxEmail - values.email.length) + '/' + maxEmail}</p>
                  </div>
                  <div style={errors.email && touched.email ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.email && touched.email && errors.email}&nbsp;</div>

                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Enter your phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.phone && touched.phone && "error"}
                  />
                  <div style={maxPhone - values.phone.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxPhone - values.phone.toString().length) + '/' + maxPhone}</p>
                  </div>
                  <div style={errors.phone && touched.phone ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.phone && touched.phone && errors.phone}&nbsp;</div>

                  <label htmlFor="addressLine1">Address Line1</label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    placeholder="Enter your address line1"
                    value={values.addressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.addressLine1 && touched.addressLine1 && "error"}
                  />
                  <div style={errors.addressLine1 && touched.addressLine1 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.addressLine1 && touched.addressLine1 && errors.addressLine1}&nbsp;</div>

                  <label htmlFor="addressLine2">Address Line2</label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    placeholder="Enter your address line2"
                    value={values.addressLine2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.addressLine2 && touched.addressLine2 && "error"}
                  />
                  <div style={errors.addressLine2 && touched.addressLine2 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.addressLine2 && touched.addressLine2 && errors.addressLine2}&nbsp;</div>

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

                    <label htmlFor="pinCode">Pin Code</label>
                  <input
                    id="pinCode"
                    name="pinCode"
                    type="number"
                    placeholder="Enter your pinCode"
                    value={values.pinCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.pinCode && touched.pinCode && "error"}
                  />
                  <div style={errors.pinCode && touched.pinCode ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.pinCode && touched.pinCode && errors.pinCode}&nbsp;</div>

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

export default AddUser