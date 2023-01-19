import React from "react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import axios from "axios";
// import InvalidToken from "../Error/InvalidToken";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";

const ForgotPassword = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert();

  useEffect(() => {
    const loginApi = async () => {
      try {
        //   let payload = { token: window.location.href.split('=')[1] }
        //   let resapi = await axios.post(`${registerUrl}/invite/verifytoken`, payload)
        //   console.log(resapi)
      } catch (err) {
        console.log(err);
      }
    }
    loginApi()
  }, [])

  const handleAlert = () => {
    displayAlert({
      message: "Login Failed",
      color: "red",
      timeout: 5000
    })
  }

  return (
    <>
      <Formik
        initialValues={{ old_password: "", new_password: "", con_password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let payload = values;
            console.log("Logging in", payload);
            setSubmitting(false);
            if (true) handleAlert()
          }, 500);
        }}

        validationSchema={Yup.object().shape({
          old_password: Yup.string()
            .required("No password provided.")
            .min(1, "Password is too short - should be 1 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
          new_password: Yup.string()
            .required("No password provided.")
            .min(1, "Password is too short - should be 1 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
          con_password: Yup.string()
            .required("No password provided.")
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
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
                <h1 style={{ marginBottom: '15px' }}>Forgot Password</h1>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                  {/* <label htmlFor="email">Email</label>
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
                    {errors.email && touched.email && errors.email}&nbsp;</div> */}


                  <label htmlFor="old_password">Old Password</label>
                  <input
                    id="old_password"
                    name="old_password"
                    type="password"
                    placeholder="Enter your old password"
                    value={values.old_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.old_password && touched.old_password && "error"}
                  />
                  <div style={errors.old_password && touched.old_password ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.old_password && touched.old_password && errors.old_password}&nbsp;</div>

                  <label htmlFor="new_password">New Password</label>
                  <input
                    id="new_password"
                    name="new_password"
                    type="password"
                    placeholder="Enter your new password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.new_password && touched.new_password && "error"}
                  />
                  <div style={errors.new_password && touched.new_password ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.new_password && touched.new_password && errors.new_password}&nbsp;</div>

                  <label htmlFor="con_password">Confirm new password</label>
                  <input
                    id="con_password"
                    name="con_password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.con_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.con_password && touched.con_password && "error"}
                  />
                  <div style={errors.con_password && touched.con_password ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.con_password && touched.con_password && errors.con_password}&nbsp;</div>

                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button type="submit" className="gbtn1" style={disableStyle} disabled={isSubmitting}>
                      {isSubmitting ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : 'Submit'}</button>

                    <button type="button" className="gbtn1" onClick={() => navigate('/login')}>Login</button>
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

export default ForgotPassword