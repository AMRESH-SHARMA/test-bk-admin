import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API } from "../../API"
import { ERROR, INPUT } from "../../assets/constants/theme";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Redux/actions/useAlert";


const Login = () => {
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
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            await axios.post(`${API}/admin/login`, values)
              .then((resApi) => {
                console.log(resApi)
                localStorage.setItem('token', resApi.data.msg)
                handleAlert('Logged in Success', 'green')
                navigate('/')
              })
              .catch((e) => {
                console.log(e);
                handleAlert(e.response.data.msg, 'red')
              }).finally(() => setSubmitting(false))
        }, 500);
        }}

      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string()
        .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
            .matches(/(?=.*[a-z])/, "Password must contain a small letter.")
            .matches(/(?=.*[A-Z])/, "Password must contain a capital letter.")
            .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character."),
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
              <h1 style={{ marginBottom: '15px' }}>Please SignIn</h1>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>

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

                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <button type="submit" className="gbtn1" style={disableStyle} disabled={isSubmitting}>
                    {isSubmitting ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : 'Log in'}</button>
                  <button type="button" className="gbtn1" onClick={() => navigate('/register')}>Register</button>

                </div>
                <a href="/forgot-password" className="gforgotpass">Forgot Password?</a>
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

export default Login;