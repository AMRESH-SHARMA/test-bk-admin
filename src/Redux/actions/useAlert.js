import { useDispatch } from "react-redux";
import { alertActions } from "../reducers/alertSlice";

export const useAlert = () => {
  const dispatch = useDispatch();

  const displayAlert = (alertState) => {
    dispatch(alertActions.addAlert(alertState));
  };

  const clearAlert = () => {
    dispatch(alertActions.clearAlert());
  };

  return { displayAlert, clearAlert };
};