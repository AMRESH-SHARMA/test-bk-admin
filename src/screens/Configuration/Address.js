import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";
import Spinner from '../../assets/Spinner/Spinner';

const Address = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();
  const [apiloading, setApiLoading] = useState(true)
  const [apiData, setApiData] = useState([])

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getAddress() {
      await axios.get(`${API}/address/get-address`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg[0]);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
      setApiLoading(false)
    } getAddress()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Address</p>
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
              companyName: apiData?.companyName || "",
              address: apiData?.address || "",
              city: apiData?.city || "",
              state: apiData?.state || "",
              country: apiData?.country || "",
              pinCode: apiData?.pinCode || "",
              gstin: apiData?.gstin || "",
              website: apiData?.website || "",
              phone: apiData?.phone || "",
              email: apiData?.email || "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                await axios.put(`${API}/address/update-address/${apiData?._id}`, values)
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('Address Updated', 'green')
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
              companyName: Yup.string()
                .required("Required"),
              address: Yup.string()
                .required("Required"),
              country: Yup.string()
                .required("Required"),
              state: Yup.string()
                .required("Required"),
              city: Yup.string()
                .required("Required"),
              pinCode: Yup.string()
                .required("Required"),
              gstin: Yup.string()
                .required("Required"),
              website: Yup.string()
                .required("Required"),
              phone: Yup.string()
                .required("Required"),
              email: Yup.string()
                .email()
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

                  <label htmlFor="companyName">Company&nbsp;Name</label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Enter your Company Name"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.companyName && touched.companyName && "error"}
                  />
                  <div style={errors.companyName && touched.companyName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.companyName && touched.companyName && errors.companyName}&nbsp;</div>

                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your Company Name"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.address && touched.address && "error"}
                  />
                  <div style={errors.address && touched.address ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.address && touched.address && errors.address}&nbsp;</div>

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


                  <label htmlFor="pinCode">PinCode</label>
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

                  <label htmlFor="gstin">GSTIN</label>
                  <input
                    id="gstin"
                    name="gstin"
                    type="number"
                    placeholder="Enter your gstin"
                    value={values.gstin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.gstin && touched.gstin && "error"}
                  />
                  <div style={errors.gstin && touched.gstin ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.phonegstin && touched.gstin && errors.gstin}&nbsp;</div>

                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    placeholder="Enter your website"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.website && touched.website && "error"}
                  />
                  <div style={errors.website && touched.website ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.website && touched.website && errors.website}&nbsp;</div>


                  <label htmlFor="phone">Contact Number</label>
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
                  <div style={errors.phone && touched.phone ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.phone && touched.phone && errors.phone}&nbsp;</div>


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

                  <div className='gcard-btn-panel'>
                    <button type="submit" className="gbtn1 gbtn-dblue" style={disableStyle} disabled={isSubmitting}>
                      {isSubmitting ? <i className="fa fa-refresh fa-1x" /> : 'Save'}</button>
                  </div>
                </form>
              </>

              );
            }}
          </Formik>
        </div>
      </div>}
    </div>

  </>
  )
}

export default Address