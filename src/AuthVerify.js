import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

const AuthVerify = (props) => {
  const navigate = useNavigate();
  useEffect(() => {

    const myDecodedToken = decodeToken(localStorage.getItem("token"));
    const isMyTokenExpired = isExpired(localStorage.getItem("token"));
    console.log(myDecodedToken, isMyTokenExpired);
    if (myDecodedToken) {
      if (isMyTokenExpired) {
        navigate('/login')
      } 
    } else navigate('/login')
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return;
};


export default AuthVerify;