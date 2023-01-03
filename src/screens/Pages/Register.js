import React from "react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import "./Register.css";
// import axios from "axios";
// import InvalidToken from "../Error/InvalidToken";
import { ERROR, INPUT } from "../../assets/constants/theme";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";

const Register = () => {
  const navigate = useNavigate()
  const { displayAlert } = useAlert();

  useEffect(() => {
    const registerApi = async () => {
      try {
        //   let payload = { token: window.location.href.split('=')[1] }
        //   let resapi = await axios.post(`${registerUrl}/invite/verifytoken`, payload)
        //   console.log(resapi)
      } catch (err) {
        console.log(err);
      }
    }
    registerApi()
  }, [])

  const handleAlert = () => {
    displayAlert({
      message: "Login Failed",
      color: "green",
      timeout: 5000
    })
  }

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "", con_password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let payload = values
            console.log("Logging in", payload);
            setSubmitting(false);
            if (true) handleAlert()
          }, 500);
        }}

        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required("Required"),
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(1, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
          con_password: Yup.string()
            .required("No password provided.")
            .oneOf([Yup.ref('password'), null], "Password must match.")
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

              <div className="gcard" style={{ margin: '5px', height: "auto", width: "35rem", padding: '40px' }}>
                <h1 style={{ marginBottom: '15px' }}>Create your account</h1>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.username && touched.username && "error"}
                  />
                  <div style={errors.username && touched.username ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.username && touched.username && errors.username}&nbsp;</div>

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


                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={INPUT.box1}
                    className={errors.password && touched.password && "error"}
                  />
                  <div style={errors.password && touched.password ? ERROR.inputFTrue : ERROR.inputFFalse}>
                    {errors.password && touched.password && errors.password}&nbsp;</div>



                  <label htmlFor="con_password">Confirm Password</label>
                  <input
                    id="con_password"
                    name="con_password"
                    type="text"
                    placeholder="Enter your con_password"
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
                    {isSubmitting ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : 'Register'}</button>

                    <button type="button" className="gbtn1" onClick={() => navigate('/login')}>Log in</button>
                  </div>

                </form>
              </div>
            </div>
          </>

          );
        }}
      </Formik>
    </>
  )
}

export default Register;