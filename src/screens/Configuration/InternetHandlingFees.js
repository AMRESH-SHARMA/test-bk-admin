import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";
import Spinner from '../../assets/Spinner/Spinner';

const InternetHandlinginternetHandlingFeess = () => {

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
    async function getFees() {
      await axios.get(`${API}/internetHandlingFees/get-internetHandlingFees`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg[0]);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
      setApiLoading(false)
    } getFees()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Internet Handling Fees</p>
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
                fees: apiData?.fees || "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  await axios.put(`${API}/internetHandlingFees/update-internetHandlingFees`, values)
                    .then((resApi) => {
                      console.log(resApi)
                      handleAlert('internetHandlingFees Updated', 'green')
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
                fees: Yup.string()
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

                    <label htmlFor="fees">Internet Handling Fees</label>
                    <input
                      id="fees"
                      name="fees"
                      type="number"
                      placeholder="Enter to Add Value"
                      value={values.fees}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={INPUT.box1}
                      className={errors.fees && touched.fees && "error"}
                    />
                    <div style={errors.fees && touched.fees ? ERROR.inputFTrue : ERROR.inputFFalse}>
                      {errors.fees && touched.fees && errors.fees}&nbsp;</div>

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

export default InternetHandlinginternetHandlingFeess