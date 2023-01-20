import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";
import PreviewImage from '../../components/PreviewImage';
import Spinner from '../../assets/Spinner/Spinner';

const Logos = () => {
  const navigate = useNavigate();
  const [apiloading, setApiLoading] = useState(true)
  const { displayAlert } = useAlert();
  const [apiData, setApiData] = useState([])

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getLogos() {
        await axios.get(`${API}/logos`)
          .then((resApi) => {
            console.log(resApi);
            setApiData(resApi.data.msg);
          })
          .catch((e) => {
            console.log(e);
            handleAlert(e.response.data.msg, 'red')
          });
        setApiLoading(false)
    } getLogos()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Logos</p>
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
                websiteHeader: apiData?.websiteHeader?.url || "",
                websiteFooter: apiData?.websiteFooter?.url || "",
                websiteAdminHeader: apiData?.websiteAdminHeader?.url || "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  const formData = new FormData();
                  formData.append('websiteHeader', values.websiteHeader);
                  formData.append('websiteFooter', values.websiteFooter);
                  formData.append('websiteAdminHeader', values.websiteAdminHeader);
                  await axios.put(`${API}/apiData/update-apiData`, formData)
                    .then((resApi) => {
                      console.log(resApi)
                      handleAlert('apiData Updated successfully', 'green')
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
                websiteHeader: Yup.string()
                .required(),
                websiteFooter: Yup.string()
                .required(),
                websiteAdminHeader: Yup.string()
                .required(),
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

                    <label htmlFor="websiteHeader">Website Header(148 x 48 px)</label>
                    <input
                      id="websiteHeader"
                      name="websiteHeader"
                      type="file"
                      accept="websiteHeader/*"
                      onChange={(event) => {
                        console.log(event.currentTarget.files[0])
                        setFieldValue("websiteHeader", event.currentTarget.files[0])
                      }}
                      onBlur={handleBlur}
                      style={INPUT.box1}
                      className={errors.websiteHeader && touched.websiteHeader && "error"}
                    />
                    <div style={errors.websiteHeader && touched.websiteHeader ? ERROR.inputFTrue : null}>
                      {errors.websiteHeader && touched.websiteHeader && errors.websiteHeader}&nbsp;</div>

                    {values.websiteHeader && <PreviewImage file={values.websiteHeader} />}

                    <label htmlFor="websiteFooter">Website Footer(148 x 48 px)</label>
                    <input
                      id="websiteFooter"
                      name="websiteFooter"
                      type="file"
                      accept="websiteFooter/*"
                      onChange={(event) => {
                        console.log(event.currentTarget.files[0])
                        setFieldValue("websiteFooter", event.currentTarget.files[0])
                      }}
                      onBlur={handleBlur}
                      style={INPUT.box1}
                      className={errors.websiteFooter && touched.websiteFooter && "error"}
                    />
                    <div style={errors.websiteFooter && touched.websiteFooter ? ERROR.inputFTrue : null}>
                      {errors.websiteFooter && touched.websiteFooter && errors.websiteFooter}&nbsp;</div>

                    {values.websiteFooter && <PreviewImage file={values.websiteFooter} />}

                    <label htmlFor="websiteAdminHeader">Website Footer(148 x 48 px)</label>
                    <input
                      id="websiteAdminHeader"
                      name="websiteAdminHeader"
                      type="file"
                      accept="websiteAdminHeader/*"
                      onChange={(event) => {
                        console.log(event.currentTarget.files[0])
                        setFieldValue("websiteAdminHeader", event.currentTarget.files[0])
                      }}
                      onBlur={handleBlur}
                      style={INPUT.box1}
                      className={errors.websiteAdminHeader && touched.websiteAdminHeader && "error"}
                    />
                    <div style={errors.websiteAdminHeader && touched.websiteAdminHeader ? ERROR.inputFTrue : null}>
                      {errors.websiteAdminHeader && touched.websiteAdminHeader && errors.websiteAdminHeader}&nbsp;</div>

                    {values.websiteAdminHeader && <PreviewImage file={values.websiteAdminHeader} />}

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

export default Logos