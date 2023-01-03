import { useDispatch } from "react-redux";
import { modalActions } from "../reducers/modalSlice";

export const useModal = () => {
  const dispatch = useDispatch();

  const showModal = (modalState) => {
    dispatch(modalActions.showModal(modalState));
  };

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  return { showModal, hideModal };
};