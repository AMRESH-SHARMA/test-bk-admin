import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PreviewImage from '../../components/PreviewImage';
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";

const EditDeliveryCarrier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  const [apiData, setApiData] = useState('')

  const maxAddress = 50
  const maxCarrierName = 50
  const maxEmail = 100
  const maxPhone = 10

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getDeliveryCarrier() {
      await axios.get(`${API}/deliveryCarrier/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getDeliveryCarrier()
  }, [id])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Delivery Carrier</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              image: apiData?.image?.url || "",
              carrierName: apiData?.carrierName || "",
              email: apiData?.email || "",
              phone: apiData?.phone || "",
              address: apiData?.address || "",
              uniqueId: apiData._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                const formData = new FormData();
                formData.append('image', values.image);
                formData.append('carrierName', values.carrierName);
                formData.append('email', values.email);
                formData.append('phone', values.phone);
                formData.append('address', values.address);
                await axios.put(`${API}/deliveryCarrier/${id}`, formData)
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('Updated successfully', 'green')
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
              carrierName: Yup.string()
                .max(maxCarrierName, `maximum ${maxCarrierName} characters allowed`)
                .required("Required"),
              email: Yup.string()
                .email()
                .max(maxEmail, `maximum ${maxEmail} characters allowed`)
                .required("Required"),
              phone: Yup.number('only numbers allowed')
                .integer('only numbers allowed')
                .max(9999999999, `maximum ${maxPhone} digits allowed`)
                .required("Required"),
              address: Yup.string()
                .max(maxAddress, `maximum ${maxAddress} characters allowed`)
                .required("Required"),
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

                  <label htmlFor="carrierName">Carrier Name</label>
                  <input
                    id="carrierName"
                    name="carrierName"
                    type="text"
                    placeholder="Enter your carrierName"
                    value={values.carrierName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.carrierName && touched.carrierName && "error"}
                  />
                  <div style={maxCarrierName - values.carrierName.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxCarrierName - values.carrierName.length) + '/' + maxCarrierName}</p>
                  </div>
                  <div style={errors.carrierName && touched.carrierName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.carrierName && touched.carrierName && errors.carrierName}&nbsp;</div>

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

                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.address && touched.address && "error"}
                  />
                  <div style={maxAddress - values.address.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxAddress - values.address.length) + '/' + maxAddress}</p>
                  </div>
                  <div style={errors.address && touched.address ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.address && touched.address && errors.address}&nbsp;</div>

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

export default EditDeliveryCarrier