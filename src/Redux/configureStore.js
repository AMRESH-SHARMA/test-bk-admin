import { configureStore } from "@reduxjs/toolkit";
import {alertReducer} from "./reducers/alertSlice";
import {modalReducer} from "./reducers/modalSlice";
import {sidebarReducer} from "./reducers/sidebarSlice";

import { combineReducers } from "redux";

const reducer = combineReducers({
  // put all your reducers here!
  alert: alertReducer,
  modal: modalReducer,
  sidebar: sidebarReducer
});

export const store = configureStore({
  reducer,
});