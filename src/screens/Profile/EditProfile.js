import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";
import { decodedAuthToken } from '../../utils/auth';
import PreviewImage from '../../components/PreviewImage';
import Spinner from '../../assets/Spinner/Spinner';

const EditProfile = () => {
  const navigate = useNavigate();
  const [apiloading, setApiLoading] = useState(true)
  const { displayAlert } = useAlert();
  const [admin, setAdmin] = useState([])

  const maxadminName = 50
  const maxEmail = 100
  // const maxPhone = 10
  // const maxCity = 50

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getSingleAdmins() {
      const token = decodedAuthToken()
      if (token) {
        await axios.get(`${API}/admin/get-single-admin/${token.id}`)
          .then((resApi) => {
            console.log(resApi);
            setAdmin(resApi.data.msg);
          })
          .catch((e) => {
            console.log(e);
            handleAlert(e.response.data.msg, 'red')
          });
        setApiLoading(false)
      } else handleAlert('Server error', 'red')

    } getSingleAdmins()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Profile</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      {apiloading ?
        <div style={{ marginTop: "3rem" }} className='gspinnerflex'>
          <Spinner />
        </div>
        :
        <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                adminName: admin?.name || "",
                email: admin?.email || "",
                // phone: admin?.phone || "",
                // city: admin?.city || "",
                image: admin?.image?.url || "",
                uniqueId: admin?._id || "",
                timestamp: new Date()
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  const formData = new FormData();
                  formData.append('adminName', values.adminName);
                  formData.append('email', values.email);
                  formData.append('image', values.image);
                  formData.append('uniqueId', values.uniqueId);
                  const token = decodedAuthToken()
                  await axios.put(`${API}/admin/update-admin/${token.id}`, formData)
                    .then((resApi) => {
                      console.log(resApi)
                      handleAlert('admin Updated successfully', 'green')
                      navigate(0)
                    })
                    .catch((e) => {
                      console.log(e);
                      handleAlert(e.response.data.msg, 'red')
                    })
                  setSubmitting(false);
                }, 500);
              }}

              validationSchema={Yup.object().shape({
                adminName: Yup.string()
                  .max(maxadminName, `maximum ${maxadminName} characters allowed`)
                  .required("Required"),
                email: Yup.string()
                  .email()
                  .max(maxEmail, `maximum ${maxEmail} characters allowed`)
                  .required("Required"),
                // phone: Yup.number('only numbers allowed')
                //   .integer('only numbers allowed')
                //   .max(9999999999, `maximum ${maxPhone} digits allowed`)
                //   .required("Required"),
                // city: Yup.string()
                //   .max(maxCity, `maximum ${maxCity} characters allowed`)
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
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                    <label htmlFor="adminName">Name</label>
                    <input
                      id="adminName"
                      name="adminName"
                      type="text"
                      placeholder="Enter your adminName"
                      value={values.adminName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={INPUT.box1}
                      className={errors.adminName && touched.adminName && "error"}
                    />
                    <div style={maxadminName - values.adminName.length < 0 ? { display: 'block' } : null}>
                      <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxadminName - values.adminName.length) + '/' + maxadminName}</p>
                    </div>
                    <div style={errors.adminName && touched.adminName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                      {errors.adminName && touched.adminName && errors.adminName}&nbsp;</div>

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

                    {/* <label htmlFor="phone">Phone Number</label>
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
                  <div style={maxPhone - values.phone.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxPhone - values.phone.toString().length) + '/' + maxPhone}</p>
                  </div>
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
                  <div style={maxCity - values.city.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxCity - values.city.length) + '/' + maxCity}</p>
                  </div>
                  <div style={errors.city && touched.city ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.city && touched.city && errors.city}&nbsp;</div> */}

                    <label htmlFor="image">Image</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        console.log(event.currentTarget.files[0])
                        setFieldValue("image", event.currentTarget.files[0])
                      }}
                      onBlur={handleBlur}
                      style={INPUT.box1}
                      className={errors.image && touched.image && "error"}
                    />
                    <div style={errors.image && touched.image ? ERROR.inputFTrue : ERROR.inputFFalse}>
                      {errors.image && touched.image && errors.image}&nbsp;</div>

                    {values.image && <PreviewImage file={values.image} />}

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

                    <div>
                      <button type="submit" className="gbtn2 gbtn-dblue" style={disableStyle} disabled={isSubmitting}>
                        {isSubmitting ? <i className="fa fa-refresh fa-1x" /> : 'Save'}</button>
                    </div>
                  </form>
                </>
                );
              }}
            </Formik>
          </div>
        </div>
      }
    </div>
  </>
  )
}

export default EditProfile