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

  const { addressId, userId } = useParams();
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  const [userAddress, setUserAddress] = useState([])

  const maxAddressLine1 = 50
  const maxAddressLine2 = 50
  const maxType = 20
  const maxLandmark = 20
  const maxCity = 20
  const maxState = 20
  const maxCountry = 20

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getAddress() {
      await axios.get(`${API}/user/get-single-address/${addressId}`)
        .then((resApi) => {
          console.log(resApi);
          setUserAddress(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getAddress()
  }, [addressId])  // eslint-disable-line react-hooks/exhaustive-deps

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
              userId: userId,
              addressLine1: userAddress.addressLine1 || "",
              addressLine2: userAddress.addressLine2 || "",
              type: userAddress.type || "",
              landmark: userAddress.landmark || "",
              city: userAddress?.city || "",
              state: userAddress.state || "",
              zipCode: userAddress.zipCode || "",
              country: userAddress.country || "India",
              uniqueId: userAddress._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                console.log(values)
                await axios.put(`${API}/user/update-address/${addressId}`, values)
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('address Updated', 'green')
                    navigate(-1)
                  })
                  .catch((e) => {
                    console.log(e);
                    handleAlert(e.response.data.msg, 'red')
                  })
                setSubmitting(false);
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              addressLine1: Yup.string()
                .max(maxAddressLine1, `maximum ${maxAddressLine1} characters allowed`)
                .required("Required"),
              addressLine2: Yup.string()
                .max(maxAddressLine2, `maximum ${maxAddressLine2} characters allowed`),
              type: Yup.string()
                .max(maxType, `maximum ${maxType} characters allowed`)
                .required("Required"),
              landmark: Yup.string()
                .max(maxLandmark, `maximum ${maxLandmark} characters allowed`),
              city: Yup.string()
                .max(maxCity, `maximum ${maxCity} characters allowed`)
                .required("Required"),
              state: Yup.string()
                .max(maxState, `maximum ${maxState} characters allowed`)
                .required("Required"),
              zipCode: Yup.string()
                .required("Required"),
              country: Yup.string()
                .max(maxCountry, `maximum ${maxCountry} characters allowed`)
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

                  <label htmlFor="addressLine1">Address Line 1</label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    placeholder="Enter your address line 1"
                    value={values.addressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.addressLine1 && touched.addressLine1 && "error"}
                  />
                  <div style={maxAddressLine1 - values.addressLine1.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxAddressLine1 - values.addressLine1.length) + '/' + maxAddressLine1}</p>
                  </div>
                  <div style={errors.addressLine1 && touched.addressLine1 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.addressLine1 && touched.addressLine1 && errors.addressLine1}&nbsp;</div>

                  <label htmlFor="addressLine2">Address Line 2</label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    placeholder="address line 2 (optional)"
                    value={values.addressLine2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.addressLine2 && touched.addressLine2 && "error"}
                  />
                  <div style={maxAddressLine2 - values.addressLine2.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxAddressLine2 - values.addressLine2.length) + '/' + maxAddressLine2}</p>
                  </div>
                  <div style={errors.addressLine2 && touched.addressLine2 ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.addressLine2 && touched.addressLine2 && errors.addressLine2}&nbsp;</div>

                  <label htmlFor="type">Address Type</label>
                  <input
                    id="type"
                    name="type"
                    type="text"
                    placeholder="Enter type of address"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.type && touched.type && "error"}
                  />
                  <div style={maxType - values.type.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxType - values.type.length) + '/' + maxType}</p>
                  </div>
                  <div style={errors.type && touched.type ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.type && touched.type && errors.type}&nbsp;</div>

                  <label htmlFor="landmark">Landmark</label>
                  <input
                    id="landmark"
                    name="landmark"
                    type="text"
                    placeholder="Landmark (optional)"
                    value={values.landmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.landmark && touched.landmark && "error"}
                  />
                  <div style={maxLandmark - values.landmark.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxLandmark - values.landmark.length) + '/' + maxLandmark}</p>
                  </div>
                  <div style={errors.landmark && touched.landmark ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.landmark && touched.landmark && errors.landmark}&nbsp;</div>

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
                  <div style={maxState - values.state.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxState - values.state.length) + '/' + maxState}</p>
                  </div>
                  <div style={errors.state && touched.state ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.state && touched.state && errors.state}&nbsp;</div>

                  <label htmlFor="zipCode">Zip Code</label>
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
                  <div style={maxCountry - values.country.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxCountry - values.country.length) + '/' + maxCountry}</p>
                  </div>
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