import React, { useState, useEffect } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../../assets/constants/theme";
import { API } from "../../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../Redux/actions/useAlert";

const AddState = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();
  const [uid, setUid] = useState('')
  const maxstateNameName = 20
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
          console.log(resApi);
          setUid(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUid()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Add State</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              stateName: "",
              stateCode: "",
              uniqueId: uid?._id || "",
              timestamp: new Date()
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                await axios.post(`${API}/stateName/create-stateName`, values, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  }
                })
                  .then((resApi) => {
                    console.log(resApi)
                    handleAlert('stateName Created', 'green')
                    navigate('/books/stateName')
                  })
                  .catch((e) => {
                    console.log(e);
                    handleAlert(e.response.data.msg, 'red')
                  }).finally(() => setSubmitting(false))
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              stateName: Yup.string()
                .required('required'),
              stateCode: Yup.string()
                .required('required'),
            })}
          >

            {props => {
              const {
                values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit,
              } = props;

              if (isSubmitting) {
                var disableStyle = { cursor: "not-allowed", }
              }

              return (<>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                  <label htmlFor="stateName">State Name</label>
                  <input
                    id="stateName"
                    name="stateName"
                    type="text"
                    placeholder="Enter stateName"
                    value={values.stateName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.stateName && touched.stateName && "error"}
                  />
                  <div style={maxstateNameName - values.stateName.length < 0 ? { display: 'block' } : null}>
                    <p style={{ fontSize: '12px' }}> {'Characters: ' + (maxstateNameName - values.stateName.length) + '/' + maxstateNameName}</p>
                  </div>
                  <div style={errors.stateName && touched.stateName ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.stateName && touched.stateName && errors.stateName}&nbsp;</div>

                  <label htmlFor="stateCode">State Code</label>
                  <input
                    id="stateCode"
                    name="stateCode"
                    type="text"
                    placeholder="Enter stateCode"
                    value={values.stateCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.stateCode && touched.stateCode && "error"}
                  />
                  <div style={errors.stateCode && touched.stateCode ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.stateCode && touched.stateCode && errors.stateCode}&nbsp;</div>

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
    </div>

  </>
  )
}

export default AddState