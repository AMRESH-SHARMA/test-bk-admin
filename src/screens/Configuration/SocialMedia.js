import React, { useEffect } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { API } from "../../API"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";

const SocialMedia = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  return (<>
    <div className='gcont-container'>

      <div className="gcont-title " style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Edit Social Media</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>


      <div className="gcont-body" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="gcard" style={{ width: "35rem", padding: '40px' }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              facebook: "",
              twitter: "",
              instagram: "",
              linkedin: "",
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
              facebook: Yup.string()
                .required("Required"),
              twitter: Yup.string()
                .required("Required"),
              instagram: Yup.string()
                .required("Required"),
              linkedin: Yup.string()
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

                  <label htmlFor="facebook">Facebook</label>
                  <input
                    id="facebook"
                    name="facebook"
                    type="text"
                    placeholder="Enter Facebook Url"
                    value={values.facebook}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.facebook && touched.facebook && "error"}
                  />
                  <div style={errors.facebook && touched.facebook ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.facebook && touched.facebook && errors.facebook}&nbsp;</div>

                  <label htmlFor="twitter">Twitter</label>
                  <input
                    id="twitter"
                    name="twitter"
                    type="text"
                    placeholder="Enter Twitter Url"
                    value={values.twitter}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.twitter && touched.twitter && "error"}
                  />
                  <div style={errors.twitter && touched.twitter ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.twitter && touched.twitter && errors.twitter}&nbsp;</div>

                  <label htmlFor="instagram">Instagram</label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    placeholder="Enter Instagram Url"
                    value={values.instagram}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.instagram && touched.instagram && "error"}
                  />
                  <div style={errors.instagram && touched.instagram ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.instagram && touched.instagram && errors.instagram}&nbsp;</div>

                  <label htmlFor="linkedin">Linkedin</label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    placeholder="Enter linkedin Url"
                    value={values.linkedin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.linkedin && touched.linkedin && "error"}
                  />
                  <div style={errors.linkedin && touched.linkedin ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.linkedin && touched.linkedin && errors.linkedin}&nbsp;</div>

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

export default SocialMedia