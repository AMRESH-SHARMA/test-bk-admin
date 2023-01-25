import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../../assets/constants/theme";
import { API } from "../../../API"
import { useAlert } from "../../../Redux/actions/useAlert";

const EditDeliveryFees = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [apiData, setApiData] = useState('')
  const [cityData, setCityData] = useState([])
  const [stateData, setStateData] = useState([])

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function get() {
      await axios.get(`${API}/deliveryFees/get-single-deliveryFees/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } get()
  }, [id])  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getStates() {
      await axios.get(`${API}/state/get-states`)
        .then((resApi) => {
          // console.log(resApi);
          setStateData(resApi.data.msg.result);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getStates()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getCities() {
      await axios.get(`${API}/city/get-cities`)
        .then((resApi) => {
          console.log(resApi);
          setCityData(resApi.data.msg.result);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getCities()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Delivery Fees</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              fees: apiData?.fees || "",
              state: apiData?.state || "",
              city: apiData?.city || "",
              uniqueId: apiData?._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                // console.log(values)
                await axios.put(`${API}/deliveryFees/update-deliveryFees/${id}`, values)
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
              fees: Yup.string()
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

                  <label htmlFor="fees">Delivery Fees</label>
                  <input
                    id="fees"
                    name="fees"
                    type="number"
                    placeholder="Enter fees"
                    value={values.fees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.fees && touched.fees && "error"}
                  />
                  <div style={errors.fees && touched.fees ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.fees && touched.fees && errors.fees}&nbsp;</div>

                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value={values.state._id} label={values.state.state} />
                    {stateData && stateData?.map((i, index) => {
                      return (<>
                        <option value={i._id} label={i.state} />
                      </>
                      )
                    })}
                  </select>
                  <div style={errors.state && touched.state ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.state && touched.state && errors.state}&nbsp;</div>

                  <label htmlFor="city">City</label>
                  <select
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    required
                  >
                    <option value={values.city._id} label={values.city.city} />
                    {cityData && cityData.map((i, index) => {
                      return (<>
                        {i.state?._id === values.state ? <option value={i._id} label={i.city} /> : null}
                      </>
                      )
                    })}
                  </select>
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
                    value={values.uniqueId}
                    onChange={handleChange}
                    style={INPUT.boxdisable}
                    disabled
                  />
                  <div style={ERROR.inputFFalse}>
                  </div>

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
      </div>
    </div>
  </>
  )
}

export default EditDeliveryFees