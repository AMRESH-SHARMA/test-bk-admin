import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useJwt } from "react-jwt";

const AuthVerify = (props) => {
  const navigate = useNavigate();
  // let location = useLocation();
  const token = localStorage.getItem("token")
  const { decodedToken, isExpired } = useJwt(token);
  console.log(decodedToken, isExpired);

  useEffect(() => {
    if (decodedToken) {
      if (isExpired) {
        navigate('/login')
      }
      else navigate('/')
    } else navigate('/login')

    // }, [location, props]);
  }, []);

  return;
};


export default AuthVerify;