import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        // props.logOut();
        navigate('/login')
      }
    }
    else navigate('/login')
  // }, [location, props]);
  }, []);

  return ;
};

export default AuthVerify;