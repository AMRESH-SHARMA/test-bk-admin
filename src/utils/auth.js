import { decodeToken } from "react-jwt";

export const decodedAuthToken = () => {
  const token = localStorage.getItem("token")
  if (token) {
    const myDecodedToken = decodeToken(token);
    return myDecodedToken
  } else return null
};