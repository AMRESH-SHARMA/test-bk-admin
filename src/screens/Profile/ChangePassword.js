import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API } from "../../API"
import { ERROR, INPUT } from "../../assets/constants/theme";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";

const ChangePassword = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  return (
    <>
      <Formik
        initialValues={{ currentPassword: "", newPassword: "", confirmNewPassword: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            await axios.post(`${API}/admin/change-password`, values, {
              headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            })
              .then((resApi) => {
                console.log(resApi)
                handleAlert('Password Updated', 'green')
                navigate('/')
              })
              .catch((e) => {
                console.log(e);
                handleAlert(e.response.data.msg, 'red')
              }).finally(() => setSubmitting(false))
          }, 500);
        }}

        validationSchema={Yup.object().shape({
          currentPassword: Yup.string()
          .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
            .matches(/(?=.*[a-z])/, "Password must contain a small letter.")
            .matches(/(?=.*[A-Z])/, "Password must contain a capital letter.")
            .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character."),
          newPassword: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
            .matches(/(?=.*[a-z])/, "Password must contain a small letter.")
            .matches(/(?=.*[A-Z])/, "Password must contain a capital letter.")
            .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character."),
          confirmNewPassword: Yup.string()
            .required("No password provided.")
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
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

            <div className="gcenter-screen">

              <div className="gcard" style={{ margin: '5px', height: 'auto', width: "35rem", padding: '40px' }}>
                <h1 style={{ marginBottom: '15px' }}>Change Password</h1>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="Enter your Current password"
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.currentPassword && touched.currentPassword && "error"}
                  />
                  <div style={errors.currentPassword && touched.currentPassword ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.currentPassword && touched.currentPassword && errors.currentPassword}&nbsp;</div>

                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.newPassword && touched.newPassword && "error"}
                  />
                  <div style={errors.newPassword && touched.newPassword ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.newPassword && touched.newPassword && errors.newPassword}&nbsp;</div>

                  <label htmlFor="confirmNewPassword">Confirm new password</label>
                  <input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Enter your password"
                    value={values.confirmNewPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.confirmNewPassword && touched.confirmNewPassword && "error"}
                  />
                  <div style={errors.confirmNewPassword && touched.confirmNewPassword ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.confirmNewPassword && touched.confirmNewPassword && errors.confirmNewPassword}&nbsp;</div>

                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button type="submit" className="gbtn1" style={disableStyle} disabled={isSubmitting}>
                      {isSubmitting ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : 'Submit'}</button>

                    <button type="button" className='gbtn1 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
                  </div>
                </form>
              </div>
            </div>
          </>
          )
        }}
      </Formik>
    </>
  )
}

export default ChangePassword