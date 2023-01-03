import { useDispatch } from "react-redux";
import { sidebarActions } from "../reducers/sidebarSlice";

export const useSidebar = () => {
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(sidebarActions.toggleSidebar());
  };

  return { toggleSidebar };
};